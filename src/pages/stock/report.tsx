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
    //get start date and end date from url params
    // const startDate = window.location.pathname.split("/")[2];
    // const endDate = window.location.pathname.split("/")[3];
    getStocks();
  }, []);

  const getStocks = async () => {
    const res = await axios.get("http://localhost:8080/api/stock");
    if (res.status === 200) setStocks(res.data.data);
    else alert("Stock gagal diambil");
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>LAPORAN STOK BARANG</HeaderPage>
      <div className="h-16" />
      <table className="table-auto text-center">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-dark_green">Kode Barang</th>
            <th className="px-4 py-2 border border-dark_green">Nama</th>
            <th className="px-4 py-2 border border-dark_green">Jenis Barang</th>
            <th className="px-4 py-2 border border-dark_green">Stok</th>
            <th className="px-4 py-2 border border-dark_green">Harga</th>
          </tr>
        </thead>
        <tbody className="border border-dark_green">
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
