'use client'

import { useState, useEffect } from 'react'
import { Client } from '@xmtp/browser-sdk'
import { createXMTPClient } from '@/lib/xmtp/client'

export function useXMTP() {
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initializeClient = async (signer: any) => {
    try {
      setIsLoading(true)
      setError(null)
      const xmtpClient = await createXMTPClient(signer)
      setClient(xmtpClient)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize XMTP client')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    client,
    initializeClient,
    isLoading,
    error
  }
}
