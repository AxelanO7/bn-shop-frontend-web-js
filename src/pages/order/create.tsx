import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

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

interface Order {
  ID: number;
  date_transaction: string;
  id_supplier: number;
  supplier: Supplier;
  type_transaction: string;
}

interface Supplier {
  ID: number;
  name_supplier: string;
  phone: number;
  address: string;
}

export default function CreateOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  // const [detailOrders, setDetailOrders] = useState<DetailOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [detailOrdersTemp, setDetailOrdersTemp] = useState<DetailOrder[]>([
    {
      ID: 1,
      id_order: 1,
      order: {
        ID: 1,
        date_transaction: "",
        id_supplier: 1,
        supplier: {
          ID: 1,
          name_supplier: "",
          phone: 0,
          address: "",
        },
        type_transaction: "",
      },
      name_product: "",
      unit_product: "",
      type_product: "",
      price_product: 0,
      total_order: 0,
    },
  ]);

  const [manage, setManage] = useState(null);

  // detail order
  const [idDetailOrder, setIdDetailOrder] = useState<number | null>(null);
  const [nameProduct, setNameProduct] = useState<string | null>(null);
  const [unitProduct, setUnitProduct] = useState<string | null>(null);
  const [typeProduct, setTypeProduct] = useState<string | null>(null);
  const [priceProduct, setPriceProduct] = useState<number | null>(null);
  const [totalOrder, setTotalOrder] = useState<number | null>(null);

  // order
  const [idOrder, setIdOrder] = useState<number | null>(null);
  const [dateTransaction, setDateTransaction] = useState<string | null>(null);
  const [idSupplier, setIdSupplier] = useState<number | null>(null);
  const [typeTransaction, setTypeTransaction] = useState<string | null>(null);

  const totalPrice = 0;

  useEffect(() => {
    getOrders();
    // getDetailOrders();
    // setDetailOrdersTemp(detailOrderStatic);
    // setDetailOrdersTemp(detailOrderStatic);
    getSupplier();
  }, []);

  const detailOrderStatic: DetailOrder[] = [
    {
      ID: 1,
      id_order: 1,
      order: {
        ID: 1,
        date_transaction: "",
        id_supplier: 1,
        supplier: {
          ID: 1,
          name_supplier: "",
          phone: 0,
          address: "",
        },
        type_transaction: "",
      },
      name_product: "",
      unit_product: "",
      type_product: "",
      price_product: 0,
      total_order: 0,
    },
  ];

  const getOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/order");
    if (response.status === 200) setOrders(response.data.data);
    else alert("Order gagal diambil");
  };

  const getDetailOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/detail-order");
    // if (response.status === 200) setDetailOrders(response.data.data);
    // else alert("Detail order gagal diambil");
  };

  const getSupplier = async () => {
    const response = await axios.get("http://localhost:8080/api/supplier");
    if (response.status === 200) setSuppliers(response.data.data);
    else alert("Supplier gagal diambil");
  };

  const addDetailOrder = async () => {
    if (!validateDetailOrder()) return;
    const response = await axios.post(
      "http://localhost:8080/api/detail-order",
      {
        ID: null,
        id_order: idOrder!,
        name_product: nameProduct,
        unit_product: unitProduct,
        type_product: typeProduct,
        price_product: priceProduct,
        total_order: totalOrder,
      }
    );
    if (response.status === 201) {
      alert("Order berhasil ditambahkan");
      getDetailOrders();
    } else alert("Order gagal ditambahkan");
    closeManage();
  };

  // const tapEditDetailOrder = (idProps: string) => {
  //   const detailOrder = detailOrders.find(
  //     (detailOrder) => detailOrder.ID === parseInt(idProps)
  //   );
  //   setIdDetailOrder(detailOrder.ID);
  //   setIdOrder(detailOrder.id_order);
  //   setNameProduct(detailOrder.name_product);
  //   setUnitProduct(detailOrder.unit_product);
  //   setTypeProduct(detailOrder.type_product);
  //   setPriceProduct(detailOrder.price_product);
  //   setTotalOrder(detailOrder.total_order);
  //   setManage("edit");
  // };

  const updateDetailOder = async (idProps: string) => {
    if (!validateDetailOrder()) return;
    const response = await axios.put(
      `http://localhost:8080/api/detail-order/${idProps}`,
      {
        ID: idDetailOrder,
        id_order: idOrder,
        name_product: nameProduct,
        unit_product: unitProduct,
        type_product: typeProduct,
        price_product: priceProduct,
        total_order: totalOrder,
      }
    );
    if (response.status === 200) {
      alert("Order berhasil diupdate");
      getDetailOrders();
    } else alert("Order gagal diupdate");
    closeManage();
  };

  const deleteDetailOrder = async (idProps: string) => {
    const response = await axios.delete(
      `http://localhost:8080/api/order/${idProps}`
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

  const validateDetailOrder = () => {
    if (idOrder === null) {
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
    if (priceProduct === null) {
      alert("Harga Produk tidak boleh kosong");
      return false;
    }
    if (totalOrder === null) {
      alert("Jumlah Produk tidak boleh kosong");
      return false;
    }
    return true;
  };

  const addOrderList = () => {
    // detailOrdersTemp.push(detailOrderStatic[0]);
    setDetailOrdersTemp([...detailOrdersTemp, detailOrderStatic[0]]);
    console.log(detailOrdersTemp);
  };

  return (
    <BaseLayout padding={12}>
      <HeaderPage>FORM PEMESANAN</HeaderPage>
      <div className="h-8" />
      {/* <button
          className="border border-dark_green py-1 px-3 w-1/4 hover:bg-dark_green/25 hover:text-white self-end"
          onClick={() => setManage("add")}
        >
          Tambah Detail Order
        </button> */}
      <div className="h-4" />

      <div className="border border-dark_green rounded-2xl w-full py-8">
        <div className="flex flex-col px-12">
          <div className="flex space-x-4">
            <div className="flex-1 flex-col items-center space-y-6">
              <div className="flex items-center">
                <div className="w-36">
                  <label>Tanggal Transaksi</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  value={dateTransaction!}
                  onChange={(e) => setDateTransaction(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <div className="w-36">
                  <label>Jenis Pembayaran</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  value={idOrder!}
                  onChange={(e) => setIdOrder(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="flex-1 flex-col items-center space-y-6">
              <div className="flex items-center">
                <div className="w-36">
                  <label>Purchase Order</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  value={idOrder!}
                  onChange={(e) => setIdOrder(parseInt(e.target.value))}
                />
              </div>
              <div className="w-full flex items-center">
                <div className="w-36">
                  <label>Name Supplier</label>
                </div>
                <select
                  className="border border-dark_green rounded-md py-1.5 px-3 ml-4 w-60"
                  defaultValue={"Pilih Supplier"}
                  value={idSupplier!}
                  onChange={(e) => setIdSupplier(parseInt(e.target.value))}
                >
                  {suppliers.map((supplier) => (
                    <option key={supplier.ID} value={supplier.ID}>
                      {supplier.name_supplier}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green my-4 py-2">
          <p className="text-center text-white">Daftar item yang dipesan</p>
        </div>
        <table className="table-auto text-center text-white bg-green">
          <thead className="border-b border-dark_green">
            <tr>
              <th className="px-4 py-2 w-36">Kode Barang</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2 w-28">Satuan</th>
              <th className="px-4 py-2 w-28">Jenis</th>
              <th className="px-4 py-2 w-64">Harga</th>
              <th className="px-4 py-2 w-64">Jumlah</th>
            </tr>
          </thead>
          <tbody className="border border-dark_green bg-white text-stone_5">
            {detailOrdersTemp.map((detailOrder) => (
              <tr key={detailOrder.ID} className="border-b border-dark_green">
                <td className="px-4 py-2">
                  <p>{detailOrder.ID}</p>
                </td>
                <td className="px-4 py-2">
                  <p>{detailOrder.name_product}</p>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="border border-dark_green rounded-md py-1 px-3 w-full"
                    onChange={(e) =>
                      (detailOrder.unit_product = e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="border border-dark_green rounded-md py-1 px-3 w-full"
                    onChange={(e) =>
                      (detailOrder.type_product = e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="border border-dark_green rounded-md py-1 px-3 w-full"
                    onChange={(e) =>
                      (detailOrder.price_product = parseInt(e.target.value))
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="border border-dark_green rounded-md py-1 px-3 w-full"
                    onChange={(e) =>
                      (detailOrder.total_order = parseInt(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4" />
        <div className="flex w-full items-center px-16">
          <button
            className="border border-dark_green rounded-md py-1 px-3 hover:bg-dark_green/25 hover:text-white"
            onClick={() => addOrderList()}
          >
            + Baru
          </button>
          <div className="grow" />
          <p>
            Total Harga{" "}
            {detailOrdersTemp.reduce(
              (total, detailOrder) =>
                total + detailOrder.total_order * detailOrder.price_product,
              0
            )}
          </p>
        </div>
        <button
          className="border border-dark_green rounded-md py-1 px-3 hover:bg-dark_green/25 hover:text-black bg-dark_green text-white mr-16 float-right"
          onClick={() => console.log(detailOrdersTemp)}
        >
          Ajukan
        </button>
      </div>

      {/* <table className="table-auto border border-dark_green">
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
        </table> */}
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
                  value={idDetailOrder!}
                  onChange={(e) => setIdDetailOrder(parseInt(e.target.value))}
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
              value={idOrder!}
              onChange={(e) => setIdOrder(parseInt(e.target.value))}
            >
              {orders.map((order) => (
                <option key={order.ID} value={order.ID}>
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
              value={nameProduct!}
              onChange={(e) => setNameProduct(e.target.value)}
            />
          </div>
          <div className="h-4" />
          <div className="flex flex-col w-1/2">
            <label className="text-left">Satuan Barang</label>
            <input
              className="border border-dark_green rounded-md py-1 px-3 w-full"
              value={unitProduct!}
              onChange={(e) => setUnitProduct(e.target.value)}
            />
          </div>
          <div className="h-4" />
          <div className="flex flex-col w-1/2">
            <label className="text-left">Jenis Barang</label>
            <input
              className="border border-dark_green rounded-md py-1 px-3 w-full"
              value={typeProduct!}
              onChange={(e) => setTypeProduct(e.target.value)}
            />
          </div>
          <div className="h-4" />
          <div className="flex flex-col w-1/2">
            <label className="text-left">Harga Barang</label>
            <input
              className="border border-dark_green rounded-md py-1 px-3 w-full"
              type="number"
              value={priceProduct!}
              onChange={(e) => setPriceProduct(parseInt(e.target.value))}
            />
          </div>
          <div className="h-4" />
          <div className="flex flex-col w-1/2">
            <label className="text-left">Jumlah Pesanan</label>
            <input
              className="border border-dark_green rounded-md py-1 px-3 w-full"
              type="number"
              value={totalOrder!}
              onChange={(e) => setTotalOrder(parseInt(e.target.value))}
            />
          </div>
          <div className="h-4" />
          <button
            className="border border-dark_green rounded-md py-1 px-3 w-1/2 hover:bg-dark_green/25 hover:text-white"
            onClick={() =>
              manage === "add"
                ? addDetailOrder()
                : updateDetailOder(idDetailOrder?.toString()!)
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
    </BaseLayout>
  );
}

function undefined({}) {
  return <label>Tanggal Transaksi</label>;
}
