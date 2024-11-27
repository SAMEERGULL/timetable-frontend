import React from "react";


const Dashboard = ({setView}:any) => {
  return (
    <div className="p-6 sm:p-8 md:p-12 max-w-screen-lg mx-auto text-xl font-semibold mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Timetable Management */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center text-center">
          <h3 className="text-3xl font-semibold mb-4">Manage Timetables</h3>
          <p className="text-gray-700 mb-6">
            To add staff, teachers, and students, click
            the button below.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" 
          onClick={()=>(setView('timetable'))}>
            Timetable Management
          </button>
        </div>

        {/* User Management */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center text-center">
          <h3 className="text-3xl font-semibold mb-4">User Management</h3>
          <p className="text-gray-700 mb-6">
            To create, edit, or delete timetables, click the button below.
          </p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={()=>(setView('user'))}>
          
            User Management
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
