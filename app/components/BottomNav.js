'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Home', emoji: '🏠' },
  { href: '/task', label: 'Task', emoji: '💼' },
  { href: '/shares', label: 'Shares', emoji: '📈' },
  { href: '/my', label: 'My', emoji: '👤' },
  { href: '/settings', label: 'Settings', emoji: '⚙️' },
]

export default function BottomNav() {
  const pathname = usePathname()

  const hideOn = ['/login', '/register', '/', '/forgot-password']
  if (hideOn.includes(pathname)) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '75px',
      background: '#0f172a',
      borderTop: '1px solid rgba(207,168,91,0.3)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 1000,
      paddingBottom: '8px'
    }}>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: isActive ? '#FDE68A' : 'rgba(255,255,255,0.6)',
              fontSize: '11px',
              fontWeight: isActive ? '800' : '500',
              gap: '3px',
              flex: 1
            }}
          >
            <span style={{ fontSize: '22px', filter: isActive ? 'drop-shadow(0 0 8px #FDE68A)' : 'none' }}>
              {item.emoji}
            </span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}