'use client'

import React from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'light'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-stone-900 text-white hover:bg-stone-700 active:bg-stone-800 focus-visible:ring-stone-900',
  outline:
    'border border-stone-900 text-stone-900 hover:bg-stone-50 active:bg-stone-100 focus-visible:ring-stone-900',
  ghost:
    'text-stone-700 hover:bg-stone-100 active:bg-stone-200 focus-visible:ring-stone-900',
  light:
    'border border-white/70 text-white hover:bg-white hover:text-stone-900 active:bg-stone-100 active:text-stone-900 focus-visible:ring-white',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-sm font-medium transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50'

type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  href?: never
}

type ButtonAsAnchor = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant
  href: string
}

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

export default function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  const cls = [base, variantStyles[variant], className].filter(Boolean).join(' ')

  if ('href' in rest) {
    return <a className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />
  }

  return <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} />
}
