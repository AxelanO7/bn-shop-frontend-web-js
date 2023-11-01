import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function DetailOrderPage() {
  const [orders, setOrders] = useState([]);
  const [detailOrders, setDetailOrders] = useState([]);
  const [manage, setManage] = useState(null);

  const [idDetailOrder, setIdDetailOrder] = useState(null);
  const [idOrder, setIdOrder] = useState(null);
  const [nameProduct, setNameProduct] = useState(null);
  const [unitProduct, setUnitProduct] = useState(null);
  const [typeProduct, setTypeProduct] = useState(null);
  const [priceProduct, setPriceProduct] = useState(null);
  const [totalOrder, setTotalOrder] = useState(null);

  useEffect(() => {
    getOrders();
    getDetailOrders();
  }, []);

  const getOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/order");
    if (response.status === 200) setOrders(response.data.data);
    else alert("Order gagal diambil");
  };

  const getDetailOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/detail-order");
    if (response.status === 200) setDetailOrders(response.data.data);
    else alert("Detail order gagal diambil");
  };

  const addDetailOrder = async () => {
    if (!validateDetailOrder()) return;
    const response = await axios.post(
      "http://localhost:8080/api/detail-order",
      {
        ID: null,
        id_order: parseInt(idOrder),
        name_product: nameProduct,
        unit_product: unitProduct,
        type_product: typeProduct,
        price_product: parseInt(priceProduct),
        total_order: parseInt(totalOrder),
      }
    );
    if (response.status === 201) {
      alert("Order berhasil ditambahkan");
      getDetailOrders();
    } else alert("Order gagal ditambahkan");
    closeManage();
  };

  const updateDetailOder = async (id) => {
    if (!validateDetailOrder()) return;
    const response = await axios.put(
      `http://localhost:8080/api/detail-order/${id}`,
      {
        ID: parseInt(id),
        id_order: parseInt(idOrder),
        name_product: nameProduct,
        unit_product: unitProduct,
        type_product: typeProduct,
        price_product: parseInt(priceProduct),
        total_order: parseInt(totalOrder),
      }
    );
    if (response.status === 200) {
      alert("Order berhasil diupdate");
      getDetailOrders();
    } else alert("Order gagal diupdate");
    closeManage();
  };

  const deleteDetailOrder = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/order/${id}`
    );
    if (response.status === 200) {
      alert("Order berhasil dihapus");
      getDetailOrders();
    } else alert("Order gagal dihapus");
  };

  const closeManage = () => {
    setIdDetailOrder(null);
    setIdOrder(null);
    setNameProduct(null);
    setUnitProduct(null);
    setTypeProduct(null);
    setPriceProduct(null);
    setTotalOrder(null);
    setManage(null);
  };

  const tapEditDetailOrder = (id) => {
    const detailOrder = detailOrders.find(
      (detailOrder) => detailOrder.ID === id
    );
    setIdDetailOrder(detailOrder.ID);
    setIdOrder(detailOrder.id_order);
    setNameProduct(detailOrder.name_product);
    setUnitProduct(detailOrder.unit_product);
    setTypeProduct(detailOrder.type_product);
    setPriceProduct(detailOrder.price_product);
    setTotalOrder(detailOrder.total_order);
    setManage("edit");
  };

  const validateDetailOrder = () => {
    if (idOrder === null || idOrder === "") {
      alert("ID Order tidak boleh kosong");
      return false;
    }
    if (nameProduct === null || nameProduct === "") {
      alert("Nama Produk tidak boleh kosong");
      return false;
    }
    if (unitProduct === null || unitProduct === "") {
      alert("Satuan Produk tidak boleh kosong");
      return false;
    }
    if (typeProduct === null || typeProduct === "") {
      alert("Jenis Produk tidak boleh kosong");
      return false;
    }
    if (priceProduct === null || priceProduct === "") {
      alert("Harga Produk tidak boleh kosong");
      return false;
    }
    if (totalOrder === null || totalOrder === "") {
      alert("Jumlah Produk tidak boleh kosong");
      return false;
    }
    return true;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col py-32 min-h-screen text-center px-12">
        <h1>Daftar Detail Order</h1>
        <div className="h-12" />
        <button
          className="border border-dark_green py-1 px-3 w-1/4 hover:bg-dark_green/25 hover:text-white self-end"
          onClick={() => setManage("add")}
        >
          Tambah Detail Order
        </button>
        <div className="h-4" />
        <table className="table-auto border border-dark_green">
          <thead>
            <tr>
              <th className="border border-dark_green px-4 py-2">
                Kode Barang
              </th>
              <th className="border border-dark_green px-4 py-2">Nama</th>
              <th className="border border-dark_green px-4 py-2">Satuan</th>
              <th className="border border-dark_green px-4 py-2">Jenis</th>
              <th className="border border-dark_green px-4 py-2">Harga</th>
              <th className="border border-dark_green px-4 py-2">Jumlah</th>
              <th className="border border-dark_green px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {detailOrders.length === 0 ? (
              <tr>
                <td
                  className="border border-dark_green px-4 py-2 text-center"
                  colSpan={7}
                >
                  Tidak ada data
                </td>
              </tr>
            ) : null}
            {detailOrders.map((detailOrder) => (
              <tr key={detailOrder.id}>
                <td className="border border-dark_green px-4 py-2">
                  {detailOrder.ID}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {detailOrder.name_product}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {detailOrder.unit_product}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {detailOrder.type_product}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {detailOrder.price_product}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {detailOrder.total_order}
                </td>
                <td className="border-y-[0.1px] border-dark_green px-4 py-2 flex flex-row">
                  <button
                    className="border border-dark_green rounded-md py-1 px-3 w-full hover:bg-dark_green/25 hover:text-white"
                    onClick={() => deleteDetailOrder(detailOrder.ID)}
                  >
                    Delete
                  </button>
                  <div className="w-4"></div>
                  <button
                    className="border border-dark_green rounded-md py-1 px-3 w-full hover:bg-dark_green/25 hover:text-white"
                    onClick={() => tapEditDetailOrder(detailOrder.ID)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {manage !== null ? (
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
                    value={idDetailOrder}
                    onChange={(e) => setIdDetailOrder(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Purchase Order</label>
              <select
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                defaultValue={orders[0].ID}
                value={idOrder}
                onChange={(e) => setIdOrder(e.target.value)}
              >
                {orders.map((order) => (
                  <option key={order.ID} value={order.ID} selected={order.ID}>
                    {order.ID}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Nama Barang</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Satuan Barang</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={unitProduct}
                onChange={(e) => setUnitProduct(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Jenis Barang</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={typeProduct}
                onChange={(e) => setTypeProduct(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Harga Barang</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                type="number"
                value={priceProduct}
                onChange={(e) => setPriceProduct(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Jumlah Pesanan</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                type="number"
                value={totalOrder}
                onChange={(e) => setTotalOrder(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <button
              className="border border-dark_green rounded-md py-1 px-3 w-1/2 hover:bg-dark_green/25 hover:text-white"
              onClick={() =>
                manage === "add"
                  ? addDetailOrder()
                  : updateDetailOder(idDetailOrder)
              }
            >
              {manage === "add"
                ? "Tambah"
                : manage === "edit"
                ? "Ubah"
                : "Simpan"}
            </button>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
