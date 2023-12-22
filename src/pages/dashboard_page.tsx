import React from "react";
import BaseLayout from "../layouts/base";

export default function DashboardPage() {
  return (
    <BaseLayout padding={12} text_color="stone_5">
      <div className="bg-white py-4 rounded-md shadow-md">
        <h1 className="text-stone_5 font-medium text-center text-4xl">
          AKSES CEPAT
        </h1>
        <p className="text-center">silahkan klik dibawah ini</p>
      </div>
      <div className="h-12" />
      <div className="grid grid-cols-3 gap-20 w-full text-center text-white">
        <div
          className="bg-white shadow-xl rounded-xl cursor-pointer"
          onClick={() => {
            window.location.href = "/order";
          }}
        >
          <p className="text-xl bg-dark_green rounded-xl py-4">
            PEMESANAN BAHAN BAKU
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-right-square w-60 mx-auto"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8" />
            <path d="m12 16 4-4-4-4" />
          </svg>
        </div>
        <div
          className="bg-white shadow-xl rounded-xl cursor-pointer"
          onClick={() => {
            window.location.href = "/stock";
          }}
        >
          <p className="text-xl bg-dark_green rounded-xl py-4">DATA BARANG</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-right-square w-60 mx-auto"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8" />
            <path d="m12 16 4-4-4-4" />
          </svg>
        </div>
        <div
          className="bg-white shadow-xl rounded-xl cursor-pointer"
          onClick={() => {
            window.location.href = "/supplier";
          }}
        >
          <p className="text-xl bg-dark_green rounded-xl py-4">DATA SUPPLIER</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-right-square w-60 mx-auto"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8" />
            <path d="m12 16 4-4-4-4" />
          </svg>
        </div>
      </div>
    </BaseLayout>
  );
}
