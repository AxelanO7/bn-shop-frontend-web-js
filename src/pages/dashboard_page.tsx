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
    </BaseLayout>
  );
}
