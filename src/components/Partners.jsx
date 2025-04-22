import React, { useEffect, useState } from "react";
import { getPartners } from "../services/api";

const BASE_URL = "https://api.test.interactiva.net.co"; 

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPartners()
      .then((res) => {
        setPartners(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener socios:", error);
        setError("No se pudieron cargar las alianzas.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="container mx-auto px-4 py-10 text-center">
      <h2 className="text-3xl font-bold mb-6">Alianzas Estratégicas</h2>

      {loading && <p className="text-gray-500">Cargando alianzas...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-wrap justify-center gap-6">
          {partners.length > 0 ? (
            partners.map((partner) =>
              partner.logo ? (
                <img
                  key={partner.id}
                  src={`${BASE_URL}${partner.logo}`} 
                  alt={`Logo de ${partner.name}`}
                  className="h-16 object-contain"
                />
              ) : null
            )
          ) : (
            <p className="text-gray-500">No hay alianzas disponibles.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Partners;
