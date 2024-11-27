"use client"
import React, { useState } from "react";

const TimetableViewer: React.FC = () => {
  const [semester, setSemester] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [filteredTimetable, setFilteredTimetable] = useState<any[]>([]);

  const semesters = ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester"];
  const departments = ["Computer Science", "Mechanical", "Electrical", "Civil"];
  const shifts = ["Morning", "Evening"];

  const timetableData = [
    { 
      semester: "1st Semester", 
      department: "Computer Science", 
      shift: "Morning", 
      subject: "Data Structures", 
      classNumber: "101", 
      date: "2024-11-25", 
      time: "09:00 AM", 
      teacher: "Prof. Smith" 
    },
    {
      semester: "2nd Semester",
      department: "Mechanical",
      shift: "Evening",
      subject: "Thermodynamics",
      classNumber: "203",
      date: "2024-11-26",
      time: "02:00 PM",
      teacher: "Dr. Johnson",
    },
  ];

  const handleFilter = () => {
    const filtered = timetableData.filter(
      (entry) =>
        entry.semester === semester &&
        entry.department === department &&
        entry.shift === shift
    );
    setFilteredTimetable(filtered);
  };

  const handleLogout = () => {
    window.location.href = '/';
    // Implement logout logic here (e.g., clearing tokens, redirecting, etc.)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className=" text-black px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart Timetable</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
        >
          Logout
        </button>
      </header>
      <hr />
      <hr />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">View Timetable</h2>
        <p className="text-md text-center mb-6"> Select the filters to view the respective timetable.</p>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="p-2 border rounded-md bg-white"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="p-2 border rounded-md bg-white"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="p-2 border rounded-md bg-white"
          >
            <option value="">Select Shift</option>
            {shifts.map((shiftOption) => (
              <option key={shiftOption} value={shiftOption}>{shiftOption}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleFilter}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          View Timetable
        </button>

        {/* Timetable Table */}
        {filteredTimetable.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Class Number</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Teacher Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimetable.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2">{entry.subject}</td>
                    <td className="border p-2">{entry.classNumber}</td>
                    <td className="border p-2">{entry.date}</td>
                    <td className="border p-2">{entry.time}</td>
                    <td className="border p-2">{entry.teacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-6 text-center text-gray-500">
            No timetable available. Please apply filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default TimetableViewer;
