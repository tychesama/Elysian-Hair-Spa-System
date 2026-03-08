'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/landing')
  }, [router])

  return (
    <>
      <Header />
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <p>Redirecting to Landing page...</p>
      </main>
    </>
  )
}