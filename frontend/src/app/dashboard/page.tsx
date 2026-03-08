import Header from '@/components/Header'

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="mt-6 px-4 py-2 bg-gray-100 rounded">
          <p>- Admin only sees this</p>
          <p>- Sales reports (daily, weekly, monthly, custom)</p>
          <p>- Revenue tracking</p>
          <p>- Top services & employee performance</p>
          <p>- Manage services, prices, employees</p>
          <p>- Export reports (PDF/Excel)</p>
          <p>- System settings</p>
        </div>
      </div>
    </>
  )
}