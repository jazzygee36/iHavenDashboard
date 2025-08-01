"use client";

import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@/assets/svg/dashboardIcon";
import SettingsIcon from "@/assets/svg/settings";
import BookIcon from "@/assets/svg/bookIcon";
import LogOutIcon from "@/assets/svg/logOut";
import Cookies from "js-cookie";

const Links = [
  { name: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  { name: "Courses", icon: BookIcon, path: "/courses" },
  // { name: 'Instructors', icon: BookIcon, path: '/instructors' },
  { name: "Settings", icon: SettingsIcon, path: "/settings" },
];

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogOut = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/[0.50] bg-opacity-40 lg:hidden z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-3/5 sm:w-1/3 lg:w-1/5 bg-[#111827] text-white z-20 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Top: Logo and Links */}
          <div>
            <div className="flex justify-between items-center px-5 py-6 border-b border-gray-700">
              <h2 className="text-lg font-bold tracking-wide">iHaven</h2>
              <button className="lg:hidden" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            <nav className="px-5 py-6 space-y-4">
              {Links.map(({ name, icon: Icon, path }) => (
                <div
                  key={name}
                  onClick={() => {
                    router.push(path);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 px-4 py-3 rounded-md cursor-pointer transition-all duration-200 ${
                    pathname === path
                      ? "bg-[#3F6FB9] text-white font-semibold"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <Icon color={pathname === path ? "#fff" : "#9CA3AF"} />
                  <span className="text-sm">{name}</span>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom: Logout */}
          <div className="px-5 pb-6">
            <div
              className="text-red-500 font-bold px-4 py-3 cursor-pointer flex items-center gap-4 rounded-md transition-all duration-200 hover:bg-gray-700 hover:text-gray-300"
              onClick={handleLogOut}
            >
              <LogOutIcon />
              <span className="text-sm">LogOut</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

Sidebar.Links = Links;
export default Sidebar;
