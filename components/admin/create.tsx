// components/admin/CreateTimetable.tsx
import React, { useState } from "react";

const CreateTimetable: React.FC = ({onSave}:any) => {
  const [formData, setFormData] = useState({
    subject: "",
    classNumber: "",
    date: "",
    time: "",
    teacherName: "",
    department: "",
    shift: "",
    semester: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Timetable Entry Created:", formData);
    setFormData({ subject: "", classNumber: "", date: "", time: "", teacherName: "", department: "", shift: "", semester: ""});
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Timetable</h2>
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
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            placeholder="Department Name"
          />
          <input
            type="text"
            name="shift"
            value={formData.shift}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            placeholder="Shift"
          />
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            placeholder="Semester"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Create Timetable Entry
        </button>
      </form>
    </div>
  );
};

export default CreateTimetable;
