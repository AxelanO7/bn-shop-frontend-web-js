import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Order {
  ID: number;
  purchase_order: string;
  date_transaction: string;
  id_supplier: number;
  type_transaction: string;
  supplier: Supplier;
  status: number;
}

interface Supplier {
  ID: number;
  name_supplier: string;
  phone: number;
  address: string;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [entries, setEntries] = useState<number>(10);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/order");
    if (response.status === 200) setOrders(response.data.data);
    else alert("Order gagal diambil");
  };

  const changeStatus = async (idProps: string) => {
    window.location.href = `/edit-order/${idProps}`;
  };

  const addOrder = async () => {
    window.location.href = "/add-order";
  };

  const handleEnteries = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEntries(Number(event.target.value));
    setOrders(orders.slice(0, Number(event.target.value)));
  };

  const handleChangeStatus = async (order: Order) => {
    if (order.status === 1) {
      alert("Pesanan sudah dikonfirmasi");
      return;
    }
    changeStatus(order.ID.toString());
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>TRANSAKSI PEMESANAN</HeaderPage>
      <div className="h-12" />
      <div className="flex justify-between items-center">
        <div className="flex">
          <p>Show</p>
          <select
            className="border border-dark_green mx-2"
            onChange={handleEnteries}
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
          <p>entries</p>
        </div>
        <div className="flex">
          <p>Search</p>
          <input type="text" className="border border-dark_green mx-2 px-2" />
        </div>
        <button
          className="border border-dark_green py-1 px-3 hover:bg-dark_green/25 hover:text-white flex items-center w-max"
          onClick={addOrder}
        >
          + Pesanan Baru
        </button>
      </div>
      <div className="h-4" />
      <table className="table-auto text-center text-white bg-green shadow-md">
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
          </tr>
        </thead>
        <tbody className="border border-dark_green bg-white text-stone_5">
          {orders.length === 0 ? (
            <tr>
              <td
                className="border border-dark_green px-4 py-2 text-center"
                colSpan={4}
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
                {order.purchase_order}
              </td>
              <td className="px-4 py-2 border-x border-dark_green">
                {order.supplier.name_supplier}
              </td>
              <td
                className="px-4 py-2 border-x border-dark_green"
                onClick={() => handleChangeStatus(order)}
              >
                {order.status === 0
                  ? "Menunggu"
                  : order.status === 1
                  ? "Lunas"
                  : "Dibatalkan"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <div className="flex">
        <p>Showing</p>
        <span className="font-bold mx-1"> 1 </span>
        to
        <span className="font-bold mx-1"> 10 </span>
        of
        <span className="font-bold mx-1"> 57 </span>
        <p>entries</p>
        <div className="grow" />
        <div className="flex ">
          <button className="border border-black px-4 py-1 w-28">
            previous
          </button>
          <button className="bg-blue-500 text-white px-3 border border-black">
            1
          </button>
          <button className="border border-black px-4 py-1 w-28">next</button>
        </div>
      </div>
    </BaseLayout>
  );
}
