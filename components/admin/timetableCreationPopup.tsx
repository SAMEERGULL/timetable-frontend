import React, { useState } from "react";
import EditPeriodPopup from "@/components/admin/editPeriodPopup"; // Import the EditPeriodPopup

interface Period {
  time: string;
  subject: string;
  classNumber: string;
  teacher: string;
}

interface TimetableEntry {
  day: string;
  periods: Period[];
}

interface TimetableCreationPopupProps {
  onClose: () => void;
  onCreate: (data: TimetableEntry[]) => void; // Pass the created timetable data
}

const TimetableCreationPopup: React.FC<TimetableCreationPopupProps> = ({ onClose, onCreate }) => {
  const [timetableData, setTimetableData] = useState<TimetableEntry[]>([
    {
      day: "Monday",
      periods: [
        { time: "8:30 to 9:30", subject: "Math", classNumber: "Class 101", teacher: "Sir Sameer" },
        { time: "9:30 to 10:30", subject: "Physics", classNumber: "Class 102", teacher: "Dr. Khan" },
        { time: "10:30 to 11:30", subject: "Chemistry", classNumber: "Class 103", teacher: "Ms. Smith" },
        { time: "11:30 to 12:30", subject: "English", classNumber: "Class 104", teacher: "Mr. Ahmed" },
        { time: "12:30 to 1:30", subject: "Biology", classNumber: "Class 105", teacher: "Dr. Aisha" },
        { time: "1:30 to 2:30", subject: "Art", classNumber: "Class 106", teacher: "Ms. Nora" },
        { time: "2:30 to 3:30", subject: "History", classNumber: "Class 107", teacher: "Mr. Lee" },
      ],
    },
    {
      day: "Tuesday",
      periods: [
        { time: "8:30 to 9:30", subject: "Geography", classNumber: "Class 201", teacher: "Ms. Taylor" },
        { time: "9:30 to 10:30", subject: "Math", classNumber: "Class 202", teacher: "Sir Sameer" },
        { time: "10:30 to 11:30", subject: "Physics", classNumber: "Class 203", teacher: "Dr. Khan" },
        { time: "11:30 to 12:30", subject: "Chemistry", classNumber: "Class 204", teacher: "Ms. Smith" },
        { time: "12:30 to 1:30", subject: "English", classNumber: "Class 205", teacher: "Mr. Ahmed" },
        { time: "1:30 to 2:30", subject: "Biology", classNumber: "Class 206", teacher: "Dr. Aisha" },
        { time: "2:30 to 3:30", subject: "Art", classNumber: "Class 207", teacher: "Ms. Nora" },
      ],
    },
    {
      day: "Wednesday",
      periods: [
        { time: "8:30 to 9:30", subject: "Computer Science", classNumber: "Class 301", teacher: "Mr. Ali" },
        { time: "9:30 to 10:30", subject: "Math", classNumber: "Class 302", teacher: "Sir Sameer" },
        { time: "10:30 to 11:30", subject: "Physics", classNumber: "Class 303", teacher: "Dr. Khan" },
        { time: "11:30 to 12:30", subject: "Chemistry", classNumber: "Class 304", teacher: "Ms. Smith" },
        { time: "12:30 to 1:30", subject: "English", classNumber: "Class 305", teacher: "Mr. Ahmed" },
        { time: "1:30 to 2:30", subject: "Biology", classNumber: "Class 306", teacher: "Dr. Aisha" },
        { time: "2:30 to 3:30", subject: "Art", classNumber: "Class 307", teacher: "Ms. Nora" },
      ],
    },
    {
      day: "Thursday",
      periods: [
        { time: "8:30 to 9:30", subject: "History", classNumber: " Class 401", teacher: "Mr. Lee" },
        { time: "9:30 to 10:30", subject: "Geography", classNumber: "Class 402", teacher: "Ms. Taylor" },
        { time: "10:30 to 11:30", subject: "Math", classNumber: "Class 403", teacher: "Sir Sameer" },
        { time: "11:30 to 12:30", subject: "Physics", classNumber: "Class 404", teacher: "Dr. Khan" },
        { time: "12:30 to 1:30", subject: "Chemistry", classNumber: "Class 405", teacher: "Ms. Smith" },
        { time: "1:30 to 2:30", subject: "Biology", classNumber: "Class 406", teacher: "Dr. Aisha" },
        { time: "2:30 to 3:30", subject: "Art", classNumber: "Class 407", teacher: "Ms. Nora" },
      ],
    },
    {
      day: "Friday",
      periods: [
        { time: "8:30 to 9:30", subject: "Physical Education", classNumber: "Class 501", teacher: "Mr. John" },
        { time: "9:30 to 10:30", subject: "Math", classNumber: "Class 502", teacher: "Sir Sameer" },
        { time: "10:30 to 11:30", subject: "Physics", classNumber: "Class 503", teacher: "Dr. Khan" },
        { time: "11:30 to 12:30", subject: "Chemistry", classNumber: "Class 504", teacher: "Ms. Smith" },
        { time: "12:30 to 1:30", subject: "English", classNumber: "Class 505", teacher: "Mr. Ahmed" },
        { time: "1:30 to 2:30", subject: "Biology", classNumber: "Class 506", teacher: "Dr. Aisha" },
        { time: "2:30 to 3:30", subject: "Art", classNumber: "Class 507", teacher: "Ms. Nora" },
      ],
    },
    {
      day: "Saturday",
      periods: [
        { time: "8:30 to 9:30", subject: "Math", classNumber: "Class 601", teacher: "Sir Sameer" },
        { time: "9:30 to 10:30", subject: "Physics", classNumber: "Class 602", teacher: "Dr. Khan" },
        { time: "10:30 to 11:30", subject: "Chemistry", classNumber: "Class 603", teacher: "Ms. Smith" },
        { time: "11:30 to 12:30", subject: "English", classNumber: "Class 604", teacher: "Mr. Ahmed" },
        { time: "12:30 to 1:30", subject: "Biology", classNumber: "Class 605", teacher: "Dr. Aisha" },
        { time: "1:30 to 2:30", subject: "Art", classNumber: "Class 606", teacher: "Ms. Nora" },
        { time: "2:30 to 3:30", subject: "History", classNumber: "Class 607", teacher: "Mr. Lee" },
      ],
    },
  ]);

  const [editingPeriod, setEditingPeriod] = useState<Period | null>(null);
  const maxPeriods = 7; // Assuming a maximum of 7 periods per day

  const handleEditPeriod = (period: Period) => {
    setEditingPeriod(period);
  };

  const handleSavePeriod = (updatedPeriod: Period) => {
    setTimetableData((prevData) =>
      prevData.map((entry) => ({
        ...entry,
        periods: entry.periods.map((p) => (p === editingPeriod ? updatedPeriod : p)),
      }))
    );
    setEditingPeriod(null);
  };

  const handleCreate = () => {
    onCreate(timetableData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Create Timetable</h2>

        <div className="max-w-full overflow-y-auto" style={{ maxHeight : '400px' }}>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Days</th>
                {Array.from({ length: maxPeriods }, (_, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2">Period {index + 1}</th>
                ))}
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2"></th>
                {timetableData[0]?.periods.map((period, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2">
                    {period.time}
                  </th>
                ))}
                {Array.from({ length: maxPeriods - timetableData[0]?.periods.length }, (_, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2"></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetableData.map((entry) => (
                <tr key={entry.day}>
                  <td className="border border-gray-300 px-4 py-2">{entry.day}</td>
                  {entry.periods.map((period, index) => (
                    <td key={index} className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleEditPeriod(period)}>
                      <div>{period.subject}</div>
                      <div>{period.classNumber}</div>
                      <div>{period.teacher}</div>
                    </td>
                  ))}
                  {Array.from({ length: maxPeriods - entry.periods.length }, (_, index) => (
                    <td key={index} className="border border-gray-300 px-4 py-2"></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Back
          </button>
          <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded">
            Create
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

export default TimetableCreationPopup;