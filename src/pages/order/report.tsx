import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Order {
  ID: number;
  purchase_order: string;
  date_transaction: string;
  id_supplier: number;
  supplier: Supplier;
  type_transaction: string;
  status: number;
}

interface Supplier {
  ID: number;
  name_supplier: string;
  phone: number;
  address: string;
}

interface DetailOrder {
  ID: number;
  id_order: number;
  order: Order;
  name_product: string;
  unit_product: string;
  type_product: string;
  price_product: number;
  total_product: number;
}

export default function ReportOrderPage() {
  const [detailOrders, setDetailOrders] = useState<DetailOrder[]>([]);

  useEffect(() => {
    const startDate = window.location.pathname.split("/")[2];
    const endDate = window.location.pathname.split("/")[3];

    getDetailOrders(
      startDate ? startDate : "2021-09-01",
      endDate ? endDate : "2021-09-30"
    );
  }, []);

  const getDetailOrders = async (startDate: string, endDate: string) => {
    await axios
      .get(
        `http://localhost:8080/api/date/order/?date-start=${startDate}&date-end=${endDate}`
      )
      .then((res) => {
        if (res.status === 200) setDetailOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>LAPORAN PEMESANAN MASUK</HeaderPage>
      <div className="h-16" />
      <table className="table-auto text-center text-white bg-green shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-dark_green">
              Purchase Order
            </th>
            <th className="px-4 py-2 border border-dark_green">Nama</th>
            <th className="px-4 py-2 border border-dark_green">Jenis Barang</th>
            <th className="px-4 py-2 border border-dark_green">Stok</th>
            <th className="px-4 py-2 border border-dark_green">Harga</th>
          </tr>
        </thead>
        <tbody className="border border-dark_green bg-white text-stone_5">
          {detailOrders.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-2 border border-dark_green">
                Tidak ada data
              </td>
            </tr>
          ) : null}
          {detailOrders.map((detailOrder, index) => (
            <tr key={index}>
              <td className="border-x border-dark_green">
                {detailOrder.order.purchase_order}
              </td>
              <td className="border-x border-dark_green">
                {detailOrder.name_product}
              </td>
              <td className="border-x border-dark_green">
                {detailOrder.type_product}
              </td>
              <td className="border-x border-dark_green">
                {detailOrder.total_product}
              </td>
              <td className="border-x border-dark_green">
                {detailOrder.price_product}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <p className="border border-dark_green w-max px-4 bg-white">
        Jumlah Total :{" "}
        {detailOrders.reduce(
          (total, detailOrder) => total + detailOrder.total_product,
          0
        )}
      </p>
    </BaseLayout>
  );
}
