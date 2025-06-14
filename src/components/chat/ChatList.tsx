'use client'

import { motion } from 'framer-motion'
import ChatListItem from './ChatListItem'

interface ChatListProps {
  searchQuery: string
}

// Mock data - replace with real data from Appwrite
const mockChats = [
  {
    id: '1',
    name: 'Sarah Wilson',
    lastMessage: 'Hey! How secure is this app? 🤔',
    timestamp: '2:30 PM',
    unreadCount: 2,
    isOnline: true,
    avatar: '/api/placeholder/40/40',
    type: 'direct' as const
  },
  {
    id: '2',
    name: 'Development Team',
    lastMessage: 'The new encryption update is ready! 🛡️',
    timestamp: '1:45 PM',
    unreadCount: 0,
    isOnline: false,
    avatar: '/api/placeholder/40/40',
    type: 'group' as const
  },
  {
    id: '3',
    name: 'Alex Chen',
    lastMessage: 'Thanks for the blockchain explanation',
    timestamp: '12:20 PM',
    unreadCount: 0,
    isOnline: true,
    avatar: '/api/placeholder/40/40',
    type: 'direct' as const
  }
]

export default function ChatList({ searchQuery }: ChatListProps) {
  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {filteredChats.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-4">💬</div>
          <p className="text-lg font-medium mb-2">No chats found</p>
          <p className="text-sm">Start a new conversation to get started</p>
        </div>
      ) : (
        filteredChats.map((chat, index) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChatListItem chat={chat} />
          </motion.div>
        ))
      )}
    </div>
  )
}
