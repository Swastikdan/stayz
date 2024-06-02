'use client';
import React, { useState, useEffect } from 'react';
import {
  addDays,
  differenceInCalendarDays,
  isWithinInterval,
  parseISO,
  format,
  differenceInDays,
} from 'date-fns';
import ImageGalaryDesktop from './ImageGalaryDesktop';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Share,
  Heart,
  Loader,
  Loader2,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import MarkdownViewer from './MarkdownViewer';
import {
  necessaryamenities,
  standoutamenities,
  safetyamenities,
} from '../config/amanities';
import Image from 'next/image';

export default function DesktopPlace({
  place: {
    id,
    owner,
    ownerId,
    title,
    description,
    address,
    state,
    city,
    street,
    photos,
    category,
    necessary_amenities,
    standout_amenities,
    safety_amenities,
    price,
    listTillDate,
    maxGuests,
    petsAllowed,
    checkInTime,
    checkOutTime,
    smokingNotAllowed,
    partiesNotAllowed,
    photographyNotAllowed,
    SelfcheckIn,
    additionalRules,
    numberOfRooms,
    minimumStay,
    status,
    deleterequst,
    deletedstataus,
  },
  onFavoriteClick,
  isFavoritePlace,
  adults,
  setAdults,
  childrens,
  setChildrens,
  infants,
  setInfants,
  pets,
  setPets,
  date,
  setDate,
  bookingDays,
  setBookingDays,
  bookingLoading,
  onBooking,
  isvalidDates,
  isValidBookingWindow,
  isSameUser,
}) {
  const renderAmenities = (amenities, placeAmenities, include) => {
    return amenities
      .filter((amenity) => include === placeAmenities.includes(amenity.value))
      .map((amenity) => (
        <span
          key={amenity.value}
          className={`flex items-center gap-2 border-b-[1.5px] border-gray-300 py-5 text-base font-light ${
            !include ? 'line-through' : ''
          }`}
        >
          <Image src={amenity.image} alt="" width={32} height={32} />
          {amenity.title}
        </span>
      ));
  };

  const GuestSelector = ({ label, age, count, setCount, min, max }) => (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <span className="text-base font-medium">{label}</span>
          <span className="text-sm font-light">{age}</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            disabled={count === min}
            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => setCount(Math.max(min, count - 1))}
          >
            <Minus size={14} />
          </button>
          <span className="w-4 text-center text-base font-light tabular-nums">
            {count}
          </span>
          <button
            disabled={count === max}
            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => setCount(Math.min(max, count + 1))}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  const IconLabel = ({ svgPath, label }) => (
    <div className="flex items-center space-x-3 border-b border-gray-300 pb-5 text-base font-light text-black last:border-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: 'block',
          height: '24px',
          width: '24px',
          fill: 'currentColor',
        }}
      >
        <path d={svgPath}></path>
      </svg>
      <span className="text-gray-800">{label}</span>
    </div>
  );

  return (
    <section className="max-w-6xl px-10">
      <div className="flex items-center justify-between">
        <h1 className="pb-5 pt-1 text-lg font-semibold lg:text-xl xl:text-2xl">
          {title}
        </h1>
        <div className="flex items-center ">
          <div
            className="flex cursor-pointer items-center gap-1 rounded-sm px-1.5 py-1 text-center hover:bg-gray-200/70"
            onClick={onFavoriteClick}
          >
            <Heart
              size={20}
              className={` transition-all duration-200 ease-in-out hover:scale-[1.1] active:scale-[.9] ${isFavoritePlace ? 'text-[#FF385C]' : 'text-black'}`}
              fill={isFavoritePlace ? 'rgb(255,56,92)' : 'rgb(255 255 255)'}
              focusable="true"
              strokeWidth={1}
            />
            <span
              className=" w-min min-w-2 text-start text-[14px] underline"
              style={{ width: '50px', textAlign: 'left' }}
            >
              {isFavoritePlace === true ? 'Saved' : 'Save'}
            </span>
          </div>
          <button
            className=" flex cursor-pointer items-center gap-1 rounded-sm px-1.5 py-1 text-center hover:bg-gray-200/70"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    url: window.location.href,
                  })
                  .catch((error) => alert('Something went wrong '));
              } else {
                alert('Web Share API is not supported in your browser');
              }
            }}
          >
            <Share size={18} focusable="true" strokeWidth={1} />
            <span className="w-min min-w-2 text-start text-[14px] underline">
              Share
            </span>
          </button>
        </div>
      </div>
      <ImageGalaryDesktop
        images={photos}
        id={id}
        isFavoritePlace={isFavoritePlace}
        onClick={onFavoriteClick}
      />
      <div className="py-5">
        <div className="flex flex-col space-y-1">
          <span className="text-base font-medium xl:text-lg">{address}</span>
          <span className="text-sm font-medium">
            <span>{maxGuests} guests</span> &#183; {numberOfRooms} rooms
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-10  md:grid md:grid-cols-5 xl:gap-16">
        <div className="w-full md:col-span-3 ">
          <Separator className="w-full " />
          <div className="flex items-center space-x-5 py-3">
            <Avatar>
              <AvatarImage
                src={owner?.image}
                className="h-full w-full object-cover"
              />
              <AvatarFallback>
                {owner?.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium capitalize">
              Hosted By {owner?.name.split(' ', 1)[0].toLowerCase()}
            </span>
          </div>
          <Separator className="mb-4 py-[1px]" />
          <div className="pt-3">
            <span className="pb-1 text-xl font-semibold">
              What this place offers
            </span>
            <div className="grid grid-cols-2 gap-2 pt-2 ">
              {necessaryamenities.slice(0, 7).map((amenity) => (
                <span
                  key={amenity.value}
                  className={`flex items-center gap-2 font-light ${
                    !necessary_amenities.includes(amenity.value)
                      ? 'line-through'
                      : ''
                  }`}
                >
                  <Image src={amenity.image} alt="" width={32} height={32} />
                  {amenity.title}
                </span>
              ))}

              {safetyamenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity.value}
                  className={`flex items-center gap-2 font-light ${
                    !safety_amenities.includes(amenity.value)
                      ? 'line-through'
                      : ''
                  }`}
                >
                  <Image src={amenity.image} alt="" width={32} height={32} />
                  {amenity.title}
                </span>
              ))}
            </div>

            <Dialog>
              <DialogTrigger className="w-full">
                <div className="mt-5 w-max rounded-lg border border-black bg-background px-5 py-2 text-base duration-200 hover:bg-accent hover:text-accent-foreground active:scale-[99%]">
                  Show all{' '}
                  {Number(
                    Number(necessary_amenities.length) +
                      Number(standout_amenities.length) +
                      Number(safety_amenities.length),
                  )}{' '}
                  amenities
                </div>
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle className="fomt-medium text-xl md:text-2xl">
                    {' '}
                    What this place offers
                  </DialogTitle>

                  <DialogDescription className="h-full text-black">
                    <ScrollArea className="h-[65vh] w-full text-pretty text-base leading-7 text-black ">
                      <div className="py-5">
                        <span className="pb-3 text-base font-medium md:text-lg">
                          Necessary Amenities
                        </span>
                        {renderAmenities(
                          necessaryamenities,
                          necessary_amenities,
                          true,
                        )}
                      </div>
                      <div className="py-5">
                        <span className="pb-3 text-base font-medium md:text-lg">
                          Standout Amenities
                        </span>
                        {renderAmenities(
                          standoutamenities,
                          standout_amenities,
                          true,
                        )}
                      </div>
                      <div className="py-5">
                        <span className="pb-3 text-base font-medium md:text-lg">
                          Safety Amenities
                        </span>
                        {renderAmenities(
                          safetyamenities,
                          safety_amenities,
                          true,
                        )}
                      </div>
                      <div className="py-5">
                        <span className="pb-3 text-base font-medium md:text-lg">
                          Not Included
                        </span>
                        {renderAmenities(
                          necessaryamenities,
                          necessary_amenities,
                          false,
                        )}
                        {renderAmenities(
                          standoutamenities,
                          standout_amenities,
                          false,
                        )}
                        {renderAmenities(
                          safetyamenities,
                          safety_amenities,
                          false,
                        )}
                      </div>
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Separator className="my-4 py-[1px]" />
            <div className="">
              <span className="pb-1 text-xl font-semibold">
                About this Place
              </span>
              <div className="text-light py-3">
                <MarkdownViewer
                  markdown={
                    description && description.length > 300
                      ? `${description.slice(0, 300)}...`
                      : description
                  }
                />
              </div>
              <Dialog>
                <DialogTrigger className="text-light w-full">
                  {description && description.length > 300 ? (
                    <div className="gap-.5 mt-2 flex items-center font-medium underline">
                      Shoe More <ChevronRight strokeWidth={1.25} size={20} />
                    </div>
                  ) : null}
                </DialogTrigger>
                <DialogContent className=" h-full max-h-[80vh] w-fit min-w-[70vw] max-w-[80vw] ">
                  <DialogHeader>
                    <DialogTitle className="fomt-medium text-xl md:text-2xl">
                      {' '}
                      About this place
                    </DialogTitle>
                    <DialogDescription className=" py-5 ">
                      <ScrollArea className="h-[65vh] w-full text-pretty text-base font-light leading-7 text-black ">
                        <MarkdownViewer markdown={description} />
                      </ScrollArea>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="w-full md:col-span-2">
          <div className="rounded-xl border border-gray-200 p-5 shadow-md">
            <div className="py-3 text-xl font-semibold tabular-nums">
              ₹ {price} night
            </div>
            <div className="my-5  rounded-2xl border-[2px] border-gray-400">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full rounded-xl">
                  <div className="flex flex-col justify-between lg:flex-row">
                    <div className="flex w-full flex-col border-r-2 border-gray-200 p-3 text-left text-sm">
                      <span className="font-bold capitalize">Check-in</span>
                      <span>
                        {date?.from instanceof Date && !isNaN(date.from)
                          ? format(date.from, 'dd/MM/yyyy')
                          : 'Add Dates '}
                      </span>
                    </div>

                    <Separator
                      orientation="vertical"
                      className="hidden  h-[1px] bg-gray-400 lg:block "
                    />
                    <Separator className="h-[1px]  bg-gray-400 lg:hidden " />

                    <div className="flex w-full flex-col p-3 text-left text-sm">
                      <span className="font-bold capitalize">Checkout</span>
                      <span>
                        {date?.to instanceof Date && !isNaN(date.to)
                          ? format(date.to, 'dd/MM/yyyy')
                          : 'Add Dates'}
                      </span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className=" w-full space-y-3 rounded-2xl p-3 "
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    pagedNavigation={true}
                    defaultMonth={date?.from}
                    fromMonth={new Date()}
                    disabled={{ before: new Date() }}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator className="h-[1px]  bg-gray-400" />

              <div className="flex justify-between ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full rounded-xl">
                    <div className="flex w-full flex-col p-3 text-left text-sm">
                      <span className="font-bold capitalize">Guests</span>
                      <span>
                        {Number(adults) + Number(childrens) >= 16
                          ? `16+  Guests`
                          : Number(adults) + Number(childrens) > 1
                            ? Number(adults) + Number(childrens) + ' Guests'
                            : Number(adults) + Number(childrens) === 1
                              ? '1 Guest'
                              : 'Add Guests'}
                      </span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[40vw] space-y-3 rounded-2xl p-3 lg:w-[25vw] "
                  >
                    <div className=" space-y-3 p-3">
                      <GuestSelector
                        label="Adults"
                        age="Age 13+"
                        count={adults}
                        setCount={setAdults}
                        min={1}
                        max={maxGuests - childrens}
                      />
                      <GuestSelector
                        label="Childrens"
                        age="Ages 2-12"
                        count={childrens}
                        setCount={setChildrens}
                        min={0}
                        max={maxGuests - adults}
                      />
                      <GuestSelector
                        label="Infants"
                        age="Under 2"
                        count={infants}
                        setCount={setInfants}
                        min={0}
                        max={5}
                      />
                      <GuestSelector
                        label="Pets"
                        count={pets}
                        setCount={setPets}
                        min={0}
                        max={5}
                      />

                      <div className="text-[10px] font-light">
                        {`This place has a maximum of ${maxGuests} guests, not
                        including infants. If you're bringing more than 2 pets,
                        please let your Host know.`}
                      </div>
                    </div>

                    <DropdownMenuItem className="w-fit cursor-pointer items-center border border-input px-5 text-center text-base">
                      Close
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {isSameUser ? (
              <div className="w-full rounded-lg  bg-gray-500 bg-gradient-to-r py-3 text-center text-lg font-bold text-white opacity-30 shadow-md ">
                {`You can't book your own place`}
              </div>
            ) : isValidBookingWindow ? (
              <>
                <button
                  disabled={bookingLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-lg font-bold text-white shadow-md duration-200 active:scale-[99%] disabled:cursor-not-allowed"
                  onClick={onBooking}
                >
                  <Loader2
                    className={`mr-2 size-[28px] animate-spin ${bookingLoading ? 'block transition-all ease-in-out' : 'hidden transition-all ease-in-out'}`}
                  />
                  <span
                    className={`${bookingLoading ? 'hidden transition-all ease-in-out' : 'block transition-all ease-in-out'}`}
                  >
                    Reserve
                  </span>
                </button>
                <div className="pt-2 text-center text-sm font-light">
                  {` You won't be charged yet`}
                </div>
              </>
            ) : (
              <div className="w-full rounded-lg  bg-gray-500 bg-gradient-to-r py-3 text-center text-lg font-bold text-white opacity-30 shadow-md ">
                Dates not available
              </div>
            )}

            <Separator className="my-3 mb-5 h-[1px] bg-gray-400" />
            <div className="flex items-center justify-between pt-2 text-base">
              <span className="font-light underline underline-offset-4">
                {bookingDays < 30
                  ? `₹${price} x ${bookingDays} ${bookingDays > 1 ? 'nights' : 'night'}`
                  : `Total for ${bookingDays} nights`}
              </span>
              <span className="font-medium ">₹{price * bookingDays}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4  h-[1px] bg-gray-400" />

      <div>
        <span className="pb-5 text-xl font-semibold">Things to know</span>
        <div className="mt-5 grid w-full grid-cols-3 items-center justify-center gap-5">
          <div className="h-full">
            <span className="text-base font-medium ">House Rules</span>

            <Dialog>
              <div className="flex flex-col space-y-2 text-left  text-[15px] font-light ">
                {checkInTime && checkOutTime ? (
                  <>
                    <span>Check-in: {checkInTime}</span>
                    <span>Checkout before {checkOutTime}</span>
                  </>
                ) : (
                  <>
                    <span>Check-in: 2:00 pm – 10:00 pm</span>
                    <span>Checkout before 11:00 am</span>
                  </>
                )}

                <span>{maxGuests} guests maximum</span>
              </div>
              <DialogTrigger className="w-full pt-3 text-left text-sm font-semibold underline underline-offset-2">
                Show more
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle className="fomt-medium text-xl md:text-2xl">
                    {' '}
                    House rules
                  </DialogTitle>
                  <span className="pb-5 pt-1 text-sm font-light">
                    {` You'll be staying in someone's home, so please treat it with
                    care and respect.`}
                  </span>
                  <DialogDescription className="">
                    <ScrollArea className="h-[70vh] w-full  ">
                      <div className="py-5">
                        <span className="text-lg font-medium text-black">
                          Checking in and out
                        </span>

                        <div className="flex flex-col space-y-3 py-5">
                          <IconLabel
                            svgPath="M16 .33a15.67 15.67 0 1 1 0 31.34A15.67 15.67 0 0 1 16 .33zm0 2a13.67 13.67 0 1 0 0 27.34 13.67 13.67 0 0 0 0-27.34zm1 3v10.1l8.74 5.04-1 1.73L15 16.58V5.33z"
                            label={
                              checkInTime
                                ? `Check-in: ${checkInTime}`
                                : 'Check-in: 2:00 pm – 5:00 pm'
                            }
                          />

                          <IconLabel
                            svgPath="M16 .33a15.67 15.67 0 1 1 0 31.34A15.67 15.67 0 0 1 16 .33zm0 2a13.67 13.67 0 1 0 0 27.34 13.67 13.67 0 0 0 0-27.34zm1 3v10.1l8.74 5.04-1 1.73L15 16.58V5.33z"
                            label={
                              checkOutTime
                                ? `Checkout before ${checkOutTime}`
                                : 'Checkout before 11:00 am'
                            }
                          />
                          {SelfcheckIn ? (
                            <IconLabel
                              svgPath="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"
                              label="Self check-in"
                            />
                          ) : null}
                        </div>
                      </div>
                      <div className="py-5">
                        <span className="text-lg font-medium text-black">
                          During your stay
                        </span>

                        <div className="flex flex-col space-y-3 py-5">
                          <IconLabel
                            svgPath="M22 5a6 6 0 0 1 3.64 10.77A9 9 0 0 1 31 23.74V24h-2a7 7 0 0 0-6-6.93v-2.2A4 4 0 0 0 22 7a4 4 0 0 0-3.68 5.57A5 5 0 0 1 21 17a4.99 4.99 0 0 1-1.6 3.67 9 9 0 0 1 5.6 8.06V29h-2a7 7 0 0 0-6-6.93v-2.24a3 3 0 1 0-2 0v2.24a7 7 0 0 0-6 6.69V29H7a9 9 0 0 1 5.6-8.34 5 5 0 0 1 1.08-8.09A4 4 0 1 0 9 14.87v2.2a7 7 0 0 0-6 6.69V24H1a9 9 0 0 1 5.36-8.23A6 6 0 1 1 15.92 10h.16A6 6 0 0 1 22 5z"
                            label={`${maxGuests} guests maximum`}
                          />

                          {petsAllowed ? (
                            <IconLabel
                              svgPath="M13.7 13.93a4 4 0 0 1 5.28.6l.29.37 4.77 6.75a4 4 0 0 1 .6 3.34 4 4 0 0 1-4.5 2.91l-.4-.08-3.48-.93a1 1 0 0 0-.52 0l-3.47.93a4 4 0 0 1-2.94-.35l-.4-.25a4 4 0 0 1-1.2-5.2l.23-.37 4.77-6.75a4 4 0 0 1 .96-.97zm3.75 1.9a2 2 0 0 0-2.98.08l-.1.14-4.84 6.86a2 2 0 0 0 2.05 3.02l.17-.04 4-1.07a1 1 0 0 1 .5 0l3.97 1.06.15.04a2 2 0 0 0 2.13-2.97l-4.95-7.01zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                              label="Pets allowed"
                            />
                          ) : (
                            <IconLabel
                              svgPath="m3.7 2.3 26 26-1.4 1.4-26-26zm8.17 13.81 1.44 1.44L9.6 22.8a2 2 0 0 0 1.98 3.13l.17-.04 4-1.07a1 1 0 0 1 .38-.03l.13.03 4 1.07a2 2 0 0 0 1.3-.1l1.46 1.47a4 4 0 0 1-3.09.6l-.2-.04-3.73-1-3.73 1a4 4 0 0 1-2.94-.35l-.2-.11-.2-.13a4 4 0 0 1-1.08-5.4l.11-.18zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM21 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 4a4 4 0 0 1 3.38 6.14l-1.49-1.5a2 2 0 0 0-2.54-2.53L8.86 4.6A3.98 3.98 0 0 1 11 4zm10 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                              label="Pets not allowed"
                            />
                          )}
                          {smokingNotAllowed ? (
                            <IconLabel
                              svgPath="m3.7 2.3 26 26-1.4 1.4-26-26zM14.77 19l2 2H3v4h17.76l2 2H3a2 2 0 0 1-2-1.85V21a2 2 0 0 1 1.85-2H3zM30 19v6.76l-2-2V19zm-4 0v2.76L23.24 19zM21 3a4 4 0 0 1 3.36 6.18l-.1.14.13.04a8 8 0 0 1 5.6 7.4L30 17h-2a6 6 0 0 0-5.78-6H21V9a2 2 0 0 0 .15-4H21zm1 10a4 4 0 0 1 4 3.8v.2h-2a2 2 0 0 0-1.85-2H19.24l-2-2zM17 3v2a4 4 0 0 0-4 3.76l-1.68-1.69A6 6 0 0 1 16.78 3z"
                              label="Smoking not allowed"
                            />
                          ) : (
                            <IconLabel
                              svgPath="M30 19v8h-2v-8zm-4 0v8H3a2 2 0 0 1-2-1.85V21a2 2 0 0 1 1.85-2H3zm-2 2H3v4h21zM21 3a4 4 0 0 1 3.36 6.18l-.1.14.13.04a8 8 0 0 1 5.6 7.4L30 17h-2a6 6 0 0 0-5.78-6H21V9a2 2 0 0 0 .15-4H21zm-4 0v2a4 4 0 0 0-.2 8H22a4 4 0 0 1 4 3.8v.2h-2a2 2 0 0 0-1.85-2H17a6 6 0 0 1-.23-12z"
                              label="Smoking allowed"
                            />
                          )}
                          {partiesNotAllowed ? (
                            <IconLabel
                              svgPath="M5.12 9.36 7 11.25v.05c.12 4.47 2.85 8.2 8.3 11.2l.39.21.27.14.3-.19c.46-.28.89-.57 1.3-.85L19 23.24c-.5.35-1 .7-1.55 1.04l2.2 2.92a1.13 1.13 0 0 1-.9 1.8H17v3h-2v-3h-1.75a1.13 1.13 0 0 1-.9-1.8l2.14-2.86C8.2 20.92 5 16.46 5 11c0-.56.04-1.1.12-1.64zM3.71 2.3l26 26-1.42 1.42-26-26zM16 25.67 15 27h2zM16 0c5.9 0 11 5.28 11 11 0 2.92-1.17 5.68-3.47 8.29l-1.42-1.42c1.79-2.06 2.74-4.17 2.87-6.33l.02-.27V11c0-4.64-4.21-9-9-9a8.98 8.98 0 0 0-6.73 3.03L7.85 3.6A10.97 10.97 0 0 1 16 0z"
                              label="Parties not allowed"
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className="py-5">
                        <span className="text-lg font-medium text-black">
                          Before you leave
                        </span>

                        <div className="flex flex-col space-y-3 py-5">
                          <IconLabel
                            svgPath="m25.5 1-.05.03a3 3 0 0 1 2.54 2.8L28 4v1h2v2h-2v22a2 2 0 0 1-1.85 2H10a2 2 0 0 1-2-1.85V27H6a2 2 0 0 1-2-1.85V7H2V5h2V4a3 3 0 0 1 2.82-3H7zm.5 6h-2v18.15V25a2.01 2.01 0 0 1-.37 1.17A2 2 0 0 1 22 27H10v2h16zM6 25h16v-2H6zm0-4h16v-2H6zM22 3H7a1 1 0 0 0-1 1v13h16zm3 0a1 1 0 0 0-1 .88V5h2V4a1 1 0 0 0-.88-1z"
                            label="Gather used towels"
                          />
                          <IconLabel
                            svgPath="M19 2a1 1 0 0 1 1 .88V6h8v2h-2v20a2 2 0 0 1-1.85 2H8a2 2 0 0 1-2-1.85V8H4V6h8V3a1 1 0 0 1 .88-1H13zm5 6H8v20h16zm-12 2v16h-2V10zm5 0v16h-2V10zm5 0v16h-2V10zm-4-6h-4v2h4z"
                            label="Throw rubbish away
"
                          />
                          <IconLabel
                            svgPath="M25 2a2 2 0 0 1 2 1.85V28a2 2 0 0 1-1.85 2H7a2 2 0 0 1-2-1.85V4a2 2 0 0 1 1.85-2H7zm0 2H7v24h18zm-5.44 7.17a6 6 0 1 1-7.32.16l.2-.16 1.19 1.6a4 4 0 1 0 4.92.15l-.18-.14zM17 9v5.89h-2V9z"
                            label="Turn things off"
                          />
                          <IconLabel
                            svgPath="m30.78 17.35.11.2a3.53 3.53 0 0 1-1.04 4.4l-.16.12-11.73 7.83a5 5 0 0 1-3.56.77l-.26-.05-11.56-2.47a2 2 0 0 1-1.57-1.8L1 26.2V21a2 2 0 0 1 1.85-2H19.24c.68 0 1.17.32 1.46.81l5.87-3.52a3.07 3.07 0 0 1 4.21 1.06zm-3.07.6-.11.06-6.63 3.98-.08.3a3.83 3.83 0 0 1-3.66 2.7L17 25h-5v-2h5c.39 0 .72-.07 1-.19V21H3v5.2l11.56 2.47a3 3 0 0 0 2.12-.33l.17-.1 11.73-7.83c.6-.4.84-1.17.58-1.83l-.05-.13-.04-.07a1.07 1.07 0 0 0-1.25-.47zM11 1a8 8 0 0 1 7.29 4.7l.13.3h7.5l3 3-3 3h-3.5L20 14.41l-1.84-1.84-.1.2a8 8 0 0 1-6.5 4.21l-.29.02H11a8 8 0 1 1 0-16zm0 2a6 6 0 1 0 5.68 7.95l.07-.23.21-.72h1.45L20 11.58 21.59 10h3.5l1-1-1-1h-8.13l-.2-.71A6 6 0 0 0 11 3zM8 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                            label="Return keys"
                          />
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <div className="h-full">
            <span className="text-base font-medium ">Safety & property</span>
            <Dialog>
              <div className="flex flex-col space-y-2 text-left text-[15px] font-light ">
                {safetyamenities.slice(0, 3).map((amenity) => {
                  const hasAmenity = safety_amenities.find(
                    (sa) => sa.value === amenity.value,
                  );
                  return (
                    <div key={amenity.value}>
                      {hasAmenity ? amenity.value : `No ${amenity.value}`}
                    </div>
                  );
                })}
              </div>

              <DialogTrigger className="w-full pt-3 text-left text-sm font-semibold underline underline-offset-2">
                Show more
              </DialogTrigger>

              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle className="fomt-medium text-xl md:text-2xl">
                    {' '}
                    Safety & property
                  </DialogTitle>
                  <span className="pb-5 pt-1 text-sm font-light">
                    {` Avoid surprises by looking over these important details about your Host's property.`}
                  </span>
                  <DialogDescription className="">
                    <ScrollArea className="h-[50vh] w-full  ">
                      <div className="flex flex-col space-y-3 py-5">
                        {safetyamenities.map((amenity) => {
                          const hasAmenity = safety_amenities.includes(
                            amenity.value,
                          );

                          return hasAmenity ? (
                            <div
                              key={amenity.value}
                              className="flex items-center space-x-3 border-b border-gray-300 pb-5 text-base font-light text-black last:border-none"
                            >
                              <Image
                                src={amenity.image}
                                alt={amenity.value}
                                width={30}
                                height={30}
                              />
                              <span className="text-gray-800">
                                {amenity.title}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="h-full">
            <span className="text-base font-medium ">Cancellation policy</span>
            <Dialog>
              <div className="flex max-w-md flex-col text-left text-[13px]">
                <span>Free cancellation for 48 hours.</span>
                <span className="text-wrap pt-3">
                  Review the full cancellation policy which applies even if you
                  cancel for illness or disruptions caused by COVID-19.
                </span>
              </div>

              <DialogTrigger className="w-full pt-3 text-left text-sm font-semibold underline underline-offset-2">
                Show more
              </DialogTrigger>

              <DialogContent className="w-fit min-w-[50vw] max-w-[80vw]">
                <DialogHeader>
                  <DialogTitle> Cancellation policy</DialogTitle>
                  <span className="pb-5 pt-1 text-sm font-light">
                    {`Before you book, make sure you're comfortable with this Host's cancellation policy. Keep in mind that Airbnb's Extenuating Circumstances policy doesn't cover cancellations due to illness or travel disruptions caused by COVID-19.`}
                  </span>
                  <DialogDescription className="">
                    <ScrollArea className="h-[50vh] w-full">
                      <div className="py-5">
                        <span className="pb-3 text-lg font-semibold text-black">
                          Cancel By{' '}
                        </span>
                        {date &&
                        date.to &&
                        date.to instanceof Date &&
                        !isNaN(date.to.getTime()) ? (
                          <div className="flex flex-col space-y-3 ">
                            <div className="flex items-center space-x-3 border-b border-gray-300 py-5 text-base font-light text-black ">
                              <span className=" w-20 text-start  font-medium">
                                {new Date(
                                  date.to.getTime() - 24 * 60 * 60 * 1000,
                                ).toLocaleDateString(undefined, {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </span>

                              <span>
                                Full refund: Get back 100% of what you paid.
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 border-b border-gray-300 py-5 text-base font-light text-black ">
                              <span className=" w-20 text-start  font-medium">
                                {new Date(date.to.getTime()).toLocaleDateString(
                                  undefined,
                                  {
                                    day: 'numeric',
                                    month: 'short',
                                  },
                                )}
                              </span>

                              <span>
                                Partial refund: Get back every night but the
                                first one. No refund of the first night or the
                                service fee.
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
{
  /* <div className="">
            <span className="text-lg font-medium ">Cancellation policy</span>

            <Dialog>
              <div className="flex items-center justify-between">
                <div className="flex max-w-md flex-col text-left text-[13px]">
                  <span>Free cancellation for 48 hours.</span>
                  <span className="text-wrap pt-3">
                    Review the full cancellation policy which applies even if
                    you cancel for illness or disruptions caused by COVID-19.
                  </span>
                </div>
              </div>
              <DialogTrigger className="w-full pt-3 text-left text-sm font-semibold underline underline-offset-2">
                Show more
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> Cancellation policy</DialogTitle>
                  <span className="pb-5 pt-1 text-sm font-light">
                    Before you book, make sure you're comfortable with this
                    Host's cancellation policy. Keep in mind that Airbnb's
                    Extenuating Circumstances policy doesn't cover cancellations
                    due to illness or travel disruptions caused by COVID-19.
                  </span>
                  <DialogDescription className="">
                    <ScrollArea className="h-[30vh] w-full  ">
                      Cancellation policy here
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="h-full">
            <span className="text-lg font-medium">House Rules</span>

            <Dialog>
              <div className="flex flex-col space-y-2 text-left text-[13px] ">
                <span>Check-in: 2:00 pm – 10:00 pm</span>
                <span>Checkout before 11:00 am</span>
                <span>6 guests maximum</span>
              </div>
              <DialogTrigger className="w-full pt-3 text-left text-sm font-semibold underline underline-offset-2">
                Show more
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> House rules</DialogTitle>
                  <span className="pb-5 pt-1 text-sm font-light">
                    You'll be staying in someone's home, so please treat it with
                    care and respect.
                  </span>
                  <DialogDescription className="">
                    <ScrollArea className="h-[30vh] w-full  ">
                      Cancellation policy here
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="">
            <span className="text-lg font-medium ">Safety & property</span>
            <Dialog>
              <div className="flex flex-col space-y-2 text-left text-sm ">
                <span>No carbon monoxide alarm</span>
                <span>No smoke alarm</span>
                <span>Security camera/recording device</span>
              </div>
              <DialogTrigger className="w-full pt-3 text-left text-sm font-semibold underline underline-offset-2">
                Show more
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> Safety & property</DialogTitle>
                  <span className="pb-5 pt-1 text-sm font-light">
                    Avoid surprises by looking over these important details
                    about your Host's property.
                  </span>
                  <DialogDescription className="">
                    <ScrollArea className="h-[30vh] w-full text-black  ">
                      <span className="text-base font-semibold">
                        Safety devices
                      </span>
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div> */
}
