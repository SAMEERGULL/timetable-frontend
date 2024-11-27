import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const Services = () => {
  const services = [
    {
      title: "Timetable Management",
      description:
        "Easily create, update, and manage timetables to keep your schedule organized and efficient.",
      icon: "fa-calendar-alt",
    },
    {
      title: "Admin Dashboard",
      description:
        "Gain complete control with advanced tools to monitor and manage user activities effectively.",
      icon: "fa-tools",
    },
    {
      title: "Notification Alerts",
      description:
        "Stay informed with timely notifications about schedule changes or upcoming tasks.",
      icon: "fa-bell",
    },
    {
      title: "Analytics and Reports",
      description:
        "Track your productivity with detailed analytics and downloadable reports.",
      icon: "fa-chart-line",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Enjoy a seamless experience with an intuitive interface designed for all users.",
      icon: "fa-laptop",
    },
    {
      title: "Mobile Access",
      description:
        "Access your timetable and tools on the go with our mobile-friendly platform.",
      icon: "fa-mobile-alt",
    },
  ];

  return (
    <section id="services" className="bg-gray-100 py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-gray-600">
            Explore the wide range of features designed to simplify your life and
            enhance productivity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-blue-600 text-4xl mb-4">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
