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
          <div className="bg-dark_green/75 w-80 text-white py-6 px-10 space-y-4 h-screen">
            <h1>MAIN NAVIGATION</h1>
            <p
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Dashboard
            </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/order";
              }}
            >
              Pemesanan Barang
            </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/stock";
              }}
            >
              Data Barang
            </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/supplier";
              }}
            >
              Data Supplier
            </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/print-stock";
              }}
            >
              Data Master
            </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/report-order";
              }}
            >
              Laporan Barang
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
