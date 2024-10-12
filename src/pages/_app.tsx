import type { AppProps } from 'next/app'
import { Amplify } from "aws-amplify"
import {NextUIProvider} from '@nextui-org/react'
import '../styles/global.css'
import { UserProvider } from '@/components/UserContext'
import { Authenticator } from '@aws-amplify/ui-react'
import Navbar from '@/components/CustomNavbar';

Amplify.configure({
  Auth: {
    Cognito: {
    userPoolId: 'us-west-1_y8zDAy7sB',
    userPoolClientId: '5etu9t1nrtehlr5d66tneu7l63',
  }
},
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Authenticator loginMechanisms={['email']} signUpAttributes={['preferred_username']}>
      {({ signOut, user }) => (
        <UserProvider user={user}>
          <NextUIProvider>
            <main>
              <Navbar signOut={signOut} />
              <Component {...pageProps} />
            </main>
          </NextUIProvider>
        </UserProvider>
        
      )}
    </Authenticator>
    
  )
}