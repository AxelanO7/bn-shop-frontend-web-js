import React, { useState } from "react";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Order {
  ID: number;
  created_at: string;
  date_transaction: string;
  id_supplier: number;
  type_transaction: string;
  supplier: Supplier;
  status: number;
}

interface Supplier {
  ID: number;
  name_supplier: string;
  phone: number;
  address: string;
}

export default function PrintOrderPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handlePreview = () => {
    if (startDate && endDate) {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];
      window.open(
        `/report-order/${formattedStartDate}/${formattedEndDate}`,
        "_blank"
      );
    }
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>CETAK LAPORAN PEMESANAN BAHAN BAKU</HeaderPage>
      <div className="h-12" />
      <div className="flex">
        <div className="flex-1 flex space-x-8 justify-center">
          <p>Tanggal</p>
          <DatePicker
            className="border border-neutral-500 rounded px-2"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd-MM-yyyy"
          />
        </div>
        <div className="flex-1 flex space-x-8 justify-center">
          <p>s/d</p>
          <DatePicker
            className="border border-neutral-500 rounded px-2"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd-MM-yyyy"
          />
        </div>
      </div>
      <div className="h-12" />
      <button
        className="bg-dark_green px-8 hover:bg-dark_green/25 hover:text-dark_green text-white w-min self-center mt-8 py-1 rounded-md"
        onClick={handlePreview}
      >
        Preview
      </button>
    </BaseLayout>
  );
}
