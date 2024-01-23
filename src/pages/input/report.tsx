import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import { useReactToPrint } from "react-to-print";
import { Input, User } from "../../interface/interface";

export default function ReportInputPage() {
  const [inputs, setInputs] = useState<Input[]>([]);
  const conponentPDF = useRef<HTMLTableElement>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const startDate = window.location.pathname.split("/")[2];
    const endDate = window.location.pathname.split("/")[3];

    getDetailInput(
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

  const getDetailInput = async (startDate: string, endDate: string) => {
    await axios
      .get(
        `http://localhost:8080/api/date/input/?date-start=${startDate}&date-end=${endDate}`
      )
      .then((res) => {
        if (res.status === 200) setInputs(res.data.data);
      })
      .catch((err) => {
        if (err.response.status !== 404) alert("Detail Input gagal diambil");
        else console.log(err);
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
        <HeaderPage withLogo={true}>LAPORAN BARANG MASUK</HeaderPage>
        <div className="h-16" />
        <div className="flex justify-end">
          <button
            className="border border-dark_green w-max px-12 bg-white"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
        <div className="h-8" />
        <table className="table-auto text-center text-white bg-green shadow-md w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-dark_green">No Masuk</th>
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
            {inputs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-2 border border-dark_green">
                  Tidak ada data
                </td>
              </tr>
            ) : null}
            {inputs.map((input, index) => (
              <tr key={index}>
                <td className="border border-dark_green px-4 py-2">
                  {input.no_input}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {input.name_product}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {input.type_product}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {input.total_product}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {input.user.name_user}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {input.price_product}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4" />
        <div className="flex justify-between">
          <p className="border border-dark_green w-max px-4 bg-white">
            Jumlah Total :{" "}
            {inputs.reduce((total, input) => {
              return total + input.total_product;
            }, 0)}
          </p>
          <p className="border border-dark_green w-max px-4 bg-white">
            Total Harga :{" "}
            {inputs.reduce((total, input) => {
              return total + input.price_product * input.total_product;
            }, 0)}
          </p>
        </div>
      </div>
    </BaseLayout>
  );
}
