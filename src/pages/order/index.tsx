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
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  // const [manage, setManage] = useState(null);

  // const [idOrder, setIdOrder] = useState(null);
  // const [dateTransaction, setDateTransaction] = useState(null);
  // const [idSupplier, setIdSupplier] = useState(null);
  // const [typeTransaction, setTypeTransaction] = useState(null);

  useEffect(() => {
    getOrders();
    // getSupplier();
  }, []);

  const getOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/order");
    if (response.status === 200) setOrders(response.data.data);
    else alert("Order gagal diambil");
  };

  // const getSupplier = async () => {
  //   const response = await axios.get("http://localhost:8080/api/supplier");
  //   if (response.status === 200) setSuppliers(response.data.data);
  //   else alert("Supplier gagal diambil");
  // };

  // const addOrder = async () => {
  //   if (!validateOrder()) return;
  //   const response = await axios.post("http://localhost:8080/api/order", {
  //     ID: null,
  //     date_transaction: dateTransaction,
  //     id_supplier: parseInt(idSupplier),
  //     type_transaction: typeTransaction,
  //   });
  //   if (response.status === 201) {
  //     alert("Order berhasil ditambahkan");
  //     getOrders();
  //   } else alert("Order gagal ditambahkan");
  //   closeManage();
  // };

  // const updateOder = async (id) => {
  //   if (!validateOrder()) return;
  //   const response = await axios.put(`http://localhost:8080/api/order/${id}`, {
  //     ID: parseInt(id),
  //     date_transaction: dateTransaction,
  //     id_supplier: parseInt(idSupplier),
  //     type_transaction: typeTransaction,
  //   });
  //   if (response.status === 200) {
  //     alert("Order berhasil diupdate");
  //     getOrders();
  //   } else alert("Order gagal diupdate");
  //   closeManage();
  // };

  // const deleteOrder = async (id) => {
  //   const response = await axios.delete(
  //     `http://localhost:8080/api/order/${id}`
  //   );
  //   if (response.status === 200) {
  //     alert("Order berhasil dihapus");
  //     getOrders();
  //   } else alert("Order gagal dihapus");
  // };

  // const closeManage = () => {
  //   setIdOrder(null);
  //   setDateTransaction(null);
  //   setIdSupplier(null);
  //   setTypeTransaction(null);
  //   setManage(null);
  // };

  // const tapEdit = (id) => {
  //   const order = orders.find((order) => order.ID === id);
  //   setIdOrder(id);
  //   setDateTransaction(order.date_transaction);
  //   setIdSupplier(order.id_supplier);
  //   setTypeTransaction(order.type_transaction);
  //   setManage("edit");
  // };

  // const validateOrder = () => {
  //   if (dateTransaction === null || dateTransaction === "") {
  //     alert("Tanggal Transaksi tidak boleh kosong");
  //     return false;
  //   }
  //   if (idSupplier === null || idSupplier === "") {
  //     alert("Supplier tidak boleh kosong");
  //     return false;
  //   }
  //   if (typeTransaction === null || typeTransaction === "") {
  //     alert("Status tidak boleh kosong");
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <BaseLayout padding={12}>
      <HeaderPage>TRANSAKSI PEMESANAN</HeaderPage>
      <div className="h-12" />
      <button
        className="border border-dark_green py-1 px-3 hover:bg-dark_green/25 hover:text-white self-end flex items-center"
        // onClick={() => setManage("add")}
        onClick={() => {
          window.location.href = "/add-order";
        }}
      >
        + Pesanan Baru
      </button>
      <div className="h-4" />
      <table className="table-auto text-center">
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
              <td className="px-4 py-2 border-x border-dark_green">
                {order.type_transaction}
              </td>
              {/* <td className="border border-dark_green px-4 py-2 flex flex-row">
                  <button
                    className="border border-dark_green rounded-md py-1 px-3 w-full hover:bg-dark_green/25 hover:text-white"
                    onClick={() => deleteOrder(order.ID)}
                  >
                    Delete
                  </button>
                  <div className="w-4"></div>
                  <button
                    className="border border-dark_green rounded-md py-1 px-3 w-full hover:bg-dark_green/25 hover:text-white"
                    onClick={
                      () => tapEdit(order.ID)
                      //   {
                      //   setIdOrder(supplier.ID);
                      //   setDateTransaction(supplier.date_transaction);
                      //   setIdSupplier(supplier.id_supplier);
                      //   setTypeTransaction(supplier.type_transaction);
                      //   setManage("edit");
                      // }
                    }
                  >
                    Edit
                  </button>
                </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {manage !== null ? (
          <div className="w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-[1] flex flex-col justify-center items-center bg-white rounded-md shadow-md border border-dark_green px-10 py-10">
            <button
              className="absolute top-4 right-4 text-red-500"
              onClick={() => closeManage()}
            >
              X
            </button>
            <label className="text-2xl">
              {manage === "add"
                ? "Tambah Order"
                : manage === "edit"
                ? "Ubah Order"
                : "Supplier"}
            </label>
            {manage === "add" ? null : (
              <>
                <div className="h-4" />
                <div className="flex flex-col w-1/2">
                  <label className="text-left">ID Order</label>
                  <input
                    className="border border-dark_green rounded-md py-1 px-3 w-full"
                    type="number"
                    value={idOrder}
                    onChange={(e) => setIdOrder(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Tanggal Transaksi</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={dateTransaction}
                onChange={(e) => setDateTransaction(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Supplier</label>
              <select
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                defaultValue={suppliers[0].ID}
                value={idSupplier}
                onChange={(e) => setIdSupplier(e.target.value)}
              >
                {suppliers.map((supplier) => (
                  <option
                    key={supplier.ID}
                    value={supplier.ID}
                    selected={supplier.ID}
                  >
                    {supplier.name_supplier}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Status</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={typeTransaction}
                onChange={(e) => setTypeTransaction(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <button
              className="border border-dark_green rounded-md py-1 px-3 w-1/2 hover:bg-dark_green/25 hover:text-white"
              onClick={() =>
                manage === "add" ? addOrder() : updateOder(idOrder)
              }
            >
              {manage === "add"
                ? "Tambah"
                : manage === "edit"
                ? "Ubah"
                : "Simpan"}
            </button>
          </div>
        ) : null} */}
    </BaseLayout>
  );
}
