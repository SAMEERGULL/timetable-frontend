import React from "react";

const Admin = () => {
  return (
    <section id="admin" className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-16 max-w-screen-xl mx-auto">
      {/* Left Section - Text */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl">
          Welcome to the Admin Section
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Manage users, monitor activities, and streamline operations efficiently
          with our intuitive admin panel. Experience seamless control and advanced
          tools to optimize your workflow.
        </p>
        <a
          href="/admin"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
        >
          Get Started
        </a>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1.5/2 flex justify-center">
        <img
          src="/bg.jpg"
          alt="Admin Section Illustration"
          className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default Admin;
