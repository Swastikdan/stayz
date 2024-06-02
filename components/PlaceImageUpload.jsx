'use client';
import React, { useEffect } from 'react';
import { Star, Trash2, Expand, Link } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/Input';
import NextImage from 'next/image';
export default function PlaceImageUpload({
  files,
  setFiles,
  photoLink,
  setPhotoLink,
  addedPhotos,
  setAddedPhotos,
  starredPhoto,
  setStarredPhoto,
  isUploading,
  setIsUploading,
  photosUploading,
  setPhotosUploading,
  photos,
  setFormData,
  formdata,
}) {
  useEffect(() => {
    if (photos && photos.length > 0) {
      setAddedPhotos(photos);
    }
  }, [photos, setAddedPhotos]);

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const links = photoLink.split(',').map((link) => link.trim());
      setPhotosUploading(links.length);
      const res = await fetch('/api/upload/upload-by-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: links }), // Send the array of links to the server
      });

      if (!res.ok) throw new Error('Failed to upload photo');

      const filenames = await res.json(); // This should now be an array of URLs

      // Handle the array of URLs
      filenames.forEach((filename) => {
        setAddedPhotos((prev) => [...prev, filename]);
        setFormData((prev) => ({
          ...prev,
          photos: [...prev.photos, filename],
        }));
      });

      setPhotoLink('');
      // Set the number of photos uploading
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const files = Array.from(
      e.dataTransfer ? e.dataTransfer.files : e.target.files,
    );
    const validFiles = [];

    for (const file of files) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise((resolve) => {
        img.onload = () => {
          validFiles.push(file);
          resolve();
        };
      });
    }
    setPhotosUploading(validFiles.length);
    if (validFiles.length > 0) {
      try {
        await addPhotoFromLocal(validFiles);
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }

    setIsUploading(false);
  };

  const addPhotoFromLocal = async (files) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('photos', file));

      const res = await fetch('/api/upload/upload-local-files', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload photo');

      const data = await res.json();
      setAddedPhotos((prev) => [...prev, ...data]);
      setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...data] }));
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStarClick = (photo) => {
    // Create a copy of the addedPhotos array and the photos array in formData
    let newAddedPhotos = [...addedPhotos];
    let newPhotos = [...formdata.photos];

    // Find the index of the photo that was clicked
    const addedIndex = newAddedPhotos.findIndex((p) => p === photo);
    const photosIndex = newPhotos.findIndex((p) => p === photo);

    // If the photo is in the arrays, remove it
    if (addedIndex !== -1) {
      newAddedPhotos.splice(addedIndex, 1);
    }
    if (photosIndex !== -1) {
      newPhotos.splice(photosIndex, 1);
    }

    // Add the photo to the start of the arrays
    newAddedPhotos.unshift(photo);
    newPhotos.unshift(photo);

    // Update the addedPhotos, formData and starredPhoto state
    setAddedPhotos(newAddedPhotos);
    setFormData((prev) => ({ ...prev, photos: newPhotos }));
    setStarredPhoto(photo);
  };
  const handleTrashClick = (photo) => {
    setAddedPhotos(addedPhotos.filter((p) => p !== photo));
    if (photo === starredPhoto) {
      setStarredPhoto(null);
    }
  };
  return (
    <div className="py-3">
      <span
        htmlFor="Images of the Property"
        className="mb-2 block text-lg font-semibold text-gray-900  md:text-xl"
      >
        Images of the Property
      </span>
      <div>
        <div className="w-full">
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="photos"
              className="sr-only  text-sm font-medium text-gray-900 dark:text-white"
            >
              Add photo by link
            </label>
            <span className=" text-xs font-light md:text-sm">
              The more the no. of photos uploaded the better it is{' '}
              <span className="font-medium text-blue-600">
                (Minimum 5 Images)
              </span>{' '}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <Input
              name="photoLink"
              type="text"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
              placeholder="Add using a link"
              disabled={isUploading}
              className="mr-2 w-full disabled:cursor-not-allowed disabled:select-none disabled:opacity-50" 
            />
            <button
              type="button"
              className="flex-shrink-0 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white hover:opacity-95 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:select-none disabled:opacity-50"
              disabled={isUploading}
              onClick={addPhotoByLink}
            >
              Add Photos
            </button>
          </div>

          <span className="py-1 text-[10px] font-light text-gray-700 md:text-xs">
            {` To upload multiple images using links, separate them with a comma (
            ' , ' ). For example: https://link1.jpg,https://link2.png`}
          </span>
        </div>
        <div class="grid grid-cols-1 gap-3  py-5 pt-7 sm:grid-cols-3 lg:grid-cols-4  ">
          <div
            className={`flex w-full items-center justify-center ${isUploading ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileChange}
          >
            <label
              htmlFor="photos"
              className={`dark:hover:bg-bray-800 flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-500 bg-gray-50 hover:bg-gray-100 ${isUploading ? 'pointer-events-none' : ''} sm:h-40 `}
            >
              <div
                type="button"
                className={`flex flex-col items-center justify-center pb-6 pt-5 ${isUploading ? 'pointer-events-none' : ''}`}
              >
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  PNG, JPG (MIN. 600x400px)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                name="photos"
                id="photos"
                multiple
                disabled={isUploading}
                onChange={handleFileChange}
              />
            </label>
          </div>
          {addedPhotos.map((photo, index) => (
            <div
              key={photo}
              className="group relative block h-44 w-full overflow-hidden rounded-xl  bg-gray-100 sm:h-40 sm:border-2"
            >
              <NextImage
                height={400}
                width={600}
                src={photo.replace(
                  '/upload/',
                  '/upload/w_600,h_400,c_fill,g_auto/q_auto/f_auto/',
                )}
                loading="lazy"
                alt="Photo by Rachit Tank"
                className="h-full w-full object-cover object-center"
              />
              <div
                className={`py-.5 absolute left-0 top-0 m-2 flex items-center space-x-2  ${index === 0 && ' rounded-full border-2 border-gray-500 bg-white p-1 px-2'}`}
              >
                <button
                  className={` cursor-pointer rounded-full bg-gray-100 p-2 duration-150  active:scale-100 sm:p-1.5 sm:hover:scale-[.9]    ${index === 0 && 'text-yellow-400'}   `}
                  onClick={() => handleStarClick(photo)}
                  disabled={index === 0}
                >
                  <Star
                    size={20}
                    fill={
                      index === 0 ? 'rgb(250, 204, 21)' : 'rgb(243, 244, 246)'
                    }
                    className="h-6 w-6 sm:h-5 sm:w-5"
                  />
                </button>{' '}
                {index === 0 && (
                  <span class="text-xs font-light ">Cover Image</span>
                )}
              </div>
              <button
                className="absolute right-0 top-0 m-2 cursor-pointer rounded-full bg-gray-100 fill-black p-2 duration-150 hover:bg-red-100 hover:text-red-500 active:scale-100 sm:p-1.5 sm:hover:scale-[.9]"
                onClick={() => handleTrashClick(photo)}
              >
                <Trash2 size={20} className="h-6 w-6 sm:h-5 sm:w-5" />
              </button>
            </div>
          ))}

          {isUploading &&
            Array.from({ length: photosUploading }).map((_, index) => (
              <div
                key={index}
                className="group relative block h-44 w-full  animate-pulse overflow-hidden rounded-xl bg-gray-200 sm:h-40  "
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}
