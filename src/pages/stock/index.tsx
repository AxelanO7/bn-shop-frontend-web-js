import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Stock {
  ID: number;
  code_product: string;
  name_product: string;
  unit_product: string;
  total_product: number;
  type_product: string;
  price_product: number;
}

export default function StockPage() {
  const [stocksRaw, setStocksRaw] = useState<Stock[]>([]);
  const [stocksFinished, setStocksFinished] = useState<Stock[]>([]);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    await axios
      .get("http://localhost:8080/api/paid/finished")
      .then((response) => {
        setStocksFinished(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal mendapatkan data");
      });

    await axios
      .get("http://localhost:8080/api/paid/raw")
      .then((response) => {
        setStocksRaw(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal mendapatkan data");
      });
  };

  const handleCreateInput = () => {
    window.location.href = "add-input";
  };

  const handleCreateOutput = () => {
    window.location.href = "add-output";
  };

  const handleStockOpname = () => {
    window.location.href = "add-opname";
  };

  return (
    <BaseLayout text_color="stone_5" padding={12}>
      <HeaderPage>DATA STOK BARANG</HeaderPage>
      <div className="h-12" />

      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="dark_green">Search</p>
            <div className="w-4" />
            <input type="text" className="border border-dark_green" />
          </div>
          <div className="space-x-4">
            <button
              className="border border-dark_green py-1 px-3 hover:bg-dark_green/25 hover:text-white"
              onClick={handleCreateInput}
            >
              Barang Masuk
            </button>
            <button
              className="border border-dark_green py-1 px-3 hover:bg-dark_green/25 hover:text-white"
              onClick={handleCreateOutput}
            >
              Barang Keluar
            </button>
            <button
              className="border border-dark_green py-1 px-3 hover:bg-dark_green/25 hover:text-white"
              onClick={handleStockOpname}
            >
              Stock Opname
            </button>
          </div>
        </div>
        <div className="h-4" />
        <table className="table-auto text-center text-white bg-green shadow-md w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-dark_green">
                Kode Barang
              </th>
              <th className="px-4 py-2 border border-dark_green">Nama</th>
              <th className="px-4 py-2 border border-dark_green">
                Jenis Barang
              </th>
              <th className="px-4 py-2 border border-dark_green">Stok</th>
              <th className="px-4 py-2 border border-dark_green">Harga</th>
            </tr>
          </thead>
          <tbody className="border border-dark_green bg-white text-stone_5">
            {stocksFinished.length === 0 ? (
              <tr>
                <td className="px-4 py-2" colSpan={5}>
                  Tidak ada data
                </td>
              </tr>
            ) : null}
            {stocksFinished.map((stock) => (
              <tr key={stock.ID}>
                <td className="px-4 py-2 border border-dark_green">
                  {stock.code_product}
                </td>
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
        <div className="h-8" />
        <p className="border border-dark_green w-max px-4 bg-white">
          Jumlah Total :{" "}
          {stocksFinished.reduce(
            (total, stock) => total + stock.total_product!,
            0
          )}
        </p>
      </div>
      <div className="h-12" />
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="dark_green">Search</p>
            <div className="w-4" />
            <input type="text" className="border border-dark_green" />
          </div>
        </div>
        <div className="h-4" />
        <table className="table-auto text-center text-white bg-green shadow-md w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-dark_green py-4">
                Kode Barang
              </th>
              <th className="px-4 py-2 border border-dark_green py-4">Nama</th>
              <th className="px-4 py-2 border border-dark_green py-4">
                Jenis Barang
              </th>
              <th className="px-4 py-2 border border-dark_green py-4">Stok</th>
              <th className="px-4 py-2 border border-dark_green py-4">Harga</th>
            </tr>
          </thead>
          <tbody className="border border-dark_green bg-white text-stone_5">
            {stocksRaw.length === 0 ? (
              <tr>
                <td className="px-4 py-2" colSpan={5}>
                  Tidak ada data
                </td>
              </tr>
            ) : null}
            {stocksRaw.map((stock) => (
              <tr key={stock.ID}>
                <td className="px-4 py-2 border border-dark_green">
                  {stock.code_product}
                </td>
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
        <div className="h-8" />
        <p className="border border-dark_green w-max px-4 bg-white">
          Jumlah Total :{" "}
          {stocksRaw.reduce((total, stock) => total + stock.total_product!, 0)}
        </p>
      </div>
    </BaseLayout>
  );
}
