import React, { useState, useEffect } from "react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    destino: "",
    otroDestino: "",
    experiencias: [],
    sabeCuandoViajar: "",
    ida: "",
    regreso: "",
    ninos: "",
    adultos: "",
    viajeIdeal: "",
  });

  const [experienciasDisponibles, setExperienciasDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener experiencias desde la API
  useEffect(() => {
    const fetchExperiencias = async () => {
      try {
        const response = await fetch(
          "https://api.test.interactiva.net.co/api/get-tags/"
        );
        if (!response.ok) throw new Error("Error al obtener experiencias");
        const data = await response.json();
        setExperienciasDisponibles(data);
      } catch (error) {
        console.error("Error cargando experiencias:", error);
      }
    };

    fetchExperiencias();
  }, []);

  const handleCheckboxChange = (value) => {
    setFormData((prev) => {
      const experiencias = prev.experiencias.includes(value)
        ? prev.experiencias.filter((exp) => exp !== value)
        : [...prev.experiencias, value];
      return { ...prev, experiencias };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, sabeCuandoViajar: value }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://api.test.interactiva.net.co/api/set-quotations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      const result = await response.json();
      alert("Formulario enviado correctamente!");
      console.log("Respuesta del servidor:", result);
      setFormData({
        destino: "",
        otroDestino: "",
        experiencias: [],
        sabeCuandoViajar: "",
        ida: "",
        regreso: "",
        ninos: "",
        adultos: "",
        viajeIdeal: "",
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setError("Hubo un problema al enviar el formulario. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#e5e5e5] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-4xl p-10 rounded-lg shadow-lg"
      >
        <h2 className="text-center text-[#cb943f] text-3xl font-bold mb-6 tracking-widest">
          DISEÑA TU VIAJE
        </h2>

        <div className="mb-8 text-center">
          <h3 className="font-bold text-gray-800 mb-2 text-lg">
            AQUÍ COMIENZA TU EXPERIENCIA
          </h3>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Una vez llenado este formulario, uno de nuestros planners travelers
            se pondrá en contacto contigo.
          </p>
        </div>

        {/* Destinos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="destino"
            placeholder="¿CUÁL ES EL DESTINO QUE QUIERES VISITAR?"
            value={formData.destino}
            onChange={handleChange}
            className="border border-gray-300 rounded p-3 w-full text-sm focus:ring-2 focus:ring-[#cb943f]"
          />
          <input
            type="text"
            name="otroDestino"
            placeholder="¿QUÉ OTRO DESTINO TIENES EN MENTE?"
            value={formData.otroDestino}
            onChange={handleChange}
            className="border border-gray-300 rounded p-3 w-full text-sm focus:ring-2 focus:ring-[#cb943f]"
          />
        </div>

        {/* Experiencias */}
        <div className="mb-6">
          <p className="font-semibold mb-2 text-gray-800 text-sm">
            ¿QUÉ EXPERIENCIAS QUIERES VIVIR?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {experienciasDisponibles.length > 0 ? (
              experienciasDisponibles.map((exp) => (
                <button
                  type="button"
                  key={exp.id}
                  onClick={() => handleCheckboxChange(exp.name)}
                  className={`border rounded p-2 text-sm transition ${
                    formData.experiencias.includes(exp.name)
                      ? "bg-[#cb943f] text-white"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                >
                  {exp.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Cargando experiencias...</p>
            )}
          </div>
        </div>

        {/* Saber cuándo viajar */}
        <div className="mb-6">
          <p className="font-semibold text-gray-800 text-sm">
            ¿SABES CUÁNDO VIAJAR?
          </p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="sabeCuandoViajar"
                value="sí"
                checked={formData.sabeCuandoViajar === "sí"}
                onChange={() => handleRadioChange("sí")}
              />
              SÍ
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="sabeCuandoViajar"
                value="no"
                checked={formData.sabeCuandoViajar === "no"}
                onChange={() => handleRadioChange("no")}
              />
              NO
            </label>
          </div>
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input type="date" name="ida" value={formData.ida} onChange={handleChange} className="border border-gray-300 rounded p-3 w-full text-sm" />
          <input type="date" name="regreso" value={formData.regreso} onChange={handleChange} className="border border-gray-300 rounded p-3 w-full text-sm" />
        </div>

        {/* Niños y adultos */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <select name="ninos" value={formData.ninos} onChange={handleChange} className="border border-gray-300 rounded p-3 text-sm">
            <option value="">NIÑOS:</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2+">2+</option>
          </select>

          <select name="adultos" value={formData.adultos} onChange={handleChange} className="border border-gray-300 rounded p-3 text-sm">
            <option value="">ADULTOS:</option>
            <option value="1">1</option>
            <option value="2+">2+</option>
          </select>
        </div>

        {/* Botón de enviar */}
        <div className="flex justify-center">
          <button type="submit" className="bg-[#cb943f] text-white px-8 py-3 rounded-full text-sm font-semibold disabled:opacity-50" disabled={loading}>
            {loading ? "Enviando..." : "ENVIAR"}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Contacto;
