'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HiShieldCheck, HiGlobeAlt, HiLockClosed, HiUserGroup } from 'react-icons/hi'
import { Navbar } from '@/components/layout/Navbar'

export default function PageClient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: <HiLockClosed className="w-8 h-8" />,
      title: "End-to-End Encryption",
      description: "Military-grade encryption ensures your messages stay private",
      emoji: "🔐"
    },
    {
      icon: <HiGlobeAlt className="w-8 h-8" />,
      title: "Decentralized Network",
      description: "No central servers, no single point of failure",
      emoji: "🌐"
    },
    {
      icon: <HiShieldCheck className="w-8 h-8" />,
      title: "Blockchain Security",
      description: "Immutable message integrity powered by blockchain",
      emoji: "⛓️"
    },
    {
      icon: <HiUserGroup className="w-8 h-8" />,
      title: "Own Your Data",
      description: "Complete control over your conversations and privacy",
      emoji: "👥"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: mousePosition.x * 0.1,
            y: mousePosition.y * 0.1,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            x: mousePosition.x * -0.08,
            y: mousePosition.y * -0.08,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 25 }}
          style={{ right: '10%', bottom: '20%' }}
        />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
              <span className="text-2xl">🔐</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Chat in whispers, secured by the blockchain
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
          >
            The Future of
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Private Messaging
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience truly secure conversations with military-grade encryption,
            decentralized architecture, and blockchain-powered message integrity.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/app"
              className="group relative px-8 py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">Start Chatting Now ✨</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              Create Account 📝
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Chat Preview */}
              <div className="lg:col-span-2">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 h-96 border border-white/10">
                  <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      👤
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Sarah Wilson</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Online • 🔐 Encrypted</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="flex"
                    >
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
                        <p className="text-gray-900 dark:text-white">Hey! How secure is this app? 🤔</p>
                        <p className="text-xs text-gray-500 mt-1">2:30 PM ✓✓</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="flex justify-end"
                    >
                      <div className="bg-primary rounded-2xl rounded-br-md px-4 py-3 max-w-xs">
                        <p className="text-white">Military-grade encryption + blockchain security! 🛡️</p>
                        <p className="text-xs text-white/70 mt-1">2:31 PM ✓✓</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      className="flex"
                    >
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
                        <p className="text-gray-900 dark:text-white">Amazing! No more privacy worries 🎉</p>
                        <p className="text-xs text-gray-500 mt-1">2:32 PM ✓✓</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  What makes us different?
                </h3>
                
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{feature.emoji}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Built for <span className="text-primary">Privacy</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every feature designed with your security and privacy in mind
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🔐", title: "Zero-Knowledge", desc: "We can't read your messages even if we wanted to" },
            { icon: "⚡", title: "Lightning Fast", desc: "Real-time messaging without compromising security" },
            { icon: "🌍", title: "Global Network", desc: "Decentralized nodes across the world" },
            { icon: "🛡️", title: "Quantum-Resistant", desc: "Future-proof encryption algorithms" },
            { icon: "📱", title: "Cross-Platform", desc: "Works seamlessly on all your devices" },
            { icon: "🔄", title: "Auto-Backup", desc: "Encrypted backups you control" },
            { icon: "👥", title: "Group Chats", desc: "Secure group conversations up to 1000 members" },
            { icon: "🎨", title: "Beautiful UI", desc: "Modern, intuitive design you'll love" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to take back your privacy?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who've already made the switch to truly secure messaging.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/app"
              className="px-8 py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Try WhisperrChat Now 🚀
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Image
              src="/images/logo.png"
              alt="WhisperrChat"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              WhisperrChat
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-center">
            © 2024 WhisperrChat. Chat in whispers, secured by the blockchain.
          </p>
        </div>
      </footer>
    </div>
  )
}
        






