import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { AuthUser, fetchUserAttributes } from '@aws-amplify/auth';

// Define the types for the context values
interface UserContextType {
  username: string | null;
  userId: string | null;
}

// Create the context with default values
const UserContext = createContext<UserContextType>({ username: null, userId: null });

// Define the props for the UserProvider component
interface UserProviderProps {
  children: ReactNode;
  user: AuthUser | undefined; // Accept the user object from the Authenticator
}

// Create the UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children, user }) => {
  const [userData, setUserData] = useState<UserContextType>({ username: null, userId: null });

  // Function to fetch the username and userId from Cognito
  const getAuthenticatedUser = async () => {
    if (!user) {
      setUserData({ username: null, userId: null });
      return;
    }

    try {
      const userAttributes = await fetchUserAttributes();
      
      setUserData({
        username: userAttributes?.preferred_username || 'TopicTribe User',
        userId: user?.userId || 'unknown'
      });
    } catch (error) {
      console.error('Failed to fetch user information:', error);
      setUserData({ username: 'TopicTribe User', userId: 'unknown' });
    }
  };

  // Fetch the user data whenever the `user` prop changes
  useEffect(() => {
    getAuthenticatedUser();
  }, [user]);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  return useContext(UserContext);
};
