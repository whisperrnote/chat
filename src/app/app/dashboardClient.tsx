'use client'

import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { useXMTP } from '@/lib/hooks/useXMTP'
import XMTPChatWindow from '@/components/xmtp/XMTPChatWindow'

export default function DashboardClient() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [isXMTPEnabled, setIsXMTPEnabled] = useState(false)
  
  const { client, initializeClient, isLoading, error } = useXMTP()

  const handleEnableXMTP = async () => {
    try {
      // Mock wallet connection - in real app, use actual wallet
      const mockWalletAddress = "0x1234567890123456789012345678901234567890"
      const mockSignMessage = async (message: string) => {
        // In real app, use actual wallet signing
        return "0x" + "0".repeat(130) // Mock signature
      }
      
      await initializeClient(mockWalletAddress, mockSignMessage)
      setIsXMTPEnabled(true)
    } catch (err) {
      console.error('Failed to enable XMTP:', err)
    }
  }

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId)
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <AppShell>
          <div className="h-full flex">
            {/* Sidebar with XMTP integration */}
            <div className="w-80 lg:w-96 flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
              {/* Mock Sidebar Component - replace with actual Sidebar */}
              <div className="h-full bg-white dark:bg-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    WhisperrChat
                  </h2>
                  {!isXMTPEnabled && (
                    <button
                      onClick={handleEnableXMTP}
                      disabled={isLoading}
                      className="mt-2 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Connecting...' : 'Enable XMTP 🔐'}
                    </button>
                  )}
                  {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                  )}
                </div>

                {isXMTPEnabled && client && (
                  <div className="flex-1 overflow-y-auto">
                    {/* Chat list would go here */}
                    <div className="p-4 text-center text-gray-500">
                      <p>XMTP Connected! 🎉</p>
                      <p className="text-sm mt-1">Chat functionality ready</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1">
              {selectedChatId && isXMTPEnabled ? (
                <XMTPChatWindow conversationId={selectedChatId} />
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
                      {!isXMTPEnabled 
                        ? 'Enable XMTP to start your secure conversations'
                        : 'Select a chat from the sidebar to start your secure conversation, or create a new one.'
                      }
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {!isXMTPEnabled ? (
                        <button 
                          onClick={handleEnableXMTP}
                          disabled={isLoading}
                          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                          {isLoading ? 'Connecting...' : '🔐 Enable XMTP'}
                        </button>
                      ) : (
                        <>
                          <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                            ✨ Start New Chat
                          </button>
                          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            👥 Add Contacts
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </AppShell>
      </div>
    </div>
  )
}
//       </div>
//     </div>
//   )
// }

// Mock data for non-XMTP mode
const mockChats = [
  { id: '1', name: 'Alice Johnson', lastMessage: 'Hey there!' },
  { id: '2', name: 'Bob Smith', lastMessage: 'See you tomorrow' },
  { id: '3', name: 'Carol Davis', lastMessage: 'Thanks for the help' }
]
