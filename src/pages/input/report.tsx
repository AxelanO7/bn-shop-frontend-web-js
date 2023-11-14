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
  total_price: number;
}

export default function ReportInputPage() {
  const [inputs, setInputs] = useState<Input[]>([]);
  const [detailInputs, setDetailInputs] = useState<DetailInput[]>([]);

  useEffect(() => {
    //get start date and end date from url params
    // const startDate = window.location.pathname.split("/")[2];
    // const endDate = window.location.pathname.split("/")[3];
    getInputs();
    getDetailInput();
  }, []);

  const getInputs = async () => {
    const res = await axios.get("http://localhost:8080/api/input");
    if (res.status === 200) setInputs(res.data.data);
    else alert("Input gagal diambil");
  };

  const getDetailInput = async () => {
    const res = await axios.get("http://localhost:8080/api/detail-input");
    if (res.status === 200) setDetailInputs(res.data.data);
    else alert("Detail Input gagal diambil");
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>LAPORAN BARANG MASUK</HeaderPage>
      <div className="h-16" />
      <table className="table-auto text-center text-white bg-green">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-dark_green">No Masuk</th>
            <th className="px-4 py-2 border border-dark_green">Nama</th>
            <th className="px-4 py-2 border border-dark_green">Jenis Barang</th>
            <th className="px-4 py-2 border border-dark_green">Stok</th>
            <th className="px-4 py-2 border border-dark_green">Harga</th>
          </tr>
        </thead>
        <tbody className="border border-dark_green">
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
                {detailInput.total_price}
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
