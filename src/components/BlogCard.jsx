import React, { useState } from "react";

const BlogCard = ({ blog, isLarge }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const apiBaseURL = "https://api.test.interactiva.net.co";

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 
      ${isLarge ? "lg:col-span-2 lg:row-span-2" : "flex flex-col lg:flex-row"} p-4`}
    >
      {/* Imagen */}
      <img
        src={`${apiBaseURL}${blog.image_cover}`}
        alt={blog.title}
        className={`w-full object-cover ${isLarge ? "h-80" : "h-36 lg:w-40"} rounded-lg`}
      />

      {/* Contenido */}
      <div className="p-4 flex flex-col justify-between">
        <h3 className="font-bold text-gray-800 text-md lg:text-lg">{blog.title}</h3>
        {isLarge && (
          <p className="text-sm text-gray-600 mt-2">
            {showFullDescription
              ? blog.description
              : `${blog.description.slice(0, 100)}...`}
          </p>
        )}

        {/* Botón Leer Más */}
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-[#cb943f] text-sm font-bold hover:underline mt-auto text-right"
        >
          LEER MÁS
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
