"use client";

import DeleteIcon from "@/assets/svg/delete";
import Modal from "@/components/modal";
import SelectInput from "@/components/select-input";
import DeleteProfile from "./delete";
import { getAllUsers } from "@/api/lib/all-users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const statusStyles: Record<string, string> = {
  Active:
    " text-green-700 border border-green-300 rounded-lg px-3 py-[5px] text-xs",
  "Non-Active":
    " text-yellow-700 border border-yellow-300 rounded-lg px-3 py-[5px] text-xs",
};

const paymentStyles: Record<string, string> = {
  Successful:
    "bg-green-100 text-green-700 border border-green-300 rounded-lg px-3 py-[5px] text-xs",
  Pending:
    "bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-lg px-3 py-[5px] text-xs",
  Failed:
    "bg-red-100 text-red-700 border border-red-300 rounded-lg px-3 py-[5px] text-xs",
};

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Non-Active", value: "non-active" },
  { label: "Successful Payment", value: "successful" },
  { label: "Pending Payment", value: "pending" },
  { label: "Failed Payment", value: "failed" },
];

const DashboardTable = () => {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });

  const [filterValue, setFilterValue] = useState("all");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(e.target.value);
  };

  const filteredData = users.filter((user: any) => {
    if (filterValue === "all") return true;
    if (filterValue === "active") return user.isActive === true;
    if (filterValue === "non-active") return user.isActive === false;
    if (filterValue === "successful")
      return user.paymentStatus === "Successful";
    if (filterValue === "pending") return user.paymentStatus === "Pending";
    if (filterValue === "failed") return user.paymentStatus === "Failed";
    return true;
  });

  return (
    <>
      <div className="bg-white px-4 py-6 rounded-lg shadow-md overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          
            <h1 className="text-lg font-semibold text-gray-800">
              All Registered Users
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-gray-500">Filter by</span>
              <SelectInput
                value={filterValue}
                onChange={handleFilterChange}
                options={filterOptions}
                name={""}
                id={""}
              />
            </div>
          
          {/* <span className="text-xs text-[#3F6FB9] underline cursor-pointer">
            See More
          </span> */}
        </div>

        <table className="w-full text-left text-xs min-w-[800px]">
          <thead className="bg-gray-100 text-gray-600 font-medium">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Full Names</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Gender</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredData.map((item: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50 border-b">
                <td className="py-3 px-4">
                  <input type="checkbox" />
                </td>
                <td className="py-3 px-4 capitalize">{item.fullNames}</td>
                <td className="py-3 px-4">{item.email}</td>
                <td className="py-3 px-4">{item.phone}</td>
                <td className="py-3 px-4 capitalize">{item.gender}</td>
                <td className="py-3 px-4">
                  <span
                    className={
                      statusStyles[item.isActive ? "Active" : "Non-Active"]
                    }
                  >
                    {item.isActive ? "Active" : "Non-Active"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={paymentStyles[item.paymentStatus || "Pending"]}
                  >
                    {item.paymentStatus || "Pending"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div
                    className="text-red-600 cursor-pointer"
                    onClick={() => {
                      setSelectedUserId(item._id);
                      setIsModalOpenDelete(true);
                    }}
                  >
                    <DeleteIcon />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-500 gap-3">
          <span>
            Showing data 1 to {filteredData.length} of {users.length} entries
          </span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded hover:bg-gray-200">←</button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  page === 1 ? "bg-[#3F6FB9] text-white" : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-2">...</span>
            <button className="px-3 py-1 rounded hover:bg-gray-100">10</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">→</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpenDelete}
        onClose={() => setIsModalOpenDelete(false)}
        title="Delete Account"
        showCloseIcon
      >
        {selectedUserId && (
          <DeleteProfile
            userId={selectedUserId}
            onClose={() => setIsModalOpenDelete(false)}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["user"] });
              setSelectedUserId(null);
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default DashboardTable;
