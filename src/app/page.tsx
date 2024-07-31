// import { getServerSession } from "next-auth";
// import { authOptions } from "../libs/authOptions";
import Dashboard from "@/components/dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your scheduled events",
  openGraph: {
    title: "Dashboard",
    description: "View your scheduled events",
    url: `${process.env.URL}/dashboard`,
  },
};
export default function Home() {
  // const session = await getServerSession(authOptions);

  // console.log("Log", session?.user);

  return (
    <>
      <div className="relative h-[100vh] flex">
        <Dashboard />
      </div>
    </>
  );
}
