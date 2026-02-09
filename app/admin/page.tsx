'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    // Redirect to login page
    window.location.href = '/admin/login'
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Redirecting to Login...</h2>
        <p className="text-slate-400">Please wait while we redirect you to the secure login page.</p>
      </div>
    </div>
  )
}
