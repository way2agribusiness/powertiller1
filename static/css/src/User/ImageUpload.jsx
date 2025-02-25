import React from 'react';

const ImageUpload = ({ handleFileChange, imagesPreview, removeImage }) => {
    return (
        <div className="space-y-4">
      
        {imagesPreview.length === 0 ? (
          <div className="flex justify-center items-center">
          
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              name="images"
              className="hidden"
              id="file-input"
            />
      
            <label htmlFor="file-input" className="flex flex-col items-center">
              <div
                className="w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center"
              >
                <span className="text-gray-500 text-center">Upload Avatar</span>
              </div>
            </label>
          </div>
        ) : (
          <div className="flex justify-center items-center relative">
        
            <img
              src={imagesPreview[0]}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button
              onClick={() => removeImage(0)}
              className="absolute top-0 right-0 text-red-500 hover:text-red-700 bg-white rounded-full px-2 py-1"
            >
              &times; 
            </button>
          </div>
        )}
      </div>
      
      
      
    );
};

export default ImageUpload;
