import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function LogoutBtn({text="Logout",className="" ,...props})  {
  return (
    <button
      onClick={() => {
        signOut();
        toast.success("Logged out successfully");
      }}
      className={`${className}`}
      {...props}
    >
      {text}
    </button>
  );
}
