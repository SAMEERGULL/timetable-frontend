import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <p className="text-sm">
              Smart Timetable helps you stay organized and productive by
              simplifying your schedule management. Experience a smarter way to
              plan your day with our user-friendly tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#admin"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Admin
                </a>
              </li>
              <li>
                <a
                  href="#view"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  View Timetable
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-sm">
              Email: <a href="mailto:info@smarttimetable.com" className="hover:text-blue-500">sameergulsher0000@gmail.com</a>
            </p>
            <p className="text-sm">Phone: +92 313 401 4776</p>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-700 pt-4 text-sm">
          &copy; {new Date().getFullYear()} Smart Timetable. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
