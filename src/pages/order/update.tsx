import React from "react";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { useState, useEffect } from "react";
import { Order, DetailOrder, Supplier, Stock } from "../../interface/interface";

export default function UpdateOrderPage() {
  const [order, setOrder] = useState<Order>();
  const [detailOrders, setDetailOrders] = useState<DetailOrder[]>();
  const [suppliers, setSuppliers] = useState<Supplier[]>();

  const [status, setStatus] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    getSupplier();
    getDetailOrders(id);
    getOrder(id);
  }, []);

  const getSupplier = async () => {
    const response = await axios.get("http://localhost:8080/api/supplier");
    if (response) setSuppliers(response.data.data);
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

  const createMultipleStock = async () => {
    const stocks: Stock[] = [];
    detailOrders?.forEach((detailOrder) => {
      const stock: Stock = {
        ID: null,
        code_product: detailOrder.code_product,
        name_product: detailOrder.name_product,
        unit_product: detailOrder.unit_product,
        total_product: detailOrder.total_product,
        price_product: detailOrder.price_product,
        type_product: detailOrder.type_product,
        id_supplier: detailOrder.order!.supplier.ID,
        supplier: detailOrder.order!.supplier,
        id_user: detailOrder.order!.user.ID,
        user: detailOrder.order!.user,
      };
      stocks.push(stock);
    });

    await axios
      .post("http://localhost:8080/api/stocks", stocks)
      .then((res) => {
        alert("Stock berhasil ditambahkan");
        window.location.href = "/order";
      })
      .catch((err) => {
        alert("Stock gagal ditambahkan");
      });
  };

  const handleUpdateStatus = async () => {
    await axios
      .put(
        `http://localhost:8080/api/detail-order/update-multiple/${order?.ID}`,
        detailOrders
      )
      .then((res) => {
        alert("Status berhasil diubah");
      })
      .catch((err) => {
        alert("Status gagal diubah");
      });
    await axios
      .put(`http://localhost:8080/api/order/${order?.ID}`, {
        status: status,
      })
      .then((res) => {
        alert("Status berhasil diubah");
        if (status === 1) createMultipleStock();
      })
      .catch((err) => {
        alert("Status gagal diubah");
      });
    window.location.href = "/order";
  };

  const handleTotalPrice = () => {
    setTotalPrice(
      detailOrders?.reduce((total, detailOrder) => {
        return total + detailOrder.price_product * detailOrder.total_product;
      }, 0)
    );
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
      <table className="table-fixed text-center text-white bg-green shadow-md">
        <thead className="border-y w-full border-neutral-500">
          <tr>
            <th className="px-4 py-2">Kode Bahan</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Satuan</th>
            <th className="px-4 py-2">Jumlah</th>
            <th className="px-4 py-2">Harga Satuan</th>
            <th className="px-4 py-2 w-72">Subtotal</th>
          </tr>
        </thead>
        <tbody className="border border-dark_green bg-white text-stone_5">
          {detailOrders?.map((detailOrder) => (
            <tr key={detailOrder.ID}>
              <td className="px-4 py-2">{detailOrder.code_product}</td>
              <td className="px-4 py-2">{detailOrder.name_product}</td>
              <td className="px-4 py-2">{detailOrder.unit_product}</td>
              {/* <td className="px-4 py-2">{detailOrder.total_product}</td> */}
              <td>
                <input
                  type="number"
                  className="border border-dark_green rounded-md py-1 px-3 text-center"
                  defaultValue={detailOrder.total_product.toString()}
                  onChange={(e) => {
                    detailOrder.total_product = parseFloat(e.target.value);
                    handleTotalPrice();
                  }}
                />
              </td>
              <td className="px-4 py-2">{detailOrder.price_product}</td>
              <td>
                Rp.
                {detailOrder.price_product * detailOrder.total_product}
                {/* <input
                  type="number"
                  className="border border-dark_green rounded-md py-1 px-3 text-center"
                  defaultValue={detailOrder.total_product.toString()}
                  onChange={(e) => {
                    detailOrder.total_product = parseFloat(e.target.value);
                    handleTotalPrice();
                  }}
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="justify-end flex">
        <div>
          <div className="h-4" />
          <p>
            Total Rp.
            {totalPrice ||
              0 ||
              detailOrders?.reduce((total, detailOrder) => {
                return (
                  total + detailOrder.price_product * detailOrder.total_product
                );
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
