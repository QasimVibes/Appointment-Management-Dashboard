import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { LogoutBtnProps } from "@/types/types";

export default function LogoutBtn({
  text = "Logout",
  className = "",
  children,
  ...props
}: LogoutBtnProps) {
  return (
    <button
      onClick={() => {
        signOut();
        toast.success("Logged out successfully");
      }}
      className={className}
      {...props}
    >
      {children || text}
    </button>
  );
}
