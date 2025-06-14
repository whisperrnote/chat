'use client'

import { motion } from 'framer-motion'
import Avatar from '../ui/Avatar'
import clsx from 'clsx'

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  avatar: string
  type: 'direct' | 'group'
}

interface ChatListItemProps {
  chat: Chat
  isSelected?: boolean
  onClick?: () => void
}

export default function ChatListItem({ chat, isSelected = false, onClick }: ChatListItemProps) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={clsx(
        'p-4 cursor-pointer transition-all duration-200',
        isSelected && 'bg-primary/10 border-l-4 border-primary'
      )}
    >
      <div className="flex items-center space-x-3">
        <Avatar
          src={chat.avatar}
          alt={chat.name}
          isOnline={chat.type === 'direct' ? chat.isOnline : undefined}
          emoji={chat.type === 'group' ? '👥' : '👤'}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="font-semibold text-gray-900 dark:text-white truncate">
              {chat.name}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {chat.timestamp}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
              {chat.lastMessage}
            </p>
            
            {chat.unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center mt-1 space-x-1">
            <div className="text-xs text-green-500">🔐</div>
            <span className="text-xs text-gray-400">Encrypted</span>
            <div className="text-xs text-blue-500">✓✓</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
