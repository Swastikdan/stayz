'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { ChevronLeft, Share, Heart } from 'lucide-react';
import Image from 'next/image';
export default function ImageGallerySmall({ images, title, id, isFavoritePlace ,onClick , router }) {
  return (
    <>
      <div className=" relative flex w-full">
        <div className="absolute top-5 z-20 mx-5  flex w-full justify-between">
          <button
            className="rounded-full bg-white  p-2 text-center shadow-md transition-all duration-200 active:scale-90"
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <div className="mr-10 flex space-x-3">
            <div
              className="p-2 cursor-pointer  rounded-full  bg-white text-center shadow-md transition-all duration-200 active:scale-90"
              onClick={onClick}
            >
              {/* <Heart size={20} /> */}
              <Heart
                size={20}
                className={`transition-all duration-200 ease-in-out hover:scale-[1.1]  active:scale-[.9] ${isFavoritePlace ? 'text-[#FF385C]' : 'text-white'} `}
                fill={isFavoritePlace ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'}
                focusable="true"
                strokeWidth={1}
              />
            </div>

            <div
              className="rounded-full bg-white p-2 justify-center text-center shadow-md transition-all duration-200 active:scale-90"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: title,
                    url: window.location.href,
                  });
                } else {
                  alert('Web Share API is not supported in your browser');
                }
              }}
            >
              <Share size={20} strokeWidth={1} />
            </div>
          </div>
        </div>
        <Swiper
          pagination={{
            el: '.custom-swiper-pagination',
            type: 'fraction',
          }}
          modules={[Pagination]}
          className="mySwiper "
        >
          {images &&
            images.map((img, index) => (
              <SwiperSlide key={index} className="bg-gray-400">
                <img
                  height={200}
                  width={300}
                  src={img.replace(
                    '/upload/',
                    '/upload/w_1200,c_fill,g_auto/q_auto/f_auto/',
                  )}
                  alt="property image"
                  className="h-60 w-full object-cover "
                />
              </SwiperSlide>
            ))}
          <div className=" absolute bottom-5 right-5 z-10 w-14 text-white">
            <span className="custom-swiper-pagination  rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white"></span>
          </div>
        </Swiper>
      </div>
    </>
  );
}

//
