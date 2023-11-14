import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";

interface Stock {
  ID: number;
  name_product: string;
  unit_product: string;
  total_product: number;
  type_product: string;
  price_product: number;
}

export default function StockPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [manage, setManage] = useState<string | null>(null);

  const [idStock, setIdStock] = useState<number | null>(null);
  const [nameStock, setNameStock] = useState<string | null>(null);
  const [unitStock, setUnitStock] = useState<string | null>(null);
  const [totalStock, setTotalStock] = useState<number | null>(null);
  const [typeStock, setTypeStock] = useState<string | null>(null);
  const [priceStock, setPriceStock] = useState<number | null>(null);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    const response = await axios.get("http://localhost:8080/api/stock");
    if (response.status === 200) {
      setStocks(response.data.data);
    } else alert("Stock gagal diambil");
  };

  const addStock = async () => {
    if (!validateStock()) return;
    const response = await axios.post("http://localhost:8080/api/stock", {
      ID: null,
      name_product: nameStock,
      unit_product: unitStock,
      total_product: totalStock === 0 ? null : totalStock,
      type_product: typeStock,
      price_product: priceStock === 0 ? null : priceStock,
    });
    if (response.status === 201) {
      alert("Stock berhasil ditambahkan");
      getStocks();
    } else alert("Stock gagal ditambahkan");
    closeManage();
  };

  const updateStock = async (idProps: string) => {
    if (!validateStock()) return;
    const response = await axios.put(
      `http://localhost:8080/api/stock/${idProps}`,
      {
        ID: parseInt(idProps),
        name_product: nameStock,
        unit_product: unitStock,
        total_product: totalStock,
        type_product: typeStock,
        price_product: priceStock,
      }
    );
    if (response.status === 200) {
      alert("Stock berhasil diupdate");
      getStocks();
    } else alert("Stock gagal diupdate");
    closeManage();
  };

  const deleteStock = async (idProps: string) => {
    const response = await axios.delete(
      `http://localhost:8080/api/stock/${idProps}`
    );
    if (response.status === 200) {
      alert("Stock berhasil dihapus");
      getStocks();
    } else alert("Stock gagal dihapus");
  };

  const closeManage = () => {
    setIdStock(null);
    setNameStock(null);
    setUnitStock(null);
    setTotalStock(null);
    setTypeStock(null);
    setPriceStock(null);
    setManage(null);
  };

  const tapEdit = async (idProps: number) => {
    // const index = stocks.findIndex((stock) => stock.ID === id);
    const stock = stocks.find((stock) => stock.ID === idProps);
    if (stock === undefined) return;
    setIdStock(stock.ID);
    setNameStock(stock.name_product);
    setUnitStock(stock.unit_product);
    setTotalStock(stock.total_product);
    setTypeStock(stock.type_product);
    setPriceStock(stock.price_product);
    setManage("edit");
  };

  const validateStock = () => {
    if (nameStock === null || nameStock === "") {
      alert("Nama stock harus diisi");
      return false;
    }
    if (unitStock === null || unitStock === "") {
      alert("Unit stock harus diisi");
      return false;
    }
    if (totalStock === null) {
      alert("Total stock harus diisi");
      return false;
    }
    if (typeStock === null || typeStock === "") {
      alert("Type stock harus diisi");
      return false;
    }
    if (priceStock === null) {
      alert("Price stock harus diisi");
      return false;
    }
    return true;
  };

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <HeaderPage>DATA STOK BARANG</HeaderPage>
      <div className="h-12" />
      <div className="self-end space-x-4">
        <button className="border border-dark_green py-1 px-3 hover:bg-dark_green/25 hover:text-white">
          Barang Masuk
        </button>
        <button className="border border-dark_green py-1 px-3 hover:bg-dark_green/25 hover:text-white">
          Barang Keluar
        </button>
        <button className="border border-dark_green py-1 px-3 hover:bg-dark_green/25 hover:text-white">
          Stock Opname
        </button>
      </div>
      <div className="h-4" />
      <table className="table-auto text-center text-white bg-green">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-dark_green">Kode Barang</th>
            <th className="px-4 py-2 border border-dark_green">Nama</th>
            <th className="px-4 py-2 border border-dark_green">Jenis Barang</th>
            <th className="px-4 py-2 border border-dark_green">Stok</th>
            <th className="px-4 py-2 border border-dark_green">Harga</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length === 0 ? (
            <tr>
              <td className="px-4 py-2" colSpan={5}>
                Tidak ada data
              </td>
            </tr>
          ) : null}
          {stocks.map((stock) => (
            <tr key={stock.ID}>
              <td className="px-4 py-2 border border-dark_green">{stock.ID}</td>
              <td className="px-4 py-2 border border-dark_green">
                {stock.name_product}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {stock.type_product}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {stock.unit_product}
              </td>
              <td className="px-4 py-2 border border-dark_green">
                {stock.price_product}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-8" />
      <p className="border border-dark_green w-max px-4">
        Jumlah Total :{" "}
        {stocks.reduce((total, stock) => total + stock.total_product!, 0)}
      </p>

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
              ? "Tambah Stock"
              : manage === "edit"
              ? "Ubah Stock"
              : "Stock"}
          </label>
          {manage === "add" ? null : (
            <>
              <div className="h-4" />
              <div className="flex flex-col w-1/2">
                <label className="text-left">Kode Barang</label>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 w-full"
                  type="number"
                  value={idStock!}
                  onChange={(e) => setIdStock(parseInt(e.target.value))}
                />
              </div>
            </>
          )}
          <div className="h-4" />
          <div className="flex flex-col w-1/2">
            <label className="text-left">Nama Barang</label>
            <input
              className="border border-dark_green rounded-md py-1 px-3 w-full"
              value={nameStock!}
              onChange={(e) => setNameStock(e.target.value)}
            />
          </div>
          <div className="h-4" />
          <div className="flex flex-col w-1/2">
            <label className="text-left">Satuan Barang</label>
            <input
              className="border border-dark_green rounded-md py-1 px-3 w-full"
              value={unitStock!}
              onChange={(e) => setUnitStock(e.target.value)}
            />
          </div>
          <div className="h-4" />
          <div className="flex flex-col w-1/2">
            <label className="text-left">Jumlah Barang</label>
            <input
              type="number"
              className="border border-dark_green rounded-md py-1 px-3 w-full"
              value={totalStock!}
              onChange={(e) => setTotalStock(parseInt(e.target.value))}
            />
          </div>
          <div className="h-4" />
          <div className="flex flex-col w-1/2">
            <label className="text-left">Jenis Barang</label>
            <input
              className="border border-dark_green rounded-md py-1 px-3 w-full"
              value={typeStock!}
              onChange={(e) => setTypeStock(e.target.value)}
            />
          </div>
          <div className="h-4" />
          <div className="flex flex-col w-1/2">
            <label className="text-left">Harga Barang</label>
            <input
              type="number"
              className="border border-dark_green rounded-md py-1 px-3 w-full"
              value={priceStock!}
              onChange={(e) => setPriceStock(parseInt(e.target.value))}
            />
          </div>
          <div className="h-8" />
          <button
            className="border border-dark_green rounded-md py-1 px-3 w-1/2 hover:bg-dark_green/25 hover:text-white"
            onClick={() =>
              manage === "add" ? addStock() : updateStock(idStock!.toString())
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
