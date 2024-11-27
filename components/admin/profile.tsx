// components/admin/Profile.tsx
import React, { useState, useEffect } from 'react';

interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  role: string; // Added role field
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<AdminProfile>({
    name: '',
    email: '',
    phone: '',
    role: 'Admin', // Default role
  });
  const [phoneError, setPhoneError] = useState<string>(''); // State for phone error message

  useEffect(() => {
    // Fetch admin data from API or localStorage (adjust as needed)
    const storedProfile = localStorage.getItem('adminProfile'); // Example using localStorage
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      // If no stored profile, set default values
      setProfile({
        name: 'Admin Name',
        email: 'admin@example.com',
        phone: '1234567890', // Default phone number without dashes
        role: 'Admin', // Default role
      });
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      role: profile?.role || 'Admin', // Keep role unchanged
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      role: profile?.role || 'Admin',
    });
    setPhoneError(''); // Reset phone error when canceling
  };

  const handleSave = () => {
    if (phoneError) return; // Prevent saving if there's an error
    setProfile(formData);
    localStorage.setItem('adminProfile', JSON.stringify(formData)); // Save updated profile
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Validate phone number to ensure it contains only 11 digits
      if (value.length > 11) {
        setPhoneError('Phone number must be 11 digits long.');
      } else {
        setPhoneError(''); // Clear error if valid
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Admin Profile</h2>
      
      {!isEditing ? (
        <div>
          <div className="mb-4">
            <strong>Name:</strong> {profile.name}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {profile.email}
          </div>
          <div className="mb-4">
            <strong>Phone:</strong> {profile.phone}
          </div>
          <div className="mb-4">
            <strong>Role:</strong> {profile.role} {/* Display role */}
          </div>
          
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              id=" email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-200" // Make it read-only
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {phoneError && <p className="text-red-500">{phoneError}</p>} {/* Display error message */}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-200" // Make it read-only
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;