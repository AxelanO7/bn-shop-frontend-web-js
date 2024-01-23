import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import { useReactToPrint } from "react-to-print";
import { Stock, User } from "../../interface/interface";

export default function ReportInputPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stockRaw, setStockRaw] = useState<Stock[]>([]);
  const [stockFinished, setStockFinished] = useState<Stock[]>([]);
  const conponentPDF = React.useRef<HTMLTableElement>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const startDate = window.location.pathname.split("/")[2];
    const endDate = window.location.pathname.split("/")[3];
    getStocks(
      startDate ? startDate : "2021-09-01",
      endDate ? endDate : "2021-09-30"
    );
    // fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user-login");
      if (res.status === 200) setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStocks = async (startDate: string, endDate: string) => {
    await axios
      .get(
        `http://localhost:8080/api/date/stock/?date-start=${startDate}&date-end=${endDate}`
      )
      .then((res) => {
        if (res.status === 200) {
          setStocks(res.data.data);
          const raw = res.data.data.filter(
            (stock: Stock) => stock.type_product === "Bahan Baku"
          );
          const finished = res.data.data.filter(
            (stock: Stock) => stock.type_product === "Barang Jadi"
          );
          setStockRaw(raw);
          setStockFinished(finished);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePrint = useReactToPrint({
    content: () => conponentPDF.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 12mm 12mm 12mm 12mm;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
      }
    `,
    documentTitle: "Laporan Barang Masuk",
    onAfterPrint: () => alert("Data tersimpan"),
  });

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <div id="printTable" ref={conponentPDF}>
        <HeaderPage withLogo={true}>LAPORAN STOK BARANG</HeaderPage>

        <div className="h-12" />

        <div className="bg-white p-8 rounded-md shadow-md">
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
                <th className="px-4 py-2 border border-dark_green">User</th>
                <th className="px-4 py-2 border border-dark_green">Harga</th>
              </tr>
            </thead>
            <tbody className="border border-dark_green bg-white text-stone_5">
              {stockFinished.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-2 border border-dark_green"
                  >
                    Tidak ada data
                  </td>
                </tr>
              ) : null}
              {stockFinished.map((stock, index) => (
                <tr key={index}>
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
                    {stock.user.name_user}
                  </td>
                  <td className="px-4 py-2 border border-dark_green">
                    {stock.price_product}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-4" />
          <p className="border border-dark_green w-max px-4 bg-white">
            Jumlah Total :{" "}
            {stockFinished.reduce(
              (total, stock) => total + stock.total_product!,
              0
            )}
          </p>
        </div>

        <div className="h-12" />

        <div className="bg-white p-8 rounded-md shadow-md">
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
                <th className="px-4 py-2 border border-dark_green">User</th>
                <th className="px-4 py-2 border border-dark_green">Harga</th>
              </tr>
            </thead>
            <tbody className="border border-dark_green bg-white text-stone_5">
              {stockRaw.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-2 border border-dark_green"
                  >
                    Tidak ada data
                  </td>
                </tr>
              ) : null}

              {stockRaw.map((stock, index) => (
                <tr key={index}>
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
                    {stock.user.name_user}
                  </td>
                  <td className="px-4 py-2 border border-dark_green">
                    {stock.price_product}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-4" />
          <div className="flex justify-between">
            <p className="border border-dark_green w-max px-4 bg-white">
              Jumlah Total :{" "}
              {stockRaw.reduce(
                (total, stock) => total + stock.total_product!,
                0
              )}
            </p>
            <button
              className="border border-dark_green w-max px-4 bg-white"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
