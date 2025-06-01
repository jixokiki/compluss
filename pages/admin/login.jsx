// pages/admin/login.js

import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import Image from "next/image"

export default function LoginAdmin() {
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin")
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push("/admin")
    } catch (err) {
      setError("Gagal login dengan Google.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Login Admin</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full border border-gray-300 py-3 px-4 rounded hover:shadow transition bg-white"
        >
          <Image
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
          />
          <span className="text-sm font-medium text-gray-700">Masuk dengan Google</span>
        </button>
      </div>
    </div>
  )
}
