import Header from '@/components/Header'
export default function Landing() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-3xl font-bold">Landing</h1>

        <div className="mt-6 px-4 py-2 bg-gray-100 rounded">
          - THE ONLY PART THAT IS MOBILE ACCESSIBLE(responsive)
          - Hero section
          - About Elysian Hair Spa
          - Services overview
          - Price list
          - Gallery & testimonials
          - Contact info
          - Book Now button
          - Login button
        </div>
      </div>
    </>
  )
}