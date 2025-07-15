'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import Header from './header';

const MainDashboard = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const title = Sidebar.Links.find(link => link.path === pathname)?.name || 'Dashboard';

  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col flex-1 overflow-y-auto px-4 md:px-6 pb-6">
        <Header title={title} setIsOpen={setIsOpen} />
        <main className="mt-8">{children}</main>
      </div>
    </div>
  );
};

export default MainDashboard;
