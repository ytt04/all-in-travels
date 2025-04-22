import React, { useState } from "react";
import { postNewsletter } from "../services/api"; 

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      await postNewsletter({ email });
      setMessage("¡Te has suscrito con éxito!");
      setEmail(""); 
    } catch (error) {
      console.error("Error al suscribirse:", error);
      setError("Hubo un problema al suscribirse. Inténtalo de nuevo.");
    }
  };

  return (
    <section className="bg-[#1a2035] py-10 px-4 text-center text-white">
      <p className="mb-4 text-sm">
        Suscríbete a nuestro newsletter y recibe noticias, descuentos y más
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:w-80 bg-white text-gray-900 rounded-lg px-4 py-2 text-sm border focus:ring-2 focus:ring-[#c6954c] outline-none"
          required
        />
        <button 
          type="submit" 
          className="bg-[#c6954c] hover:bg-[#b8843c] text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
        >
          SUSCRIBIRME
        </button>
      </form>

      {/* Mensajes de éxito o error */}
      {message && <p className="text-green-400 mt-4 text-sm">{message}</p>}
      {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
    </section>
  );
};

export default Newsletter;
