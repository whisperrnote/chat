'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { HiSearch, HiDotsVertical, HiChatAlt2, HiUsers, HiCog } from 'react-icons/hi'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import ChatList from '../chat/ChatList'
import XMTPChatList from '../xmtp/XMTPChatList'
import { useXMTP } from '@/lib/hooks/useXMTP'
import clsx from 'clsx'

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  onChatSelect?: (chatId: string) => void
  selectedChatId?: string
  xmtpEnabled?: boolean
}

export default function Sidebar({ 
  isCollapsed, 
  onToggleCollapse, 
  onChatSelect, 
  selectedChatId,
  xmtpEnabled = false 
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'xmtp'>('chats')
  const { client, isLoading } = useXMTP()

  if (isCollapsed) {
    return (
      <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 space-y-4">
        <button onClick={onToggleCollapse} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <Image src="/images/logo.png" alt="WhisperrChat" width={32} height={32} />
        </button>
        
        <div className="flex flex-col space-y-2">
          <button 
            onClick={() => setActiveTab('chats')}
            className={clsx(
              "p-3 rounded-lg transition-colors",
              activeTab === 'chats' ? "bg-primary/20 text-primary" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <HiChatAlt2 size={20} />
          </button>
          {xmtpEnabled && (
            <button 
              onClick={() => setActiveTab('xmtp')}
              className={clsx(
                "p-3 rounded-lg transition-colors",
                activeTab === 'xmtp' ? "bg-primary/20 text-primary" : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              ⛓️
            </button>
          )}
          <button 
            onClick={() => setActiveTab('contacts')}
            className={clsx(
              "p-3 rounded-lg transition-colors",
              activeTab === 'contacts' ? "bg-primary/20 text-primary" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <HiUsers size={20} />
          </button>
          <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <HiCog size={20} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Image src="/images/logo.png" alt="WhisperrChat" width={32} height={32} />
            <span className="font-bold text-lg text-gray-900 dark:text-white">WhisperrChat</span>
          </div>
          <button 
            onClick={onToggleCollapse}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <HiDotsVertical size={20} />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar src="/api/placeholder/40/40" alt="You" isOnline emoji="👤" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white truncate">Your Name</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {xmtpEnabled && client ? '🔐 XMTP Connected' : 'Online'}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('chats')}
            className={clsx(
              'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'chats'
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            💬 Chats
          </button>
          {xmtpEnabled && (
            <button
              onClick={() => setActiveTab('xmtp')}
              className={clsx(
                'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200',
                activeTab === 'xmtp'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              ⛓️ XMTP
            </button>
          )}
          <button
            onClick={() => setActiveTab('contacts')}
            className={clsx(
              'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'contacts'
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            👥 Contacts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'chats' && (
          <ChatList searchQuery={searchQuery} />
        )}
        {activeTab === 'xmtp' && xmtpEnabled && (
          <>
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Loading XMTP...</p>
              </div>
            ) : (
              <XMTPChatList 
                searchQuery={searchQuery} 
                onChatSelect={onChatSelect || (() => {})}
                selectedChatId={selectedChatId}
              />
            )}
          </>
        )}
        {activeTab === 'contacts' && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            <HiUsers size={48} className="mx-auto mb-4 opacity-50" />
            <p>Contacts coming soon...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="primary" className="w-full" onClick={() => {}}>
          ✨ New Chat
        </Button>
      </div>
    </div>
  )
}
