import React from "react";

const ViewTimetable = () => {
  return (
    <section id="view" className="flex flex-col md:flex-row items-center justify-between px-6 py-16 max-w-screen-xl mx-auto">
      {/* Left Section - Image */}
      <div className="md:w-1.5/2 flex justify-center">
        <img
          src="/bg.jpg"
          alt="View Timetable Illustration"
          className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg"
        />
      </div>

      {/* Right Section - Text */}
      <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0">
        <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl">
          View Your Timetable
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Access your personalized timetable anytime, anywhere. Stay organized
          and manage your schedule effortlessly with our user-friendly interface.
        </p>
        <a
          href="/viewTimetable"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
        >
          View Now
        </a>
      </div>
    </section>
  );
};

export default ViewTimetable;
