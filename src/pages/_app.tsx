import type { AppProps } from 'next/app'
import { Amplify } from "aws-amplify"
import Auth from '@aws-amplify/auth';
Amplify.configure({
  Auth: {
    Cognito: {
    userPoolId: 'us-west-1_r6XrVp8vd',
    userPoolClientId: '7mg0luf3jqkdk5ts1ld4fgb2p6',
  }
},
})
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}