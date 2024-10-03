import ForumList from '@/components/ForumList';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';

const forums = [
  { id: 1, name: 'Discussion Forum 1' },
  { id: 2, name: 'Discussion Forum 2' },
  { id: 3, name: 'Discussion Forum 3' },
];
export default function App() {
    return (
      <Authenticator loginMechanisms={['email']}>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>
            <div>
              <h1>Discussion Forums</h1>
              <ForumList forums={forums} />
            </div>
          </main>
        )}
      </Authenticator>
    );
  }