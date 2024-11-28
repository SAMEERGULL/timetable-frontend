"use client";
import React, { useState } from "react";

const StudentView: React.FC = () => {
  const [semester, setSemester] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [shift, setShift] = useState<string>("");

  interface Period {
    time: string;
    subject: string;
    classNumber: string;
    teacher: string;
  }

  interface Timetable {
    [key: string]: Period[];
  }

  const [timetable, setTimetable] = useState<Timetable>({});

  const semesters = [
    "1st Semester", "2nd Semester", "3rd Semester", "4th Semester",
    "5th Semester", "6th Semester", "7th Semester", "8th Semester"
  ];
  const departments = ["Computer Science", "Mechanical", "Electrical", "Civil"];
  const shifts = ["Morning", "Evening"];

  // Sample timetable data with 5 periods
  const timetableData = [
    {
      semester: "1st Semester",
      department: "Computer Science",
      shift: "Morning",
      day: "Monday",
      periods: [
        { time: "8:30 to 9:30", subject: "Math", classNumber: "Class 101", teacher: "Sir Sameer" },
        { time: "9:30 to 10:30", subject: "Physics", classNumber: "Class 102", teacher: "Dr. Khan" },
        { time: "10:30 to 11:30", subject: "Chemistry", classNumber: "Class 103", teacher: "Ms. Smith" },
        { time: "11:30 to 12:30", subject: "English", classNumber: "Class 104", teacher: "Mr. Ahmed" },
        { time: "12:30 to 1:30", subject: "Biology", classNumber: "Class 105", teacher: "Dr. Ali" },
      ],
    },
    {
      semester: "1st Semester",
      department: "Computer Science",
      shift: "Morning",
      day: "Tuesday",
      periods: [
        { time: "8:30 to 9:30", subject: "DC-121", classNumber: "Class 201", teacher: "Dr. Muhammad Saleem" },
        { time: "9:30 to 10:30", subject: "CC-112", classNumber: "Class 202", teacher: "Ejaz Ahmad" },
        { time: "10:30 to 11:30", subject: "GE-163", classNumber: "Class 203", teacher: "Imtiaz" },
        { time: "11:30 to 12:30", subject: "GE-164", classNumber: "Class 204", teacher: "M. Mubashir Sadiq" },
        { time: "12:30 to 1:30", subject: "CS-101", classNumber: "Class 205", teacher: "Ms. Fatima" },
      ],
    },
    // Add more entries for other days and semesters...
  ];

  const handleFilter = () => {
    const filtered = timetableData.filter(
      (entry) =>
        entry.semester === semester &&
        entry.department === department &&
        entry.shift === shift
    );

    const timetableGrid: Timetable = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: []
    };

    filtered.forEach(entry => {
      timetableGrid[entry.day] = entry.periods.slice(0, 5); // Keep only the first 5 periods
    });

    setTimetable(timetableGrid);
  };

  const handleLogout = () => {
    window.location.href = '/';
    // Implement logout logic here (e.g., clearing tokens, redirecting, etc.)
  };

  // Calculate the maximum periods across all days
  const maxPeriods = Math.max(...Object.values(timetable).map((dayPeriods: any) => dayPeriods.length), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-black px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart Timetable</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
        >
          Logout
        </ button>
      </header>
      <hr />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">View Timetable</h2>
        <p className="text-md text-center mb-6">Select the filters to view the respective timetable.</p>

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
          className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 mb-6"
        >
          View Timetable
        </button>

        {/* Timetable Display */}
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Days</th>
              {Array.from({ length: maxPeriods }, (_, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  Period {index + 1}
                </th>
              ))}
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              {Array.from({ length: maxPeriods }, (_, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  {timetable[Object.keys(timetable)[0]]?.[index]?.time || ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(timetable).map((day) => (
              <tr key={day}>
                <td className="border border-gray-300 px-4 py-2">{day}</td>
                {timetable[day].map((period, index) => (
                  <td key={index} className="border border-gray-300 px-4 py-2">
                    <div>{period.subject}</div>
                    <div>{period.classNumber}</div>
                    <div>{period.teacher}</div>
                  </td>
                ))}
                {Array.from({ length: maxPeriods - timetable[day].length }, (_, index) => (
                  <td key={index} className="border border-gray-300 px-4 py-2"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentView;