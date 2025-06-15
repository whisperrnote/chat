'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { UserButton, useUser } from '@civic/auth-web3/react'
import { Navbar } from '@/components/layout/Navbar'
import { useRouter } from 'next/navigation'

export default function LoginClient() {
  // Civic auth
  const { user } = useUser()
  const router = useRouter()

  // Form state (if using custom form instead of Civic)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect logic
  useEffect(() => {
    if (user) {
      router.push('/app')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your login logic here
  }

  // Loading state
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/5 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
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
              Sign In / Sign Up
            </h1>
            <p className="text-text-secondary">
              Sign in or create an account to continue your conversations
            </p>
          </motion.div>

          {/* CHOOSE ONE: Either Civic UserButton OR Custom Form */}
          
          {/* Option 1: Civic Auth */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <UserButton className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200" />
          </motion.div>

          {/* Option 2: Custom Form (remove the UserButton above if using this) */}
          {/* 
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            // ... your form fields here
          </motion.form>
          */}

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