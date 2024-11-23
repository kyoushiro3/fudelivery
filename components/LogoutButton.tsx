"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/signin", 
    });
  };

  return (
    <a
      onClick={handleLogout}
    >
      Logout
    </a>
  );
};

export default LogoutButton;
