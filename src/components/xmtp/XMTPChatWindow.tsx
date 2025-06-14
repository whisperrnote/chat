'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useXMTP } from '@/lib/hooks/useXMTP'

interface XMTPChatWindowProps {
  conversationId: string
}

export default function XMTPChatWindow({ conversationId }: XMTPChatWindowProps) {
  const { conversations, messages, sendMessage, client } = useXMTP()
  const [messageInput, setMessageInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  const conversation = conversations.find(c => c.id === conversationId)
  const chatMessages = messages[conversationId] || []

  const handleSendMessage = async () => {
    if (!messageInput.trim() || isSending || !client) return

    setIsSending(true)
    const success = await sendMessage(conversationId, messageInput)
    
    if (success) {
      setMessageInput('')
    }
    setIsSending(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Conversation not found</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            {conversation.isGroup ? '👥' : '👤'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {conversation.isGroup 
                ? (conversation.name || `Group ${conversation.id.slice(0, 8)}`)
                : `DM ${conversation.id.slice(0, 8)}`
              }
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {conversation.isGroup ? `${conversation.members?.length || 0} members` : 'Direct Message'} • 🔐 XMTP Encrypted
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              <div className="text-4xl mb-4">💬</div>
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            chatMessages.map((message, index) => {
              const isOwn = message.sender === client?.inboxId
              
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    isOwn 
                      ? 'bg-primary text-white rounded-br-md' 
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
                  } shadow-sm`}>
                    <p className="break-words">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      isOwn ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })} ✓✓
                    </p>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message... 💬"
            disabled={isSending}
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!messageInput.trim() || isSending}
            className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? '⏳' : '📤'}
          </button>
        </div>
      </div>
    </div>
  )
}
