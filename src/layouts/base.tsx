import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

interface BaseLayoutProps {
  text_color?: string;
  padding?: number;
  children: React.ReactNode;
}

export default function BaseLayout({
  padding,
  children,
  text_color,
}: BaseLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-slate-100">
        <div className="h-16" />
        <div
          className={`flex flex-col grow text-${text_color}`}
          style={{ padding: `${(padding || 0) * 4}px` }}
        >
          {children}
        </div>
        <div className="grow" />
        <Footer />
      </div>
    </>
  );
}
