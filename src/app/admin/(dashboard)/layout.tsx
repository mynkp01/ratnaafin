"use client";
import ScreenLoader from "@/components/Loader";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { selectIsLoading } from "@/redux/slices/utilSlice";
import { useSidebarState } from "@/utils/helper.client";
import { useSelector } from "react-redux";

function Layout({ children }: { children: React.ReactNode }) {
  const isLoading = useSelector(selectIsLoading);
  const isSidebarOpen = useSidebarState();

  return (
    <section className="flex min-h-screen">
      <SideBar />
      <div className={`flex-1 bg-primary-200 ${isSidebarOpen ? "w-full lg:w-[calc(100%-16.67%)]" : "w-[calc(100%-76px)]"}`}>
        <TopBar />
        <div className="w-full flex-1">
          {isLoading && <ScreenLoader />}
          <div className="!p-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}
