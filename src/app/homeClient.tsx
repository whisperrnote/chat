'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/5 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <Image
            src="/images/logo.png"
            alt="WhisperrChat Logo"
            width={120}
            height={120}
            className="mx-auto mb-6"
          />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          WhisperrChat 🔐
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8"
        >
          Chat in whispers, secured by the blockchain.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <Link
            href="/auth/login"
            className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Get Started 🚀
          </Link>
          
          <Link
            href="/auth/register"
            className="block w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Create Account ✨
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
