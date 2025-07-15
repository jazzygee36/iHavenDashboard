'use client';

import HomeInput from '@/components/input';
import HomeButton from '@/components/button';
import { useState } from 'react';

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    currency: 'NGN',
    timezone: 'Africa/Lagos',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit to backend
    console.log(formData);
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        {/* Profile Info */}
        <section>
          <h2 className="text-xl font-semibold text-[#3F6FB9] mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HomeInput
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              height="45px"
            />
            <HomeInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              height="45px"
            />
          </div>
        </section>

        {/* Password Update */}
        <section>
          <h2 className="text-xl font-semibold text-[#3F6FB9] mb-4">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HomeInput
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              height="45px"
            />
            <HomeInput
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              height="45px"
            />
          </div>
        </section>

        

        {/* Submit Button */}
        <HomeButton
          title="Save Changes"
          type="submit"
          bg="#3F6FB9"
          width="100%"
          height="45px"
        />
      </form>
    </div>
  );
};

export default SettingsPage;
