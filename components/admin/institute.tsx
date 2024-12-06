import React, { useState, ChangeEvent, FormEvent } from 'react';

const Institute: React.FC = () => {
  const [showProfessorForm, setShowProfessorForm] = useState<boolean>(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [professorInputMethod, setProfessorInputMethod] = useState<string>('input');
  const [departmentInputMethod, setDepartmentInputMethod] = useState<string>('input');
  const [professorData, setProfessorData] = useState<{
    semester: string;
    subjects: string;
    file: File | null;
  }>({
    semester: '',
    subjects: '',
    file: null,
  });
  const instituteIdString = localStorage.getItem('Institute_id');
  const instituteId: number | null = instituteIdString ? parseInt(instituteIdString, 10) : null;
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

  const handleSubmitProfessor = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (professorInputMethod === "file" && professorData.file) {
      const formData = new FormData();
      formData.append("file", professorData.file);
      formData.append("institute_id", instituteId?.toString() || '');
      formData.append("department_id", "1"); // Replace with the actual department ID

      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-semesters-and-subjects-file/`, {
              method: "POST",
              body: formData,
          });

          if (response.ok) {
              const data = await response.json();
              setStatus("File uploaded successfully!");
              console.log("Response Data:", data);
          } else {
              const errorData = await response.json();
              setStatus(`Error: ${errorData.detail}`);
          }
      } catch (error) {
          console.error("Error uploading file:", error);
          setStatus("An error occurred while uploading the file.");
      }
  } else if (professorInputMethod === "input") {
      const payload = {
          institute_id: instituteId,
          department_id: 1, // Replace with the actual department ID
          semester: professorData.semester,
          subjects: professorData.subjects.split(",").map((subject) => subject.trim()),
      };

      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-semesters-and-subjects/`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
          });

          if (response.ok) {
              const data = await response.json();
              setStatus("Semester and subjects added successfully!");
              console.log("Response Data:", data);
          } else {
              const errorData = await response.json();
              setStatus(`Error: ${errorData.detail}`);
          }
      } catch (error) {
          console.error("Error adding semester and subjects:", error);
          setStatus("An error occurred while adding semester and subjects.");
      }
  }

  // Reset form
  setProfessorData({
      semester: "",
      subjects: "",
      file: null,
  });
  setShowProfessorForm(false);
  };

  const handleSubmitDepartment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (departmentInputMethod === "file" && departmentData.file) {
      const formData = new FormData();
      formData.append("file", departmentData.file);
      formData.append("institute_id", instituteId?.toString() || ''); 

      try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-departments-file/`, {
              method: "POST",
              body: formData,
          });

          if (response.ok) {
              const data = await response.json();
              setStatus("File uploaded successfully!");
              console.log("Response Data:", data);
          } else {
              const errorData = await response.json();
              setStatus(`Error: ${errorData.detail}`);
          }
      } catch (error) {
          console.error("Error uploading file:", error);
          setStatus("An error occurred while uploading the file.");
      }
  } else if (departmentInputMethod === "input") {
      // Handle manual department input submission logic here.
      console.log("Department Data:", departmentData);
  }

  // Reset form
  setDepartmentData({
      departmentName: "",
      numberOfClasses: "",
      classesNumber: [""],
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
          Semesters and Subjects
        </button>
        <div className="w-4" /> {/* Spacer */}
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={() => setShowDepartmentForm(true)}
        >
          Add Department
        </button>
      </div>
      {status && <p className="text-center text-green-600 mb-4">{status}</p>}
      {/* Add Professor Popup */}
      {showProfessorForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Semesters and Sujects</h3>
            <p className="text-gray-600 mb-4">You can add Semesters and Sujects manually or upload the required Excel file<strong>(Excel file must contain Semester, Subjects. subjects must be separated with comma(,).)</strong></p>
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
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Semester</label>
                    <input
                      type="text"
                      id="semester"
                      name="semester"
                      value={professorData.semester}
                      onChange={handleProfessorInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Semester"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Subjects</label>
                    <input
                      type="text"
                      id="subjects"
                      name="Subjects"
                      value={professorData.subjects}
                      onChange={handleProfessorInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Subjects"
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