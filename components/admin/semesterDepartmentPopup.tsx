import React, { useState } from "react";

interface SemesterDepartmentPopupProps {
  onClose: () => void;
  onNext: (data: any) => void; // Pass data to the next step
}

const SemesterDepartmentPopup: React.FC<SemesterDepartmentPopupProps> = ({ onClose, onNext }) => {
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [classTime, setClassTime] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [shift, setShift] = useState("");
  const [totalShiftTime, setTotalShiftTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showTimeFields, setShowTimeFields] = useState(false);

  const handleTotalShiftTimeClick = () => {
    setShowTimeFields(true);
  };

  const handleNextClick = () => {
    const data = { semester, department, classTime, breakTime, shift, totalShiftTime, startTime, endTime };
    onNext(data); // Pass the collected data to the parent
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Select Semester and Department</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="semester">Semester:</label>
              <select
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="">Select semester</option>
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 1} value={`semester${i + 1}`}>
                    Semester {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="">Select department</option>
                <option value="cs">Computer Science</option>
                <option value="ee">Electrical Engineering</option>
                <option value="me">Mechanical Engineering</option>
                {/* Add more departments as needed */}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="classTime">Class Time:</label>
              <select
                id="classTime"
                value={classTime}
                onChange={(e) => setClassTime(e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="">Select class time</option>
                {[40, 50, 60, 70, 80, 90].map((time) => (
                  <option key={time} value={time}>
                    {time} min
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="breakTime">Break Time:</label>
              <select
                id="breakTime"
                value={breakTime}
                onChange={(e) => setBreakTime(e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="">Select break time</option>
                {[10, 15, 20, 30, 40, 50, 60].map((time) => (
                  <option key={time} value={time}>
                    {time} min
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="shift">Shift:</label>
              <select
 id="shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="">Select shift</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
              </select>
            </div>
            <div>
              <label htmlFor="totalShiftTime">Total Shift Time:</label>
              <button
                type="button"
                onClick={handleTotalShiftTimeClick}
                className="border rounded p-2 w-full bg-blue-500 text-white"
              >
                Select Total Shift Time
              </button>
            </div>
          </div>

          {showTimeFields && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime">Start Time:</label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="endTime">End Time:</label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black rounded px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              className="bg-green-500 text-white rounded px-4 py-2"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SemesterDepartmentPopup;