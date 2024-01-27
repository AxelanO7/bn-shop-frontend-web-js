import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  DetailInput,
  Input,
  Stock,
  Supplier,
  User,
} from "../../interface/interface";

export default function CreateInputPage() {
  const [stocksRaw, setStocksRaw] = useState<Stock[]>([]);
  const [stocksRawTemp, setStocksRawTemp] = useState<Stock[]>([]);
  const [inputs, setInputs] = useState<Input[]>([]);

  const [lastIdInput, setLastIdInput] = useState<number>(0);

  const [dateTransaction, setDateTransaction] = useState<string>();
  const [codeProduct, setCodeProduct] = useState<string>();
  const [nameProduct, setNameProduct] = useState<string>();
  const [typeProduct, setTypeProduct] = useState<string>();
  const [totalProduction, setTotalProduction] = useState<number>();
  const [noInputProduct, setNoInputProduct] = useState<string>();
  const [price, setPrice] = useState<number>();

  const [totalPrice, setTotalPrice] = useState<number>();

  const [maxTotals, setMaxTotals] = useState<number[]>([]);

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplierSelected, setSupplierSelected] = useState<Supplier>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchStock();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user-login");
      if (res.status === 200) setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStock = async () => {
    await axios
      .get("http://localhost:8080/api/paid/raw")
      .then((response) => {
        setStocksRaw(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal mendapatkan data");
      });

    await axios
      .get("http://localhost:8080/api/input")
      .then((response) => {
        setLastIdInput(
          response.data.data
            .map((input: Input) => input.ID)
            .sort((a: number, b: number) => b - a)[0]
        );
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal mendapatkan data");
      });
    setNoInputProduct("IN" + (lastIdInput + 1).toString().padStart(4, "0"));
    setTypeProduct("Barang Jadi");
    getSupplier();
  };

  const validateInput = () => {
    if (
      !dateTransaction ||
      !codeProduct ||
      !nameProduct ||
      !typeProduct ||
      !totalProduction ||
      !noInputProduct ||
      !price
    ) {
      console.log(
        dateTransaction,
        codeProduct,
        nameProduct,
        typeProduct,
        totalProduction,
        noInputProduct,
        price
      );
      return false;
    }

    return true;
  };

  const createInput = async () => {
    const payloadMasterInput: Input = {
      ID: null,
      no_input: noInputProduct || "",
      date_input: dateTransaction || "",
      code_product: codeProduct || "",
      name_product: nameProduct || "",
      type_product: typeProduct || "",
      total_product: totalProduction || 0,
      price_product: price || 0,
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

    const resInput = await axios.post(
      "http://localhost:8080/api/input",
      payloadMasterInput
    );
    if (resInput.data.status !== "success") {
      alert("Order gagal ditambahkan");
      return;
    }

    const payloadDetailInputs: DetailInput[] = stocksRawTemp.map(
      (stockRawT): DetailInput => ({
        ID: null,
        id_input: resInput.data.data.ID,
        input: {
          ID: resInput.data.data.ID,
          no_input: noInputProduct || "",
          date_input: dateTransaction || "",
          code_product: codeProduct || "",
          name_product: nameProduct || "",
          type_product: typeProduct || "",
          total_product: totalProduction || 0,
          price_product: price || 0,
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
        code_product: stockRawT.code_product,
        name_raw: stockRawT.name_product,
        unit_product: stockRawT.unit_product,
        total_used: stockRawT.total_product,
        type_product: stockRawT.type_product,
        price_unit: stockRawT.price_product,
      })
    );

    const resDetail = await axios.post(
      "http://localhost:8080/api/detail-inputs",
      payloadDetailInputs
    );
    if (resDetail.data.status !== "success") {
      alert("Order gagal ditambahkan");
      return;
    }

    const resReduceStock = await axios.put(
      "http://localhost:8080/api/detail-inputs",
      payloadDetailInputs
    );
    if (resReduceStock.data.status !== "success") {
      alert("Order gagal ditambahkan");
      return;
    }

    const payloadStock: Stock = {
      ID: null,
      code_product: codeProduct || "",
      name_product: nameProduct || "",
      unit_product: "pcs",
      type_product: typeProduct || "",
      total_product: totalProduction || 0,
      price_product: price || 0,
      id_supplier: supplierSelected?.ID || 0,
      supplier: supplierSelected || {
        ID: 0,
        name_supplier: "",
        phone: 0,
        address: "",
      },
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

    const resAddStock = await axios.post(
      "http://localhost:8080/api/stock",
      payloadStock
    );
    if (resAddStock.data.status !== "success") {
      alert("Order gagal ditambahkan");
      return;
    }

    alert("Order berhasil ditambahkan");
    window.location.href = "/stock";
    handleTotalPrice();
  };

  const addStockList = () => {
    if (!validateInput()) {
      alert("Silahkan isi form barang masuk terlebih dahulu");
      return;
    }
    setInputs([
      ...inputs,
      {
        ID: null,
        no_input: noInputProduct || "",
        date_input: dateTransaction || "",
        code_product: codeProduct || "",
        name_product: nameProduct || "",
        type_product: typeProduct || "",
        total_product: totalProduction || 0,
        price_product: price || 0,
        id_user: 0,
        user: {
          ID: 0,
          name_user: "",
          username: "",
          password: "",
          position: "",
          status: 0,
        },
      },
    ]);

    setStocksRawTemp([
      ...stocksRawTemp,
      {
        ID: 0,
        code_product: "",
        name_product: "",
        unit_product: "",
        total_product: 0,
        type_product: "",
        price_product: 0,
        id_supplier: 0,
        supplier: {
          ID: 0,
          name_supplier: "",
          phone: 0,
          address: "",
        },
        id_user: 0,
        user: {
          ID: 0,
          name_user: "",
          username: "",
          password: "",
          position: "",
          status: 0,
        },
      },
    ]);
  };

  const deleteOrderList = (index: number) => {
    setMaxTotals([
      ...maxTotals.slice(0, index),
      ...maxTotals.slice(index + 1, maxTotals.length),
    ]);
    stocksRawTemp.splice(index, 1);
    setStocksRawTemp([...stocksRawTemp]);
    handleTotalPrice();
  };

  const handleTotalPrice = () => {
    setTotalPrice(
      stocksRawTemp.reduce(
        (total, item) => total + item.total_product * item.price_product,
        0
      )
    );
  };

  const getSupplier = async () => {
    const response = await axios.get("http://localhost:8080/api/supplier");
    if (response.status === 200) setSuppliers(response.data.data);
    else alert("Supplier gagal diambil");
  };

  return (
    <BaseLayout padding={12}>
      <HeaderPage>FORM BARANG MASUK</HeaderPage>
      <div className="h-12" />
      <div className="rounded-md w-full p-8 bg-white shadow-md">
        <div className="flex flex-col">
          <div className="flex space-x-4 text-stone_5">
            <div className="flex-1 flex-col items-center space-y-6">
              <div className="flex items-center">
                <div className="w-36">
                  <label>Tanggal Masuk</label>
                </div>
                {/* <input
                  type="date"
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  onChange={(e) => setDateTransaction(e.target.value)}
                /> */}
                <DatePicker
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  selected={new Date(dateTransaction || Date.now())}
                  onChange={(date) => {
                    setDateTransaction(date?.toISOString().split("T")[0]);
                  }}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <div className="flex items-center">
                <div className="w-36">
                  <label>Kode Barang</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  type="text"
                  onChange={(e) => setCodeProduct(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <div className="w-36">
                  <label>Nama Barang</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  onChange={(e) => setNameProduct(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <div className="w-36">
                  <label>Jenis Barang</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60 bg-white"
                  value={"Barang Jadi"}
                  disabled
                />
              </div>
            </div>
            <div className="flex-1 flex-col items-center space-y-6">
              <div className="flex items-center">
                <div className="w-36">
                  <label>No Masuk</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60 bg-white"
                  value={"IN" + (lastIdInput + 1).toString().padStart(4, "0")}
                  disabled
                />
              </div>
              <div className="w-full flex items-center">
                <div className="w-36">
                  <label>Harga</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  type="number"
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center">
                <div className="w-36">
                  <label>Jumlah Produksi</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  type="number"
                  onChange={(e) => setTotalProduction(parseInt(e.target.value))}
                />
              </div>
              <div className="w-full flex items-center">
                <div className="w-36">
                  <label>Nama Supplier</label>
                </div>

                <select
                  className="border border-dark_green rounded-md py-1.5 px-3 ml-4 w-60 bg-white"
                  onChange={(e) => {
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
            </div>
          </div>
        </div>
        <div className="h-4" />
        <div className="bg-green my-4 py-2">
          <p className="text-center text-white">Daftar barang yang digunakan</p>
        </div>
        <table className="table-auto text-center text-white bg-green w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 w-36">Kode Barang</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2 w-28">Satuan</th>
              <th className="px-4 py-2">Jumlah</th>
              <th className="px-4 py-2 w-36">Jenis</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Subtotal</th>
              <th />
            </tr>
          </thead>
          <tbody className="bg-slate-100 text-stone_5">
            {stocksRawTemp.length === 0 && (
              <tr>
                <td colSpan={8} className="py-2">
                  Tidak ada data
                </td>
              </tr>
            )}
            {stocksRawTemp.map((stockRawT, index) => (
              <tr key={stockRawT.ID}>
                <td className="px-4 py-2">
                  <p className="py-1 px-3 w-full text-center">
                    {stockRawT.code_product || "-"}
                  </p>
                </td>
                <td className="px-4 py-2">
                  <input
                    list="items"
                    className="border border-dark_green rounded-md py-1 px-3 text-center"
                    onChange={(e) => {
                      const stock = stocksRaw.find(
                        (stock) => stock.name_product === e.target.value
                      );
                      if (!stock) return;
                      stockRawT.code_product = stock.code_product;
                      stockRawT.name_product = stock.name_product;
                      stockRawT.unit_product = stock.unit_product;
                      stockRawT.type_product = stock.type_product;
                      stockRawT.price_product = stock.price_product;
                      stockRawT.total_product = stock.total_product;
                      setStocksRawTemp([...stocksRawTemp]);
                      setMaxTotals([
                        ...maxTotals.slice(0, index),
                        stock.total_product,
                        ...maxTotals.slice(index + 1, maxTotals.length),
                      ]);
                      handleTotalPrice();
                    }}
                  />
                  <datalist
                    id="items"
                    className="rounded-md py-1 px-3 text-center"
                  >
                    <option disabled selected>
                      Pilih Barang
                    </option>
                    {stocksRaw.map((stockRaw) => (
                      <option value={stockRaw.name_product} />
                    ))}
                  </datalist>
                </td>
                <td className="px-4 py-2">
                  <p className="py-1 px-3 w-full text-center">
                    {stockRawT.unit_product || "-"}
                  </p>
                </td>
                <td className="px-4 py-2">
                  <input
                    className="rounded-md py-1 px-3 text-center"
                    type="number"
                    value={stockRawT.total_product}
                    min={0}
                    max={maxTotals[index]}
                    onChange={(e) => {
                      const totalItem: number = parseFloat(e.target.value);
                      if (totalItem > maxTotals[index]) {
                        alert(
                          `Jumlah barang melebihi stok, stok tersisa ${maxTotals[index]}`
                        );
                        return;
                      }
                      stockRawT.total_product = totalItem;
                      setStocksRawTemp([...stocksRawTemp]);
                      handleTotalPrice();
                    }}
                  />
                </td>
                <td className="px-4 py-2">
                  <p className="py-1 px-3 w-full text-center">
                    {stockRawT.type_product || "-"}
                  </p>
                </td>
                <td className="px-4 py-2">
                  <p className="py-1 px-3 w-full text-center">
                    {stockRawT.price_product || "-"}
                  </p>
                </td>
                <td className="px-4 py-2">
                  <p className="py-1 px-3 w-full text-center">
                    {stockRawT.price_product * stockRawT.total_product || "-"}
                  </p>
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
            onClick={addStockList}
          >
            + Baru
          </button>
          <div className="grow" />
          <p>Total Harga {totalPrice ? totalPrice : 0}</p>
        </div>
        <button
          className="border border-dark_green rounded-md py-1 px-3 hover:bg-dark_green/25 hover:text-black bg-dark_green text-white mr-16 float-right"
          onClick={createInput}
        >
          Ajukan
        </button>
      </div>
    </BaseLayout>
  );
}
