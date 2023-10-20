import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-40 min-h-screen">
        <h1>AKSES CEPAT</h1>
        <p>silahkan klik dibawah ini</p>
        <div className="h-16" />
        <div className="grid grid-cols-3 gap-4 w-full px-20 h-80 text-center">
          <div className="border border-dark_green rounded-xl p-12">
            <p>PEMESANAN BARANG</p>
          </div>
          <div className="border border-dark_green rounded-xl p-12">
            <p>DATA BARANG</p>
          </div>
          <div className="border border-dark_green rounded-xl p-12">
            <p>DATA SUPPLIER</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
