import React from "react";

interface Period {
    subject: string;
    teacher: string;
    time: string; // Include time slot in your data
}

interface TimetableData {
    [day: string]: Period[]; // Data structure per day
}

interface TimetableProps {
    timetableData: TimetableData;
    onBack: () => void;
}

const TimetableShow: React.FC<TimetableProps> = ({ timetableData, onBack }) => {
    console.log(timetableData);

    const daysOfWeek = Object.keys(timetableData);

    return (
        <div className="space-y-6 flex flex-col ms-48">
            <h2 className="text-xl font-semibold">Timetable</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-2 py-2 border border-gray-300">Day</th>
                        {daysOfWeek.map((day: string, Index: number) => (
                            <td key={Index} className="px-2 py-2 border border-gray-300">
                                {timetableData[day]
                                    .reduce((acc: any[], period: any, idx: number) => {
                                        if (!acc.includes(period.time)) {
                                            acc.push(period.time); 
                                            return [
                                                ...acc,
                                            ];
                                        }
                                        return acc; 
                                    }, [])}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {daysOfWeek.map((day, dayIndex) => (
                        <tr key={dayIndex} className="hover:bg-gray-50">
                            <td className="px-2 py-2 border border-gray-300 font-medium">
                                {day}
                            </td>
                            {timetableData[day].map((period: any, idx: number) => (
                                <td
                                    key={idx}
                                    className="px-2 py-2 border-b cursor-pointer hover:bg-blue-100"
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
                    onClick={onBack}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default TimetableShow;
