import React from "react";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useState, useEffect } from "react";

interface Order {
  ID: number;
  date_transaction: string;
  id_supplier: number;
  supplier: Supplier;
  type_transaction: string;
  status: number;
  purchase_order: string;
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

interface Supplier {
  ID: number;
  name_supplier: string;
  phone: number;
  address: string;
}

export default function UpdateOrderPage() {
  const [order, setOrder] = useState<Order>();
  const [detailOrders, setDetailOrders] = useState<DetailOrder[]>();
  const [suppliers, setSuppliers] = useState<Supplier[]>();

  const [status, setStatus] = useState<number>();

  // get from url params
  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    getSupplier();
    getDetailOrders(id);
    getOrder(id);
  }, []);

  const getSupplier = async () => {
    const response = await axios.get("http://localhost:8080/api/supplier");
    if (response.status === 200) setSuppliers(response.data.data);
    else alert("Supplier gagal diambil");
  };

  const getDetailOrders = async (idProps: string) => {
    const response = await axios.get(
      `http://localhost:8080/api/detail-order/order/${idProps}`
    );
    if (response.status === 200) setDetailOrders(response.data.data);
    else alert("Order gagal diambil");
  };

  const getOrder = async (idProps: string) => {
    const response = await axios.get(
      `http://localhost:8080/api/order/${idProps}`
    );
    if (response.status === 200) setOrder(response.data.data);
    else alert("Order gagal diambil");
  };

  const handleUpdateStatus = async () => {
    const response = await axios.put(
      `http://localhost:8080/api/order/${order?.ID}`,
      {
        status: status,
      }
    );
    if (response.status === 200) {
      alert("Status berhasil diubah");
      window.location.href = "/order";
    } else alert("Status gagal diubah");
  };

  return (
    <BaseLayout padding={12}>
      <div className="flex text-dark_green">
        <div className="flex-1">
          <h3 className="font-normal">Purchase Order</h3>
          <h2 className="text-4xl">{order?.purchase_order}</h2>
          <div className="mt-6 space-y-2">
            <p>{order?.supplier.name_supplier}</p>
            <p>{order?.supplier.ID}</p>
            <p>{order?.supplier.address}</p>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex">
            <div className="w-36">
              <p>Status Pembayaran</p>
            </div>
            <div className="w-8" />
            <select
              defaultValue={order?.status}
              onChange={(e) => setStatus(parseInt(e.target.value))}
            >
              <option value={0}>Menunggu</option>
              <option value={1}>Lunas</option>
              <option value={2}>Dibatalkan</option>
            </select>
          </div>
          <div className="flex">
            <div className="w-36">
              <p>Tanggal Transaksi</p>
            </div>
            <div className="w-8" />
            <p>{order?.date_transaction}</p>
          </div>
          <div className="flex">
            <div className="w-36">
              <p>Jenis Pembayaran</p>
            </div>
            <div className="w-8" />
            <p>{order?.type_transaction}</p>
          </div>
        </div>
      </div>
      <div className="h-12" />
      <p className="px-4 pb-2">Pesanan</p>
      <table className="table-auto text-center text-white bg-green shadow-md">
        <thead className="border-y w-full border-neutral-500">
          <tr>
            <th className="px-4 py-2">Kode Barang</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Satuan</th>
            <th className="px-4 py-2">Jumlah</th>
            <th className="px-4 py-2">Harga Satuan</th>
            <th className="px-4 py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody className="border border-dark_green bg-white text-stone_5">
          {detailOrders?.map((detailOrder) => (
            <tr key={detailOrder.ID}>
              <td className="px-4 py-2">{detailOrder.order.purchase_order}</td>
              <td className="px-4 py-2">{detailOrder.name_product}</td>
              <td className="px-4 py-2">{detailOrder.unit_product}</td>
              <td className="px-4 py-2">{detailOrder.type_product}</td>
              <td className="px-4 py-2">{detailOrder.price_product}</td>
              <td className="px-4 py-2">{detailOrder.total_order}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="justify-end flex">
        <div>
          <div className="h-4" />
          <p>
            Total Rp.
            {detailOrders?.reduce((total, detailOrder) => {
              return total + detailOrder.total_order;
            }, 0)}
          </p>
          <div className="h-4" />
          <button
            className="border border-dark_green rounded-md py-1 px-3 hover:bg-dark_green/25 hover:text-black bg-dark_green text-white mr-16 w-min"
            onClick={handleUpdateStatus}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}
