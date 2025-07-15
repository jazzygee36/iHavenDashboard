'use client';

import React from 'react';
import Image from 'next/image';
import { FaChalkboardTeacher, FaCheckCircle, FaClock } from 'react-icons/fa';



const instructors = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@instructor.com',
    status: 'Verified',
    joined: '2024-05-20',
    avatar: '/avatar2.png',
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@instructor.com',
    status: 'Pending',
    joined: '2024-06-10',
    avatar: '/avatar3.png',
  },
  // ...more instructors
];

const InstructorsPage = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen px-5 md:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Instructors Dashboard</h1>


      {/* Table */}
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">All Instructors</h2>
          <input
            type="text"
            placeholder="Search by name/email"
            className="border rounded-md px-3 py-1 text-sm"
          />
        </div>

        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b text-gray-600">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => (
              <tr key={instructor.id} className="border-b hover:bg-gray-50">
                <td className="py-3 flex items-center gap-3">
                  <Image
                    src={instructor.avatar}
                    alt={instructor.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span>{instructor.name}</span>
                </td>
                <td>{instructor.email}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      instructor.status === 'Verified'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {instructor.status}
                  </span>
                </td>
                <td>{instructor.joined}</td>
                <td>
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorsPage;
