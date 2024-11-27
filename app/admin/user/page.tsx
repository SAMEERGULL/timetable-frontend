import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    post: "",
    subject: "",
    file: null,
  });
  const [inputMethod, setInputMethod] = useState("manual");

  // State to hold the lists of users, teachers, and students
  const [users, setUsers] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      post: "",
      subject: "",
      file: null,
    });
    setInputMethod("manual");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const validExtensions = [".xls", ".xlsx", ".csv"];
      const isValid = validExtensions.some((ext) => file.name.endsWith(ext));
      
      if (isValid) {
        setFormData({ ...formData, file });
      } else {
        alert("Please upload a valid Excel or spreadsheet file (.xls, .xlsx, .csv).");
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === "Add User") {
      setUsers([...users, { ...formData }]);
    } else if (formType === "Add Teacher") {
      setTeachers([...teachers, { ...formData }]);
    } else if (formType === "Add Student") {
      setStudents([...students, { ...formData }]);
    }
    resetFormData();
    setShowForm(false);
  };

  const handleDelete = (id: number, type: string) => {
    if (type === "user") {
      setUsers(users.filter((_, index) => index !== id));
    } else if (type === "teacher") {
      setTeachers(teachers.filter((_, index) => index !== id));
    } else if (type === "student") {
      setStudents(students.filter((_, index) => index !== id));
    }
  };

  const handleEdit = (id: number, type: string) => {
    const data = type === "user" ? users[id] : type === "teacher" ? teachers[id] : students[id];
    setFormData(data);
    setFormType(type === "user" ? "Add User" : type === "teacher" ? "Add Teacher" : "Add Student");
    setShowForm(true);
    handleDelete(id, type); // Remove the entry to allow for re-adding
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">User  Management</h1>

      {/* Buttons to open respective forms */}
      <div className="flex justify-center space-x-4 mb-8">
        {["Add User", "Add Teacher", "Add Student"].map((label) => (
          <button
            key={label}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => {
              setFormType(label);
              resetFormData();
              setShowForm(true);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* View buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {["View User", "View Teacher", "View Student"].map((label) => (
          <button
            key={label}
            className="px- 4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={() => {
              setFormType(label);
              setShowForm(false); // Close form to show list
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{formType}</h3>
            <p className="text-gray-600 mb-4">
              {formType === "Add User" && "Fill in the details below to add a new user."}
              {formType === "Add Teacher" && "You can add a teacher manually or upload the required Excel file."}
              {formType === "Add Student" && "Please upload the Excel file to add students."}
            </p>
            <form onSubmit={handleFormSubmit}>
              {/* Teacher-specific Toggle */}
              {formType === "Add Teacher" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Method:
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="inputMethod"
                        value="manual"
                        checked={inputMethod === "manual"}
                        onChange={() => setInputMethod("manual")}
                        className="mr-2"
                      />
                      Manual Entry
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="inputMethod"
                        value="file"
                        checked={inputMethod === "file"}
                        onChange={() => setInputMethod("file")}
                        className="mr-2"
                      />
                      Upload File
                    </label>
                  </div>
                </div>
              )}

              {/* Manual Entry Fields */}
              {inputMethod === "manual" && (formType === "Add User" || formType === "Add Teacher") && (
                <>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      maxLength={50}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter full name"
                      required
                    />
                    <small className="text-gray-500">Max 50 characters.</small>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="example@domain.com"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address."
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength={15}
                      pattern="\d{10,15}"
                      title="Phone number must be between 10-15 digits."
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1234567890"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="post" className="block text-sm font-medium text-gray-700">
                      Post
                    </label>
                    <input
                      type="text"
                      id="post"
                      name="post"
                      value={formData.post}
                      onChange={handleInputChange}
                      maxLength={ 30}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter post"
                      required
                    />
                    <small className="text-gray-500">Max 30 characters.</small>
                  </div>
                  {formType === "Add Teacher" && (
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        maxLength={50}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter subject"
                        required
                      />
                    </div>
                  )}
                </>
              )}

              {/* File Upload Field */}
              {(inputMethod === "file" && formType === "Add Teacher") || formType === "Add Student" ? (
                <div className="mb-4">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    Upload File (Excel/Spreadsheet Only)
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".xls,.xlsx,.csv"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                    required
                  />
                  <small className="text-gray-500">
                    Only Excel or spreadsheet files (.xls, .xlsx, .csv) are allowed.
                  </small>
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  onClick={() => {
                    resetFormData();
                    setShowForm(false);
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Lists for Users, Teachers, and Students in Tabular Format */}
      {formType === "View User" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          {users.length > 0 ? (
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Phone</th>
                  <th className="border border-gray-300 p-2">Post</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{user.name}</td>
                    <td className="border border-gray-300 p-2">{user.email}</td>
                    <td className="border border-gray-300 p-2">{user.phone}</td>
                    <td className="border border-gray-300 p-2">{user.post}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => handleEdit(index, "user")}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                        onClick={() => handleDelete(index, "user")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}

      {formType === "View Teacher" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Teachers</h2>
          {teachers.length > 0 ? (
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Phone</th>
                  <th className="border border-gray-300 p-2">Post</th>
                  <th className="border border-gray-300 p-2">Subject</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{teacher.name}</td>
                    <td className="border border-gray-300 p-2">{teacher.email}</td>
                    <td className="border border-gray-300 p-2">{teacher.phone}</td>
                    <td className="border border-gray-300 p-2">{teacher.post}</td>
                    <td className="border border-gray-300 p-2">{teacher.subject}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => handleEdit(index, "teacher")}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                        onClick={() => handleDelete(index, "teacher")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No teachers found.</p>
          )}
        </div>
      )}

      {formType === "View Student" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Students</h2>
          {students.length > 0 ? (
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Phone</th>
                  <th className="border border-gray-300 p-2">Post</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{student.name}</td>
                    <td className="border border-gray-300 p-2">{student.email}</td>
                    <td className="border border-gray-300 p-2">{student.phone}</td>
                    <td className="border border-gray-300 p-2">{student.post}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => handleEdit(index, "student")}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                        onClick={() => handleDelete(index, "student")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;