// components/admin/Sidebar.tsx
import React from 'react';

const Sidebar = ({setView}:any)=> {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
      </div>
      <ul>
        <li className="p-4 hover:bg-gray-700" onClick={()=>{setView('dashboard')}}>
          <button >Dashboard</button>
        </li>
        <li className="p-4 hover:bg-gray-700" onClick={()=>{setView('user')}}>
          <button  >User Management</button>
        </li>
        <li className="p-4 hover:bg-gray-700" onClick={()=>{setView('institute')}}>
          <button  >Institute Management</button>
        </li>
        <li className="p-4 hover:bg-gray-700" onClick={()=>{setView('timetable')}}>
          <button  >Timetable</button>
        </li>
        <li className="p-4 hover:bg-gray-700" onClick={()=>{setView('profile')}}>
          <button  >Profile</button>
        </li>
        <li className="p-4 hover:bg-gray-700" onClick={()=>{window.location.href='/admin'}}>
          <button >Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
