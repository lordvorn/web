import { useState, type FormEvent } from 'react'
import { useLang } from '../lib/lang-context'
import { useService } from '../lib/service-context'
import { supabase } from '../lib/supabase'
import Calendar from './calendar'
import { serviceIcons } from './service-icons'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { t } = useLang()
  const { selectedService, setSelectedService } = useService()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string; date?: string }>({})

  const validateName = (val: string) => (val.trim().length === 0 ? t.contact.errName : undefined)
  const validateEmail = (val: string) => (!EMAIL_RE.test(val.trim()) ? t.contact.errEmail : undefined)
  const validateMessage = (val: string) => (val.trim().length === 0 ? t.contact.errMessage : undefined)

  const handleBlurName = () => {
    const err = validateName(name)
    setErrors((p) => ({ ...p, name: err }))
  }
  const handleBlurEmail = () => {
    const err = validateEmail(email)
    setErrors((p) => ({ ...p, email: err }))
  }
  const handleBlurMessage = () => {
    const err = validateMessage(message)
    setErrors((p) => ({ ...p, message: err }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const nameErr = validateName(name)
    const emailErr = validateEmail(email)
    const messageErr = validateMessage(message)
    const dateErr = !selectedDate ? t.contact.errDate : undefined
    const timeErr = !selectedTime ? t.contact.errTime : undefined

    setErrors({
      name: nameErr,
      email: emailErr,
      message: messageErr,
      date: dateErr || timeErr,
    })

    if (nameErr || emailErr || messageErr || dateErr || timeErr) return

    setLoading(true)
    setStatus('idle')

    try {
      const isoDate = selectedDate
        ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
        : null

      const { error } = await supabase.from('contact_messages').insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        selected_date: isoDate,
        selected_time: selectedTime,
        service: selectedService?.title ?? null,
      })

      if (error) throw error

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      setSelectedDate(null)
      setSelectedTime(null)
      setSelectedService(null)
      setErrors({})
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section
      id="kontakt"
      className="relative w-full bg-black py-24 md:py-32 px-6 md:px-8"
    >
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 md:mb-16">
        {t.contact.title}
      </h2>

      {/* Selected service badge */}
      {selectedService && (
        <div className="flex items-center gap-3 mb-8 px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-900/50 w-fit">
          <span className="text-white">{serviceIcons[selectedService.index]}</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-500 tracking-widest uppercase">
              {t.services.subtitle}
            </span>
            <span className="text-white font-bold text-sm md:text-base">
              {selectedService.title}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedService(null)}
            className="ml-2 text-neutral-500 hover:text-white transition-colors"
            aria-label="Clear"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-12 md:gap-16 w-full">
        {/* Left: form */}
        <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleBlurName}
              placeholder={t.contact.name}
              className={`w-full bg-neutral-900/50 border rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:outline-none ${
                errors.name ? 'border-red-800 focus:border-red-600' : 'border-neutral-800 focus:border-neutral-600'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-400 px-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlurEmail}
              placeholder={t.contact.email}
              className={`w-full bg-neutral-900/50 border rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:outline-none ${
                errors.email ? 'border-red-800 focus:border-red-600' : 'border-neutral-800 focus:border-neutral-600'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-400 px-1">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={handleBlurMessage}
              placeholder={t.contact.message}
              rows={5}
              className={`w-full bg-neutral-900/50 border rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:outline-none resize-none ${
                errors.message ? 'border-red-800 focus:border-red-600' : 'border-neutral-800 focus:border-neutral-600'
              }`}
            />
            {errors.message && (
              <p className="text-xs text-red-400 px-1">{errors.message}</p>
            )}
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <p className="text-sm text-green-400 border border-green-800 bg-green-900/20 rounded-md px-4 py-3">
              {t.contact.success}
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400 border border-red-800 bg-red-900/20 rounded-md px-4 py-3">
              {t.contact.error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="self-start flex items-center gap-2 px-6 py-3 border border-neutral-700 rounded-md text-sm tracking-widest uppercase hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {loading ? t.contact.submitting : t.contact.submit}
          </button>
        </form>

        {/* Right: contact details + calendar */}
        <div className="flex-1 flex flex-col gap-6">
          <Calendar
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
            error={errors.date}
          />
          <div>
            <h3 className="text-neutral-500 text-xs tracking-widest uppercase mb-3">
              {t.contact.details}
            </h3>
            <a
              href="mailto:prokopsimek000@gmail.com"
              className="block text-base md:text-lg hover:text-neutral-300 transition-colors"
            >
              prokopsimek000@gmail.com
            </a>
            <a
              href="tel:+420605344074"
              className="block text-base md:text-lg text-neutral-400 hover:text-white transition-colors"
            >
              {t.contact.phone}: 605 344 074
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
