import { auth } from '@/app/firebase'
import { Button } from '@/components/ui/button'
import { signOut } from 'firebase/auth'

export default function SignOut() {
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign out successful')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return <Button onClick={handleSignout}>Sign out</Button>
}
