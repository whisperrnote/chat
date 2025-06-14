'use client'

import { useUser } from '@civic/auth-web3/react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Navbar() {
  const { user } = useUser()

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-10 p-4 bg-white/10 backdrop-blur-md border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/logo.png"
            alt="WhisperrChat"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            WhisperrChat
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link
            href="/app"
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
          >
            Open App 📱
          </Link>
          <button
            className="px-6 py-2 bg-primary/10 backdrop-blur-md border border-primary/20 text-primary font-semibold rounded-full hover:bg-primary/20 transition-all duration-300"
          >
            Civic Login 🔐
          </button>
          {user && (
            <span className="ml-4 text-gray-700 dark:text-gray-200 font-medium">
              Hello {user.name || user.email || user.id}!
            </span>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
