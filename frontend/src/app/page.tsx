'use client'
import { useEffect, useState } from 'react'

type Service = {
  id: number
  name: string
  category: string
  price: string
  description: string
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/api/services/')
      .then(res => res.json())
      .then(data => setServices(data))
  }, [])

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Elysian Hair Spa — Services</h1>
      {services.length === 0 && <p>No services yet. Add one via the Django API. localhost:8000/api/services/</p>}
      <ul>
        {services.map(s => (
          <li key={s.id}>
            <strong>{s.name}</strong> — {s.category} — ₱{s.price}
            {s.description && <p>{s.description}</p>}
          </li>
        ))}
      </ul>
    </main>
  )
}