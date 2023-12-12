import React, { useEffect, useState } from "react";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import axios from "axios";

export default function PrintOpnamePage() {
  const [date, setDate] = useState<string>();
  const [dateSelect, setDateSelect] = useState<string[]>([]);

  useEffect(() => {
    fetchOpname();
  }, []);

  const fetchOpname = async () => {
    const dateOptions: string[] = [];
    await axios
      .get("http://localhost:8080/api/stock-opname")
      .then((res) => {
        if (res.status === 200) {
          const listOpnames = res.data.data;
          for (let index = 0; index < listOpnames.length; index++) {
            const element = listOpnames[index];
            const dateElement = element.date_calculate;
            if (!dateOptions.includes(dateElement)) {
              dateOptions.push(dateElement);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setDateSelect(dateOptions);
  };

  const handlePreview = () => {
    if (date) {
      window.open(`/report-opname/${date}`, "_blank");
    }
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>CETAK STOCK OPNAME</HeaderPage>
      <div className="h-28" />
      <div className="flex d-block items-center mx-auto">
        <p>Tanggal Perhitungan</p>
        <div className="w-8" />
        <select
          className="border border-neutral-500 rounded-md p-2 w-60"
          onChange={(e) => setDate(e.target.value)}
        >
          <option value="">Pilih tanggal</option>
          {dateSelect.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <div className="h-20" />
      <button
        className="bg-dark_green px-8 hover:bg-dark_green/25 hover:text-dark_green text-white w-min self-center mt-8 py-1 rounded-md"
        onClick={handlePreview}
      >
        Preview
      </button>
    </BaseLayout>
  );
}
