import { useEffect, useState } from 'react';
import { signOut, getCurrentUser  } from 'aws-amplify/auth';
import { useRouter } from 'next/router';

const Home = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch {
          router.push('/login');
        }
      };
      fetchUser();
    }, [router]);
  
    const handleLogout = async () => {
      await signOut();
      router.push('/login');
    };
  
    if (!user) return <p>Loading...</p>;
  
    return (
      <div>
        <h1>Welcome, {user.username}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };

export default Home;