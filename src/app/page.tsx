import PageClient from './pageClient'

export default function HomePage() {
  return <PageClient />
}
  const isAuthenticated = true // Replace with actual auth check
  
  if (isAuthenticated) {
    redirect('/')
  }

  return <PageClient />
}
