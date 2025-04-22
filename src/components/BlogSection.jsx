import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard'; 

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://api.test.interactiva.net.co/api/get-blogs/');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="bg-[#cb943f] py-16 px-5">
      {/* TÍTULO */}
      <h2 className="text-center text-white text-2xl font-bold mb-12 tracking-widest">
        BLOGS
      </h2>

      {/* CONTENEDOR DE LAS TARJETAS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog destacado grande */}
        {blogs[0] && (
          <BlogCard blog={blogs[0]} isLarge={true} />
        )}

        {/* Blogs secundarios pequeños */}
        <div className="flex flex-col gap-8">
          {blogs.slice(1, 3).map((blog, index) => (
            <BlogCard key={index} blog={blog} isLarge={false} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
