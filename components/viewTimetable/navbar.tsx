// Navbar.tsx
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <h1 className="text-lg font-bold">Timetable App</h1>
      <ul className="flex space-x-4">
        <li><a href="/viewTimetable/dashboard" className="hover:underline">Dashboard</a></li>
        <li><a href="/viewTimetable/timetable" className="hover:underline">Timetable</a></li>
        <li><a href="/viewTimetable/profile" className="hover:underline">Profile</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;