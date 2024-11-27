"use client"
import Dashboard from "@/components/admin/dashboard";
import Sidebar from "@/components/admin/sidevar";
import React, { use, useState } from "react";
import UserManagement from "../user/page";

import Profile from "@/components/admin/profile";
import TimetableList from "@/components/admin/timetable";
import Institute from "@/components/admin/institute";


const AdminDashboard: React.FC = () => {
    const [view,setView] = useState<any>('dashboard');
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <Sidebar setView={setView} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
      <h1 className="text-2xl font-bold text-center text-blue-600 md:text-4xl mt-4 mb-4">
  Smart Timetable
</h1>

        {view === 'dashboard' && (
            <Dashboard setView={setView} />
        )}
        {view === 'user' && (
            <UserManagement />
        )}
        {view === 'institute' && (
            <Institute />
        )}
        
        {view === 'timetable' && (
            <TimetableList />
        )}
        {view === 'profile' && (
            <Profile />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
