import React, { useState, ChangeEvent, FormEvent } from 'react';

const Institute: React.FC = () => {
  const [showProfessorForm, setShowProfessorForm] = useState<boolean>(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState<boolean>(false);
  const [professorInputMethod, setProfessorInputMethod] = useState<string>('input');
  const [departmentInputMethod, setDepartmentInputMethod] = useState<string>('input');
  const [professorData, setProfessorData] = useState<{
    name: string;
    email: string;
    phone: string;
    subject: string;
    post: string;
    file: File | null;
  }>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    post: '',
    file: null,
  });
  const [departmentData, setDepartmentData] = useState<{
    departmentName: string;
    numberOfClasses: string;
    classesNumber: string[];
    file: File | null;
  }>({
    departmentName: '',
    numberOfClasses: '',
    classesNumber: [''], // Initialize as an array with one empty string
    file: null,
  });

  const handleProfessorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfessorData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDepartmentInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDepartmentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfessorFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const validExtensions = ['.xls', '.xlsx', '.csv'];
      const isValid = validExtensions.some((ext) => file.name.endsWith(ext));
      if (isValid) {
        setProfessorData((prevData) => ({ ...prevData, file }));
      } else {
        alert('Please upload a valid Excel or spreadsheet file (.xls, .xlsx, .csv).');
      }
    }
  };

  const handleDepartmentFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const validExtensions = ['.xls', '.xlsx', '.csv'];
      const isValid = validExtensions.some((ext) => file.name.endsWith(ext));
      if (isValid) {
        setDepartmentData((prevData) => ({ ...prevData, file }));
      } else {
        alert('Please upload a valid Excel or spreadsheet file (.xls, .xlsx, .csv).');
      }
    }
  };

  const handleAddClassNumber = () => {
    setDepartmentData((prevData) => ({
      ...prevData,
      classesNumber: [...prevData.classesNumber, ''],
    }));
  };

  const handleSubmitProfessor = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle professor submission logic here
    console.log('Professor Data:', professorData);
    // Reset form
    setProfessorData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      post: '',
      file: null,
    });
    setShowProfessorForm(false);
  };

  const handleSubmitDepartment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle department submission logic here
    console.log('Department Data:', departmentData);
    // Reset form
    setDepartmentData({
      departmentName: '',
      numberOfClasses: '',
      classesNumber: [''], // Reset to initial state
      file: null,
    });
    setShowDepartmentForm(false);
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Institute Management</h1>
      <p className="text-center mb-8">Manage professors and departments for your institute.</p>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setShowProfessorForm(true)}
        >
          Add Professor
        </button>
        <div className="w-4" /> {/* Spacer */}
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={() => setShowDepartmentForm(true)}
        >
          Add Department
        </button>
      </div>

      {/* Add Professor Popup */}
      {showProfessorForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Professor</h3>
            <p className="text-gray-600 mb-4">You can add a Professor manually or upload the required Excel file<strong>(Excel file must contain Name, Email, Phone Number, Post, Subject.)</strong></p>
            <form onSubmit={handleSubmitProfessor}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Method:</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="professorInputMethod"
                      value="input"
                      checked={professorInputMethod === "input"}
                      onChange={() => setProfessorInputMethod("input")}
                      className="mr-2"
                    />
                    Add by Input
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="professorInputMethod"
                      value="file"
                      checked={professorInputMethod === "file"}
                      onChange={() => setProfessorInputMethod("file")}
                      className="mr-2"
                    />
                    Upload File
                  </label>
                </div>
              </div>

              {professorInputMethod === "input" && (
                <>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={professorData.name}
                      onChange={handleProfessorInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Professor Name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={professorData.email}
                      onChange={handleProfessorInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Professor Email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={professorData.phone}
                      onChange={handleProfessorInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter 11-digit Phone Number"
                      maxLength={11}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={professorData.subject}
                      onChange={handleProfessorInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Professor Subject"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="post" className="block text-sm font-medium text-gray-700">Post</label>
                    <input
                      type="text"
                      id="post"
                      name="post"
                      value={professorData.post}
                      onChange={handleProfessorInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Professor Post"
                      required
                    />
                  </div>
                </>
              )}

              {professorInputMethod === "file" && (
                <div className="mb-4">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File (Excel/Spreadsheet Only)</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".xls,.xlsx,.csv"
                    onChange={handleProfessorFileChange}
                    required
                  />
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  onClick={() => setShowProfessorForm(false)}
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

      {/* Add Department Popup */}
      {showDepartmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Department</h3>
            <p className="text-gray-600 mb-4">You can add a Department manually or upload the required Excel file <strong>(Excel file must contain Department Name, Number of Classes, Classes Names)</strong></p>
            <form onSubmit={handleSubmitDepartment}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Method:</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departmentInputMethod"
                      value="input"
                      checked={departmentInputMethod === "input"}
                      onChange={() => setDepartmentInputMethod("input")}
                      className="mr-2"
                    />
                    Add by Input
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departmentInputMethod"
                      value="file"
                      checked={departmentInputMethod === "file"}
                      onChange={() => setDepartmentInputMethod("file")}
                      className="mr-2"
                    />
                    Upload File
                  </label>
                </div>
              </div>

              {departmentInputMethod === "input" && (
                <>
                  <div className="mb-4">
                    <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700">Department Name</label>
                    <input
                      type="text"
                      id="departmentName"
                      name="departmentName"
                      value={departmentData.departmentName}
                      onChange={handleDepartmentInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Department Name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="numberOfClasses" className="block text-sm font-medium text-gray-700">Number of Classes</label>
                    <input
                      type="number"
                      id="numberOfClasses"
                      name="numberOfClasses"
                      value={departmentData.numberOfClasses}
                      onChange={handleDepartmentInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Number of Classes"
                      required
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto mb-4">
                    {departmentData.classesNumber.map((classNumber, index) => (
                      <div key={index} className="mb-4">
                        <label
                          htmlFor={`classNumber-${index}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Class Number {index + 1}
                        </label>
                        <input
                          type="text"
                          id={`classNumber-${index}`}
                          name={`classNumber-${index}`}
                          value={classNumber}
                          onChange={(e) => {
                            const updatedClassesNumber = [...departmentData.classesNumber];
                            updatedClassesNumber[index] = e.target.value;
                            setDepartmentData({ ...departmentData, classesNumber: updatedClassesNumber });
                          }}
                          placeholder="Enter Class Number"
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleAddClassNumber}
                  >
                    Add Class Number
                  </button>
                </>
              )}

              {departmentInputMethod === "file" && (
                <div className="mb-4">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File (Excel/Spreadsheet Only)</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".xls,.xlsx,.csv"
                    onChange={handleDepartmentFileChange}
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
                    required
                  />
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  onClick={() => setShowDepartmentForm(false)}
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
    </div>
  );
};

export default Institute;