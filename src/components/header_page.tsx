import React from "react";

interface HeaderPageProps {
  children: React.ReactNode;
}

export default function HeaderPage({ children }: HeaderPageProps) {
  return (
    <h1 className="text-stone_5 font-medium text-center text-3xl bg-white py-6 rounded-md shadow-md">
      {children}
    </h1>
  );
}
