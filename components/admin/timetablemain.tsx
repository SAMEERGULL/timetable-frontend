"use client"

import React, { useState, useEffect } from "react";
import TimetableCreationPopup from "./timetableCreationPopup";
import Timetable from "./timetable";
import EditPeriodPopup from "./editPeriodPopup";
import TimetableShow from "./timetableShow";

const MainComponent: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isTimetableVisible, setTimetableVisible] = useState(false);
  const [isTimetableViewed, setTimetableViewed] = useState(false);
  const [timetableData, setTimetableData] = useState<any>({});
  const [editingPeriod, setEditingPeriod] = useState<any>(null);
  const [departments, setDepartments] = useState([]);
  const [depart, setDepart] = useState([]);
  const [selectedDepart, setSelectedDepart] = useState<string>("");
  const [semesters, setSemesters] = useState([]);
  const [SelectedSemes, setSelectedSemes] = useState<string>("");
  const [semes, setSemes] = useState([]);
  const [selectedShift, setSelectedShift] = useState<string>("");
  const [status, setStatus] = useState('');


  const instituteIdString = localStorage.getItem('Institute_id');
  const instituteId: number | null = instituteIdString ? parseInt(instituteIdString, 10) : null;

  const handleCreateTimetableClick = () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-departments-and-semesters/?institute_id=${instituteId}`;
      // Call API to get semester and department data
      fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            // Update departments and semesters in state
            setDepartments(result.data.map((d: any) => ({ id: d.department_id, name: d.department_name })));
            // Flatten semesters for dropdown
            const allSemesters = result.data.flatMap((d: any) =>
              d.semesters.map((s: any) => ({ id: s.semester_id, name: s.semester_name }))
            );
            setSemesters(allSemesters);
            setPopupOpen(true);
          } else {
            // Handle errors
          }
        }
        );
    } catch (error) {
      // Handle errors
    }
  };
  console.log(departments);
  console.log(semesters);

  const handleViewTimetableClick = () => {
    setTimetableViewed(true);
  };

  useEffect(() => {
    if (isTimetableViewed) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-departments-and-semesters/?institute_id=${instituteId}`;
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setDepartments(result.data.map((d: any) => ({ id: d.department_id, name: d.department_name })));
            const allSemesters = result.data.flatMap((d: any) =>
              d.semesters.map((s: any) => ({ id: s.semester_id, name: s.semester_name }))
            );
            setSemesters(allSemesters);
          } else {
            setStatus("Failed to fetch departments and semesters.");
          }
        })
        .catch(() => setStatus("Error fetching data."));
    }
  }, [isTimetableViewed]);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleNextStep = (data: any) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/create-timetable/?institute_id=${instituteId}`;
    // Call API to get timetable data
    const formData = new FormData();
    formData.append('institute_id', instituteId?.toString() || '');
    formData.append('semester_id', data.semester);
    formData.append('department_id', data.department);
    formData.append('average_class_time', (data.averageClassTime !== undefined ? parseInt(data.averageClassTime, 10) : 0).toString());
    formData.append('break_time', (data.breakTime !== undefined ? parseInt(data.breakTime, 10) : 0).toString());
    formData.append('shift', data.shift);
    formData.append('shift_start_time', data.shiftStartTime || '00:00');
    formData.append('shift_end_time', data.shiftEndTime || '00:00');

    fetch(apiUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setTimetableData(result.timetable);
          setPopupOpen(false);
          setTimetableVisible(true);
        } else {
          // Handle errors (display them in form)
        }
      });
  };
  console.log(timetableData);

  const handleBackToForm = () => {
    setTimetableVisible(false);
    setPopupOpen(true);
  };

  const handleCreateFinalTimetable = () => {
    // Call API to save final timetable data
    setTimetableVisible(false);
    setStatus('Timetable created successfully!');
  };
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(''); // Clear the status message after 3 seconds
      }, 3000);

      // Cleanup function to clear the timer if the component unmounts or status changes
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleFetchTimetable = () => {
    if (!selectedDepart || !SelectedSemes || !selectedShift) {
      setStatus("Please select all fields.");
      return;
    }
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-timetable/?department_id=${selectedDepart}&semester_id=${SelectedSemes}&institute_id=${instituteId}&shift=${selectedShift}`;
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          console.log(result.timetable);
          setTimetableData(result.timetable);
          console.log(timetableData);

        } else {
          setStatus(result.message || "No timetable found.");
        }
      })
      .catch(() => setStatus("Error fetching timetable."));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleCreateTimetableClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Create Timetable
        </button>
        <button
          onClick={handleViewTimetableClick}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          View Timetable
        </button>
      </div>
      {status && <div className="text-center text-red-500">{status}</div>}
      {isPopupOpen && (
        <TimetableCreationPopup
          departments={departments}
          semesters={semesters}
          setsemesters={setSemesters}
          onClose={handleClosePopup}
          onNext={handleNextStep}
        />
      )}

      {isTimetableViewed && (
        <div className="space-y-4">
          <div className="flex justify-center space-x-4">
            <select
              className="border px-4 py-2 rounded"
              value={selectedDepart || ""}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDepart(e.target.value)}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dept: any) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            <select
              className="border px-4 py-2 rounded"
              value={SelectedSemes || ""}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSemes(e.target.value)}
            >
              <option value="" disabled>
                Select Semester
              </option>
              {semesters.map((sem: any) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
            </select>

            <select
              className="border px-4 py-2 rounded"
              value={selectedShift || ""}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedShift(e.target.value)}
            >
              <option value="">Select Shift</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleFetchTimetable}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Fetch Timetable
            </button>
          </div>
          {Object.keys(timetableData).length > 0 && (
            <TimetableShow
              timetableData={timetableData}
              onBack={() => setTimetableViewed(false)}
            />
          )}
        </div>
      )}


      {isTimetableVisible && timetableData && (
        <Timetable
          timetableData={timetableData}
          onBack={handleBackToForm}
          onCreate={handleCreateFinalTimetable}
          onEditPeriod={setEditingPeriod}
        />
      )}

      {editingPeriod && (
        <EditPeriodPopup
          period={editingPeriod}
          onClose={() => setEditingPeriod(null)}
        />
      )}
    </div>
  );
};

export default MainComponent;
