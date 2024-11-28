import React from "react";

const StudentView: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Student View</h2>
      <p>This is the student view with dummy timetable data.</p>
      <ul>
        <li>Math: Monday 9:00 AM - 10:00 AM</li>
        <li>Science: Tuesday 10:00 AM - 11:00 AM</li>
        <li>History: Wednesday 1:00 PM - 2:00 PM</li>
      </ul>
    </div>
  );
};

export default StudentView;
