import React, { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {
  const [banner, setBanner] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Obtener el banner
    axios
      .get("https://api.test.interactiva.net.co/api/get-banners/")
      .then((response) => {
        if (response.data.length > 0) {
          setBanner(`https://api.test.interactiva.net.co${response.data[0].image}`);
        }
      })
      .catch((error) => console.error("Error al obtener el banner:", error));

    // Obtener las categorías
    axios
      .get("https://api.test.interactiva.net.co/api/get-categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  return (
    <section
      className="relative flex flex-col justify-center items-center text-center text-white h-[65vh] sm:h-[70vh] md:h-[75vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenido */}
      <div className="relative z-10 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          THE TRAVEL
        </h1>
        <h2 className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-widest text-yellow-400 font-semibold">
          EXPERIENCE
        </h2>

        {/* Tarjetas de categorías */}
        <div className="mt-8 w-full max-w-5xl">
          {categories.length > 0 ? (
            <>
              {/* Modo móvil: solo los títulos */}
              <ul className="block sm:hidden space-y-2">
                {categories.map((category) => (
                  <li key={category.id} className="text-lg font-semibold text-yellow-400">
                    {category.name}
                  </li>
                ))}
              </ul>

              {/* Modo tablet y desktop: Tarjetas con imágenes */}
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={category.url_front}
                    className="bg-white bg-opacity-90 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
                  >
                    <img
                      src={`https://api.test.interactiva.net.co${category.image_banner}`}
                      alt={category.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 text-black font-semibold text-center">{category.name}</div>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <p className="text-white text-lg">Cargando categorías...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
