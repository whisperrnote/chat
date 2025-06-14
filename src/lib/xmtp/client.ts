import { Client, type Signer } from "@xmtp/browser-sdk"

export async function createXMTPClient(signer: Signer) {
  const client = await Client.create(signer, {
    env: process.env.NODE_ENV === 'production' ? 'production' : 'dev'
  })
  return client
}

export async function buildXMTPClient(identifier: any) {
  const client = await Client.build(identifier, {
    env: process.env.NODE_ENV === 'production' ? 'production' : 'dev'
  })
  return client
}

// Helper function to create a signer from wallet
export function createSigner(address: string, signMessage: (message: string) => Promise<string>): Signer {
  return {
    type: "EOA",
    getIdentity: () => ({
      identifier: address,
      identifierKind: "Ethereum"
    }),
    signMessage: async (message: string) => {
      const signature = await signMessage(message)
      return new Uint8Array(Buffer.from(signature.slice(2), 'hex'))
    }
  }
}
