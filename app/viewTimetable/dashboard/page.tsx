"use client"

import React, { useState, useEffect } from "react";
import TimetableShow from "@/components/admin/timetableShow";

const StudentView: React.FC = () => {
  const [isTimetableViewed, setTimetableViewed] = useState(false);
  const [timetableData, setTimetableData] = useState<any>({});
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

  console.log(departments);
  console.log(semesters);

  useEffect(() => {
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
  }, []);

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
      {status && <div className="text-center text-red-500">{status}</div>}

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
    </div>
  );
};

export default StudentView;
