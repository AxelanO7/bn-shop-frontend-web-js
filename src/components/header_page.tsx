import React from "react";

interface HeaderPageProps {
  children: React.ReactNode;
}

export default function HeaderPage({ children }: HeaderPageProps) {
  return (
    <h1 className="text-stone-500 font-normal text-center text-3xl">
      {children}
    </h1>
  );
}
