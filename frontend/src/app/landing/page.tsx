import Header from '@/components/Header'

export default function Landing() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-3xl font-bold">Landing</h1>

        <div className="mt-6 px-4 py-2 bg-gray-100 rounded">
          <p>- THE ONLY PART THAT IS MOBILE ACCESSIBLE (responsive)</p>
          <p>- Hero section</p>
          <p>- About Elysian Hair Spa</p>
          <p>- Services overview</p>
          <p>- Price list</p>
          <p>- Gallery & testimonials</p>
          <p>- Contact info</p>
          <p>- Book Now button</p>
          <p>- Login button</p>
        </div>
      </div>
    </>
  )
}