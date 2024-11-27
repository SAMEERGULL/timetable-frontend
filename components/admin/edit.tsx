// components/admin/EditTimetable.tsx
import React, { useState } from "react";

interface TimetableEntry {
  id: string;
  subject: string;
  classNumber: string;
  date: string;
  time: string;
  teacherName: string;
}

const EditTimetable: React.FC<{ timetableEntry: TimetableEntry; onSave: (updatedEntry: TimetableEntry) => void }> = ({ timetableEntry, onSave }) => {
  const [formData, setFormData] = useState<TimetableEntry>(timetableEntry);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Timetable Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            placeholder="Subject"
          />
          <input
            type="text"
            name="classNumber"
            value={formData.classNumber}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            placeholder="Class Number"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            placeholder="Teacher Name"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTimetable;
