"use client";
import React, { useState } from "react";

export default function settingsPage() {
  const [previewSrc, setPreviewSrc] = useState<string>("");

  const loadFile = (event: any) => {
    const reader = new FileReader();
    reader.onload = function () {
      if (event.target.files[0].type.match("image.*")) {
        setPreviewSrc(reader.result as string);
      } else {
        event.target.value = "";
        alert("Please select a valid image");
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  return (
    <>
      <div className="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
        <div className="md:w-2/3 w-full">
          <div className="py-8 mb-4 px-16 clearfix">
            <label
              htmlFor="photo"
              className="text-sm text-gray-600 w-full block"
            >
              Photo
            </label>
            <img
              className="rounded-full w-16 h-16 border-4 mt-2 border-gray-200 float-left"
              id="photo"
              src={previewSrc}
              alt="photo"
            />
            <div className="bg-gray-200 text-gray-500 text-xs mt-5 ml-3 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
              <input
                type="file"
                name="photo"
                onChange={loadFile}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />{" "}
              Change Photo
            </div>
          </div>

          <div className="py-4 mt-12 px-16">
            <label htmlFor="name" className="text-sm text-gray-600">
              Name
            </label>
            <input
              className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
              type="text"
              name="name"
            />
          </div>

          <div className="py-4 px-16">
            <label htmlFor="email" className="text-sm text-gray-600">
              Email Address
            </label>
            <input
              className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
              type="email"
              name="email"
            />
          </div>
          <div className="py-4 px-16">
            <label htmlFor="email" className="text-sm text-gray-600">
              About
            </label>

            <textarea
              className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <hr className="border-gray-200" />
        </div>
      </div>
    </>
  );
}
