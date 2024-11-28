"use client";
import React, { useState } from "react";
import EditPeriodPopup from "@/components/admin/editPeriodPopup"; // Import the EditPeriodPopup

interface Period {
  time: string;
  subject: string;
  classNumber: string;
  teacher: string;
}

interface Timetable {
  [key: string]: Period[];
}

interface TimetableViewProps {
  onClose: () => void;
}

const TimetableView: React.FC<TimetableViewProps> = ({ onClose }) => {
  const [semester, setSemester] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [timetable, setTimetable] = useState<Timetable>({});
  const [editingPeriod, setEditingPeriod] = useState<Period | null>(null);

  const semesters = [
    "1st Semester", "2nd Semester", "3rd Semester", "4th Semester",
    "5th Semester", "6th Semester", "7th Semester", "8th Semester"
  ];
  const departments = ["Computer Science", "Mechanical", "Electrical", "Civil"];
  const shifts = ["Morning", "Evening"];

  // Sample timetable data
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
    {
      semester: "1st Semester",
      department: "Computer Science",
      shift: "Morning",
      day: "Wednesday",
      periods: [
        { time: "8:30 to 9:30", subject: "Data Structures", classNumber: "Class 301", teacher: "Mr. John" },
        { time: "9:30 to 10:30", subject: "Algorithms", classNumber: "Class 302", teacher: "Ms. Sarah" },
        { time: "10:30 to 11:30", subject: "Operating Systems", classNumber: "Class 303", teacher: "Dr. Emily" },
        { time: "11:30 to 12:30", subject: "Computer Networks", classNumber: "Class 304", teacher: "Mr. Alex" },
        { time: "12:30 to 1:30", subject: "Software Engineering", classNumber: "Class 305", teacher: "Dr. Mark" },
      ],
    },
    {
      semester: "1st Semester",
      department: "Computer Science",
      shift: "Morning",
      day: "Thursday",
      periods: [
        { time: "8:30 to 9:30", subject: "Web Development", classNumber: "Class 401", teacher: "Mr. Smith" },
        { time: "9:30 to 10:30", subject: "Database Systems", classNumber: "Class 402", teacher: "Ms. Johnson" },
        { time: "10:30 to 11:30", subject: "Computer Graphics", classNumber: "Class 403", teacher: "Dr. Brown" },
        { time: "11:30 to 12:30", subject: "Artificial Intelligence", classNumber: "Class 404", teacher: "Mr. Lee" },
        { time: "12:30 to 1:30", subject: "Human-Computer Interaction", classNumber: "Class 405", teacher: "Dr. White" },
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
      Friday: [],
      Saturday: [] // Ensure Saturday is included
    };

    filtered.forEach(entry => {
      timetableGrid[entry.day] = entry.periods.slice(0, 5); // Keep only the first 5 periods
    });

    setTimetable(timetableGrid);
  };

  const handleEditPeriod = (period: Period) => {
    setEditingPeriod(period);
  };

  const handleSavePeriod = (updatedPeriod: Period) => {
    const updatedTimetable = { ...timetable };
    Object.keys(updatedTimetable).forEach(day => {
      updatedTimetable[day] = updatedTimetable[day].map(period => 
        period.time === updatedPeriod.time ? updatedPeriod : period
      );
    });
    setTimetable(updatedTimetable);
    setEditingPeriod(null);
  };

  const maxPeriods = Math.max(...Object.values(timetable).map((dayPeriods) => dayPeriods.length), 0);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[80vw] h-[80vh] overflow-hidden flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Timetable</h2>
        <p className="text-md text-center mb-6">Select the filters to view the respective timetable.</p>

        {/* Filters */}
        <div className ="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <select value={semester} onChange={(e) => setSemester(e.target.value)} className="border rounded p-2">
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="border rounded p-2">
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select value={shift} onChange={(e) => setShift(e.target.value)} className="border rounded p-2">
            <option value="">Select Shift</option>
            {shifts.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button
  onClick={handleFilter}
  className="w-24 px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 mb-6"
>
  View Timetable
</button>

        {/* Timetable Display with CSS Overflow */}
        <div className="overflow-y-auto max-h-[60vh] flex-grow">
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
                {timetable[Object.keys(timetable)[0]]?.map((period, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2">
                    {period.time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(timetable).map((day) => (
                <tr key={day}>
                  <td className="border border-gray-300 px-4 py-2">{day}</td>
                  {timetable[day].map((period, index) => (
                    <td key={index} className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleEditPeriod(period)}>
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

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Close
          </button>
        </div>

        {editingPeriod && (
          <EditPeriodPopup
            period={editingPeriod}
            onSave={handleSavePeriod}
            onClose={() => setEditingPeriod(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TimetableView; 