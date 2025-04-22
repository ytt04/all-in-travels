import React, { useEffect, useState } from "react";
import axios from "axios";

const InstagramGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.test.interactiva.net.co/api/get-feed_instagram/")
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error al obtener imágenes:", error));
  }, []);

  return (
    <section className="container mx-auto px-4 py-10 text-center">
      {/* Título y descripción */}
      <h2 className="text-xl md:text-2xl font-bold text-yellow-600 tracking-wider uppercase">
        Nosotros
      </h2>
      <p className="text-gray-700 mt-3 max-w-3xl mx-auto">
        Un copy cercano como hablándole a un amigo. Lorem ipsum dolor sit amet, consectetur 
        adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
      </p>

      {/* Galería de imágenes */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {images.slice(0, 4).map((image, index) => (
          <div key={image.id} className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={`https://api.test.interactiva.net.co${image.image}`}
              alt={`Instagram ${image.id}`}
              className="w-full h-60 object-cover transition-transform transform hover:scale-105 duration-300"
            />

            {/* SVG de Instagram en la primera imagen */}
            {index === 0 && (
              <div className="absolute left-2 top-2 bg-white p-2 rounded-full shadow-md">
                <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
                </svg>
              </div>
            )}

            {/* SVG de flecha en la última imagen */}
            {index === 3 && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 17l5-5-5-5v10z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botón de Ver más */}
      <div className="mt-6">
        <a
          href="https://www.instagram.com/tu_cuenta_instagram/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition"
        >
          Ver más en Instagram
        </a>
      </div>
    </section>
  );
};

export default InstagramGallery;
