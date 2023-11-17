import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Order {
  ID: number;
  date_transaction: string;
  id_supplier: number;
  type_transaction: string;
  supplier: Supplier;
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
  total_order: number;
}

export default function ReportOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [detailOrders, setDetailOrders] = useState<DetailOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    //get start date and end date from url params
    const startDate = window.location.pathname.split("/")[2];
    const endDate = window.location.pathname.split("/")[3];

    getOrders();
    getSupplier();
    getDetailOrders(
      startDate ? startDate : "2021-09-01",
      endDate ? endDate : "2021-09-30"
    );
  }, []);

  const getOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/order");
    if (response.status === 200) setOrders(response.data.data);
    else alert("Order gagal diambil");
  };

  const getDetailOrders = async (startDate: string, endDate: string) => {
    const response = await axios.get(
      `http://localhost:8080/api/detail-order/order/${startDate}/${endDate}`
    );
    if (response.status === 200) setDetailOrders(response.data.data);
    else alert(response.data.message);
  };

  // const getDetailOrders = async () => {
  //   const response = await axios.get(`http://localhost:8080/api/detail-order`);
  //   if (response.status === 200) setDetailOrders(response.data.data);
  //   else alert("Order gagal diambil");
  // };

  const getSupplier = async () => {
    const response = await axios.get("http://localhost:8080/api/supplier");
    if (response.status === 200) setSuppliers(response.data.data);
    else alert("Supplier gagal diambil");
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
              <td className="border-x border-dark_green">{detailOrder.ID}</td>
              <td className="border-x border-dark_green">
                {detailOrder.name_product}
              </td>
              <td className="border-x border-dark_green">
                {detailOrder.type_product}
              </td>
              <td className="border-x border-dark_green">
                {detailOrder.total_order}
              </td>
              <td className="border-x border-dark_green">
                {detailOrder.price_product}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <p className="border border-dark_green w-max px-4">
        Jumlah Total :{" "}
        {detailOrders.reduce(
          (total, detailOrder) => total + detailOrder.total_order,
          0
        )}
      </p>
    </BaseLayout>
  );
}
