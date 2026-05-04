import React from 'react'

type SectionTag = 'section' | 'div' | 'article'

type SectionProps = {
  children: React.ReactNode
  className?: string
  as?: SectionTag
}

export default function Section({ children, className, as: Tag = 'section' }: SectionProps) {
  return (
    <Tag className={['py-16 sm:py-24', className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
