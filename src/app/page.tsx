"use client";
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: '/' });
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };
  return (
    <>
      <button onClick={handleLogout}>
      Logout
    </button>
    </>
  );
};

export default LogoutButton;
