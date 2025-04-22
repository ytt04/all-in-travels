import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerExperience = () => {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get('https://api.test.interactiva.net.co/api/get-customer_experiences/');
        console.log('API RESPONSE:', response.data);

        setExperience(response.data[0]);
      } catch (error) {
        console.error('Error fetching experience:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-700 py-10">
        <p>Cargando experiencia...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="text-center text-red-500 py-10">
        <p>No se encontró la experiencia.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f5f6f7] py-12 px-4">
      {/* Título */}
      <h2 className="text-center text-[#b37d2e] text-2xl font-bold tracking-widest mb-10 uppercase">
        {experience.title}
      </h2>

      {/* Contenedor flexible de la experiencia */}
      <div className="flex flex-col lg:flex-row w-full bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* Imagen */}
        <div className="lg:w-1/2 w-full h-96 lg:h-auto">
          <img
            src={`https://api.test.interactiva.net.co${experience.image}`}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido */}
        <div className="lg:w-1/2 w-full p-10 flex flex-col justify-center bg-white">
          <h3 className="text-2xl font-bold mb-6 text-[#333]">
            {experience.description}
          </h3>
          <p className="text-gray-700 text-md leading-relaxed mb-8 text-justify">
            {experience.diference_description}
          </p>
          <div>
            <button className="bg-[#b37d2e] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#a36c24] transition-all">
              COTIZAR MI VIAJE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerExperience;
