const API_KEY = import.meta.env.VITE_GROQ_API_KEY
const API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export const SYSTEM_PROMPT = `Jsi AI asistent na webové stránce digitální agentury, která nabízí "digitální řešení na míru" — webový vývoj a AI řešení, díky kterým firma nezaspí dobu.
Odpovídej v jazyce, kterým uživatel píše (čeština / angličtina / němčina). Buď stručný, přátelský a konkrétní.
Můžeš vysvětlit služby (webové aplikace, AI integrace, konzultace), proces spolupráce, a když uživatel projeví zájem, navrhni domluvit konzultaci zdarma nebo kontakt přes sekci Kontakt. Neslibuj konkrétní ceny, místo toho pozvi ke konzultaci.`

export async function streamChat(
  messages: ChatMessage[],
  onToken: (token: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: true,
      temperature: 0.4,
    }),
    signal,
  })

  if (!res.ok || !res.body) {
    throw new Error(`Groq API error: ${res.status}`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue
      const data = trimmed.slice(5).trim()
      if (data === '[DONE]') return
      try {
        const json = JSON.parse(data)
        const token = json.choices?.[0]?.delta?.content
        if (token) onToken(token)
      } catch {
        // ignore partial JSON
      }
    }
  }
}
