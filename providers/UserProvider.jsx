'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';

// Create UserContext
export const UserContext = createContext();

// Create UserProvider
export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [userImage, setUserImage] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    image: '',
    email: '',
    accountPassword: '',
    newPassword: '',
    bio: '',
    passwordAvailable: false,
    role :''
  });

  console.log(session);

useEffect(() => {
  if (session?.user && session?.user?.id) {
    fetch(`/api/user/${session?.user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }
}, [session?.user]);

  return (
    <UserContext.Provider value={{ user: session?.user, userImage, userData, setUserData , setUserImage }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the UserContext, this is a bridge to useUserContext hook
export const useUserContext = () => useContext(UserContext);