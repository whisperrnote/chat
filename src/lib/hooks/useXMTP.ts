'use client'

import { useState, useEffect } from 'react'
import { Client } from '@xmtp/browser-sdk'
import { createXMTPClient } from '@/lib/xmtp/client'
import { createEOASigner } from '@/lib/xmtp/signer'

export function useXMTP() {
  const [client, setClient] = useState<Client | null>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initializeClient = async (walletAddress: string, signMessage: (message: string) => Promise<string>) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const signer = createEOASigner(walletAddress, signMessage)
      const xmtpClient = await createXMTPClient(signer)
      setClient(xmtpClient)
      
      // Load conversations
      const convos = await xmtpClient.conversations.list(["allowed"])
      setConversations(convos)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize XMTP client')
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (conversationId: string, message: string) => {
    if (!client) return
    
    try {
      const conversation = conversations.find(c => c.id === conversationId)
      if (conversation) {
        await conversation.send(message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    }
  }

  const createConversation = async (peerAddress: string) => {
    if (!client) return
    
    try {
      // Check if peer can receive messages
      const canMessage = await Client.canMessage([peerAddress])
      if (canMessage.get(peerAddress)) {
        const dm = await client.conversations.newDm(peerAddress)
        setConversations(prev => [...prev, dm])
        return dm
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create conversation')
    }
  }

  return {
    client,
    conversations,
    initializeClient,
    sendMessage,
    createConversation,
    isLoading,
    error
  }
}
