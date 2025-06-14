import { redirect } from 'next/navigation'
import HomeClient from './homeClient'

export default function HomePage() {
  // Check if user is authenticated (you'll implement this logic)
  const isAuthenticated = false // Replace with actual auth check
  
  if (isAuthenticated) {
    redirect('/dashboard')
  } else {
    redirect('/auth/login')
  }

  return <HomeClient />
}
