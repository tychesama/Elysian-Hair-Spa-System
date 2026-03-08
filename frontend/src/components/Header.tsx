'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const linkStyle = (path: string) => ({
    marginRight: '1rem',
    fontWeight: pathname === path ? 'bold' : 'normal',
  })

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        gap: '1rem',
      }}
    >
      <Link href="/landing" style={linkStyle('/landing')}>
        Landing
      </Link>

      <Link href="/dashboard" style={linkStyle('/dashboard')}>
        Dashboard
      </Link>

      <Link href="/pos" style={linkStyle('/pos')}>
        POS
      </Link>

      <Link href="/login" style={linkStyle('/login')}>
        Login
      </Link>
    </nav>
  )
}