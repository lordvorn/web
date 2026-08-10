import { useState } from 'react'

interface ClockPickerProps {
  value: string | null
  onChange: (time: string) => void
}

export default function ClockPicker({ value, onChange }: ClockPickerProps) {
  const [mode, setMode] = useState<'hour' | 'minute'>('hour')
  const [hour, setHour] = useState<number | null>(value ? parseInt(value.split(':')[0]) : null)
  const [minute, setMinute] = useState<number | null>(value ? parseInt(value.split(':')[1]) : null)

  const cx = 120
  const cy = 120
  const r = 88

  const handleHourClick = (h: number) => {
    setHour(h)
    setMode('minute')
  }

  const handleMinuteClick = (m: number) => {
    setMinute(m)
    onChange(`${String(hour ?? 0).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
  }

  const angleFor = (index: number, total: number) => {
    return (index * 360) / total - 90
  }

  const positionFor = (index: number, total: number) => {
    const angle = (angleFor(index, total) * Math.PI) / 180
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  }

  const handAngle = mode === 'hour' && hour !== null
    ? angleFor(hour, 12)
    : minute !== null
      ? angleFor(minute, 60)
      : null

  return (
    <div className="flex flex-col items-center">
      {/* Time display */}
      <div className="flex items-center gap-1 mb-3">
        <button
          type="button"
          onClick={() => setMode('hour')}
          className={`text-2xl font-bold tabular-nums rounded px-2 py-0.5 transition-colors ${
            mode === 'hour' ? 'bg-white text-black' : 'text-white hover:bg-white/10'
          }`}
        >
          {String(hour ?? '--').padStart(2, '0')}
        </button>
        <span className="text-2xl font-bold text-white">:</span>
        <button
          type="button"
          onClick={() => setMode('minute')}
          className={`text-2xl font-bold tabular-nums rounded px-2 py-0.5 transition-colors ${
            mode === 'minute' ? 'bg-white text-black' : 'text-white hover:bg-white/10'
          }`}
        >
          {String(minute ?? '--').padStart(2, '0')}
        </button>
      </div>

      {/* Clock face */}
      <svg width="240" height="240" viewBox="0 0 240 240" className="select-none">
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={r + 16} fill="none" stroke="rgb(38 38 38)" strokeWidth="1" />

        {/* Hour numbers - hidden in minute mode to avoid overlap */}
        {mode === 'hour' &&
          Array.from({ length: 12 }, (_, i) => {
          const h = i === 0 ? 12 : i
          const pos = positionFor(i, 12)
          const isActive = hour === h
          return (
            <g key={`h-${h}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={14}
                fill={isActive ? 'white' : 'transparent'}
                className="cursor-pointer transition-opacity hover:opacity-80"
                onClick={() => handleHourClick(h)}
              />
              <text
                x={pos.x}
                y={pos.y}
                dy=".35em"
                textAnchor="middle"
                className="cursor-pointer"
                fill={isActive ? 'black' : 'rgb(245 245 245)'}
                fontSize="13"
                fontWeight="bold"
                onClick={() => handleHourClick(h)}
              >
                {h}
              </text>
            </g>
          )
        })}

        {/* Minute ticks */}
        {mode === 'minute' &&
          Array.from({ length: 60 }, (_, i) => {
            const pos = positionFor(i, 60)
            const isActive = minute === i
            return (
              <g key={`m-${i}`}>
                {i % 5 === 0 ? (
                  <g>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={11}
                      fill={isActive ? 'white' : 'transparent'}
                      className="cursor-pointer"
                      onClick={() => handleMinuteClick(i)}
                    />
                    <text
                      x={pos.x}
                      y={pos.y}
                      dy=".35em"
                      textAnchor="middle"
                      fill={isActive ? 'black' : 'rgb(163 163 163)'}
                      fontSize="11"
                      fontWeight="bold"
                      className="cursor-pointer"
                      onClick={() => handleMinuteClick(i)}
                    >
                      {String(i).padStart(2, '0')}
                    </text>
                  </g>
                ) : (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 5 : 2}
                    fill={isActive ? 'white' : 'rgb(82 82 82)'}
                    className="cursor-pointer"
                    onClick={() => handleMinuteClick(i)}
                  />
                )}
              </g>
            )
          })}

        {/* Clock hand */}
        {handAngle !== null && (
          <line
            x1={cx}
            y1={cy}
            x2={cx + r * Math.cos((handAngle * Math.PI) / 180)}
            y2={cy + r * Math.sin((handAngle * Math.PI) / 180)}
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={5} fill="white" />
      </svg>

      {/* Mode toggle + reset */}
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          onClick={() => setMode(mode === 'hour' ? 'minute' : 'hour')}
          className="text-xs text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded border border-neutral-800"
        >
          {mode === 'hour' ? '→ minuty' : '→ hodiny'}
        </button>
        <button
          type="button"
          onClick={() => {
            setHour(null)
            setMinute(null)
            setMode('hour')
          }}
          className="text-xs text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded border border-neutral-800"
        >
          reset
        </button>
      </div>
    </div>
  )
}
