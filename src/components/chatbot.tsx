import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLang } from '../lib/lang-context'
import { streamChat, SYSTEM_PROMPT, type ChatMessage } from '../lib/groq'

export default function Chatbot() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    setMessages([{ role: 'assistant', content: t.chatbot.greeting }])
  }, [t.chatbot.greeting])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const next: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setLoading(true)

    const assistantMsg: ChatMessage = { role: 'assistant', content: '' }
    setMessages([...next, assistantMsg])

    const controller = new AbortController()
    abortRef.current = controller

    try {
      await streamChat(
        [{ role: 'system', content: SYSTEM_PROMPT }, ...next],
        (token) => {
          assistantMsg.content += token
          setMessages((prev) => {
            const copy = [...prev]
            copy[copy.length - 1] = { ...assistantMsg }
            return copy
          })
        },
        controller.signal,
      )
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = {
            role: 'assistant',
            content: 'Omlouvám se, došlo k chybě. Zkuste to prosím znovu.',
          }
          return copy
        })
      }
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }

  return (
    <>
      {/* Floating button + hint */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-black/90 backdrop-blur-sm border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 max-w-[10rem]"
            >
              {t.chatbot.hint}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          aria-label={t.chatbot.title}
          onClick={() => setOpen((v) => !v)}
          className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg shadow-white/20 hover:scale-105 transition-transform"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[28rem] bg-black/95 backdrop-blur-md border border-neutral-800 rounded-xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <h3 className="text-white font-bold text-sm tracking-wide">
                  {t.chatbot.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'self-end bg-white text-black'
                      : 'self-start bg-neutral-900 text-neutral-100 border border-neutral-800'
                  }`}
                >
                  {m.content || (loading && i === messages.length - 1 ? '…' : '')}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-neutral-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                placeholder={t.chatbot.placeholder}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                className="px-3 py-2 rounded-md bg-white text-black font-bold text-sm hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {t.chatbot.send}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
