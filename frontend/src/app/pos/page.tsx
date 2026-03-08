import Header from '@/components/Header'

export default function PointOfSale() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-3xl font-bold">PointOfSale</h1>

        <div className="mt-6 px-4 py-2 bg-gray-100 rounded">
          <p>- Create transactions</p>
          <p>- Add services/products</p>
          <p>- Apply discounts</p>
          <p>- Payment methods: Cash / GCash / Card</p>
          <p>- Generate receipts</p>
          <p>- Daily sales summary</p>
          <p>- Transaction history</p>
        </div>
      </div>
    </>
  )
}