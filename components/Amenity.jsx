import React from 'react'

export default function Amenity({ formData,amenity, name, onChange }) {
  return (
    <li key={amenity.value}>
      <input
        className="peer hidden"
        required=""
        type="checkbox"
        id={amenity.value}
        name={name}
        value={amenity.value}
        checked={formData[name] && formData[name].includes(amenity.value)}
        onChange={onChange}
      />
      <label
        htmlFor={amenity.value}
        className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 px-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:bg-blue-100 peer-checked:text-gray-600 "
      >
        <div className="flex items-center space-x-3 ">
          <img
            src={amenity.image}
            alt={amenity.title}
            className="h-8 w-8 rounded-md bg-white p-1  "
          />
          <div className="w-full text-xs font-semibold text-black md:text-sm ">
            {amenity.title}
          </div>
        </div>
      </label>
    </li>
  );
}
