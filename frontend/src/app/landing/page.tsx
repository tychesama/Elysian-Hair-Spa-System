'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'

type Service = {
  id: number
  name: string
  category: string
  price: string
  description: string
}

export default function LandingPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/api/services/')
      .then(res => res.json())
      .then(data => {
        setServices(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Group services by category
  const grouped = services.reduce<Record<string, Service[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <main style={{ background: 'var(--bg-main)', minHeight: '100dvh' }}>
      <Header />

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(160deg, var(--champagne) 0%, var(--pearl) 60%, var(--bg-main) 100%)',
        padding: '5rem 2rem 4rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--border)',
      }}>
        <p className="eyebrow animate-fade-in" style={{ marginBottom: '1rem' }}>
          Welcome to
        </p>
        <h1 className="display-text animate-fade-up" style={{ marginBottom: '1rem' }}>
          Elysian Hair Spa
        </h1>
        <p className="lead animate-fade-up delay-2" style={{
          maxWidth: '520px',
          margin: '0 auto 2rem',
        }}>
          Professional hair, nail, skin &amp; beauty services — crafted with care.
        </p>
        <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-accent btn-lg">Book an Appointment</button>
          <button className="btn btn-outline btn-lg">View Services</button>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '4rem 2rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="eyebrow">What We Offer</p>
          <h2 style={{ marginTop: '0.5rem' }}>Our Services</h2>
          <p className="lead" style={{ maxWidth: '480px', margin: '0.75rem auto 0' }}>
            Browse our full menu of treatments and find your perfect look.
          </p>
        </div>

        {loading && (
          <p style={{ textAlign: 'center', color: 'var(--text-subtle)' }}>Loading services…</p>
        )}

        {!loading && services.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ marginBottom: '0.5rem' }}>No services added yet.</p>
            <a
              href="http://localhost:8000/api/services/"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.85rem' }}
            >
              Add one via the Django API →
            </a>
          </div>
        )}

        {/* Grouped by category */}
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '3rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.25rem',
            }}>
              <span className="badge badge-lavender">{category}</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
            }}>
              {items.map((s, i) => (
                <div
                  key={s.id}
                  className={`card animate-fade-up delay-${Math.min(i + 1, 5)}`}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{s.name}</h4>
                    <span style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontStyle: 'italic',
                      fontSize: '1.2rem',
                      color: 'var(--lavender-deep)',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      marginLeft: '1rem',
                    }}>
                      ₱{parseFloat(s.price).toLocaleString()}
                    </span>
                  </div>
                  {s.description && (
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>{s.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Footer (temp) ── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        background: 'var(--bg-section)',
      }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', margin: 0 }}>
          © {new Date().getFullYear()} Elysian Hair Spa. All rights reserved.
        </p>
      </footer>
    </main>
  )
}