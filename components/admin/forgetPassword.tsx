import React from "react";

const AdminForgotPassword = ({ setShowForgotPassword }:any) => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your registered email address, and we’ll send you instructions to reset your password.
        </p>
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@example.com"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowForgotPassword(false)}
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminForgotPassword;
