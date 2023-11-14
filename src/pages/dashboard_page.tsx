import React from "react";
import BaseLayout from "../layouts/base";
import HeaderPage from "../components/header_page";

export default function DashboardPage() {
  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>AKSES CEPAT</HeaderPage>
      <p className="text-center">silahkan klik dibawah ini</p>
      <div className="h-16" />
      <div className="grid grid-cols-3 gap-4 w-full h-80 text-center">
        <div
          className="border border-dark_green rounded-xl p-12"
          onClick={() => {
            window.location.href = "/order";
          }}
        >
          <p className="text-black text-xl">PEMESANAN BARANG</p>
          <div className="h-4"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-1/2 mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          className="border border-dark_green rounded-xl p-12"
          onClick={() => {
            window.location.href = "/stock";
          }}
        >
          <p className="text-black text-xl">DATA BARANG</p>
          <div className="h-4"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-1/2 mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          className="border border-dark_green rounded-xl p-12"
          onClick={() => {
            window.location.href = "/supplier";
          }}
        >
          <p className="text-black text-xl">DATA SUPPLIER</p>
          <div className="h-4"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-1/2 mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </BaseLayout>
  );
}
