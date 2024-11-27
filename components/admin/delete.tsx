import React, { useState } from "react";

interface TimetableEntry {
  id: string;
  subject: string;
  classNumber: string;
  date: string;
  time: string;
  teacherName: string;
}

const TimetableList: React.FC = () => {
  const [entries, setEntries] = useState<TimetableEntry[]>([
    { id: "1", subject: "Mathematics", classNumber: "A101", date: "2024-11-28", time: "10:00 AM", teacherName: "Mr. Smith" },
    { id: "2", subject: "Physics", classNumber: "B202", date: "2024-11-29", time: "11:00 AM", teacherName: "Ms. Johnson" },
  ]);

  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Timetable</h3>
      <table className="w-full mt-6 border">
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
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="border px-4 py-2">{entry.subject}</td>
              <td className="border px-4 py-2">{entry.classNumber}</td>
              <td className="border px-4 py-2">{entry.date}</td>
              <td className="border px-4 py-2">{entry.time}</td>
              <td className="border px-4 py-2">{entry.teacherName}</td>
              <td className="border px-4 py-2">
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
  );
};

export default TimetableList;
