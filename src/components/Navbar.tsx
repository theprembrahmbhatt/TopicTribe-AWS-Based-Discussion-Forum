import { fetchUserAttributes } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar(props:any) {
    const { signOut } = props;
  const router = useRouter();
  const [currUser, setCurrUser] = useState('');
  const getAuthenticatedUser = async () => {
    try{
        const user = await fetchUserAttributes();
        setCurrUser(user?.preferred_username || 'default');
    }catch(e){}
  }
  useEffect(() => {
    getAuthenticatedUser();
  }, []);
  return (
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
                <h3 style={{color: "#fff", paddingRight: "1rem"}}>
                  {currUser}
                </h3>
                <button onClick={signOut}>
                  Sign out
                </button>
              </div>
            </div>
          </header>
  );
}
