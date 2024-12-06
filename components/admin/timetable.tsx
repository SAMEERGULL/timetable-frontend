import React from "react";

interface TimetableProps {
  timetableData: any;
  onBack: () => void;
  onCreate: () => void;
  onEditPeriod: (period: any) => void;
}

const Timetable: React.FC<TimetableProps> = ({
  timetableData,
  onBack,
  onCreate,
  onEditPeriod,
}) => {
  // Convert timetableData object to an array of days and periods
  const daysOfWeek = Object.keys(timetableData);

  return (
    <div className="space-y-6 flex flex-col ms-48">
        <h2 className="text-xl font-semibold">Timetable</h2>
        <h4>Click on the fields to Edit Data.</h4>
      <table className="table-auto w-90 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-2 border-b">Day</th>
            <th className="px-2 py-2 border-b">Period 1</th>
            <th className="px-2 py-2 border-b">Period 2</th>
            {/* Add more periods as needed */}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day: string, index: number) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{day}</td>
              {timetableData[day].map((period: any, idx: number) => (
                <td
                  key={idx}
                  onClick={() => onEditPeriod(period)}
                  className="px-2 py-2 border-b cursor-pointer hover:bg-blue-100"
                  contentEditable
                >
                  {period.subject}
                  {period.teacher}
                  {period.class_name}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
        >
          Back
        </button>
        <button
          onClick={onCreate}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Timetable;
