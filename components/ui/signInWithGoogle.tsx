"use client"

import { signIn } from "next-auth/react"

export default function SignInWithGoogle() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full border border-gray-300 p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
    >
      Sign in with Google
    </button>
  )
}