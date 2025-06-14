import type { Signer, Identifier } from "@xmtp/browser-sdk"

export function createEOASigner(walletAddress: string, signMessage: (message: string) => Promise<string>): Signer {
  const accountIdentifier: Identifier = {
    identifier: walletAddress,
    identifierKind: "Ethereum",
  }

  return {
    type: "EOA",
    getIdentity: () => accountIdentifier,
    signMessage: async (message: string) => {
      const signature = await signMessage(message)
      return new Uint8Array(Buffer.from(signature.slice(2), 'hex'))
    }
  }
}
