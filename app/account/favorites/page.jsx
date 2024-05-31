'use client';
import { useEffect, useState } from 'react';
import { Link as LinkIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLikeContext } from '@/providers/LikeProvider';
import { toast } from 'sonner';
export default function UserFavorites() {
  const {
    favorites: favoritesFromContext,
    setFavorites: setFavoritesFromContext,
    favoriteLoading: favoriteLoadingFromContext,
  } = useLikeContext();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/user/favorites');
        const data = await response.json();
        if (response.ok) {
          setFavorites(
            data.map((item) => ({
              id: item.place.id,
              title: item.place.title,
              image: item.place.photos[0],
            })),
          );
        } else {
          throw new Error('Failed to load favorites');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleFavoriteClick = async (id) => {
    // Save the current state in case we need to revert back
    const previousFavorites = favorites;
    const previousFavoritesFromContext = favoritesFromContext;

    // Update the state immediately
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
    setFavoritesFromContext(
      favoritesFromContext.filter((favorite) => favorite.id !== id),
    );

    try {
      const response = await fetch('/api/user/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId: id }),
      });
      const data = await response.json();
      toast.success(data.message);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to remove favorite');
      }
    } catch (error) {
      console.error(error);
      // If the request fails, revert the state back to its previous value
      setFavorites(previousFavorites);
      setFavoritesFromContext(previousFavoritesFromContext);
    }
  };
  return (
    <section className="mx-auto h-full min-h-screen w-full max-w-screen-xl items-center  justify-center px-2 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="p text-4xl font-bold text-gray-800 dark:text-gray-200 md:text-5xl">
          Favories
        </h2>
      </div>
      <>
        {isLoading ? (
          <div class="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                class="group flex animate-pulse flex-col rounded-xl border border-gray-300 bg-gray-50 shadow-md"
              >
                <div class="p-2 md:p-3">
                  <div class="flex items-center space-x-4">
                    <div class="h-20 w-32 rounded-lg bg-gray-200"></div>
                    <div class="flex flex-col items-start space-y-2">
                      <div class="h-4 w-48 rounded bg-gray-300"></div>
                      <div class="h-3 w-24 rounded bg-gray-300"></div>
                      <div class="flex items-center space-x-3 pt-2">
                        <div class="inline-flex h-6 w-20 select-none items-center gap-x-2 rounded-lg  bg-transparent px-3 py-1 text-sm"></div>
                        <div class="inline-flex h-6 w-20 select-none items-center gap-x-2 rounded-lg  bg-transparent px-3 py-1 text-sm text-gray-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div class="flex w-full items-center text-center ">
            {favorites.length != 0 ? (
              <div class="grid w-full content-center items-center justify-center gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {favorites.map((place) => (
                  <div
                    key={place.id}
                    class="group flex flex-col rounded-xl border bg-white shadow-md"
                  >
                    <div class="p-2 md:p-3">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-32 rounded-lg">
                          <AvatarImage
                            className="h-20 w-32 rounded-lg"
                            src={place.image}
                            alt={place.title}
                          />
                          <AvatarFallback className="h-20 w-32 rounded-lg">
                            {place.title[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div class="flex flex-col items-start">
                          <div>
                            <h3 class="font-semibold text-gray-800 ">
                              {place.title.length > 23
                                ? `${place.title.substring(0, 23)}...`
                                : place.title}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-3 pt-2">
                            <Link
                              href={`/place/${place?.id}`}
                              className="inline-flex select-none items-center gap-x-2 rounded-lg border-2 border-gray-500 bg-white px-3 py-1 text-sm text-gray-600 shadow-sm hover:bg-gray-100"
                            >
                              <LinkIcon size={16} />
                              Visit
                            </Link>
                            <button
                              onClick={() => handleFavoriteClick(place.id)}
                              className="inline-flex select-none items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-1 text-sm text-red-600 shadow-sm hover:bg-red-50"
                            >
                              <Trash size={16} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div class="flex h-96 w-full flex-col items-center justify-center">
                <p class="mt-4 text-lg font-semibold text-gray-600">
                  No favorites found
                </p>
              </div>
            )}
          </div>
        )}
      </>
    </section>
  );
}
