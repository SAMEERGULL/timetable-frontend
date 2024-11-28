import React from "react";

const TeacherView: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Teacher View</h2>
      <p>This is the teacher view with dummy timetable data.</p>
      <ul>
        <li>Math Class: Monday 9:00 AM - 10:00 AM</li>
        <li>Science Class: Tuesday 10:00 AM - 11:00 AM</li>
        <li>History Class: Wednesday 1:00 PM - 2:00 PM</li>
      </ul>
    </div>
  );
};

export default TeacherView;