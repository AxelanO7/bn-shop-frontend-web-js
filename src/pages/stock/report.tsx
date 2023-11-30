import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Stock {
  ID: number;
  name_product: string;
  unit_product: string;
  total_product: number;
  type_product: string;
  price_product: number;
}

export default function ReportInputPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const startDate = window.location.pathname.split("/")[2];
    const endDate = window.location.pathname.split("/")[3];

    console.log(startDate, endDate);

    getStocks(
      startDate ? startDate : "2021-09-01",
      endDate ? endDate : "2021-09-30"
    );
  }, []);

  const getStocks = async (startDate: string, endDate: string) => {
    await axios
      .get(
        `http://localhost:8080/api/date/stock/?date-start=${startDate}&date-end=${endDate}`
      )
      .then((res) => {
        if (res.status === 200) setStocks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>LAPORAN STOK BARANG</HeaderPage>
      <div className="h-16" />
      <table className="table-auto text-center text-white bg-green shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-dark_green">Kode Barang</th>
            <th className="px-4 py-2 border border-dark_green">Nama</th>
            <th className="px-4 py-2 border border-dark_green">Jenis Barang</th>
            <th className="px-4 py-2 border border-dark_green">Stok</th>
            <th className="px-4 py-2 border border-dark_green">Harga</th>
          </tr>
        </thead>
        <tbody className="border border-dark_green bg-white text-stone_5">
          {stocks.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-2 border border-dark_green">
                Tidak ada data
              </td>
            </tr>
          ) : null}

          {stocks.map((stock, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border border-dark_green">{stock.ID}</td>
              <td className="px-4 py-2 border border-dark_green">
                {stock.name_product}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {stock.type_product}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {stock.total_product}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {stock.price_product}
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
