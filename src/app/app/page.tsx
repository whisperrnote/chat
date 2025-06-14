import DashboardClient from './dashboardClient'
import { getUser } from '@/lib/server/user'

export default async function AppPage() {
  const user = await getUser()

  // You can pass user to DashboardClient or handle auth logic here in the future
  // For now, just render the dashboard as usual

  return <DashboardClient />
}
