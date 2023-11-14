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

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/order");
    if (response.status === 200) setOrders(response.data.data);
    else alert("Order gagal diambil");
  };

  const changeStatus = async (idProps: string) => {
    window.location.href = `/update-order/${idProps}`;
  };

  const addOrder = async () => {
    window.location.href = "/add-order";
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>TRANSAKSI PEMESANAN</HeaderPage>
      <div className="h-12" />
      <button
        className="border border-dark_green py-1 px-3 hover:bg-dark_green/25 hover:text-white self-end flex items-center"
        onClick={addOrder}
      >
        + Pesanan Baru
      </button>
      <div className="h-4" />
      <table className="table-auto text-center text-white bg-green">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-dark_green">
              Tanggal Transaksi
            </th>
            <th className="px-4 py-2 border border-dark_green">
              Purchase Order
            </th>
            <th className="px-4 py-2 border border-dark_green">
              Name Supplier
            </th>
            <th className="px-4 py-2 border border-dark_green">Status</th>
            {/* <th className="border border-dark_green px-4 py-2">Aksi</th> */}
          </tr>
        </thead>
        <tbody className="border border-dark_green">
          {orders.length === 0 ? (
            <tr>
              <td
                className="border border-dark_green px-4 py-2 text-center"
                colSpan={5}
              >
                Tidak ada data
              </td>
            </tr>
          ) : null}
          {orders.map((order) => (
            <tr key={order.ID}>
              <td className="px-4 py-2 border-x border-dark_green">
                {order.date_transaction}
              </td>
              <td className="px-4 py-2 border-x border-dark_green">
                {order.ID}
              </td>
              <td className="px-4 py-2 border-x border-dark_green">
                {order.supplier.name_supplier}
              </td>
              <td
                className="px-4 py-2 border-x border-dark_green"
                onClick={() => changeStatus(order.ID.toString())}
              >
                {order.type_transaction}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BaseLayout>
  );
}
