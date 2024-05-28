import { Grip, ChevronLeft, Share, Heart } from 'lucide-react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
export default function ImageGalaryDesktop({ images, id, isFavoritePlace, onClick }) {
  return (
    <>
      <section className="mx-auto flex   w-full items-center justify-center pt-0">
        <div className="hidden items-center justify-center gap-1 sm:grid md:grid-cols-2">
          <AllPhotos
            photos={images}
            id={id}
            isFavoritePlace={isFavoritePlace}
            onClick={onClick}
            className="relative col-span-1 rounded-xl bg-black/15 md:rounded-none md:rounded-l-xl  "
          >
            <img
              src={
                images && images.length > 0
                  ? images[0].replace(
                      '/upload/',
                      '/upload/w_1200,h_800,c_fill,g_auto/q_auto/f_auto/',
                    )
                  : ''
              }
              width="1200"
              height="auto"
              alt=""
              className="cursor-pointer rounded-xl bg-gray-400 hover:mix-blend-multiply md:rounded-none md:rounded-l-xl"
            />
            <span className="absolute bottom-2 right-2 hidden items-center space-x-3 rounded-md bg-white px-3 py-2 text-xs font-semibold ring-1 ring-black sm:flex md:hidden">
              <Grip size={15} />
              <span className="text-sm ">Show all photos</span>
            </span>
          </AllPhotos>
          <div className="hidden grid-cols-2 gap-1.5 rounded-r-xl p-0.5 md:grid">
            {images &&
              images.length > 0 &&
              images.slice(1, 5).map((img, index) => (
                <AllPhotos
                  photos={images}
                  isFavoritePlace={isFavoritePlace}
                  onClick={onClick}
                  key={index}
                  className={`bg-black/15 ${index === 1 ? 'rounded-tr-xl' : ''} ${index === 3 ? 'relative rounded-br-xl' : ''}`}
                >
                  <img
                    src={img.replace(
                      '/upload/',
                      '/upload/w_600,h_400,c_fill,g_auto/q_auto/f_auto/',
                    )}
                    alt=""
                    className={`h-full cursor-pointer bg-gray-400 object-fill hover:mix-blend-multiply ${index === 1 ? 'rounded-tr-xl' : ''} ${index === 3 ? 'rounded-br-xl' : ''}`}
                  />

                  {index === 3 && (
                    <>
                      <div className="absolute bottom-5 right-5 hidden items-center space-x-3 rounded-md bg-white px-3 py-2 text-xs font-semibold ring-1 ring-black md:flex xl:text-sm">
                        <Grip size={18} />
                        <span>Show all photos</span>
                      </div>
                    </>
                  )}
                </AllPhotos>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function AllPhotos({
  children,
  className,
  photos = [],
  id,
  isFavoritePlace,
  onClick,
}) {
  const half = Math.ceil(photos?.length / 2);
  const firstHalf = photos?.slice(0, half);
  const secondHalf = photos?.slice(half);
  return (
    <Drawer>
      <DrawerTrigger className={cn(className)}>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[99vh]">
        <DrawerHeader className="flex w-full justify-between px-10 ">
          <DrawerClose className="">
            <button className="-ml-1 items-start ">
              <ChevronLeft strokeWidth={1.25} size={30} />
            </button>
          </DrawerClose>
          <div className=" flex items-center space-x-8">
            <div
              className="  flex cursor-pointer items-center  gap-1.5 text-center"
              onClick={onClick}
            >
              <Heart
                width={20}
                height={20}
                className={`m-2  text-white transition-all duration-200  active:scale-[.8] md:h-7 md:w-7`}
                fill={
                  isFavoritePlace === true
                    ? 'rgb(255,56,92)'
                    : 'rgb(0 0 0 / 0.6)'
                }
                focusable="true"
                strokeWidth={1}
              />

              <span className=" font-semibold underline ">
                {isFavoritePlace === true ? 'Saved' : 'Save'}
              </span>
            </div>
            <button
              className=" text-centerr flex items-center  gap-1.5 "
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    url: window.location.href,
                  });
                } else {
                  alert('Web Share API is not supported in your browser');
                }
              }}
            >
              <Share size={20} />

              <span className=" font-semibold underline ">Share</span>
            </button>
          </div>
        </DrawerHeader>
        <ScrollArea className="h-screen ">
          <DrawerDescription className="mx-auto w-full max-w-screen-lg items-center text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-1/2">
                {firstHalf.map((img, index) => (
                  <div key={index} className="m-2 mx-1">
                    <img
                      className="h-auto w-full rounded-lg object-cover"
                      src={img}
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <div className="w-1/2">
                {secondHalf.map((img, index) => (
                  <div key={index} className="m-2 mx-1">
                    <img
                      className="h-auto w-full rounded-lg object-cover"
                      src={img}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </DrawerDescription>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
