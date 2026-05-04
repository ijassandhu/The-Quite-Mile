import React from 'react'

type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={[
        'text-xs font-semibold uppercase tracking-widest text-stone-500',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </p>
  )
}
