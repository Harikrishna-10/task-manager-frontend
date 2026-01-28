import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    inputRef.current.value = "";
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative w-24 h-24">
        {/* Avatar */}
        <div
          onClick={() => inputRef.current.click()}
          className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden cursor-pointer border border-gray-200 hover:opacity-90 transition"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <LuUser className="text-4xl text-primary" />
          )}
        </div>

        <button
          type="button"
          onClick={
            previewUrl ? handleRemoveImage : () => inputRef.current.click()
          }
          className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition
            ${previewUrl ? "bg-red-500" : "bg-primary"}`}
        >
          {previewUrl ? <LuTrash size={16} /> : <LuUpload size={16} />}
        </button>
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
