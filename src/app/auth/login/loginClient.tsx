'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { UserButton, useUser } from '@civic/auth-web3/react'
import { Navbar } from '@/components/layout/Navbar'
import { useRouter } from 'next/navigation'

export default function LoginClient() {
  const { user } = useUser()
  const router = useRouter()

  // Redirect to app if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/app')
    }
  }, [user, router])

  // Show loading if user is logged in (while redirecting)
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

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <UserButton className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200" />
          </motion.div>

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
      
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-surface rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
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

          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email 📧
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-surface"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password 🔒
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white dark:bg-surface"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-border" />
                <span className="ml-2 text-sm text-text-secondary">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Signing in...
                </span>
              ) : (
                'Sign In 🚀'
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            {/* No register link here */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

