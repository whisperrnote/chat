'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { UserButton, useUser } from '@civic/auth-web3/react'
import { Navbar } from '@/components/layout/Navbar'
import { useRouter } from 'next/navigation'

export default function LoginClient() {
  const { user, isLoading: userLoading } = useUser()
  const router = useRouter()
  const [isSigningIn, setIsSigningIn] = useState(false)

  // Redirect logic
  useEffect(() => {
    if (user && !userLoading) {
      router.push('/app')
    }
  }, [user, userLoading, router])

  const handleSignIn = useCallback(() => {
    console.log("Starting sign-in process");
    setIsSigningIn(true)
    // The UserButton component will handle the actual sign-in
    // Just trigger the UI state
  }, [])

  // Loading state
  if (userLoading || (user && !userLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/5 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
          <span className="ml-3 text-text-secondary">Redirecting...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/5 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-surface rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <Image
              src="/images/logo.webp"
              alt="WhisperrChat"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Welcome Back! 👋
            </h1>
            <p className="text-text-secondary">
              Sign in to continue your conversations
            </p>
          </motion.div>

          {/* Civic Auth Sign In */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {!user && (
              <div className="text-center">
                <UserButton />
              </div>
            )}
            
            {user && (
              <div className="text-center">
                <UserButton />
              </div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-text-secondary text-sm">
              Secure authentication powered by Civic 🔐
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}