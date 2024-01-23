import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Session, getServerSession } from "next-auth"

type ExtendedServerSession = Session & {
  uid: string
} | null

// to get uid from server side

export default async function serverUid() {
  const session: ExtendedServerSession = await getServerSession(authOptions)
  
  return session?.uid
}
