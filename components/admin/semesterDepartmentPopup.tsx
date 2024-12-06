// "use client"
// import React, { useState, useEffect } from "react";

// interface SemesterDepartmentPopupProps {
//   onClose: () => void;
//   onNext: (data: any) => void; // Pass data to the next step
// }

// const SemesterDepartmentPopup: React.FC<SemesterDepartmentPopupProps> = ({ onClose, onNext }) => {
//   const [semesters, setSemesters] = useState<any[]>([]);
//   const [departments, setDepartments] = useState<any[]>([]);
//   const [semester, setSemester] = useState("");
//   const [department, setDepartment] = useState("");
//   const [classTime, setClassTime] = useState("");
//   const [breakTime, setBreakTime] = useState("");
//   const [shift, setShift] = useState("");
//   const [totalShiftTime, setTotalShiftTime] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [showTimeFields, setShowTimeFields] = useState(false);

//   useEffect(() => {
//     // Fetch departments and semesters for a specific institute
//     const fetchData = async () => {
//       try {
//         const instituteId = 1; // Replace with the actual institute ID
//         const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-departments-and-semesters/?institute_id=${instituteId}`; // Ensure this environment variable is set to your API base URL

//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         if (data.success) {
//           // Update departments and semesters in state
//           setDepartments(data.data.map((d: any) => ({ id: d.department_id, name: d.department_name })));
//           // Flatten semesters for dropdown
//           const allSemesters = data.data.flatMap((d: any) =>
//             d.semesters.map((s: any) => ({ id: s.semester_id, name: s.semester_name }))
//           );
//           setSemesters(allSemesters);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleTotalShiftTimeClick = () => {
//     setShowTimeFields(true);
//   };

//   const handleNextClick = () => {
//     const data = { semester, department, classTime, breakTime, shift, totalShiftTime, startTime, endTime };
//     onNext(data); // Pass the collected data to the parent
//   };

//   const handleNext = () => {
//     const data = {
//       semester: semester,
//       department: department,
//     };
//     onNext(data); // Pass data to the parent component
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//         <h2 className="text-xl font-semibold mb-4">Select Semester and Department</h2>
//         <form className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="semester">Semester:</label>
//               <select
//                 id="semester"
//                 value={semester}
//                 onChange={(e) => setSemester(e.target.value)}
//                 className="border rounded p-2 w-full"
//               >
//                 <option value="">Select semester</option>
//                 {semesters.map((s) => (
//                   <option key={s.id} value={s.id}>
//                     {s.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="department">Department:</label>
//               <select
//                 id="department"
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//                 className="border rounded p-2 w-full"
//               >
//                 <option value="">Select department</option>
//                 {departments.map((d) => (
//                   <option key={d.id} value={d.id}>
//                     {d.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="classTime">Class Time:</label>
//               <select
//                 id="classTime"
//                 value={classTime}
//                 onChange={(e) => setClassTime(e.target.value)}
//                 className="border rounded p-2 w-full"
//               >
//                 <option value="">Select class time</option>
//                 {[40, 50, 60, 70, 80, 90].map((time) => (
//                   <option key={time} value={time}>
//                     {time} min
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="breakTime">Break Time:</label>
//               <select
//                 id="breakTime"
//                 value={breakTime}
//                 onChange={(e) => setBreakTime(e.target.value)}
//                 className="border rounded p-2 w-full"
//               >
//                 <option value="">Select break time</option>
//                 {[10, 15, 20, 30, 40, 50, 60].map((time) => (
//                   <option key={time} value={time}>
//                     {time} min
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="shift">Shift:</label>
//               <select
//                 id="shift"
//                 value={shift}
//                 onChange={(e) => setShift(e.target.value)}
//                 className="border rounded p-2 w-full"
//               >
//                 <option value="">Select shift</option>
//                 <option value="morning">Morning</option>
//                 <option value="evening">Evening</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="totalShiftTime">Total Shift Time:</label>
//               <button
//                 type="button"
//                 onClick={handleTotalShiftTimeClick}
//                 className="border rounded p-2 w-full bg-blue-500 text-white"
//               >
//                 Select Total Shift Time
//               </button>
//             </div>
//           </div>

//           {showTimeFields && (
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="startTime">Start Time:</label>
//                 <input
//                   type="time"
//                   id="startTime"
//                   value={startTime}
//                   onChange={(e) => setStartTime(e.target.value)}
//                   className="border rounded p-2 w-full"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="endTime">End Time:</label>
//                 <input
//                   type="time"
//                   id="endTime"
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   className="border rounded p-2 w-full"
//                 />
//               </div>
//             </div>
//           )}

//           <div className="flex justify-end mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 text-black rounded px-4 py-2 mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 handleNextClick
//                 // handleNext
//               }}
//               className="bg-green-500 text-white rounded px-4 py-2"
//             >
//               Next
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SemesterDepartmentPopup;
