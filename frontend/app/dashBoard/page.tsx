import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '../api/auth/login/route'
import DashBoard from './dashBoard'

export default async function DashBoardPage() {
  const token = (await cookies()).get('token')?.value

  if (!token || !verifyToken(token)) {
    redirect('/connexionPage')
  }
  return <DashBoard />
}