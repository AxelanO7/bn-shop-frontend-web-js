import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DetailOrder, Order, Supplier, User } from "../../interface/interface";

export default function CreateOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [detailOrdersTemp, setDetailOrdersTemp] = useState<DetailOrder[]>([]);

  // order
  const [purchaseOrder, setPurchaseOrder] = useState<string>();
  const [dateTransaction, setDateTransaction] = useState<string>();
  const [idSupplier, setIdSupplier] = useState<number>();
  const [supplierSelected, setSupplierSelected] = useState<Supplier>();
  const [typeTransaction, setTypeTransaction] = useState<string>();

  const [totalPrice, setTotalPrice] = useState<number>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getSupplier();
    getOrder();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user-login");
      if (res.status === 200) setUser(res.data.data);
    } catch (error) {
      alert("Silahkan Login Terlebih Dahulu");
      window.location.href = "/";
      console.log(error);
    }
  };

  const getOrder = async () => {
    await axios
      .get("http://localhost:8080/api/order")
      .then((response) => {
        if (response.status === 200) {
          setOrders(response.data.data);
          const lastIndexPo = response.data.data
            .map(
              (order: Order) =>
                parseInt(order.purchase_order.substring(2, 5)) || 0
            )
            .sort((a: number, b: number) => b - a);
          const lastPoId = "PO" + (lastIndexPo[0] + 1);
          setPurchaseOrder(lastPoId);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) setPurchaseOrder("PO1");
        else console.log(error);
      });
  };

  const getSupplier = async () => {
    const response = await axios.get("http://localhost:8080/api/supplier");
    if (response.status === 200) setSuppliers(response.data.data);
    else alert("Supplier gagal diambil");
  };

  const validateOrder = async () => {
    if (!purchaseOrder || !dateTransaction || !idSupplier || !typeTransaction) {
      return false;
    }
    return true;
  };

  const createDetailOrder = async () => {
    getOrder();
    const order: Order = {
      ID: 0,
      purchase_order: purchaseOrder || "",
      date_transaction: dateTransaction || "",
      id_supplier: idSupplier || 0,
      supplier: findSupplier(idSupplier || 0),
      type_transaction: typeTransaction || "",
      status: 0,
      id_user: user?.ID || 0,
      user: user || {
        ID: 0,
        name_user: "",
        username: "",
        password: "",
        position: "",
        status: 0,
      },
    };
    await axios
      .post("http://localhost:8080/api/order", order)
      // {
      //   purchase_order: purchaseOrder,
      //   date_transaction: dateTransaction,
      //   id_supplier: idSupplier,
      //   supplier: findSupplier(idSupplier || 0),
      //   type_transaction: typeTransaction,
      //   status: 0,
      // })
      .then((response) => {
        if (response.status === 201) {
          alert("Order berhasil ditambahkan");
          const idOrder = response.data.data.ID;
          detailOrdersTemp.forEach((detailOrder) => {
            detailOrder.id_order = idOrder;
            detailOrder.type_product = "Bahan Baku";
            detailOrder.order.purchase_order = purchaseOrder || "";
          });
        } else alert("Order gagal ditambahkan");
      })
      .catch((error) => {
        console.log(error);
      });

    const response = await axios.post(
      "http://localhost:8080/api/detail-order/create-multiple",
      detailOrdersTemp
    );
    if (response.status === 201) {
      alert("Order berhasil ditambahkan");
      window.location.href = "/order";
    } else alert("Order gagal ditambahkan");
    handleTotalPrice();
  };

  const findSupplier = (id: number) => {
    const supplier = suppliers.find((supplier) => supplier.ID === id);
    if (!supplier) return { ID: 0, name_supplier: "", phone: 0, address: "" };
    return supplier;
  };

  const addOrderList = () => {
    if (!validateOrder()) {
      alert("Silahkan isi form order terlebih dahulu");
      return;
    }
    setDetailOrdersTemp([
      ...detailOrdersTemp,
      {
        ID: null,
        id_order: orders.length + 1,
        order: {
          ID: 1,
          purchase_order: purchaseOrder || "",
          date_transaction: dateTransaction || "",
          id_supplier: idSupplier || 0,
          supplier: findSupplier(idSupplier || 0),
          type_transaction: "Bahan Baku",
          status: 0,
          id_user: user?.ID || 0,
          user: user || {
            ID: 0,
            name_user: "",
            username: "",
            password: "",
            position: "",
            status: 0,
          },
        },
        code_product: "",
        name_product: "",
        unit_product: "",
        type_product: "",
        price_product: 0,
        total_product: 0,
      },
    ]);
  };

  const deleteOrderList = (index: number) => {
    detailOrdersTemp.splice(index, 1);
    setDetailOrdersTemp([...detailOrdersTemp]);
    handleTotalPrice();
  };

  const handleTotalPrice = () => {
    setTotalPrice(
      detailOrdersTemp.reduce(
        (total, detailOrder) =>
          total + detailOrder.total_product * detailOrder.price_product,
        0
      )
    );
  };

  return (
    <BaseLayout padding={12}>
      <HeaderPage>FORM PEMESANAN BAHAN BAKU</HeaderPage>
      <div className="h-12" />
      <div className=" rounded-md w-full p-8 bg-white shadow-md">
        <div className="flex flex-col">
          <div className="flex space-x-4 text-stone_5">
            <div className="flex-1 flex-col items-center space-y-6">
              <div className="flex items-center">
                <div className="w-36">
                  <label>Tanggal Transaksi</label>
                </div>

                {/* <input
                  type="date"
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  value={dateTransaction!}
                  onChange={(e) => setDateTransaction(e.target.value)}
                /> */}

                <DatePicker
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  selected={new Date(dateTransaction || Date.now())}
                  onChange={(date) =>
                    setDateTransaction(
                      date?.toISOString().split("T")[0] || Date.now().toString()
                    )
                  }
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className="flex items-center">
                <div className="w-36">
                  <label>Jenis Pembayaran</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  value={typeTransaction!}
                  onChange={(e) => setTypeTransaction(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 flex-col items-center space-y-6">
              <div className="flex items-center">
                <div className="w-36">
                  <label>Purchase Order</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60 bg-white"
                  value={purchaseOrder}
                  disabled
                  // value={purchaseOrder!}
                  // onChange={(e) => setPurchaseOrder(e.target.value)}
                />
              </div>
              <div className="w-full flex items-center">
                <div className="w-36">
                  <label>Nama Supplier</label>
                </div>
                <select
                  className="border border-dark_green rounded-md py-1.5 px-3 ml-4 w-60 bg-white"
                  onChange={(e) => {
                    setIdSupplier(parseInt(e.target.value));
                    setSupplierSelected(
                      suppliers.find(
                        (supplier) => supplier.ID === parseInt(e.target.value)
                      )
                    );
                  }}
                >
                  <option disabled selected>
                    Pilih Supplier
                  </option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.ID} value={supplier.ID}>
                      {supplier.name_supplier}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <div className="w-36">
                  <label>Id Supplier</label>
                </div>
                <input
                  disabled
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60 bg-white"
                  value={supplierSelected?.ID}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green my-4 py-2">
          <p className="text-center text-white">Daftar item yang dipesan</p>
        </div>
        <table className="table-auto text-center text-white bg-green w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 w-36">Kode Barang</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2 w-28">Satuan</th>
              <th className="px-4 py-2 w-40">Jenis</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Jumlah</th>
              <th />
            </tr>
          </thead>
          <tbody className="bg-slate-100 text-stone_5">
            {detailOrdersTemp.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-2 ">
                  Tidak ada data
                </td>
              </tr>
            ) : null}
            {detailOrdersTemp.map((detailOrder, index) => (
              <tr key={detailOrder.ID}>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="border border-dark_green rounded-md py-1 px-3 w-full text-center"
                    onChange={(e) =>
                      (detailOrder.code_product = e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="border border-dark_green rounded-md py-1 px-3 w-full text-center"
                    onChange={(e) =>
                      (detailOrder.name_product = e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="border border-dark_green rounded-md py-1 px-3 w-full text-center"
                    onChange={(e) =>
                      (detailOrder.unit_product = e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  {/* <input
                    type="text"
                    className="border border-dark_green rounded-md py-1 px-3 w-full text-center"
                    onChange={(e) =>
                      (detailOrder.type_product = e.target.value)
                    }
                    value={"Bahan Baku"}
                    disabled
                  /> */}
                  <select className="border border-dark_green rounded-md py-1 px-3 w-full text-center">
                    <option value="Bahan Baku">Bahan Baku</option>
                    <option value="Barang Jadi">Barang Jadi</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="border border-dark_green rounded-md py-1 px-3 w-full text-center"
                    onChange={(e) => {
                      detailOrder.price_product = parseFloat(e.target.value);
                      handleTotalPrice();
                    }}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="border border-dark_green rounded-md py-1 px-3 w-full text-center"
                    onChange={(e) => {
                      detailOrder.total_product = parseFloat(e.target.value);
                      handleTotalPrice();
                    }}
                  />
                </td>
                <td className="pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={() => deleteOrderList(index)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4" />
        <div className="flex w-full items-center px-16">
          <button
            className="border border-dark_green rounded-md py-1 px-3 hover:bg-dark_green/25 hover:text-white"
            onClick={addOrderList}
          >
            + Baru
          </button>
          <div className="grow" />
          <p>Total Harga {totalPrice ? totalPrice : 0}</p>
        </div>
        <button
          className="border border-dark_green rounded-md py-1 px-3 hover:bg-dark_green/25 hover:text-black bg-dark_green text-white mr-16 float-right"
          onClick={createDetailOrder}
        >
          Ajukan
        </button>
      </div>
    </BaseLayout>
  );
}
