"use client";

import { useState } from "react";
import HomeButton from "@/components/button";
import Modal from "@/components/modal";
import CourseForm from "./course-form";

export interface Course {
  title: string;
  category: string;
  instructor: string;
  duration: string;
  price: string;
  curriculum: string;
  status: string;
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Manage Courses</h1>
        <HomeButton
          title="Add New Course"
          type="button"
          bg="#3F6FB9"
          width="12%"
          height="45px"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* --- COURSE LIST --- */}
      <div className="bg-white mt-6 p-4 md:p-6 rounded-lg shadow">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-[#3F6FB9]">
          Existing Courses
        </h2>
        {courses.length === 0 ? (
          <p className="text-gray-500 italic">No courses added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[600px]">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 whitespace-nowrap">Title</th>
                  <th className="p-3 whitespace-nowrap">Category</th>
                  <th className="p-3 whitespace-nowrap">Instructor</th>
                  <th className="p-3 whitespace-nowrap">Duration</th>
                  <th className="p-3 whitespace-nowrap">Price</th>
                  <th className="p-3 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{course.title}</td>
                    <td className="p-3">{course.category}</td>
                    <td className="p-3">{course.instructor}</td>
                    <td className="p-3">{course.duration}</td>
                    <td className="p-3">₦{course.price}</td>
                    <td className="p-3">{course.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Course">
        <CourseForm setCourses={setCourses} onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default CoursesPage;
