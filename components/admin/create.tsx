import React, { useState } from "react";
import SemesterDepartmentPopup from "@/components/admin/sdPopup";
import TimetableView from "@/components/admin/ttView";

const CreateTimetable: React.FC = () => {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const handleCreateTimetableClick = () => {
    setShowPopup1(true);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Timetable</h2>
      <button
        onClick={handleCreateTimetableClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Create Timetable
      </button>
      {showPopup1 && <SemesterDepartmentPopup onClose={() => setShowPopup1(false)} onNext={() => setShowPopup2(true)} />}
      {showPopup2 && <TimetableView onClose={() => setShowPopup2(false)} />}
    </div>
  );
};

export default CreateTimetable;