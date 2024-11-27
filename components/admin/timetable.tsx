import React, { useState } from "react";
import CreateTimetable from "./create";
import EditTimetable from "./edit";

interface TimetableEntry {
  id: string;
  subject: string;
  classNumber: string;
  date: string;
  time: string;
  teacherName: string;
}

const TimetableList: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [timetables, setTimetables] = useState<TimetableEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<TimetableEntry | null>(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const semesters = ["1st Semester", "2nd Semester", "3rd Semester"];
  const departments = ["Computer Science", "Mathematics", "Physics"];
  const shifts = ["Morning", "Evening"];

  const handleDelete = (id: string) => {
    setTimetables(timetables.filter((entry) => entry.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Manage Timetables</h3>

      {/* Semester Selection */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Semester:</label>
        <div className="flex space-x-4">
          {semesters.map((semester) => (
            <button
              key={semester}
              onClick={() => setSelectedSemester(semester)}
              className={`px-4 py-2 rounded-lg ${
                selectedSemester === semester ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {semester}
            </button>
          ))}
        </div>
      </div>

      {/* Department Selection */}
      {selectedSemester && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Department:</label>
          <div className="flex space-x-4">
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => setSelectedDepartment(department)}
                className={`px-4 py-2 rounded-lg ${
                  selectedDepartment === department ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
              >
                {department}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shift Selection */}
      {selectedDepartment && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Shift:</label>
          <div className="flex space-x-4">
            {shifts.map((shift) => (
              <button
                key={shift}
                onClick={() => setSelectedShift(shift)}
                className={`px-4 py-2 rounded-lg ${
                  selectedShift === shift ? "bg-yellow-600 text-white" : "bg-gray-200"
                }`}
              >
                {shift}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Timetable Table */}
      {selectedShift && (
        <div>
          <button
            onClick={() => setShowCreatePopup(true)}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Create Timetable
          </button>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Class Number</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Teacher Name</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {timetables.map((entry) => (
                <tr key={entry.id}>
                  <td className="border px-4 py-2">{entry.subject}</td>
                  <td className="border px-4 py-2">{entry.classNumber}</td>
                  <td className="border px-4 py-2">{entry.date}</td>
                  <td className="border px-4 py-2">{entry.time}</td>
                  <td className="border px-4 py-2">{entry.teacherName}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => {
                        setCurrentEntry(entry);
                        setShowEditPopup(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popups */}
      {showCreatePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4">
            <CreateTimetable
              onSave={(newEntry) => {
                setTimetables([...timetables, { ...newEntry, id: Date.now().toString() }]);
                setShowCreatePopup(false);
              }}
            />
            <button
              onClick={() => setShowCreatePopup(false)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showEditPopup && currentEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4">
            <EditTimetable
              timetableEntry={currentEntry}
              onSave={(updatedEntry) => {
                setTimetables(
                  timetables.map((entry) =>
                    entry.id === updatedEntry.id ? updatedEntry : entry
                  )
                );
                setShowEditPopup(false);
              }}
            />
            <button
              onClick={() => setShowEditPopup(false)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableList;
