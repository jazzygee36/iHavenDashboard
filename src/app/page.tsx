"use client";

import CardArrow from "@/assets/svg/cardArrow";
import DashboardTable from "@/features/dashboard/table";
import { getAllUsers } from "@/api/lib/all-users";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BarChart4, BookOpen, Users, DollarSign } from "lucide-react";

const Dashboard = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });

  const studentCount = users.filter((user: any) => user).length;
  const instructorCount = users.filter((user: any) => user.role === "instructor").length;

  const courseCount = 5; // Replace with dynamic value if available

  const CardDetails = [
    {
      title: "Total Students",
      value: studentCount,
      growth: "+32.6%",
      icon: Users,
      color: "bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6]",
    },
    {
      title: "Courses Available",
      value: courseCount,
      growth: "+12.3%",
      icon: BookOpen,
      color: "bg-gradient-to-tr from-[#10B981] to-[#22D3EE]",
    },
    {
      title: "Instructors",
      value: instructorCount,
      growth: "+5.8%",
      icon: BarChart4,
      color: "bg-gradient-to-tr from-[#F59E0B] to-[#F97316]",
    },
    {
      title: "Total Revenue",
      value: "₦0",
      growth: "+8.2%",
      icon: DollarSign,
      color: "bg-gradient-to-tr from-[#EF4444] to-[#F87171]",
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {CardDetails.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 relative overflow-hidden"
          >
            {/* Gradient background circle */}
            <div className={`absolute -top-4 -right-4 h-20 w-20 opacity-10 rounded-full ${item.color}`} />

            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-500">
                {item.title}
              </div>
              <div className={`p-2 rounded-full text-white ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
            </div>

            <div className="text-3xl font-bold text-gray-800">{item.value}</div>
            <div className="text-xs text-green-500 mt-1">
              {item.growth} <span className="text-gray-400">than last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <DashboardTable />
    </div>
  );
};

export default Dashboard;
