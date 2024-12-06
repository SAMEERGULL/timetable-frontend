"use client"
import React, { useState, useEffect } from "react";

interface ManagerCreate {
  name: string;
  email: string;
  phone: string;
  institute_id: number | null; // Assuming institute ID is a number
}

interface TeacherCreate {
  name: string;
  email: string;
  phone: string;
  subject: string;
  institute_id: number | null; 
}

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone_number: "",
    phone: "",
    subject: "",
    file: null as File | null,
  });
  const [inputMethod, setInputMethod] = useState("manual");
  const [status, setStatus] = useState<string>('');
  const instituteIdString = localStorage.getItem('Institute_id');
  const instituteId: number | null = instituteIdString ? parseInt(instituteIdString, 10) : null;
  const loggedRole = localStorage.getItem('role');
  const [users, setUsers] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  const resetFormData = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      phone_number: "",
      phone: "",
      subject: "",
      file: null as File | null,
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

  const addTeachersFromFile = async (file: File, instituteId:any) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/add-teachers-file/`;
    const formData = new FormData();
    formData.append('institute_id', instituteId?.toString() || '');
    
    if (file) {
      formData.append('file', file);
    } else {
      throw new Error("No file provided");
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
  }
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add teachers from file');
      }

      const data = await response.json();
      setTeachers(data)
      console.log('Teachers added successfully from file:', data);
      setStatus(data.message);
    } catch (error) {
      setStatus('Error: ' + (error as Error).message);
    }
  };

  const addTeachersManually = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/add-teachers/`;
    const teachersData: TeacherCreate[] = [
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        institute_id: instituteId,
      }
    ];

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ institute_id: instituteId, teachers: teachersData, file: null }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add teachers manually');
      }

      const data = await response.json();
      setTeachers(data)
      console.log('Teachers added successfully from manual entry:', data);
      setStatus(data.message);
    } catch (error) {
      setStatus('Error: ' + (error as Error).message);
    }
  };

  const updateUser  = async (userId:any, userData:any) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/update-user/${userId}/`; // API URL
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send the user data as JSON
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update user');
      }
  
      const data = await response.json();
      console.log('User  updated successfully:', data);
      return data; // Return the response data for further processing
  
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; // Re-throw the error for further handling if needed
    }
  };

  const updateTeacher = async (teacherId:any, teacherData:any) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/update-teacher/`; // API URL
      const requestBody = {
        institute_id: instituteId,
        teacher_id: teacherId,
        name: teacherData.name,
        email: teacherData.email,
        phone_number: teacherData.phone_number,
        subject: teacherData.subject,
      };


      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Send the teacher data as JSON
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update teacher');
      }
  
      const data = await response.json();
      console.log('Teacher updated successfully:', data);
      return data; // Return the response data for further processing
  
    } catch (error) {
      console.error('Error updating teacher:', error);
      throw error; // Re-throw the error for further handling if needed
    }
};


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === "Add User") {
      setUsers([...users, { ...formData }]);
      const managerData: ManagerCreate = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        institute_id: instituteId,
      }
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/add-manager/`;
      console.log('API URL:', apiUrl); // Log the API URL
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(managerData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to add manager');
        }
  
        const data = await response.json();
        setStatus(data.message); // Set success message
  
      } catch (error) {
        setStatus('Error: ' + (error as Error).message); // Set error message
      }
    } else if (formType === "Add Teacher") {
        if (formData.file) {
          console.log('Adding teachers from file:', formData.file);
          
          await addTeachersFromFile(formData.file, instituteId);
        } else {
          await addTeachersManually();
        }
      } else if (formType === "Add Student") {
      setStudents([...students, { ...formData }]);
    }else if (formType === "Edit User") {
      try {
        const userId = formData.id; // Assuming you have an id in formData for the user being edited
        const userData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        };
        await updateUser (userId, userData);
        // Update local state after successful update
        setUsers(users.map(user => user.id === userId ? { ...user, ...userData } : user));
        setStatus('User  updated successfully');
      } catch (error) {
        setStatus('Error: ' + (error as Error).message);
      }
    }else if (formType === "Edit Teacher") {
      try {
        const teacherId = formData.id; // Assuming you have an id in formData for the teacher being
        const teacherData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
        };
        await updateTeacher(teacherId, teacherData);
        // Update local state after successful update
        setTeachers(teachers.map(teacher => teacher.id === teacherId ? { ...teacher, ...
        teacherData } : teacher));
        setStatus('Teacher updated successfully');
        } catch (error) {
          setStatus('Error: ' + (error as Error).message)
          }
    resetFormData();
    setShowForm(false);
  };
};

  const deleteUser  = async (user_id:number, instituteId:number|null) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/delete-user/${user_id}/?institute_id=${instituteId}`; // API URL
  
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete user');
      }
  
      const data = await response.json();
      console.log('User  deleted successfully:', data);
      return data; // Return the response data for further processing
  
    } catch (error) {
      console.log('Error deleting user:', (error as Error));
      throw error; // Re-throw the error for further handling if needed
    }
  };

  const handleDelete = async (id: number, type: string) => {
    if (type === "user") { // Assuming id is the index in the users array
      const user_id = users[id].id;
      console.log(user_id);
      console.log(instituteId);
      
      
      
      try {
        await deleteUser (user_id, instituteId);
        setUsers(users.filter(user => user.id !== user_id)); // Update local state to remove the deleted user
        setStatus('User  deleted successfully'); // Set success message
      } catch (error) {
        setStatus('Error: ' + (error as Error).message); // Set error message
      }
    } else if (type === "teacher") {
      setTeachers(teachers.filter((_, index) => index !== id));
    } else if (type === "student") {
      setStudents(students.filter((_, index) => index !== id));
    }
  };

  const handleEdit = (id: number, type: string) => {
    const data = type === "user" ? users[id] : type === "teacher" ? teachers[id] : students[id];
    setFormData({...data,
      id: data.id,
    });
    setFormType(type === "user" ? "Add User" : type === "teacher" ? "Add Teacher" : "Add Student");
    setShowForm(true);
  };
  
  const getData = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formType);
    
    if (formType === "View User") {
      setUsers([...users, { ...formData }]);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/`; // Ensure this environment variable is set to your API base URL

      const requestBody = {
        institute_id: instituteId,
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setStatus(errorData.detail)
          throw new Error(errorData.detail || 'Failed to fetch users');
        }

        const fetchedusers = await response.json();
        setUsers(fetchedusers) 
        console.log('Users fetched successfully:', users);
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw the error for further handling if needed
      }
    } else if (formType === "View Teacher") {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/teachers/?institute_id=${instituteId}`; // Ensure this environment variable is set to your API base URL

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setStatus(errorData.detail)
          throw new Error(errorData.detail || 'Failed to fetch teachers');
        }

        const fetchedteachers = await response.json();
        setTeachers(fetchedteachers.data)
        console.log('Teachers fetched successfully:', teachers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        throw error; 
      }
    } else if (formType === "Add Student") {
      setStudents([...students, { ...formData }]);
    }
    resetFormData();
    setShowForm(false);
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(''); // Clear the status message after 3 seconds
      }, 3000);

      // Cleanup function to clear the timer if the component unmounts or status changes
      return () => clearTimeout(timer);
    }
  }, [status]);

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
      {status && <p className="text-red-600">{status}</p>}
      {/* View buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {["View User", "View Teacher", "View Student"].map((label) => (
          <button
            key={label}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={(e) => {
              getData(e)
              setFormType(label);
              setShowForm(false); 
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
              {formType === "Add Teacher" && (
  <>
    You can add a teacher manually or upload the required Excel file (
    <strong>Excel file must contain Name, Email, Phone Number, Post, Subject.</strong>
    )
  </>
)}
             {formType === "Add Student" && (
  <>
    Please upload the Excel file<strong>Excel file must contain Name, Email, Phone Number, Post, Subject.</strong> to add students.
  </>
)}
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
              {inputMethod === "manual" && (formType === "Add User" || formType === "Add Teacher" || formType === "Edit User" || formType === "Edit Teacher") && (
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
                      value={formData.phone || formData.phone_number}
                      onChange={handleInputChange}
                      maxLength={15}
                      pattern="\d{10,15}"
                      title="Phone number must be between 10-15 digits."
                      className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1234567890"
                      required
                    />
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
                  <th className="border border-gray-300 p-2">Role</th>
                  {loggedRole === 'admin' ? (
                    <th className="border border-gray-300 p-2">Actions</th>
                  ):(
                    <></>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{user.name}</td>
                    <td className="border border-gray-300 p-2">{user.email}</td>
                    <td className="border border-gray-300 p-2">{user.phone}</td>
                    <td className="border border-gray-300 p-2">{user.role}</td>
                    <td className="border border-gray-300 p-2">
                      {loggedRole === 'admin' ? (
                        <>
                          <button
                            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            onClick={() => {
                              handleEdit(index, "user")
                              setFormType('Edit User')
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                            onClick={() => handleDelete(index, "user")}
                          >
                            Delete
                          </button>
                        </>
                      ):(
                        <></>
                      )}
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
                  <th className="border border-gray-300 p-2">Role</th>
                  <th className="border border-gray-300 p-2">Subject</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{teacher.name}</td>
                    <td className="border border-gray-300 p-2">{teacher.email}</td>
                    <td className="border border-gray-300 p-2">{teacher.phone_number}</td>
                    <td className="border border-gray-300 p-2">{teacher.role}</td>
                    <td className="border border-gray-300 p-2">{teacher.subject}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => {
                          handleEdit(index, "teacher")
                          setFormType('Edit Teacher')
                        }}
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
                  <th className="border border-gray-300 p-2">Role</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{student.name}</td>
                    <td className="border border-gray-300 p-2">{student.email}</td>
                    <td className="border border-gray-300 p-2">{student.phone}</td>
                    <td className="border border-gray-300 p-2">{student.role}</td>
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