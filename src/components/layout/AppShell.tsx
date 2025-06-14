'use client'

import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import clsx from 'clsx'

interface AppShellProps {
  children: ReactNode
  showSidebar?: boolean
}

export default function AppShell({ children, showSidebar = true }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {showSidebar && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={clsx(
            'flex-shrink-0 transition-all duration-300',
            isSidebarCollapsed ? 'w-16' : 'w-80 lg:w-96'
          )}
        >
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </motion.div>
      )}
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 flex flex-col overflow-hidden"
      >
        {children}
      </motion.main>
    </div>
  )
}
