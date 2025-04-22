import React, { useState, useEffect } from "react";

const statusColors = {
  "¡últimos cupos!": "bg-yellow-500",
  "agotado": "bg-red-600",
  "cupos disponibles": "bg-green-600",
};

const TravelCard = ({ travel }) => {
  const statusText = travel.status?.title || "Cupos disponibles";
  const statusColor = statusColors[statusText.toLowerCase()] || "bg-gray-400";

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl overflow-hidden shadow-lg w-80 transition-transform hover:scale-105">
      {/* Imagen de la experiencia */}
      <div className="relative">
        <img
          src={`https://api.test.interactiva.net.co${travel.image_cover}`}
          alt={travel.title}
          className="w-full h-64 object-cover"
        />
        {/* Etiqueta de estado */}
        <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase text-white rounded ${statusColor}`}>
          {statusText}
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex flex-col justify-between flex-grow p-4">
        <h3 className="text-xl font-bold mb-2 uppercase text-gray-800">
          {travel.title}
        </h3>
        <p className="text-sm text-gray-600 mb-1">{travel.date_start} - {travel.date_end}</p>
        <p className="text-sm text-gray-600 mb-3">Desde <span className="font-semibold">{travel.cost} USD</span></p>
        <p className="text-sm text-gray-500 flex-grow">{travel.description}</p>
      </div>

      <div className="bg-yellow-500 text-white text-center font-semibold text-sm py-3 hover:bg-yellow-600 transition-colors cursor-pointer">
        MÁS INFORMACIÓN
      </div>
    </div>
  );
};

// 🔥 Carrusel sin librerías
const TravelCarousel = () => {
  const [travels, setTravels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://api.test.interactiva.net.co/api/get-travels/")
      .then((res) => res.json())
      .then((data) => setTravels(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % travels.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + travels.length) % travels.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Contenedor del carrusel */}
      <div className="overflow-hidden flex">
        {travels.map((travel, index) => (
          <div
            key={travel.id}
            className={`w-full flex-shrink-0 transition-transform duration-500 ease-in-out ${index === currentIndex ? "block" : "hidden"}`}
          >
            <TravelCard travel={travel} />
          </div>
        ))}
      </div>

      {/* Botón izquierdo */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        ◀
      </button>

      {/* Botón derecho */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        ▶
      </button>
    </div>
  );
};

export default TravelCarousel;
