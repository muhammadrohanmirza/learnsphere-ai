'use client'

import { useEffect } from 'react'

export default function SuppressConsoleErrors() {
  useEffect(() => {
    const originalError = console.error
    console.error = (...args: any[]) => {
      const msg = args[0]?.toString() || ''
      if (
        msg.includes('CLIENT_FETCH_ERROR') ||
        msg.includes('/api/auth/session') ||
        msg.includes('401 (Unauthorized)') ||
        msg.includes('Unauthorized')
      ) {
        return // Suppress NextAuth 401 log
      }
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return null
}
