import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* LOGO */}
        <Link to="/">
          <img
            src="https://api.test.interactiva.net.co/media/logo.png"
            alt="Logo"
            className="h-12"
          />
        </Link>

        {/* MENÚ EN ESCRITORIO */}
        <div className="hidden md:flex gap-6 text-gray-800 font-medium">
          <Link to="/" className="hover:text-[#cb943f]">Inicio</Link>
          <Link to="/nosotros" className="hover:text-[#cb943f]">Nosotros</Link>
          <Link to="/blogs" className="hover:text-[#cb943f]">Blogs</Link>
          <Link to="/contacto" className="hover:text-[#cb943f]">Contacto</Link>
        </div>

        {/* BOTÓN MENÚ HAMBURGUESA (MÓVIL) */}
        <button className="md:hidden text-gray-800 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      <div className={`md:hidden bg-white shadow-md absolute w-full left-0 transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}>
        <ul className="text-center text-gray-800 font-medium py-4">
          <li className="py-2">
            <Link to="/" className="hover:text-[#cb943f]" onClick={() => setMenuOpen(false)}>Inicio</Link>
          </li>
          <li className="py-2">
            <Link to="/nosotros" className="hover:text-[#cb943f]" onClick={() => setMenuOpen(false)}>Nosotros</Link>
          </li>
          <li className="py-2">
            <Link to="/blogs" className="hover:text-[#cb943f]" onClick={() => setMenuOpen(false)}>Blogs</Link>
          </li>
          <li className="py-2">
            <Link to="/contacto" className="hover:text-[#cb943f]" onClick={() => setMenuOpen(false)}>Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
