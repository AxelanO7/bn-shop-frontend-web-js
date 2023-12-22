import React from "react";
import logo from "../assets/images/logo.png";

interface HeaderPageProps {
  children: React.ReactNode;
  withLogo?: boolean;
}

export default function HeaderPage({
  children,
  withLogo = false,
}: HeaderPageProps) {
  return (
    <h1 className="text-stone_5 font-medium text-center text-3xl bg-white rounded-md shadow-md w-full flex justify-center items-center relative py-4">
      {withLogo && (
        <img src={logo} alt="Logo" className="w-16 h-16 absolute left-4" />
      )}
      {children}
    </h1>
  );
}
