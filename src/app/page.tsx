import { redirect } from 'next/navigation'
import PageClient from './pageClient'

export default function HomePage() {
  // TODO: Check if user is authenticated (implement with Appwrite auth)
  const isAuthenticated = true // Replace with actual auth check
  
  if (isAuthenticated) {
    redirect('/dashboard')
  }

  return <PageClient />
}
