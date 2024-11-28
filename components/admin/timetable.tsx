import React, { useState } from "react";
import SemesterDepartmentPopup from "@/components/admin/semesterDepartmentPopup";
import TimetableCreationPopup from "@/components/admin/timetableCreationPopup";
import TimetableView from "@/components/admin/timetableView";

const CreateTimetable: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false); // For SemesterDepartmentPopup
  const [showTimetableView, setShowTimetableView] = useState(false); // For TimetableView
  const [isCreatingTimetable, setIsCreatingTimetable] = useState(false); // For TimetableCreationPopup
  const [semesterData, setSemesterData] = useState<any>(null); // To hold semester data
  const [timetableData, setTimetableData] = useState<any>(null); // To hold timetable data

  const handleCreateTimetableClick = () => {
    // Open the semester selection popup
    setShowPopup(true);
    setShowTimetableView(false); // Ensure the timetable view is hidden
    setIsCreatingTimetable(false); // Ensure timetable creation is closed
  };

  const handleTimetableCreation = (data: any) => {
    console.log("Timetable created:", data); // Log the created timetable data
    setTimetableData(data); // Set the timetable data
    setIsCreatingTimetable(false); // Close the creation popup
    setShowTimetableView(true); // Show the timetable view
  };

  const handleViewTimetableClick = () => {
    console.log("Viewing timetable:", timetableData); // Log the timetable data
    setShowTimetableView(true); // Show the timetable view
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center space-x-4">
        <div className="flex justify-center w-1/3 p-2">
          <button
            onClick={handleCreateTimetableClick}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Create Timetable
          </button>
        </div>
        <div className="flex justify-center w-1/3 p-2">
          <button
            onClick={handleViewTimetableClick}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            View Timetable
          </button>
        </div>
      </div>

      {showPopup && 
        <SemesterDepartmentPopup 
          onClose={() => {
            setShowPopup(false); // Close the semester popup
            setIsCreatingTimetable(false); // Ensure creation state is reset
          }} 
          onNext={(data) => {
            setSemesterData(data); // Store selected semester and department
            setIsCreatingTimetable(true); // Switch to timetable creation
            setShowPopup(false); // Close the semester popup
          }} 
        />
      }

      {isCreatingTimetable && 
        <TimetableCreationPopup 
          onClose={() => {
            setIsCreatingTimetable(false); // Close timetable creation
            setShowPopup(true); // Optionally, go back to semester selection
          }} 
          onCreate={handleTimetableCreation} // Handle timetable creation
          semesterData={semesterData} // Pass the semester data to the creation popup
        />
      }

      {showTimetableView && 
        <TimetableView 
          onClose={() => setShowTimetableView(false)} 
          timetableData={timetableData} // Pass the timetable data to TimetableView
        />
      }
    </div>
  );
};

export default CreateTimetable;