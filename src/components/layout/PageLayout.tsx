import { Navbar } from "@/components/layout/Navbar";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";

interface PageLayoutProps {
  children?: React.ReactNode;
  showSidebar?: boolean;
  className?: string;
}

export function PageLayout({
  children,
  showSidebar = true,
  className,
}: PageLayoutProps) {
  // Mock communities data - in a real app, this would come from an API
  const communities = [
    { id: "1", name: "Sunflower Ecovillage" },
    { id: "2", name: "Mountain View Co-op" },
    { id: "3", name: "Urban Permaculture" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 flex">
        {showSidebar && (
          <aside className="hidden border-r bg-background md:block md:w-64 lg:w-72">
            <SidebarNav communities={communities} className="w-full" />
          </aside>
        )}
        <main className={cn("flex-1 overflow-y-auto px-8", className)}>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
