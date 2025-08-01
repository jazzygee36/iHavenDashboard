'use client';

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NotificationIcon from "@/assets/svg/notification";
import ToggleMenu from "@/assets/svg/toggle";

const Header = ({
  title,
  setIsOpen,
}: {
  title: string;
  setIsOpen: (val: boolean) => void;
}) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="w-full py-4 px-2 border-b bg-white shadow-sm flex items-center justify-between sticky top-0 z-10">
      <div className="lg:hidden cursor-pointer" onClick={() => setIsOpen(true)}>
        <ToggleMenu />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 hidden md:block">{title}</h3>

      <div className="flex items-center gap-6">
        <NotificationIcon />
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right">
            {/* <h1 className='text-sm font-semibold'>Lola</h1> */}
            <p className='text-xs text-gray-500'>Admin</p>
          </div>
          {/* <div className='w-10 h-10 bg-gray-400 rounded-full' /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
