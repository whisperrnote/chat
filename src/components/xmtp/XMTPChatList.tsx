'use client'

import { motion } from 'framer-motion'
import Avatar from '../ui/Avatar'
import { useXMTP } from '@/lib/hooks/useXMTP'

interface XMTPChatListProps {
  searchQuery: string
  onChatSelect: (conversationId: string) => void
  selectedChatId?: string
}

export default function XMTPChatList({ searchQuery, onChatSelect, selectedChatId }: XMTPChatListProps) {
  const { conversations, messages } = useXMTP()

  const filteredConversations = conversations.filter(conv =>
    conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (filteredConversations.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <div className="text-4xl mb-4">💬</div>
        <p className="text-lg font-medium mb-2">No XMTP chats found</p>
        <p className="text-sm">Create a new conversation to get started</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {filteredConversations.map((conversation, index) => {
        const lastMessage = messages[conversation.id]?.[messages[conversation.id]?.length - 1]
        const isSelected = selectedChatId === conversation.id
        
        return (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onChatSelect(conversation.id)}
            className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
              isSelected ? 'bg-primary/10 border-l-4 border-primary' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <Avatar
                src={undefined}
                alt={conversation.name || conversation.id}
                emoji={conversation.isGroup ? '👥' : '👤'}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {conversation.isGroup 
                      ? (conversation.name || `Group ${conversation.id.slice(0, 8)}`)
                      : `DM ${conversation.id.slice(0, 8)}`
                    }
                  </p>
                  {lastMessage && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {lastMessage.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
                    {lastMessage?.content || 'No messages yet'}
                  </p>
                </div>
                
                <div className="flex items-center mt-1 space-x-1">
                  <div className="text-xs text-green-500">🔐</div>
                  <span className="text-xs text-gray-400">XMTP Encrypted</span>
                  <div className="text-xs text-blue-500">⛓️</div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
