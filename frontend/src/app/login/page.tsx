import Header from '@/components/Header'

export default function Login() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-3xl font-bold">Login</h1>

        <div className="mt-6 px-4 py-2 bg-gray-100 rounded">
          <p>- Login / Logout</p>
          <p>- Role-based access</p>
          <p>- JWT tokens</p>
          <p>- Password encryption</p>
          <p>- Session management</p>
        </div>
      </div>
    </>
  )
}