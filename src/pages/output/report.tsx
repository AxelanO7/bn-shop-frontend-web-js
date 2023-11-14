import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Output {
  ID: number;
  date_output: string;
}

interface DetailOutput {
  ID: number;
  id_output: number;
  output: Output;
  name_product_output: string;
  unit_product: string;
  total_product_output: number;
  type_product: string;
  price_unit: number;
  total_price: number;
}

export default function ReportOutputPage() {
  const [detailOutputs, setDetailOutputs] = useState<DetailOutput[]>([]);
  const [outputs, setOutputs] = useState<Output[]>([]);

  useEffect(() => {
    //get start date and end date from url params
    // const startDate = window.location.pathname.split("/")[2];
    // const endDate = window.location.pathname.split("/")[3];
    getOutputs();
    getDetailOutputs();
  }, []);

  const getOutputs = async () => {
    const res = await axios.get("http://localhost:8080/api/output");
    if (res.status === 200) setOutputs(res.data.data);
    else alert("Output gagal diambil");
  };

  const getDetailOutputs = async () => {
    const res = await axios.get("http://localhost:8080/api/detail-output");
    if (res.status === 200) setDetailOutputs(res.data.data);
    else alert("Detail Output gagal diambil");
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>LAPORAN BARANG KELUAR</HeaderPage>
      <div className="h-16" />
      <table className="table-auto text-center text-white bg-green">
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
          {detailOutputs.map((detailOutput, index) => (
            <tr key={index}>
              <td className="border border-dark_green px-4 py-2">
                {detailOutput.output.ID}
              </td>
              <td className="border border-dark_green px-4 py-2">
                {detailOutput.name_product_output}
              </td>
              <td className="border border-dark_green px-4 py-2">
                {detailOutput.type_product}
              </td>
              <td className="border border-dark_green px-4 py-2">
                {detailOutput.total_product_output}
              </td>
              <td className="border border-dark_green px-4 py-2">
                {detailOutput.price_unit}
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
