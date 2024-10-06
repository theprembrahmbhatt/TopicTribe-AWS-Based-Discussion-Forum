import type { AppProps } from 'next/app'
import { Amplify } from "aws-amplify"
Amplify.configure({
  Auth: {
    Cognito: {
    userPoolId: 'us-west-1_y8zDAy7sB',
    userPoolClientId: '5etu9t1nrtehlr5d66tneu7l63',
  }
},
})
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}