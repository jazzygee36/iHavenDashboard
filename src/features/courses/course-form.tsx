"use client";

import { useState } from "react";
import HomeButton from "@/components/button";
import HomeInput from "@/components/input";
import { Course } from "./index";
import { createCourse } from "@/api/lib/create-course";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  onClose: () => void;
}

const CourseForm = ({ onClose }: Props) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Course>({
    title: "",
    category: "",
    instructorsName: "",
    duration: "",
    price: "",
    curriculum: "",
    status: "Draft",
  });

  const createMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      onClose();
      resetForm();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      instructorsName: "",
      duration: "",
      price: "",
      curriculum: "",
      status: "Draft",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <HomeInput
        type="text"
        name="title"
        placeholder="Course Title"
        value={formData.title}
        onChange={handleChange}
        required
        height="45px"
      />
      <HomeInput
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
        height="45px"
      />
      <HomeInput
        type="text"
        name="instructorsName"
        placeholder="Instructor Name"
        value={formData.instructorsName}
        onChange={handleChange}
        required
        height="45px"
      />
      <HomeInput
        type="text"
        name="duration"
        placeholder="Duration (e.g. 6 Weeks)"
        value={formData.duration}
        onChange={handleChange}
        height="45px"
      />
      <HomeInput
        type="text"
        name="price"
        placeholder="Price (₦)"
        value={formData.price}
        onChange={handleChange}
        height="45px"
      />
      <textarea
        name="curriculum"
        placeholder="Curriculum Overview"
        className="border px-3 py-2 rounded-md w-full"
        value={formData.curriculum}
        onChange={handleChange}
        rows={4}
      />

      <HomeButton
        type="submit"
      title={createMutation.status === "pending" ? "Submitting..." : "Add Course"}

        bg="#3F6FB9"
        width="100%"
        height="45px"
       disabled={createMutation.status === "pending"}

      />
    </form>
  );
};

export default CourseForm;
