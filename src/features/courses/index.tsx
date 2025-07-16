"use client";

import { useState } from "react";
import HomeButton from "@/components/button";
import Modal from "@/components/modal";
import CourseForm from "./course-form";
import { getAllCourses } from "@/api/lib/all-course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteCourse } from "@/api/lib/delete-courses";

export interface Course {
  title: string;
  category: string;
  instructorsName: string;
  duration: string;
  price: string;
  curriculum: string;
  status?: string;
}

const CoursesPage = () => {
  const queryClient = useQueryClient();
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  // const [courses, setCourses] = useState<Course[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const handleDelete = (id: any) => {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteMutation.mutate(id);
    }
  };

  // const handleEdit = (course: Course) => {
  //   setEditCourse(course);
  //   setIsOpen(true);
  // };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl flex font-bold text-gray-800">
          Courses
        </h1>

        <HomeButton
          title="Add New Course"
          type="button"
          bg="#3F6FB9"
          width="20%"
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
                  <th className="p-3 whitespace-nowrap">Curriculum</th>
                  <th className="p-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course: any, idx: number) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{course.title}</td>
                    <td className="p-3">{course.category}</td>
                    <td className="p-3">{course.instructorsName}</td>
                    <td className="p-3">{course.duration}</td>
                    <td className="p-3">₦{course.price}</td>
                    <td className="p-3">{course.curriculum}</td>
                    <td className="p-3 flex items-center gap-3">
                      {/* <button
                        onClick={() => handleEdit(course)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit size={16} />
                      </button> */}
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Course"
      >
        <CourseForm onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default CoursesPage;
