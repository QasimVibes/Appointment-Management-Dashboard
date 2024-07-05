"use client";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/userHook";
import Navbar from "@/(components)/Navbar";

const LogoutButton = () => {
  const { user, isLoading, isError } = useUser();
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: "/" });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
    <Navbar/>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h1>{user?.email}</h1>
        <h2>{user?.fullname}</h2>
      </div>
    </>
  );
};

export default LogoutButton;
