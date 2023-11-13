import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

interface BaseLayoutProps {
  padding?: number;
  children: React.ReactNode;
}

export default function BaseLayout({ padding = 0, children }: BaseLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="h-16" />
        <div className={`flex flex-col grow p-${padding}`}>{children}</div>
        <div className="grow" />
        <Footer />
      </div>
    </>
  );
}
