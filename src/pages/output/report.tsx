import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import { useReactToPrint } from "react-to-print";

interface Output {
  ID: number;
  no_output: string;
  date_output: string;
}

interface DetailOutput {
  ID: number;
  id_output: number;
  output: Output;
  code_product: string;
  name_finished: string;
  unit_product: string;
  total_used: number;
  type_product: string;
  price_unit: number;
}

export default function ReportOutputPage() {
  const [detailOutputs, setDetailOutputs] = useState<DetailOutput[]>([]);
  const conponentPDF = React.useRef<HTMLTableElement>(null);

  useEffect(() => {
    const startDate = window.location.pathname.split("/")[2];
    const endDate = window.location.pathname.split("/")[3];
    getDetailOutputs(
      startDate ? startDate : "2021-09-01",
      endDate ? endDate : "2021-09-30"
    );
  }, []);

  const getDetailOutputs = async (startDate: string, endDate: string) => {
    await axios
      .get(
        `http://localhost:8080/api/date/output/?date-start=${startDate}&date-end=${endDate}`
      )
      .then((res) => {
        if (res.status === 200) setDetailOutputs(res.data.data);
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
    documentTitle: "Laporan Barang Keluar",
    onAfterPrint: () => alert("Data tersimpan"),
  });

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <div id="printTable" ref={conponentPDF}>
        <HeaderPage>LAPORAN BARANG KELUAR</HeaderPage>
        <div className="h-16" />
        <table className="table-auto text-center text-white bg-green shadow-md w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-dark_green">No Keluar</th>
              <th className="px-4 py-2 border border-dark_green">Nama</th>
              <th className="px-4 py-2 border border-dark_green">
                Jenis Barang
              </th>
              <th className="px-4 py-2 border border-dark_green">Stok</th>
              <th className="px-4 py-2 border border-dark_green">Harga</th>
            </tr>
          </thead>
          <tbody className="border border-dark_green bg-white text-stone_5">
            {detailOutputs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 border border-dark_green">
                  Tidak ada data
                </td>
              </tr>
            ) : null}
            {detailOutputs.map((detailOutput, index) => (
              <tr key={index}>
                <td className="border border-dark_green px-4 py-2">
                  {detailOutput.output.no_output}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {detailOutput.name_finished}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {detailOutput.type_product}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {detailOutput.total_used}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {detailOutput.price_unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4" />
        <div className="flex justify-between">
          <p className="border border-dark_green w-max px-4 bg-white">
            Jumlah Total :{" "}
            {detailOutputs.reduce((total, detailOutput) => {
              return total + detailOutput.total_used;
            }, 0)}
          </p>
          <button
            className="border border-dark_green w-max px-4 bg-white"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}
