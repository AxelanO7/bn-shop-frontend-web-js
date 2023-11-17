import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Opname {
  ID: number;
  date_calculate: string;
  name_product: string;
  stock_real: number;
}

export default function ReportInputPage() {
  const [opnames, setOpnames] = useState<Opname[]>([]);

  useEffect(() => {
    //get start date and end date from url params
    // const startDate = window.location.pathname.split("/")[2];
    // const endDate = window.location.pathname.split("/")[3];
  }, []);

  const getOpnames = async () => {
    const res = await axios.get("http://localhost:8080/api/stock-opname");
    if (res.status === 200) setOpnames(res.data.data);
    else alert("Stock gagal diambil");
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>LAPORAN STOCK OPNAME</HeaderPage>
      <div className="h-16" />
      <table className="table-auto text-center text-white bg-green shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-dark_green w-16">No</th>
            <th className="px-4 py-2 border border-dark_green">Nama Barang</th>
            <th className="px-4 py-2 border border-dark_green">Stok Real</th>
            <th className="px-4 py-2 border border-dark_green">Stok Sistem</th>
            <th className="px-4 py-2 border border-dark_green">Selisih</th>
          </tr>
        </thead>
        <tbody className="border border-dark_green bg-white text-stone_5">
          {opnames.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-2 border border-dark_green">
                Tidak ada data
              </td>
            </tr>
          ) : null}
          {opnames.map((opname, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border border-dark_green">
                {opname.ID}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {opname.name_product}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {opname.stock_real}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {opname.date_calculate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <p className="border border-dark_green w-max px-4">Jumlah Total : </p>
    </BaseLayout>
  );
}
