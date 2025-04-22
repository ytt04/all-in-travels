import React, { useEffect, useState } from "react";
import axios from "axios";

const Footer = () => {
  const [instagramFeed, setInstagramFeed] = useState([]);
  const baseURL = "https://api.test.interactiva.net.co"; 

  useEffect(() => {
    axios
      .get("https://api.test.interactiva.net.co/api/get-feed_instagram/")
      .then((response) => {
        setInstagramFeed(response.data);
      })
      .catch((error) =>
        console.error("Error obteniendo el feed de Instagram:", error)
      );
  }, []);

  return (
    <footer className="bg-white py-10 px-6 border-t border-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo y redes sociales */}
        <div className="flex flex-col items-center md:items-start">
        <img
            src="https://api.test.interactiva.net.co/media/logo.png"
            alt="Logo"
            className="h-12"
          />
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-tiktok text-2xl"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-youtube text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Menú de navegación */}
        <ul className="text-center md:text-left space-y-2 text-gray-700">
          <li><a href="#" className="hover:text-gray-900">Inicio</a></li>
          <li><a href="#" className="hover:text-gray-900">¿Quiénes somos?</a></li>
          <li><a href="#" className="hover:text-gray-900">Viajes grupales</a></li>
          <li><a href="#" className="hover:text-gray-900">Viajes a la medida</a></li>
          <li><a href="#" className="hover:text-gray-900">Contáctanos</a></li>
          <li><a href="#" className="hover:text-gray-900">Alianzas estratégicas</a></li>
          <li><a href="#" className="hover:text-gray-900">Blogs</a></li>
          <li><a href="#" className="hover:text-gray-900">Términos y condiciones</a></li>
          <li><a href="#" className="hover:text-gray-900">Política de privacidad</a></li>
          <li><a href="#" className="hover:text-gray-900">Registro Nacional de Turismo</a></li>
        </ul>

        {/* Información de contacto */}
        <div className="text-center md:text-right text-gray-700">
          <p className="font-semibold">✉ info@allntravels.com</p>
          <p>📞 +0057 (604) 444 44 88</p>
          <p className="mt-2">
            📍 Carrera 43A # 18 Sur – 135 Of 854, <br />
            Sao Paulo Plaza Medellín - Colombia.
          </p>
        </div>
      </div>

      {/* Instagram Feed */}
      <div className="mt-10 text-center">
        <h4 className="text-xl font-semibold mb-4">Síguenos en Instagram</h4>
        <div className="flex justify-center gap-4 flex-wrap">
          {instagramFeed.length > 0 ? (
            instagramFeed.map((post, index) => (
              <img
                key={index}
                src={`${baseURL}${post.image}`} // Construye la URL completa
                alt="Instagram Post"
                className="h-16 w-16 object-cover rounded-lg shadow"
              />
            ))
          ) : (
            <p className="text-gray-500">Cargando imágenes...</p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
