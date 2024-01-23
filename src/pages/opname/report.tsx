import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import { useReactToPrint } from "react-to-print";
import { DetailOpname, User } from "../../interface/interface";

export default function ReportInputPage() {
  const [opnames, setOpnames] = useState<DetailOpname[]>([]);
  const conponentPDF = React.useRef<HTMLTableElement>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const date = window.location.pathname.split("/")[2];
    getDetailOpnames(date ? date : "2021-09-01");
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

  const getDetailOpnames = async (date: string) => {
    await axios
      .get(`http://localhost:8080/api/date/opname/?date=${date}`)
      .then((res) => {
        if (res.status === 200) setOpnames(res.data.data);
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
        <HeaderPage withLogo={true}>LAPORAN STOCK OPNAME</HeaderPage>
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
              <th className="px-4 py-2 border border-dark_green w-16">No</th>
              <th className="px-4 py-2 border border-dark_green">
                Nama Barang
              </th>
              <th className="px-4 py-2 border border-dark_green">User</th>
              <th className="px-4 py-2 border border-dark_green">Stok Real</th>
              <th className="px-4 py-2 border border-dark_green">
                Stok Sistem
              </th>
              <th className="px-4 py-2 border border-dark_green">Selisih</th>
            </tr>
          </thead>
          <tbody className="border border-dark_green bg-white text-stone_5">
            {opnames.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-2 border border-dark_green">
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
                  {opname.opname.user.name_user}
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
        <div className="flex justify-between">
          <p className="border border-dark_green w-max px-4 bg-white">
            Jumlah Total :{" "}
            {opnames.reduce((acc, opname) => acc + opname.total_diff, 0)}
          </p>
        </div>
      </div>
    </BaseLayout>
  );
}
