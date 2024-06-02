'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLikeContext } from '@/providers/LikeProvider';

export default function ImageSlider({ customButton, images, id , link }) {
  const { data: session } = useSession();
  const { favorites, toggleLike } = useLikeContext();

  const [isFavoritePlace, setIsFavoritePlace] = useState(false);

  useEffect(() => {
    if (favorites.some((favorite) => favorite.id === id)) {
      setIsFavoritePlace(true);
    }
  }, [favorites, id]);

  const handleFavoriteClick = () => {
    if (session) {
      setIsFavoritePlace(!isFavoritePlace);
    }
    toggleLike(id);
  };

  return (
    <>
      <div className="group relative z-0 m-1 flex h-full min-h-[280px] items-center justify-center overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-600">
        <button
          className={`prevButton${customButton} absolute left-5 -z-10 -mr-10 cursor-pointer rounded-full bg-white py-[6px] pl-[5px] pr-[6px] text-black opacity-0 shadow-xl transition-all duration-200 hover:scale-105 hover:transition-all disabled:opacity-0 group-hover:z-10 md:opacity-100`}
        >
          <ChevronLeft width={20} height={20} />
          <span className="sr-only">Previous</span>
        </button>
        <Swiper
          cssMode={true}
          direction={'horizontal'}
          pagination={{
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true,
          }}
          slidesPerView={1}
          navigation={{
            nextEl: `.nextButton${customButton}`,
            prevEl: `.prevButton${customButton}`,
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper z-0 h-full w-full overflow-hidden rounded-xl"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="overflow-hidden rounded-xl">
              <Link href={link} className="rounded-xl">
                <Avatar className="flex h-full w-full rounded-none">
                  <AvatarImage
                    className="h-[280px] w-full rounded-none object-cover"
                    src={img.replace('/upload/', '/upload/w_800/')}
                    alt="property Image"
                  />
                  <AvatarFallback className="rounded-xl">
                    <div className="h-[280px] w-full animate-pulse rounded-xl bg-gray-200 object-cover"></div>
                  </AvatarFallback>
                </Avatar>
              </Link>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination px-3 py-1"></div>
        </Swiper>
        <button
          className={`nextButton${customButton} absolute right-5 -z-10 -ml-10 cursor-pointer rounded-full bg-white p-[6px] text-black opacity-0 shadow-xl transition-all duration-200 hover:scale-105 hover:transition-all disabled:opacity-0 group-hover:z-10 md:opacity-100`}
        >
          <ChevronRight width={20} height={20} />
          <span className="sr-only">Next</span>
        </button>
        <div
          className="group absolute right-2 top-2 z-20 cursor-pointer rounded-full disabled:pointer-events-none disabled:cursor-none"
          onClick={handleFavoriteClick}
        >
          <Heart
            size={26}
            className={`m-2  transition-all duration-200 ease-in-out hover:scale-[1.1]  active:scale-[.9] text-white `}
            fill={isFavoritePlace ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'}
            focusable="true"
            strokeWidth={1.5}
           
          />
        </div>
      </div>
    </>
  );
}
