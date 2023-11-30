import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import { type } from "os";

interface Opname {
  ID: number;
  date_calculate: string;
  code_stock_opname: string;
}

interface DetailOpname {
  ID: number;
  id_opname: number;
  opname: Opname;
  code_product: string;
  name_finished: string;
  unit_product: string;
  type_product: string;
  price_unit: number;
  stock_system: number;
  stock_real: number;
  total_diff: number;
}

export default function ReportInputPage() {
  const [opnames, setOpnames] = useState<DetailOpname[]>([]);

  useEffect(() => {
    const startDate = window.location.pathname.split("/")[2];
    const endDate = window.location.pathname.split("/")[3];
    getDetailOpnames(
      startDate ? startDate : "2021-09-01",
      endDate ? endDate : "2021-09-30"
    );
  }, []);

  const getDetailOpnames = async (startDate: string, endDate: string) => {
    await axios
      .get(
        `http://localhost:8080/api/date/opname/?date-start=${startDate}&date-end=${endDate}`
      )
      .then((res) => {
        if (res.status === 200) setOpnames(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
                {index + 1}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {opname.name_finished}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {opname.stock_real}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {opname.stock_system}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {opname.total_diff}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <p className="border border-dark_green w-max px-4">
        Jumlah Total :{" "}
        {opnames.reduce((acc, opname) => acc + opname.total_diff, 0)}
      </p>
    </BaseLayout>
  );
}
