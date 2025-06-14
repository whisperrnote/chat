'use client'

import { useState, useEffect, useCallback } from 'react'
import { Client } from '@xmtp/browser-sdk'
import { createXMTPClient, createSigner } from '@/lib/xmtp/client'

interface XMTPConversation {
  id: string
  topic: string
  name?: string
  isGroup: boolean
  lastMessage?: any
  members?: string[]
}

interface XMTPMessage {
  id: string
  content: string
  sender: string
  timestamp: Date
  conversationId: string
}

export function useXMTP() {
  const [client, setClient] = useState<Client | null>(null)
  const [conversations, setConversations] = useState<XMTPConversation[]>([])
  const [messages, setMessages] = useState<Record<string, XMTPMessage[]>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initializeClient = useCallback(async (walletAddress: string, signMessage: (message: string) => Promise<string>) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const signer = createSigner(walletAddress, signMessage)
      const xmtpClient = await createXMTPClient(signer)
      setClient(xmtpClient)
      
      // Load existing conversations
      await loadConversations(xmtpClient)
      
      // Start streaming new conversations and messages
      startStreaming(xmtpClient)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize XMTP client')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadConversations = useCallback(async (xmtpClient: Client) => {
    try {
      const allConversations = await xmtpClient.conversations.list(['allowed'])
      
      const formattedConversations: XMTPConversation[] = allConversations.map(conv => ({
        id: conv.id,
        topic: conv.topic,
        isGroup: conv.type === 'group',
        name: conv.type === 'group' ? (conv as any).name : undefined,
        members: conv.type === 'group' ? (conv as any).members?.map((m: any) => m.inboxId) : undefined
      }))
      
      setConversations(formattedConversations)
      
      // Load messages for each conversation
      for (const conv of allConversations) {
        const messages = await conv.messages()
        const formattedMessages: XMTPMessage[] = messages.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender: msg.senderInboxId,
          timestamp: msg.sentAt,
          conversationId: conv.id
        }))
        
        setMessages(prev => ({
          ...prev,
          [conv.id]: formattedMessages.reverse() // Show newest first
        }))
      }
    } catch (err) {
      console.error('Failed to load conversations:', err)
    }
  }, [])

  const startStreaming = useCallback(async (xmtpClient: Client) => {
    try {
      // Stream new conversations
      const conversationStream = await xmtpClient.conversations.stream()
      
      for await (const conversation of conversationStream) {
        const newConv: XMTPConversation = {
          id: conversation.id,
          topic: conversation.topic,
          isGroup: conversation.type === 'group',
          name: conversation.type === 'group' ? (conversation as any).name : undefined,
          members: conversation.type === 'group' ? (conversation as any).members?.map((m: any) => m.inboxId) : undefined
        }
        
        setConversations(prev => [newConv, ...prev])
      }
    } catch (err) {
      console.error('Conversation streaming error:', err)
    }

    try {
      // Stream new messages
      const messageStream = await xmtpClient.conversations.streamAllMessages(['allowed'])
      
      for await (const message of messageStream) {
        const newMessage: XMTPMessage = {
          id: message.id,
          content: message.content,
          sender: message.senderInboxId,
          timestamp: message.sentAt,
          conversationId: message.conversationId
        }
        
        setMessages(prev => ({
          ...prev,
          [message.conversationId]: [...(prev[message.conversationId] || []), newMessage]
        }))
      }
    } catch (err) {
      console.error('Message streaming error:', err)
    }
  }, [])

  const sendMessage = useCallback(async (conversationId: string, content: string) => {
    if (!client) return false
    
    try {
      const conversation = await client.conversations.getConversationById(conversationId)
      if (!conversation) return false
      
      await conversation.send(content)
      return true
    } catch (err) {
      console.error('Failed to send message:', err)
      return false
    }
  }, [client])

  const createConversation = useCallback(async (identifiers: string[], isGroup = false) => {
    if (!client) return null
    
    try {
      let conversation
      
      if (isGroup) {
        conversation = await client.conversations.newGroup(identifiers)
      } else {
        // For DM, use first identifier
        conversation = await client.conversations.newDm(identifiers[0])
      }
      
      const newConv: XMTPConversation = {
        id: conversation.id,
        topic: conversation.topic,
        isGroup: conversation.type === 'group',
        name: conversation.type === 'group' ? (conversation as any).name : undefined,
        members: conversation.type === 'group' ? (conversation as any).members?.map((m: any) => m.inboxId) : undefined
      }
      
      setConversations(prev => [newConv, ...prev])
      return conversation.id
    } catch (err) {
      console.error('Failed to create conversation:', err)
      return null
    }
  }, [client])

  const checkCanMessage = useCallback(async (identifiers: string[]) => {
    if (!client) return {}
    
    try {
      return await Client.canMessage(identifiers)
    } catch (err) {
      console.error('Failed to check can message:', err)
      return {}
    }
  }, [client])

  return {
    client,
    conversations,
    messages,
    initializeClient,
    sendMessage,
    createConversation,
    checkCanMessage,
    isLoading,
    error
  }
}
