// import React, { useState } from "react";

// // Define the Period interface
// interface Period {
//   subject: string;
//   classNumber: string;
//   teacher: string;
// }

// interface EditPeriodPopupProps {
//   period: Period;
//   onSave: (updatedPeriod: Period) => void;
//   onClose: () => void;
// }

// // Dummy data for dropdowns
// const subjects = ["Math", "Physics", "Chemistry", "Biology", "English", "History", "Art"];
// const classNumbers = ["Class 101", "Class 102", "Class 103", "Class 201", "Class 202", "Class 301"];
// const teachers = ["Sir Sameer", "Dr. Khan", "Ms. Smith", "Mr. Ahmed", "Dr. Aisha", "Ms. Nora", "Mr. Lee"];

// const EditPeriodPopup: React.FC<EditPeriodPopupProps> = ({ period, onSave, onClose }) => {
//   const [subject, setSubject] = useState(period.subject);
//   const [classNumber, setClassNumber] = useState(period.classNumber);
//   const [teacher, setTeacher] = useState(period.teacher);

//   const handleSave = () => {
//     onSave({ ...period, subject, classNumber, teacher });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Edit Period</h2>
        
//         <div className="mb-4">
//           <label className="block text-gray-700">Subject:</label>
//           <select
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="border border-gray-300 px-2 py-1 w-full"
//           >
//             {subjects.map((sub) => (
//               <option key={sub} value={sub}>{sub}</option>
//             ))}
//           </select>
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-gray-700">Class Number:</label>
//           <select
//             value={classNumber}
//             onChange={(e) => setClassNumber(e.target.value)}
//             className="border border-gray-300 px-2 py-1 w-full"
//           >
//             {classNumbers.map((classNum) => (
//               <option key={classNum} value={classNum}>{classNum}</option>
//             ))}
//           </select>
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-gray-700">Teacher:</label>
//           <select
//             value={teacher}
//             onChange={(e) => setTeacher(e.target.value)}
//             className="border border-gray-300 px-2 py-1 w-full"
//           >
//             {teachers.map((tch) => (
//               <option key={tch} value={tch}>{tch}</option>
//             ))}
//           </select>
//         </div>

//         <div className="flex justify-between mt-4">
//           <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
//             Close
//           </button>
//           <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditPeriodPopup;

import React from "react";

interface EditPeriodPopupProps {
  period: any;
  onClose: () => void;
}

const EditPeriodPopup: React.FC<EditPeriodPopupProps> = ({ period, onClose }) => {
  console.log(period);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Period</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={period.subject}
            className="w-full p-2 border rounded-md"
            readOnly
          />

          <input
            type="text"
            value={period.teacher}
            className="w-full p-2 border rounded-md"
            readOnly
          />
          <input
            type="text"
            value={period.class_name}
            className="w-full p-2 border rounded-md"
            readOnly
          />
          

          {/* Add more fields to edit */}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
          >
            Close
          </button>
          <button
            onClick={() => {}}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPeriodPopup;
