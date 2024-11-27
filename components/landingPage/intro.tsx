import React from "react";

const HeroSection = () => {
  return (
    <section
      className="bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Smart Timetable
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
        Smart Timetable is a user-friendly platform for creating and managing schedules, 
        helping you stay organized and productive with ease.
        </p>
        
      </div>
    </section>
  );
};

export default HeroSection;
