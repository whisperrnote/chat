'use client'

import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import { motion } from 'framer-motion'

export default function DashboardClient() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  return (
    <AppShell>
      {selectedChat ? (
        <div className="h-full flex flex-col">
          {/* Chat Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                👤
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Sarah Wilson</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Online • 🔐 Encrypted</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="space-y-4">
              {/* Mock messages */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex"
              >
                <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs shadow-sm">
                  <p className="text-gray-900 dark:text-white">Hey! How secure is this app? 🤔</p>
                  <p className="text-xs text-gray-500 mt-1">2:30 PM ✓✓</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-end"
              >
                <div className="bg-primary rounded-2xl rounded-br-md px-4 py-3 max-w-xs shadow-sm">
                  <p className="text-white">Military-grade encryption + blockchain security! 🛡️</p>
                  <p className="text-xs text-white/70 mt-1">2:31 PM ✓✓</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Type a message... 💬"
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                📤
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to WhisperrChat
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Select a chat from the sidebar to start your secure conversation, or create a new one.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                ✨ Start New Chat
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                👥 Add Contacts
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AppShell>
  )
}
