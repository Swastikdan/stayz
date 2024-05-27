'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCityNames } from '@/utils/cities';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatRangeDate } from '@/utils';
import { Search, Plus, Minus, MapPin, X, ArrowLeft } from 'lucide-react';
import { addDays, isBefore, startOfDay } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import Sort from './Sort';
export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeMobileSearchDiv, setActiveMobileSearchDiv] =
    useState('location');
  const MobileSearchDisplay = (id) => {
    setActiveMobileSearchDiv(id);
  };
  const params = useMemo(
    () => [
      'location',
      'checkin',
      'checkout',
      'adults',
      'children',
      'infants',
      'pets',
    ],
    [],
  );
  const [loading, setLoading] = useState(true);
  const [searchState, setSearchState] = useState({
    location: '',
    checkin: '',
    checkout: '',
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const setAdults = (value) => {
    setSearchState((prevState) => ({ ...prevState, adults: value }));
  };

  const setChildren = (value) => {
    setSearchState((prevState) => ({ ...prevState, children: value }));
  };

  const setInfants = (value) => {
    setSearchState((prevState) => ({ ...prevState, infants: value }));
  };

  const setPets = (value) => {
    setSearchState((prevState) => ({ ...prevState, pets: value }));
  };

  useEffect(() => {
    let newState = {};
    params.forEach((param) => {
      let value = searchParams.get(param);
      if (value) {
        if (['adults', 'children', 'infants', 'pets'].includes(param)) {
          value = parseInt(value, 10);
        }
        newState[param] = value;
      }
    });
    setSearchState((prevState) => {
      const updatedState = { ...prevState, ...newState };
      return updatedState;
    });
    if (newState.checkin && newState.checkout) {
      const newDate = {
        from: new Date(newState.checkin),
        to: new Date(newState.checkout),
      };
      setDate(newDate);
    }
    return () => {
      setSearchState({
        location: '',
        checkin: '',
        checkout: '',
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
      });
      setDate(null);
    };
  }, [searchParams, params]);

  useEffect(() => {
    if (Number(searchState.children) > 0 && Number(searchState.adults) === 0) {
      setSearchState((prevState) => ({
        ...prevState,
        adults: Number(searchState.adults) + 1,
      }));
    }
  }, [searchState.children, searchState.adults]);

  const [date, setDate] = useState({
    from: null,
    to: null,
  });

  useEffect(() => {
    let from = date?.from;
    let to = date?.to;
    if (!from || !to) {
      setSearchState((prevState) => ({
        ...prevState,
        checkin: null,
        checkout: null,
      }));
    } else {
      if (from.getTime() === to.getTime()) {
        to = addDays(to, 1);
      }
      if (isBefore(from, startOfDay(new Date()))) {
        from = startOfDay(new Date());
      }
      from = new Date(from).toISOString();
      to = new Date(to).toISOString();

      setSearchState((prevState) => ({
        ...prevState,
        checkin: from,
        checkout: to,
      }));
    }
  }, [date]);
  const handleSearch = () => {
    if (!searchState.adults) {
      return;
    }
    let search = '';
    params.forEach((param) => {
      if (searchState[param]) {
        search += `${param}=${searchState[param]}&`;
      }
    });
    router.push(`/?${search}`);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    });

    return () => clearTimeout(timer);
  }, []);

  const topcities = [
    {
      title: "I'm Flexiable",
      img: 'https://res.cloudinary.com/debewnh29/image/upload/v1716749383/nestly/public/pictures/cities/anywhere.jpg',
      value: '',
    },
    {
      title: 'Mumbai',
      img: 'https://res.cloudinary.com/debewnh29/image/upload/nestly/public/pictures/cities/mumbai.avif',
      value: 'mumbai',
    },
    {
      title: 'Delhi',
      img: 'https://res.cloudinary.com/debewnh29/image/upload/nestly/public/pictures/cities/delhi.avif',
      value: 'delhi',
    },
    {
      title: 'Bangalore',
      img: 'https://res.cloudinary.com/debewnh29/image/upload/nestly/public/pictures/cities/bengaluru.webp',
      value: 'bangalore',
    },

    {
      title: 'Chennai',
      img: 'https://res.cloudinary.com/debewnh29/image/upload/nestly/public/pictures/cities/chennai.avif',
      value: 'chennai',
    },
    {
      title: 'Kolkata',
      img: 'https://res.cloudinary.com/debewnh29/image/upload/nestly/public/pictures/cities/kolkata.avif',
      value: 'kolkata',
    },
  ];

  let cities = getCityNames();

  const [searchCities, setSearchCities] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const handleLLocationSearch = (value) => {
    if (!value) {
      setSearchCities([]);
      return;
    }
    const filteredCities = cities.filter(
      (city) =>
        city.city.toLowerCase().includes(value.toLowerCase()) ||
        city.state.toLowerCase().includes(value.toLowerCase()),
    );
    setSearchCities(filteredCities);
  };

  return loading ? (
    <>
      {/* Desktop SearchBar   */}
      <div className="hidden w-auto md:flex">
        <div className="hidden w-full  items-center justify-between  rounded-full border-2 border-gray-300 p-1 md:flex ">
          <div className="  flex justify-between text-sm  ">
            <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
              <div className="h-6 w-28  animate-pulse   rounded-l-full rounded-r-md bg-gray-200"></div>
            </div>

            <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
              <div className="h-6 w-28  animate-pulse rounded-md bg-gray-200"></div>
            </div>

            <div className=" items-center border-gray-300  py-1 pl-2 ">
              <div className="h-6 w-28  animate-pulse rounded-md bg-gray-200"></div>
            </div>
          </div>

          <div className="ml-3 rounded-full bg-blue-600 p-2.5 text-white  ">
            <Search width={20} height={20} className="text-white" />
          </div>
        </div>
      </div>
      {/* Mobile SearchBar   */}
      <div className="flex w-full pt-4 md:hidden">
        <div className="ml-2 flex w-full items-center  rounded-full bg-gray-100  p-1 md:hidden md:w-auto">
          <div className="mr-2 rounded-full bg-white px-3 py-3">
            <Search width={20} height={20} />
          </div>
          <div className="my-1 mr-2 h-8 w-full animate-pulse rounded-l-sm rounded-r-full bg-gray-200"></div>
        </div>
      </div>
    </>
  ) : (
    <>
      {/* Desktop SearchBar   */}
      <div className="hidden w-auto select-none md:flex">
        <div className="hidden w-full  items-center justify-between  rounded-full border-2 border-gray-300  md:flex ">
          <div className="  flex justify-between text-sm  ">
            <DropdownMenu>
              <DropdownMenuTrigger className="m-0 w-full    " asChild>
                <div className="cursor-pointer   items-center rounded-full px-3 py-2 hover:bg-gray-100 focus:bg-gray-100  ">
                  <div className="flex  h-8 w-max min-w-28 items-center justify-center text-center text-[14px]  font-semibold">
                    <span className="">
                      {searchState.location
                        ? searchState.location.charAt(0).toUpperCase() +
                          searchState.location.slice(1)
                        : 'Anywhere'}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[424px]  rounded-3xl p-5 "
              >
                <div className="mb-3 flex w-full items-center rounded-full border-2 border-gray-300 text-[13px] font-medium text-black placeholder:text-[13px] placeholder:text-black focus:border-black ">
                  <input
                    type="text"
                    name="search-location"
                    id="search-location"
                    value={inputValue}
                    onInput={(e) => {
                      const value = e.target.value;
                      setInputValue(value);
                      handleLLocationSearch(value);
                    }}
                    placeholder="Search Destinations"
                    className="w-full rounded-full p-2 text-black placeholder-black outline-none "
                  />
                  <div>
                    {inputValue ? (
                      <X
                        size={32}
                        className="mr-1 cursor-pointer rounded-3xl bg-gray-200 p-1"
                        onClick={() => {
                          setInputValue('');
                          setSearchCities([]);
                        }}
                      />
                    ) : null}
                  </div>
                </div>
                {inputValue ? (
                  <ScrollArea className="mr-2 h-80 w-full select-none">
                    <div className="flex flex-col p-1">
                      {/* <div className='flex items-center text-sm font-semibold p-2 hover:bg-gray-200/70 rounded-xl space-x-3'>
                        <MapPin size={32} className='p-1 rounded-3xl bg-gray-300 ' />
                        <span>Kolkata , West Bengal</span>
                      </div> */}

                      {searchCities.length >= 1 ? (
                        searchCities.map((city, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setSearchState((prevState) => ({
                                ...prevState,
                                location: city.city,
                              }));
                              // Force component to re-render
                              setSearchState((prevState) => ({ ...prevState }));
                            }}
                            className={`flex cursor-pointer items-center space-x-3 rounded-xl p-2 text-sm font-semibold hover:bg-gray-200/70  ${searchState.location == city.city ? 'bg-gray-200' : ''} `}
                          >
                            <MapPin
                              size={32}
                              className="rounded-3xl bg-gray-100 p-1 text-gray-600 "
                            />
                            <span>{`${city.city} , ${city.state}`}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center space-x-3 rounded-xl p-2 text-sm font-semibold ">
                          <MapPin
                            size={32}
                            className="rounded-3xl bg-gray-300 p-1 "
                          />
                          <span>No Results Found</span>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="grid grid-cols-3 gap-5 ">
                    {topcities.map((city, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSearchState((prevState) => ({
                            ...prevState,
                            location: city.value,
                          }));
                        }}
                        className="group flex cursor-pointer flex-col space-y-1 rounded-xl p-2 hover:bg-gray-200/70"
                      >
                        {/* <div className="h-24 w-24 rounded-xl bg-gray-200"></div> */}
                        <Image
                          src={city.img}
                          alt={city.title}
                          width={96}
                          height={96}
                          className="h-24 w-24 rounded-xl border-2 border-gray-300 bg-gray-100 object-cover object-center group-active:scale-95 "
                        />
                        <span className="text-sm font-semibold">
                          {city.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-12 w-[5px]  bg-gray-300"></div>
            <DropdownMenu>
              <DropdownMenuTrigger className="m-0 w-full    " asChild>
                <div className="cursor-pointer   items-center rounded-full px-3 py-2 hover:bg-gray-100 focus:bg-gray-100  ">
                  {' '}
                  <div className="flex  h-8 w-max min-w-28 items-center justify-center text-center text-[14px]  font-semibold">
                    <span className="">
                      {searchState.checkin && searchState.checkout
                        ? formatRangeDate(
                            searchState.checkin,
                            searchState.checkout,
                          )
                        : 'Any Date'}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-full space-y-3 rounded-3xl p-3"
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
            <div className="h-12 w-[5px]  bg-gray-300"></div>
            <div className="flex items-center space-x-1 rounded-full pr-1 hover:bg-gray-100 focus:bg-gray-100 ">
              <DropdownMenu>
                <DropdownMenuTrigger className="z-0 m-0 w-full   " asChild>
                  <div className=" cursor-pointer   items-center  py-2 pl-3 ">
                    <div
                      className={`flex  h-8 w-max min-w-28 items-center justify-center text-center text-[14px] ${Number(searchState.adults) + Number(searchState.children) > 0 ? 'font-semibold' : ''}  `}
                    >
                      <span className="">
                        {Number(searchState.adults) +
                          Number(searchState.children) >=
                        16
                          ? `16+  Guests`
                          : Number(searchState.adults) +
                                Number(searchState.children) >
                              1
                            ? Number(searchState.adults) +
                              Number(searchState.children) +
                              ' Guests'
                            : Number(searchState.adults) +
                                  Number(searchState.children) ===
                                1
                              ? '1 Guest'
                              : 'Add Guests'}
                      </span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className=" -mr-[44px] w-[30vw] space-y-3 rounded-3xl lg:w-[20vw]"
                >
                  <div className=" space-y-3 p-3">
                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-medium">Adults</span>
                          <span className="text-sm font-light">Age 13+</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            disabled={searchState.adults === 0}
                            className="hover:text-accent-foregroun rounded-full border border-input bg-background p-2 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.adults > 0) {
                                setAdults(searchState.adults - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-base font-light tabular-nums">
                            {searchState.adults}
                          </span>
                          <button
                            disabled={
                              searchState.adults + searchState.children >= 16
                            }
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => setAdults(searchState.adults + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-medium">
                            Children
                          </span>
                          <span className="text-sm font-light">Ages 2-12</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            disabled={searchState.children === 0}
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.children > 0) {
                                setChildren(searchState.children - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-base font-light tabular-nums">
                            {searchState.children}
                          </span>
                          <button
                            disabled={
                              searchState.adults + searchState.children >= 16
                            }
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() =>
                              setChildren(searchState.children + 1)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-medium">Infants</span>
                          <span className="text-sm font-light">Under 2</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            disabled={searchState.infants === 0}
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.infants > 0) {
                                setInfants(searchState.infants - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-base font-light tabular-nums">
                            {searchState.infants}
                          </span>
                          <button
                            disabled={searchState.infants >= 5}
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.infants < 5) {
                                setInfants(searchState.infants + 1);
                              }
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-medium">Pets</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            disabled={searchState.pets === 0}
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.pets > 0) {
                                setPets(searchState.pets - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-base font-light tabular-nums">
                            {searchState.pets}
                          </span>
                          <button
                            disabled={searchState.pets >= 5}
                            className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                            onClick={() => {
                              if (searchState.pets < 5) {
                                setPets(searchState.pets + 1);
                              }
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                onClick={() => handleSearch()}
                className="ml-3 flex items-center rounded-full bg-blue-600 p-2.5  text-white hover:bg-blue-700"
              >
                <Search width={20} height={20} className="text-white " />
                {/* <span className="text-sm font-semibold">Search</span> */}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile SearchBar   */}
      <div className="flex w-full items-center space-x-2">
        <div className="mr-2 flex w-full  pt-4 md:hidden">
          <Drawer className=" rounded-none ">
            <DrawerTrigger className="h-auto w-full">
              <div className="ml-2 flex w-full items-center  rounded-full bg-gray-100  p-1 md:hidden md:w-auto">
                <div
                  className={`mr-2 rounded-full bg-white px-3 py-3   ${
                    searchState.location ||
                    searchState.checkin ||
                    searchState.checkout ||
                    searchState.adults ||
                    searchState.children ||
                    searchState.infants ||
                    searchState.pets
                      ? 'duration-100 hover:scale-95'
                      : ''
                  }`}
                >
                  {searchState.location ||
                  searchState.checkin ||
                  searchState.checkout ||
                  searchState.adults ||
                  searchState.children ||
                  searchState.infants ||
                  searchState.pets ? (
                    <Link href="/" className=" ">
                      <ArrowLeft width={20} height={20} />
                    </Link>
                  ) : (
                    <Search width={20} height={20} />
                  )}
                </div>
                <div className="flex flex-col text-sm">
                  <div className="text-start text-base font-semibold">
                    {searchState.location
                      ? searchState.location.charAt(0).toUpperCase() +
                        searchState.location.slice(1)
                      : 'Anywhere'}
                  </div>
                  <div className="flex pb-1 text-xs">
                    <span className="border-r-[1px] pr-1">
                      {searchState.checkin && searchState.checkout
                        ? formatRangeDate(
                            searchState.checkin,
                            searchState.checkout,
                          )
                        : 'Any Date'}
                    </span>
                    <span className="pl-1">
                      {Number(searchState.adults) +
                        Number(searchState.children) >=
                      16
                        ? `16+  Guests`
                        : Number(searchState.adults) +
                              Number(searchState.children) >
                            1
                          ? Number(searchState.adults) +
                            Number(searchState.children) +
                            ' Guests'
                          : Number(searchState.adults) +
                                Number(searchState.children) ===
                              1
                            ? '1 Guest'
                            : 'Add Guests'}
                    </span>
                  </div>
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent className="h-full rounded-none bg-gray-200 ">
              <div className="flex items-end justify-end p-3 px-5">
                <DrawerClose className="rounded-full bg-white p-2 ring-2 ring-black">
                  <X size={24} />
                </DrawerClose>
              </div>

              <div className="flex flex-col space-y-2 px-3 py-3 ">
                {activeMobileSearchDiv === 'location' ? (
                  <div className="h-auto w-full rounded-2xl bg-white px-5 py-3 shadow-md shadow-gray-300">
                    <span className="text-start text-[20px] font-semibold">
                      Where to ?
                    </span>
                    <div className="py-3">
                      <Drawer>
                        <DrawerTrigger className="h-auto w-full">
                          {' '}
                          <div class="relative h-full">
                            <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                              <Search size={20} />
                            </div>
                            <input
                              type="search"
                              name="search-location"
                              class="block w-full rounded-xl border border-gray-300 bg-gray-50 p-3 ps-10 text-sm text-gray-900 focus:border focus:outline-none "
                              placeholder="Search destinations"
                              readOnly
                            />
                          </div>
                        </DrawerTrigger>
                        <DrawerContent className="h-full bg-gray-200">
                          <div className="mb-5 flex items-start justify-start p-3 px-5">
                            <DrawerClose className="rounded-full bg-white p-2 ring-2 ring-black">
                              <ArrowLeft size={24} />
                            </DrawerClose>
                          </div>
                          <div className="h-full rounded-t-3xl bg-white p-5 shadow-sm">
                            <div class="relative h-auto">
                              <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                <Search size={24} className="text-black" />
                              </div>
                              <input
                                type="search"
                                name="search-location"
                                id="search-location"
                                value={inputValue}
                                onInput={(e) => {
                                  const value = e.target.value;
                                  setInputValue(value);
                                  handleLLocationSearch(value);
                                }}
                                class="block w-full rounded-xl  bg-gray-100 p-3.5 ps-10 text-base text-gray-900 focus:border focus:outline-none "
                                placeholder="Search destinations"
                              />
                              <div>
                                {inputValue ? (
                                  <X
                                    size={28}
                                    className="absolute bottom-3.5 end-2.5 mr-1 cursor-pointer rounded-3xl bg-gray-200 p-1 text-black"
                                    onClick={() => {
                                      setInputValue('');
                                      setSearchCities([]);
                                    }}
                                  />
                                ) : null}
                              </div>
                            </div>

                            {inputValue ? (
                              <ScrollArea className="mr-2 h-[70vh]  w-full select-none">
                                <div className="flex flex-col p-1">
                                  {searchCities.length >= 1 ? (
                                    searchCities.map((city, index) => (
                                      <DrawerClose
                                        key={index}
                                        onClick={() => {
                                          setSearchState((prevState) => ({
                                            ...prevState,
                                            location: city.city,
                                          }));
                                          MobileSearchDisplay('dates');
                                        }}
                                        className={`flex cursor-pointer items-center space-x-3 rounded-xl p-2 text-sm font-semibold hover:bg-gray-200/70  ${searchState.location == city.city ? 'bg-gray-200' : ''} `}
                                      >
                                        <MapPin
                                          size={32}
                                          className="rounded-xl bg-gray-100 p-1 text-gray-600 "
                                        />
                                        <span>{`${city.city} , ${city.state}`}</span>
                                      </DrawerClose>
                                    ))
                                  ) : (
                                    <div className="flex items-center space-x-3 rounded-xl p-2 text-sm font-semibold ">
                                      <MapPin
                                        size={32}
                                        className="rounded-3xl bg-gray-300 p-1 "
                                      />
                                      <span>No Results Found</span>
                                    </div>
                                  )}
                                </div>
                              </ScrollArea>
                            ) : null}
                          </div>
                        </DrawerContent>
                      </Drawer>

                      <div
                        className="flex overflow-auto pt-3"
                        style={{
                          overflow: 'auto',
                          scrollbarWidth: 'none' /* For Firefox */,
                          '-ms-overflow-style':
                            'none' /* For Internet Explorer and Edge */,
                        }}
                      >
                        {topcities.map((city, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setSearchState((prevState) => ({
                                ...prevState,
                                location: city.value,
                              }));
                              MobileSearchDisplay('dates');
                            }}
                            className="group flex h-full w-max cursor-pointer flex-col space-y-1 rounded-xl p-2 hover:bg-gray-200/70"
                          >
                            {/* <div className="h-24 w-24 rounded-xl bg-gray-200"></div> */}
                            <img
                              src={city.img}
                              alt={city.title}
                              className="h-full min-h-24 w-full min-w-24 rounded-xl border border-gray-300 bg-gray-100 object-cover object-center group-active:scale-95 "
                            />
                            <span className="text-xs font-semibold">
                              {city.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key="location"
                    className={`flex w-full justify-between rounded-xl bg-white px-5 py-5 shadow-sm shadow-gray-300`}
                    onClick={() => MobileSearchDisplay('location')}
                  >
                    <span className="text-sm font-semibold text-gray-500">
                      Where
                    </span>

                    <span className="text-sm font-semibold ">
                      {' '}
                      {searchState.location
                        ? searchState.location.charAt(0).toUpperCase() +
                          searchState.location.slice(1)
                        : `I'm Flexible`}
                    </span>
                  </div>
                )}

                {activeMobileSearchDiv === 'dates' ? (
                  <div className="h-auto w-full rounded-2xl bg-white px-5 py-3 shadow-md shadow-gray-300">
                    <span className="text-start text-[20px] font-semibold">
                      When’s your trip?
                    </span>
                    <div className="flex w-full  flex-col items-center  pt-3">
                      <Calendar
                        initialFocus
                        mode="range"
                        pagedNavigation={true}
                        defaultMonth={date?.from}
                        fromMonth={new Date()}
                        disabled={{ before: new Date() }}
                        selected={date}
                        onSelect={setDate}
                        className="w-full"
                      />

                      <div className="flex w-full items-center justify-between px-1 pt-3">
                        <span
                          onClick={() => {
                            setSearchState({
                              location: '',
                              checkin: '',
                              checkout: '',
                              adults: 0,
                              children: 0,
                              infants: 0,
                              pets: 0,
                            });
                            setDate(null);
                            MobileSearchDisplay('guests');
                          }}
                          className="font-semibold underline underline-offset-4"
                        >
                          Skip
                        </span>
                        <button
                          onClick={() => {
                            date ? MobileSearchDisplay('guests') : null;
                          }}
                          disabled={!date}
                          className="rounded-xl bg-gray-800 px-6 py-2.5 text-white"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key="dates"
                    className={` flex w-full justify-between rounded-xl bg-white px-5 py-5 shadow-sm shadow-gray-300`}
                    onClick={() => MobileSearchDisplay('dates')}
                  >
                    <span className="text-sm font-semibold text-gray-500">
                      When
                    </span>

                    <span className="text-sm font-semibold ">
                      {searchState.checkin && searchState.checkout
                        ? formatRangeDate(
                            searchState.checkin,
                            searchState.checkout,
                          )
                        : 'Add Dates'}
                    </span>
                  </div>
                )}
                {activeMobileSearchDiv === 'guests' ? (
                  <div className="h-auto w-full rounded-2xl bg-white px-5 py-3 shadow-md shadow-gray-300">
                    <span className="text-start text-[20px] font-semibold">
                      {"Who's coming?"}
                    </span>
                    <div className=" space-y-3 pt-3">
                      <div className="w-full">
                        <div className="flex w-full justify-between">
                          <div className="flex flex-col">
                            <span className="text-base font-medium">
                              Adults
                            </span>
                            <span className="text-sm font-light">Age 13+</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              disabled={searchState.adults === 0}
                              className="hover:text-accent-foregroun rounded-full border border-input bg-background p-2 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-30"
                              onClick={() => {
                                if (searchState.adults > 0) {
                                  setAdults(searchState.adults - 1);
                                }
                              }}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-4 text-center text-base font-light tabular-nums">
                              {searchState.adults}
                            </span>
                            <button
                              disabled={
                                searchState.adults + searchState.children >= 16
                              }
                              className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                              onClick={() => setAdults(searchState.adults + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="flex w-full justify-between">
                          <div className="flex flex-col">
                            <span className="text-base font-medium">
                              Children
                            </span>
                            <span className="text-sm font-light">
                              Ages 2-12
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              disabled={searchState.children === 0}
                              className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                              onClick={() => {
                                if (searchState.children > 0) {
                                  setChildren(searchState.children - 1);
                                }
                              }}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-4 text-center text-base font-light tabular-nums">
                              {searchState.children}
                            </span>
                            <button
                              disabled={
                                searchState.adults + searchState.children >= 16
                              }
                              className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                              onClick={() =>
                                setChildren(searchState.children + 1)
                              }
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="flex w-full justify-between">
                          <div className="flex flex-col">
                            <span className="text-base font-medium">
                              Infants
                            </span>
                            <span className="text-sm font-light">Under 2</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              disabled={searchState.infants === 0}
                              className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                              onClick={() => {
                                if (searchState.infants > 0) {
                                  setInfants(searchState.infants - 1);
                                }
                              }}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-4 text-center text-base font-light tabular-nums">
                              {searchState.infants}
                            </span>
                            <button
                              disabled={searchState.infants >= 5}
                              className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                              onClick={() => {
                                if (searchState.infants < 5) {
                                  setInfants(searchState.infants + 1);
                                }
                              }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="flex w-full justify-between">
                          <div className="flex flex-col">
                            <span className="text-base font-medium">Pets</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              disabled={searchState.pets === 0}
                              className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                              onClick={() => {
                                if (searchState.pets > 0) {
                                  setPets(searchState.pets - 1);
                                }
                              }}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-4 text-center text-base font-light tabular-nums">
                              {searchState.pets}
                            </span>
                            <button
                              disabled={searchState.pets >= 5}
                              className="rounded-full border border-input bg-background p-2 hover:bg-accent hover:text-accent-foreground  disabled:cursor-not-allowed disabled:opacity-30"
                              onClick={() => {
                                if (searchState.pets < 5) {
                                  setPets(searchState.pets + 1);
                                }
                              }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key="guests"
                    className={`flex w-full justify-between rounded-xl bg-white px-5 py-5 shadow-sm shadow-gray-300`}
                    onClick={() => MobileSearchDisplay('guests')}
                  >
                    <span className="text-sm font-semibold text-gray-500">
                      Who
                    </span>

                    <span className="text-sm font-semibold ">
                      {' '}
                      {Number(searchState.adults) +
                        Number(searchState.children) >=
                      16
                        ? `16+  Guests`
                        : Number(searchState.adults) +
                              Number(searchState.children) >
                            1
                          ? Number(searchState.adults) +
                            Number(searchState.children) +
                            ' Guests'
                          : Number(searchState.adults) +
                                Number(searchState.children) ===
                              1
                            ? '1 Guest'
                            : 'Add Guests'}
                    </span>
                  </div>
                )}
              </div>

              <div className="fixed bottom-0 flex h-auto w-full items-center justify-between border-t border-gray-300 bg-white px-5 py-3 ">
                <span
                  className="text-base font-semibold underline underline-offset-4"
                  onClick={() => {
                    setSearchState({
                      location: '',
                      checkin: '',
                      checkout: '',
                      adults: 0,
                      children: 0,
                      infants: 0,
                      pets: 0,
                    });
                    setDate(null);
                  }}
                >
                  Clear all
                </span>
                <DrawerClose
                  onClick={() => handleSearch()}
                  className="flex items-center space-x-1 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white "
                >
                  <Search size={24} />
                  <span>Search</span>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="pt-5 md:hidden">
          <Sort />
        </div>
      </div>
    </>
  );
}
