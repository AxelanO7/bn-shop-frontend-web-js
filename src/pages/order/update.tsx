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

  return (
    <BaseLayout padding={12}>
      <div className="flex text-dark_green">
        <div className="flex-1">
          <h3 className="font-normal">Purchase Order</h3>
          <h2 className="text-4xl">{order?.ID}</h2>
          <div className="mt-6 space-y-2">
            <p>{order?.supplier.name_supplier}</p>
            <p>{order?.supplier.ID}</p>
            <p>{order?.supplier.address}</p>
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
            // onChange={(event) => {
            //   setOrder({
            //     ...order,
            //     type_transaction: event.target.value,
            //     ID: order?.ID || 0,
            //     date_transaction: order!.date_transaction,
            //     id_supplier: order!.id_supplier,
            //     supplier: order!.supplier,
            //   });
            // }}
            >
              <option value="paid">Lunas</option>
              <option value="waiting">Menunggu</option>
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
      <table className="table-auto text-center text-white bg-green">
        <thead className="border-y w-full border-neutral-500">
          <tr>
            <th className="px-4 py-2 text-start">Kode Barang</th>
            <th className="px-4 py-2 text-start">Nama</th>
            <th className="px-4 py-2 text-start">Satuan</th>
            <th className="px-4 py-2 text-start">Jumlah</th>
            <th className="px-4 py-2 text-start">Harga Satuan</th>
            <th className="px-4 py-2 text-start">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detailOrders?.map((detailOrder) => (
            <tr key={detailOrder.ID}>
              <td className="px-4 py-2">{detailOrder.ID}</td>
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
            onClick={() => {
              console.log(detailOrders);
            }}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}
