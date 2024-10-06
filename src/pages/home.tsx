import ForumList from '@/components/ForumList';
import Navbar from '@/components/Navbar';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();

  return (
    <Authenticator loginMechanisms={['email']} signUpAttributes={['preferred_username']}>
      {({ signOut, user }) => (
        <main>
          <Navbar signOut={signOut} />

          <div>
            <ForumList />
          </div>
        </main>
      )}
    </Authenticator>
  );
}
