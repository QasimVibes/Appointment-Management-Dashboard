import Dashboard from "@/components/dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your scheduled events",
  keywords: "Dashboard, View, Dashboard",
  openGraph: {
    title: "Dashboard",
    description: "View your scheduled events",
    url: `${process.env.URL}/dashboard`,
  },
};
export default function Home() {
  return (
    <>
      <div className="relative h-[100vh] flex justify-center">
        <Dashboard />
      </div>
    </>
  );
}
