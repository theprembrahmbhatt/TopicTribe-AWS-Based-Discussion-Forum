import ForumList from '@/components/ForumList';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router';
const forums = [
  { id: 1, name: 'Discussion Forum 1' },
  { id: 2, name: 'Discussion Forum 2' },
  { id: 3, name: 'Discussion Forum 3' },
];

export default function App() {
  const router = useRouter();

  return (
    <Authenticator loginMechanisms={['email']} signUpAttributes={['preferred_username']}>
      {({ signOut, user }) => (
        <main>
          <header
            style={{ backgroundColor: "#005566", color: "#fff", padding: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push("/home");
                }}
              >
                TopicTribe
              </h1>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3 style={{color: "#fff"}}>
                  {user?.username}
                </h3>
                <button onClick={signOut}>
                  Sign out
                </button>
              </div>
            </div>
          </header>

          <div>
            <ForumList forums={forums} />
          </div>
        </main>
      )}
    </Authenticator>
  );
}
