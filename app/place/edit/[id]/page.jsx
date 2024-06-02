'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import Indian_states_cities_list from 'indian-states-cities-list';
import { PawPrint, LoaderCircle } from 'lucide-react';
import PlaceImageUpload from '@/components/PlaceImageUpload';
import Amenity from '@/components/Amenity';
import categories from '@/components/config/categories';
import {
  amenities,
  standout_amenities,
  safety_amenities,
} from '@/components/config/amanities';
import houseRules from '@/components/config/houserules';
import { useRouter, useParams } from 'next/navigation';
import SelectScroll from '@/components/SelectScroll';
import Image from 'next/image';

export default function EditPlace() {
  const [loading, setLoading] = useState(false);
  const [placeLoading, setplaceLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [starredPhoto, setStarredPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [photosUploading, setPhotosUploading] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  // const [selectedState, setSelectedState] = useState('');
  const { data: session } = useSession();

  const ownerId = session?.user?.id;
  const router = useRouter();
  const [formdata, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    state: '',
    city: '',
    street: '',
    photos: [],
    category: [],
    necessary_amenities: [],
    standout_amenities: [],
    safety_amenities: [],
    price: null,
    listTillDate: null,
    maxGuests: 0,
    petsAllowed: false,
    checkInTime: null,
    checkOutTime: null,
    minimumStay: '1',
    smokingNotAllowed: false,
    partiesNotAllowed: false,
    photographyNotAllowed: false,
    SelfcheckIn: false,

    additionalRules: '',
    numberOfRooms: null,
  });
  // //console.log(formdata);
  const states = Indian_states_cities_list.STATES_OBJECT;

  const handleStateChnage = (value) => {
    setFormData({ ...formdata, state: value });
  };

  // const cities = Indian_states_cities_list.STATE_WISE_CITIES[formdata.state] || [];

  const [cities, setCities] = useState([]);
  // //console.log((formdata.state).replace(' ', ''));
  useEffect(() => {
    if (formdata.state) {
      setCities(
        Indian_states_cities_list.STATE_WISE_CITIES[
          formdata.state.replace(' ', '')
        ],
      );
    }
  }, [formdata.state]);

  const handleCitiesChnage = (value) => {
    setFormData({ ...formdata, city: value });
  };

  const { id } = useParams();

  const fetchPlace = useCallback(async () => {
    setplaceLoading(true);
    const res = await fetch(`/api/places/search?id=${id}`);
    const place = await res.json();
    setFormData((prevState) => ({
      ...prevState,
      ...place.place,
    }));
    setplaceLoading(false);
  }, [id]); // add any other dependencies here

  useEffect(() => {
    fetchPlace();
  }, [fetchPlace]);

  const isValidPlace = () => {
    const fields = [
      { value: formdata.title, name: 'Title', min: 10, max: 100 },
      {
        value: formdata.description,
        name: 'Description',
        min: 100,
        max: 2500,
        isWordCount: true,
      },
      { value: formdata.address, name: 'Address' },
      { value: formdata.state, name: 'State' },
      { value: formdata.city, name: 'City' },
      { value: formdata.street, name: 'Street', optional: true },
      { value: formdata.category, name: 'Category' },
      {
        value: formdata.necessary_amenities,
        name: 'Necessary amenities',
        optional: true,
      },
      {
        value: formdata.standout_amenities,
        name: 'Standout amenities',
        optional: true,
      },
      {
        value: formdata.safety_amenities,
        name: 'Safety amenities',
        optional: true,
      },
      { value: formdata.photos, name: 'Photos', min: 1 },
      { value: formdata.maxGuests, name: 'Max guests' },
      { value: formdata.price, name: 'Price' },
      { value: formdata.listTillDate, name: 'List Till Date', optional: true },
      { value: formdata.petsAllowed, name: 'Pets Allowed', optional: true },
      { value: formdata.checkInTime, name: 'Check In Time', optional: true },
      { value: formdata.checkOutTime, name: 'Check Out Time', optional: true },
      {
        value: formdata.smokingNotAllowed,
        name: 'Smoking Not Allowed',
        optional: true,
      },
      {
        value: formdata.partiesNotAllowed,
        name: 'Parties Not Allowed',
        optional: true,
      },
      {
        value: formdata.photographyNotAllowed,
        name: 'Photography Not Allowed',
        optional: true,
      },
      { value: formdata.SelfcheckIn, name: 'Self Check In', optional: true },
      {
        value: formdata.additionalRules,
        name: 'Additional Rules',
        optional: true,
      },
      { value: formdata.numberOfRooms, name: 'Number Of Rooms' },
      { value: formdata.minimumStay, name: 'Minimum Stay' },
    ];

    for (let field of fields) {
      if (
        !field.optional &&
        (field.value === undefined ||
          field.value === null ||
          (typeof field.value === 'string' && !field.value.trim()))
      ) {
        toast.error(`${field.name} can't be empty!`);
        return false;
      }

      const length = field.isWordCount
        ? field.value.split(/\s+/).length
        : typeof field.value === 'string'
          ? field.value.length
          : undefined;

      if (field.min && length < field.min) {
        toast.error(
          `${field.name} can't be less than ${field.min} ${field.isWordCount ? 'words' : 'characters'}`,
        );
        return false;
      }

      if (field.max && length > field.max) {
        toast.error(
          `${field.name} can't be more than ${field.max} ${field.isWordCount ? 'words' : 'characters'}`,
        );
        return false;
      }
    }

    if (
      formdata.checkInTime &&
      formdata.checkOutTime &&
      formdata.checkInTime >= formdata.checkOutTime
    ) {
      toast.error('Check In Time must be less than Check Out Time');
      return false;
    }

    if (formdata.listTillDate && formdata.listTillDate < new Date()) {
      toast.error('List Till Date must be a future date');
      return false;
    }
    if (formdata.minimumStay < 1) {
      toast.error('Minimum Stay must be atleast 1 day');
      return false;
    }
    if (formdata.minimumStay > 30) {
      toast.error('Minimum Stay must be less than 30 days');
      return false;
    }
    if (formdata.numberOfRooms < 1) {
      toast.error('Number of rooms must be atleast 1');
      return false;
    }
    if (formdata.numberOfRooms > 10) {
      toast.error('Number of rooms must be less than 10');
      return false;
    }
    if (formdata.price < 100) {
      toast.error('Price must be atleast 100');
      return false;
    }

    return true;
  };

  const handleChange = (key, value) => {
    if (
      [
        'necessary_amenities',
        'standout_amenities',
        'safety_amenities',
      ].includes(key)
    ) {
      setFormData((prevState) => ({
        ...prevState,
        [key]: prevState[key].includes(value)
          ? prevState[key].filter((amenity) => amenity !== value)
          : [...prevState[key], value],
      }));
    } else if (key === 'category') {
      setFormData((prevState) => ({
        ...prevState,
        [key]: prevState[key].includes(value)
          ? prevState[key].filter((category) => category !== value)
          : [...prevState[key], value],
      }));
    } else {
      setFormData({ ...formdata, [key]: value });
    }
    if (typeof value === 'string') {
      const wordCount = (value.match(/\b\w+\b/g) || []).length;
      setWordCount(wordCount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPlace()) {
      return;
    }
    setLoading(true);
    // Add ownerId to formdata
    formdata.ownerId = ownerId;
    formdata.maxGuests = parseInt(formdata.maxGuests);

    // prepare the data to send to the server and send a post request to /api/places/create

    const id = formdata.id;
    const res = await fetch(`/api/places/edit/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    });
    if (!res.ok) {
      toast.error('Failed to update place');
      setLoading(false);
      return;
    } else {
      toast.success('Place updated successfully');
      setLoading(false);
    }
  };

  return (
    <>
      {placeLoading ? (
        <div>
          <div className="flex min-h-[90vh] flex-col">
            <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
              <div className="flex justify-center">
                <div
                  className="inline-block size-9 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              label="Title"
              name="title"
              value={formdata.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Short and Catchy Title for your place"
              type="text"
              className="my-3"
            />
            <div>
              <Textarea
                label="Description"
                name="description"
                value={formdata.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Please describe the place in detail"
                rows="15"
                className={`my-3`}
              />
            </div>
            <p className="text-right text-sm text-gray-500 ">
              {wordCount} / 2500 words
            </p>
            <Input
              label="Address"
              name="address"
              value={formdata.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Please state the address of this place"
              type="text"
              className="my-3"
            />
            {/* <Input
              label="State"
              name="state"
              value={formdata.state}
              onChange={(e) => handleChange('state', e.target.value)}
              placeholder="Please state the state in which the place is located"
              type="text"
              className="my-3"
            /> */}

            <SelectScroll
              items={states}
              setSelectedData={handleStateChnage}
              label="State"
              placeholder={formdata.state || 'Select State'}
              className="my-3"
              type="states"
            />

            <SelectScroll
              items={cities}
              setSelectedData={handleCitiesChnage}
              label="City"
              placeholder={formdata.city || 'Select City'}
              className="my-3  disabled:cursor-none disabled:opacity-50  "
              disabled={formdata.state === ''}
              type="cities"
            />

            {/* <Input
              label="City"
              name="city"
              value={formdata.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Please state the city of this place"
              type="text"
              className="my-3"
            /> */}
            <Input
              label="Street"
              name="street"
              value={formdata.street}
              onChange={(e) => handleChange('street', e.target.value)}
              placeholder="Please state the street of this place"
              type="text"
              className="my-3"
            />
            <PlaceImageUpload
              files={files}
              setFiles={setFiles}
              photoLink={photoLink}
              setPhotoLink={setPhotoLink}
              addedPhotos={addedPhotos}
              setAddedPhotos={setAddedPhotos}
              starredPhoto={starredPhoto}
              setStarredPhoto={setStarredPhoto}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              photosUploading={photosUploading}
              setPhotosUploading={setPhotosUploading}
              photos={formdata.photos}
              setFormData={setFormData}
              formdata={formdata}
            />
            <div className="py-3">
              <label
                htmlFor="Category"
                className="mb-2 block text-base font-semibold text-gray-900 md:text-lg"
              >
                {' '}
                Category{' '}
              </label>

              <ul class="grid w-full  grid-cols-2 gap-6 md:grid-cols-5 lg:grid-cols-6">
                {categories.map((category) => (
                  <li key={category.value}>
                    <input
                      className="peer hidden"
                      required=""
                      type="checkbox"
                      id={category.value}
                      name="category"
                      value={category.value}
                      checked={formdata.category.includes(category.value)}
                      onChange={(e) => handleChange('category', e.target.value)}
                    />
                    <label
                      htmlFor={category.value}
                      className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
                    >
                      <div className="flex items-center space-x-3 ">
                        <Image
                          height={32}
                          width={32}
                          src={category.icon}
                          alt={category.name}
                          className="h-8 w-8 rounded-md bg-white p-1  "
                        />
                        <div className="w-full text-xs font-semibold text-black md:text-sm ">
                          {category.name}
                        </div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-3">
              <label
                htmlFor="Amanities"
                className="my-3 mb-5 block text-lg font-semibold text-gray-900  md:text-xl"
              >
                Amanities
              </label>

              <div>
                <div className="py-3 font-semibold  text-gray-700 ">
                  Necessary Amanities
                </div>
                <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {amenities.map((amenity) => (
                    <Amenity
                      key={amenity.value}
                      amenity={amenity}
                      formData={formdata}
                      name="necessary_amenities"
                      onChange={(e) =>
                        handleChange('necessary_amenities', e.target.value)
                      }
                    />
                  ))}
                </ul>
              </div>

              <div>
                <div className="py-3 font-semibold  text-gray-700 ">
                  {' '}
                  Standout Amanities
                </div>
                <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {standout_amenities.map((amenity) => (
                    <Amenity
                      key={amenity.value}
                      amenity={amenity}
                      formData={formdata}
                      name="standout_amenities"
                      onChange={(e) =>
                        handleChange('standout_amenities', e.target.value)
                      }
                    />
                  ))}
                </ul>
              </div>

              <div>
                <div className="py-3 font-semibold  text-gray-700 ">
                  {' '}
                  Safety Amanities
                </div>
                <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {safety_amenities.map((amenity) => (
                    <Amenity
                      key={amenity.value}
                      amenity={amenity}
                      name="safety_amenities"
                      formData={formdata}
                      onChange={(e) =>
                        handleChange('safety_amenities', e.target.value)
                      }
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-start justify-between py-3 md:flex-row md:items-center">
              <div className="mb-3 w-full md:mb-0 md:w-1/2 md:pr-2">
                <Input
                  label="Max Guests"
                  name="maxGuests"
                  value={formdata.maxGuests}
                  onChange={(e) => handleChange('maxGuests', e.target.value)}
                  placeholder=""
                  type="number"
                  className="w-full"
                />
              </div>

              <div className="w-full md:w-1/2 md:pl-2">
                <Input
                  label="Price"
                  name="price"
                  value={formdata.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder=""
                  type="number"
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-2">
                <Input
                  label="No. of Rooms"
                  name="numberOfRooms"
                  value={formdata.numberOfRooms}
                  onChange={(e) =>
                    handleChange('numberOfRooms', e.target.value)
                  }
                  placeholder=""
                  type="number"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3 py-3">
              <div className="flex items-center space-x-1 text-base font-bold md:text-lg ">
                <PawPrint size={24} className="h-6 w-6" />
                <span>Pets Allowed</span>
              </div>
              <div className="flex  items-start space-x-3 ">
                <label
                  htmlFor="petsAllowedYes"
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600"
                >
                  <input
                    type="radio"
                    id="petsAllowedYes"
                    name="petsAllowed"
                    value={true}
                    checked={formdata.petsAllowed === true}
                    onChange={(e) => handleChange('petsAllowed', true)}
                    className="form-radio mr-2 h-5 w-5 text-blue-500"
                  />
                  Yes
                </label>
                <label
                  htmlFor="petsAllowedNo"
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600"
                >
                  <input
                    type="radio"
                    id="petsAllowedNo"
                    name="petsAllowed"
                    value={false}
                    checked={formdata.petsAllowed === false}
                    onChange={(e) => handleChange('petsAllowed', false)}
                    className="form-radio mr-2 h-5 w-5 text-blue-500"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="py-3">
              <div className="my-3 mb-5 block text-lg font-semibold text-gray-900 md:text-xl">
                Extra House Rules
              </div>
              <div className="py-3 font-semibold  text-gray-700 ">
                {' '}
                During stay
              </div>
              <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {houseRules.map((rule) => (
                  <li key={rule.id}>
                    <input
                      className="peer hidden"
                      type="checkbox"
                      id={rule.value}
                      name={rule.name}
                      checked={formdata[rule.name]} // Changed this line
                      onChange={(e) =>
                        handleChange(rule.name, e.target.checked)
                      }
                    />
                    <label
                      htmlFor={rule.value}
                      className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
                    >
                      <div className="flex items-center space-x-3 ">
                        <Image
                          height={32}
                          width={32}
                          src={rule.image}
                          alt={rule.title}
                          className="h-8 w-8 rounded-md bg-white p-1  "
                        />
                        <div className="w-full text-xs font-semibold text-black md:text-sm ">
                          {rule.title}
                        </div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="flex w-full items-center justify-start space-x-10 py-3">
                <div className=" w-full  max-w-max font-semibold text-gray-700">
                  {' '}
                  Minium Stay (in days)
                </div>
                <Input
                  className="w-full max-w-40"
                  type="number"
                  name="minimumStay"
                  value={formdata.minimumStay}
                  onChange={(e) => handleChange('minimumStay', e.target.value)}
                  placeholder="Enter the minimum stay duration"
                />
              </div>
            </div>
            <div className="py-3">
              <div className="py-3 font-semibold  text-gray-700 ">
                {' '}
                Other Rules
              </div>

              <input
                className="peer hidden"
                required=""
                type="checkbox"
                id="SelfCheckIn"
                value={formdata.SelfcheckIn}
                checked={formdata.SelfcheckIn}
                onChange={(e) => handleChange('SelfcheckIn', e.target.checked)}
              />
              <label
                htmlFor="SelfCheckIn"
                className="inline-flex w-auto cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
              >
                <div className="flex items-center space-x-3 ">
                  <Image
                    height={32}
                    width={32}
                    src="/pictures/houserules/door.svg"
                    alt=""
                    className="h-8 w-8 rounded-md bg-white p-1  "
                  />
                  <div className="w-full text-xs font-semibold text-black md:text-sm ">
                    Self check-in
                  </div>
                </div>
              </label>

              <div className="py-3 font-semibold  text-gray-700 ">
                {' '}
                Extra Rules
              </div>

              <Textarea
                className="w-full"
                label="House Rules"
                name="additionalRules"
                value={formdata.additionalRules}
                onChange={(e) =>
                  handleChange('additionalRules', e.target.value)
                }
                rows="5"
                placeholder="Enter your additional house rules here ...  "
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-40  select-none items-center justify-center gap-x-2 rounded-lg border-2 border-blue-500 bg-white px-5 py-3 text-base text-blue-600 shadow-sm hover:bg-blue-50  disabled:pointer-events-none disabled:cursor-none disabled:opacity-50"
            >
              {loading ? (
                <LoaderCircle size={24} className="animate-spin" />
              ) : (
                'Update Place'
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
