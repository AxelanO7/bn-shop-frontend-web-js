import React, { useState } from "react";

export default function Navbar() {
  const [navSide, setNavSide] = useState(false);
  return (
    <>
      <div className="flex flex-col fixed top z-[1] w-full">
        <nav className="bg-green flex flex-row justify-between px-10 items-center py-4 text-white">
          <div
            className="flex flex-col space-y-2"
            onClick={() => setNavSide(!navSide)}
          >
            <div className="w-5 h-0.5 bg-white" />
            <div className="w-5 h-0.5 bg-white" />
            <div className="w-5 h-0.5 bg-white" />
          </div>
          <div className="flex flex-row items-center">
            <div className="w-5 h-5 bg-white rounded-full" />
            <div className="w-4" />
            <p>I Putu Nanda Krsnayana</p>
          </div>
        </nav>
        {navSide ? (
          <div className="h-screen bg-dark_green/75 w-80 text-white py-6 px-10 fixed mt-14 space-y-4">
            <h1>MAIN NAVIGATION</h1>
            <p>Dashboard</p>
            <p>Pemesanan Barang</p>
            <p>Data Barang</p>
            <p>Data Supplier</p>
            <p>Data Master</p>
            <p>Laporan Barang</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
