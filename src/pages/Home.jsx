import React, { useEffect, useState } from "react";
import { getTravels, getBlogs, getCustomerExperiences } from "../services/api";
import TravelCard from "../components/TravelCard";
import BlogCard from "../components/BlogCard";
import CustomerExperienceCard from "../components/CustomerExperienceCard";
import Hero from "../components/Hero";
import Contacto from "../pages/Contacto";
import Partners from "../components/Partners";
import Newsletter from "../components/Newsletter";
import InstagramGallery from "../components/InstagramGallery";

const Home = () => {
  const [travels, setTravels] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    getTravels().then((res) => setTravels(res.data));
    getBlogs().then((res) => setBlogs(res.data));
    getCustomerExperiences().then((res) => setExperiences(res.data));
  }, []);

  return (
    <div>
      <Hero />
      <InstagramGallery />

      {/* VIAJES */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Viajes Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {travels.length > 0 ? (
            travels.map((travel) => <TravelCard key={travel.id} travel={travel} />)
          ) : (
            <p className="text-center text-gray-500">No hay viajes disponibles en este momento.</p>
          )}
        </div>
      </section>

      {/* EXPERIENCIAS */}
      <section >
        <div>
          {experiences.length > 0 ? (
            experiences.map((exp) => <CustomerExperienceCard key={exp.id} experience={exp} />)
          ) : (
            <p className="text-center text-gray-500">Aún no hay experiencias disponibles.</p>
          )}
        </div>
      </section>

      {/* BLOGS */}
      <section className="bg-[#B6823C] py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">BLOGS</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {blogs.length > 0 ? (
              <>
                {/* Primer blog grande */}
                <BlogCard key={blogs[0].id} blog={blogs[0]} isLarge={true} />

                {/* Los demás blogs en formato más pequeño */}
                {blogs.slice(1, 3).map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </>
            ) : (
              <p className="text-center text-gray-500">No hay blogs disponibles.</p>
            )}
          </div>
        </div>
      </section>


      {/* FORMULARIO DISEÑA TU VIAJE */}
      <section className="bg-[#f9f9f9] py-16 px-4">
        <div className="container mx-auto">
          <Contacto />
        </div>
      </section>

      {/* ALIANZAS Y NEWSLETTER */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <Partners />
          <Newsletter />
        </div>
      </section>
    </div>
  );
};

export default Home;
