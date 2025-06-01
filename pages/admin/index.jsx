import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/router"
import Link from "next/link"

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setLoading(false)
      } else {
        router.push("/admin/login")
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/admin/login")
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Admin 👋</h1>
            <p className="text-gray-500 mt-1">Halo, {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 transition"
            title="Logout"
          >
            🔒 Logout
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/admin/upload" passHref>
            <div className="bg-blue-100 hover:bg-blue-200 cursor-pointer p-6 rounded-xl shadow text-blue-800 flex items-center gap-4 transition">
              <span className="text-3xl">📤</span>
              <div>
                <h2 className="font-bold text-lg">Upload Produk Excel</h2>
                <p className="text-sm text-blue-700">Import massal dengan gambar otomatis</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/manage" passHref>
            <div className="bg-green-100 hover:bg-green-200 cursor-pointer p-6 rounded-xl shadow text-green-800 flex items-center gap-4 transition">
              <span className="text-3xl">📦</span>
              <div>
                <h2 className="font-bold text-lg">Kelola Produk</h2>
                <p className="text-sm text-green-700">Edit, hapus, atau tambah manual</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
