import { Client, type Signer } from "@xmtp/browser-sdk"

export async function createXMTPClient(signer: Signer) {
  const client = await Client.create(signer, {
    env: process.env.NEXT_PUBLIC_XMTP_ENV === 'production' ? 'production' : 'dev'
  })
  return client
}

export async function buildXMTPClient(identifier: any) {
  const client = await Client.build(identifier, {
    env: process.env.NEXT_PUBLIC_XMTP_ENV === 'production' ? 'production' : 'dev'
  })
  return client
}
