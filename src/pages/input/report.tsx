import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Input {
  ID: number;
  date_input: string;
  code_product: number;
  name_product: string;
  type_product: string;
  total_production: number;
  price_product: number;
}

interface DetailInput {
  ID: number;
  id_input: number;
  input: Input;
  name_raw: string;
  unit_product: string;
  total_used: number;
  type_product: string;
  price_unit: number;
}

export default function ReportInputPage() {
  const [detailInputs, setDetailInputs] = useState<DetailInput[]>([]);

  useEffect(() => {
    const startDate = window.location.pathname.split("/")[2];
    const endDate = window.location.pathname.split("/")[3];

    getDetailInput(
      startDate ? startDate : "2021-09-01",
      endDate ? endDate : "2021-09-30"
    );
  }, []);

  const getDetailInput = async (startDate: string, endDate: string) => {
    await axios
      .get(
        `http://localhost:8080/api/date/input/?date-start=${startDate}&date-end=${endDate}`
      )
      .then((res) => {
        if (res.status === 200) setDetailInputs(res.data.data);
      })
      .catch((err) => {
        if (err.response.status !== 404) alert("Detail Input gagal diambil");
        else console.log(err);
      });
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>LAPORAN BARANG MASUK</HeaderPage>
      <div className="h-16" />
      <table className="table-auto text-center text-white bg-green shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-dark_green">No Masuk</th>
            <th className="px-4 py-2 border border-dark_green">Nama</th>
            <th className="px-4 py-2 border border-dark_green">Jenis Barang</th>
            <th className="px-4 py-2 border border-dark_green">Stok</th>
            <th className="px-4 py-2 border border-dark_green">Harga</th>
          </tr>
        </thead>
        <tbody className="border border-dark_green bg-white text-stone_5">
          {detailInputs.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-2 border border-dark_green">
                Tidak ada data
              </td>
            </tr>
          ) : null}
          {detailInputs.map((detailInput, index) => (
            <tr key={index}>
              <td className="border border-dark_green px-4 py-2">
                {detailInput.ID}
              </td>
              <td className="border border-dark_green px-4 py-2">
                {detailInput.input.name_product}
              </td>
              <td className="border border-dark_green px-4 py-2">
                {detailInput.input.type_product}
              </td>
              <td className="border border-dark_green px-4 py-2">
                {detailInput.total_used}
              </td>
              <td className="border border-dark_green px-4 py-2">
                {detailInput.price_unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <p className="border border-dark_green w-max px-4">
        Jumlah Total :{" "}
        {detailInputs.reduce((total, detailInput) => {
          return total + detailInput.total_used * detailInput.price_unit;
        }, 0)}
      </p>
    </BaseLayout>
  );
}
