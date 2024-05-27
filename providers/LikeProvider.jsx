'use client';

import React, { createContext, useContext, useState , useEffect } from 'react';
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
    if (session) {
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
  }, [session]);
  // console.log('Favorites form Context ',favorites  );
const toggleLike = async (roomId) => {
  if (!session) {
    router.push('/login');
    return;
  }

  setFavorites((prevFavorites) => {
    const favoritesIds = prevFavorites.map(favorite => favorite.id);
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
  } catch (error) {
    setMessage(error.message);
    toast.error(error.message);

    // Revert back to previous state
    setFavorites((prevFavorites) => {
      const favoritesIds = prevFavorites.map(favorite => favorite.id);
      if (favoritesIds.includes(roomId)) {
        return [...prevFavorites, { id: roomId }];
      } else {
        return prevFavorites.filter((favorite) => favorite.id !== roomId);
      }
    });
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

/*
    const [likedRooms, setLikedRooms] = useState([]);

    const toggleLike = (roomId) => {
      setLikedRooms((prevLikedRooms) => {
        if (prevLikedRooms.includes(roomId)) {
          return prevLikedRooms.filter((id) => id !== roomId);
        } else {
          return [...prevLikedRooms, roomId];
        }
      });
    };




'use client';
import React, { createContext, useEffect, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
const LikeContext = createContext();
export const LikeProvider = ({ children }) => {
  const { data: session } = useSession();
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (session) {
      setFavoriteLoading(true);
      fetch('/api/user/favorites')
        .then((res) => res.json())
        .then((data) => {
          const modifiedData = data.map((item) => {
            return {
                id: item.place.id,
                photos: item.place.photos.slice(0, 1),
                title: item.place.title,
            };
          });
          setFavorites(modifiedData);
          setFavoriteLoading(false);
        });
    }
  }, [session]);

  //console.log('Favorites form Context ',favorites  );
  return (
    <LikeContext.Provider
      value={{ favorites, favoriteLoading, setFavorites }}
    >
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeContext = () => useContext(LikeContext);


*/
