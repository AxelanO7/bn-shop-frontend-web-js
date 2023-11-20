import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Stock {
  ID: number;
  code_product: string;
  name_product: string;
  unit_product: string;
  total_product: number;
  type_product: string;
  price_product: number;
}

interface Output {
  ID: number | null;
  no_output: string;
  date_output: string;
}

interface DetailOutput {
  ID: number | null;
  id_output: number;
  output: Output;
  code_product: string;
  name_raw: string;
  unit_product: string;
  total_used: number;
  type_product: string;
  price_unit: number;
}

export default function CreateOutput() {
  const [stocksFinished, setStocksFinished] = useState<Stock[]>([]);
  const [stocksFinishedTemp, setStocksFinishedTemp] = useState<Stock[]>([]);
  const [outputs, setOutputs] = useState<Output[]>([]);

  // order
  const [dateTransaction, setDateTransaction] = useState<string>();
  const [noOutputProduct, setNoOutputProduct] = useState<string>();

  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    await axios
      .get("http://localhost:8080/api/paid/finished")
      .then((response) => {
        setStocksFinished(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal mendapatkan data");
      });
  };

  const validateOutput = () => {
    if (!dateTransaction || !noOutputProduct) return false;
    return true;
  };

  const createOutput = async () => {
    const resOutput = await axios.post("http://localhost:8080/api/output/", {
      no_output: noOutputProduct,
      data_output: dateTransaction,
    });
    if (resOutput.status !== 201) {
      alert("Order gagal ditambahkan");
      return;
    }

    const response = await axios.post(
      "http://localhost:8080/api/detail-outputs",
      stocksFinishedTemp.map(
        (stockRawT): DetailOutput => ({
          ID: null,
          id_output: resOutput.data.data.ID,
          output: {
            ID: resOutput.data.data.ID,
            no_output: noOutputProduct || "",
            date_output: dateTransaction || "",
          },
          code_product: stockRawT.code_product,
          name_raw: stockRawT.name_product,
          unit_product: stockRawT.unit_product,
          total_used: stockRawT.total_product,
          type_product: stockRawT.type_product,
          price_unit: stockRawT.price_product,
        })
      )
    );
    if (response.status === 201) {
      alert("Order berhasil ditambahkan");
      window.location.href = "/stock";
    } else alert("Order gagal ditambahkan");
    handleTotalPrice();
  };

  const addStockList = () => {
    if (!validateOutput()) {
      alert("Silahkan isi form order terlebih dahulu");
      return;
    }
    setOutputs([
      ...outputs,
      {
        ID: null,
        no_output: noOutputProduct || "",
        date_output: dateTransaction || "",
      },
    ]);

    setStocksFinishedTemp([
      ...stocksFinishedTemp,
      {
        ID: 0,
        code_product: "",
        name_product: "",
        unit_product: "",
        total_product: 0,
        type_product: "",
        price_product: 0,
      },
    ]);
  };

  const deleteOrderList = (index: number) => {
    stocksFinishedTemp.splice(index, 1);
    setStocksFinishedTemp([...stocksFinishedTemp]);
    handleTotalPrice();
  };

  const handleTotalPrice = () => {
    setTotalPrice(
      stocksFinishedTemp.reduce((total, item) => total + item.total_product, 0)
    );
  };

  return (
    <BaseLayout padding={12}>
      <HeaderPage>FORM BARANG MASUK</HeaderPage>
      <div className="h-12" />
      <div className="border border-dark_green rounded-2xl w-full py-8">
        <div className="flex flex-col px-12">
          <div className="flex space-x-4  text-stone_5">
            <div className="flex-1 flex-col items-center space-y-6">
              <div className="flex items-center">
                <div className="w-36">
                  <label>Tanggal Masuk</label>
                </div>
                <input
                  type="date"
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  onChange={(e) => setDateTransaction(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 flex-col items-center space-y-6">
              <div className="flex items-center">
                <div className="w-36">
                  <label>No Masuk</label>
                </div>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  onChange={(e) => setNoOutputProduct(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-4" />
        <div className="bg-green my-4 py-2">
          <p className="text-center text-white">Daftar barang yang digunakan</p>
        </div>
        <table className="table-auto text-center text-white bg-green w-full">
          <thead className="border-b border-dark_green">
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
          <tbody className="border border-dark_green bg-white text-stone_5">
            {stocksFinishedTemp.length === 0 && (
              <tr>
                <td colSpan={7} className="py-2">
                  Tidak ada data
                </td>
              </tr>
            )}
            {stocksFinishedTemp.map((stockRawT, index) => (
              <tr key={stockRawT.ID} className="border-b border-dark_green">
                <td className="px-4 py-2">
                  <p className="py-1 px-3 w-full text-center">
                    {stockRawT.code_product || "-"}
                  </p>
                </td>
                <td className="px-4 py-2">
                  <select
                    className="border border-dark_green rounded-md py-1 px-3 text-center"
                    onChange={(e) => {
                      const stock = stocksFinished.find(
                        (stock) => stock.ID === parseInt(e.target.value)
                      );
                      if (!stock) return;
                      stockRawT.code_product = stock.code_product;
                      stockRawT.name_product = stock.name_product;
                      stockRawT.unit_product = stock.unit_product;
                      stockRawT.type_product = stock.type_product;
                      stockRawT.price_product = stock.price_product;
                      stockRawT.total_product = stock.total_product;
                      setStocksFinishedTemp([...stocksFinishedTemp]);
                    }}
                  >
                    <option disabled selected>
                      Pilih Barang
                    </option>
                    {stocksFinished.map((stockRaw) => (
                      <option value={stockRaw.ID}>
                        {stockRaw.name_product}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <p className="py-1 px-3 w-full text-center">
                    {stockRawT.unit_product || "-"}
                  </p>
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
                  <input
                    className="border border-dark_green rounded-md py-1 px-3 text-center"
                    type="number"
                    value={stockRawT.total_product}
                    onChange={(e) => {
                      stockRawT.total_product = parseInt(e.target.value);
                      setStocksFinishedTemp([...stocksFinishedTemp]);
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
            onClick={addStockList}
          >
            + Baru
          </button>
          <div className="grow" />
          <p>Total Harga {totalPrice ? totalPrice : 0}</p>
        </div>
        <button
          className="border border-dark_green rounded-md py-1 px-3 hover:bg-dark_green/25 hover:text-black bg-dark_green text-white mr-16 float-right"
          onClick={createOutput}
        >
          Ajukan
        </button>
      </div>
    </BaseLayout>
  );
}
