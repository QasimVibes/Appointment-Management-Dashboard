import { Profile as ProfileComponent } from "@/components/profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your profile",
  keywords: "Profile, View, Profile",
  openGraph: {
    title: "Profile",
    description: "View your profile",
    url: `${process.env.URL}/profile`,
  },
};
export default function Profile() {
  return (
    <>
      <div className="relative h-[100vh] flex">
        <ProfileComponent />
      </div>
    </>
  );
}
