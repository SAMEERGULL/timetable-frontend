"use client"
import AdminLogin from "@/components/admin/adminLogin";
import AdminForgotPassword from "@/components/admin/forgetPassword";
import React, { useState } from "react";


const AdminAuth: React.FC = () => {
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

  return (
    <div>
      {showForgotPassword ? (
        <AdminForgotPassword setShowForgotPassword={setShowForgotPassword} />
      ) : (
        <AdminLogin setShowForgotPassword={setShowForgotPassword} />
      )}
    </div>
  );
};

export default AdminAuth;
