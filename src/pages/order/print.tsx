import React, { useState } from "react";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Order {
  ID: number;
  created_at: string;
  date_transaction: string;
  id_supplier: number;
  type_transaction: string;
  supplier: Supplier;
}

interface Supplier {
  ID: number;
  name_supplier: string;
  phone: number;
  address: string;
}

export default function PrintOrderPage() {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const handlePreview = () => {
    if (startDate && endDate) {
      window.open(
        `/report-order?start_date=${startDate}&end_date=${endDate}`,
        "_blank"
      );
    }
    // window.open(`/report-order`, "_blank");
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>CETAK PEMESANAN MASUK</HeaderPage>
      <div className="h-12" />
      <div className="flex">
        <div className="flex-1 flex space-x-8 justify-center">
          <p>Tanggal</p>
          <input
            type="date"
            className="border border-neutral-500"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex-1 flex space-x-8 justify-center">
          <p>s/d</p>
          <input
            type="date"
            className="border border-neutral-500"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="h-12" />
      <button
        className="bg-dark_green px-8 hover:bg-dark_green/25 hover:text-dark_green text-white w-min self-center mt-8"
        onClick={handlePreview}
      >
        Preview
      </button>
    </BaseLayout>
  );
}
