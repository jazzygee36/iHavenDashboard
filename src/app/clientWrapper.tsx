"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainDashboard from "@/components/main-dashboard";
import Loading from "@/components/loading";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!hasMounted) return null;

  const content = loading ? (
    <div className="w-full h-full flex items-center justify-center py-20">
      <Loading />
    </div>
  ) : (
    children
  );

  const isLandingPage = pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      {isLandingPage ? content : <MainDashboard>{content}</MainDashboard>}
    </QueryClientProvider>
  );
}
