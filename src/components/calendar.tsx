import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLang } from '../lib/lang-context'
import ClockPicker from './clock-picker'

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

interface CalendarProps {
  selectedDate: Date | null
  selectedTime: string | null
  onDateChange: (date: Date | null) => void
  onTimeChange: (time: string | null) => void
  error?: string
}

export default function Calendar({ selectedDate, selectedTime, onDateChange, onTimeChange, error }: CalendarProps) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => new Date())

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month])
  const firstDay = useMemo(() => getFirstDayOfWeek(year, month), [year, month])
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const formattedDate = selectedDate
    ? `${selectedDate.getDate()}. ${selectedDate.getMonth() + 1}. ${selectedDate.getFullYear()}`
    : null

  return (
    <div className="relative">
      {/* Calendar trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-3 px-5 py-3 rounded-md border text-sm text-white hover:bg-white/10 transition-colors w-full md:w-auto ${
          error ? 'border-red-800' : 'border-neutral-800'
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="font-bold tracking-wide">
          {formattedDate && selectedTime
            ? `✓ ${formattedDate} — ${selectedTime}`
            : t.contact.bookConsult}
        </span>
      </button>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-400 px-1 mt-1.5">{error}</p>
      )}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full mt-2 left-0 z-50 bg-black/95 backdrop-blur-md border border-neutral-800 rounded-xl p-4 w-[19rem] shadow-2xl"
            >
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="text-neutral-400 hover:text-white transition-colors p-1"
                  aria-label="Previous month"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <span className="text-white font-bold text-sm">
                  {t.contact.months[month]} {year}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="text-neutral-400 hover:text-white transition-colors p-1"
                  aria-label="Next month"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              {/* Weekday header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {t.contact.weekdays.map((wd) => (
                  <div key={wd} className="text-center text-[10px] text-neutral-500 font-medium py-1">
                    {wd}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((d, i) => {
                  if (d === null) return <div key={i} />
                  const date = new Date(year, month, d)
                  const isPast = date < today
                  const isSelected = selectedDate && isSameDay(date, selectedDate)
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={isPast}
                      onClick={() => {
                        onDateChange(date)
                        onTimeChange(null)
                      }}
                      className={`text-sm rounded-md py-1.5 transition-colors ${
                        isSelected
                          ? 'bg-white text-black font-bold'
                          : isPast
                            ? 'text-neutral-700 cursor-not-allowed'
                            : 'text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      {d}
                    </button>
                  )
                })}
              </div>

              {/* Time selection */}
              <AnimatePresence>
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-neutral-500 text-xs tracking-widest uppercase mt-4 mb-2">
                      {t.contact.pickTime}
                    </p>
                    <ClockPicker value={selectedTime} onChange={(tm) => onTimeChange(tm)} />

                    {/* Close button */}
                    <button
                      type="button"
                      disabled={!selectedTime}
                      onClick={() => setOpen(false)}
                      className="w-full mt-4 px-4 py-2.5 rounded-md bg-white text-black font-bold text-sm hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      {t.contact.confirm}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
