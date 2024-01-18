import { auth } from '@/app/firebase'
import { signOut as signOutFirebase } from 'firebase/auth'
import { signOut } from 'next-auth/react'

const signOutNextAuthFirebase = () => {
  signOutFirebase(auth)
    .then(() => {
      // executed if firebase sign out was successful
      // sign out next auth
      signOut()
    })
    .catch((error) => {
      // executed if firebase sign out was not successful
      console.log(error)
    })
}

export { signOutNextAuthFirebase }
