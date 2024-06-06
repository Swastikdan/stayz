'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
const LikeContext = createContext();
export const LikeProvider = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [favorites, setFavorites] = useState([]);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (session?.user && session?.user?.id) {
      setFavoriteLoading(true);
      fetch('/api/user/favorites')
        .then((res) => res.json())
        .then((data) => {
          const modifiedData = data.map((item) => {
            return {
              id: item.place.id,
              photos: item.place.photos.slice(0, 1),
            };
          });
          setFavorites(modifiedData);
          setFavoriteLoading(false);
        });
    }
  }, [session?.user]);


  const toggleLike = async (roomId) => {
  if (!session && !session.user) {
    router.push('/login');
    return;
  }

  let previousState;
  setFavorites((prevFavorites) => {
    previousState = [...prevFavorites]; // Keep a copy of the previous state

    const favoritesIds = prevFavorites.map((favorite) => favorite.id);
    if (favoritesIds.includes(roomId)) {
      return prevFavorites.filter((favorite) => favorite.id !== roomId);
    } else {
      return [...prevFavorites, { id: roomId }];
    }
  });

  try {
    const response = await fetch('/api/user/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ placeId: roomId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    setMessage(data.message);
    toast.success(data.message);
    return 'success'
  } catch (error) {
    setMessage(error.message);
    toast.error(error.message);
    

    // Revert back to previous state
    setFavorites(previousState);
    return 'error';
  }
};

  return (
    <LikeContext.Provider
      value={{ favorites, setFavorites, favoriteLoading, toggleLike }}
    >
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeContext = () => useContext(LikeContext);
  // const toggleLike = async (roomId) => {
  //   if (!session) {
  //     router.push('/login');
  //     return;
  //   }

  //   setFavorites((prevFavorites) => {
  //     const favoritesIds = prevFavorites.map((favorite) => favorite.id);
  //     if (favoritesIds.includes(roomId)) {
  //       return prevFavorites.filter((favorite) => favorite.id !== roomId);
  //     } else {
  //       return [...prevFavorites, { id: roomId }];
  //     }
  //   });

  //   try {
  //     const response = await fetch('/api/user/favorites', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ placeId: roomId }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || 'Something went wrong');
  //     }

  //     setMessage(data.message);
  //     toast.success(data.message);
  //   } catch (error) {
  //     setMessage(error.message);
  //     toast.error(error.message);

  //     // Revert back to previous state
  //     setFavorites((prevFavorites) => {
  //       const favoritesIds = prevFavorites.map((favorite) => favorite.id);
  //       if (favoritesIds.includes(roomId)) {
  //         return [...prevFavorites, { id: roomId }];
  //       } else {
  //         return prevFavorites.filter((favorite) => favorite.id !== roomId);
  //       }
  //     });
  //   }
  // };