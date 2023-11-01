import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function StockPage() {
  const [stocks, setStocks] = useState([]);
  const [manage, setManage] = useState(null);

  const [idStock, setIdStock] = useState(null);
  const [nameStock, setNameStock] = useState(null);
  const [unitStock, setUnitStock] = useState(null);
  const [totalStock, setTotalStock] = useState(null);
  const [typeStock, setTypeStock] = useState(null);
  const [priceStock, setPriceStock] = useState(null);

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
      total_product: parseInt(totalStock) === 0 ? null : parseInt(totalStock),
      type_product: typeStock,
      price_product: parseInt(priceStock) === 0 ? null : parseInt(priceStock),
    });
    if (response.status === 201) {
      alert("Stock berhasil ditambahkan");
      getStocks();
    } else alert("Stock gagal ditambahkan");
    closeManage();
  };

  const updateStock = async (id) => {
    if (!validateStock()) return;
    const response = await axios.put(`http://localhost:8080/api/stock/${id}`, {
      ID: parseInt(id),
      name_product: nameStock,
      unit_product: unitStock,
      total_product: parseInt(totalStock),
      type_product: typeStock,
      price_product: parseInt(priceStock),
    });
    if (response.status === 200) {
      alert("Stock berhasil diupdate");
      getStocks();
    } else alert("Stock gagal diupdate");
    closeManage();
  };

  const deleteStock = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/stock/${id}`
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

  const tapEdit = async (id) => {
    const index = stocks.findIndex((stock) => stock.ID === id);
    setIdStock(id);
    setNameStock(stocks[index].name_product);
    setUnitStock(stocks[index].unit_product);
    setTotalStock(stocks[index].total_product);
    setTypeStock(stocks[index].type_product);
    setPriceStock(stocks[index].price_product);
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
    if (totalStock === null || totalStock === "") {
      alert("Total stock harus diisi");
      return false;
    }
    if (typeStock === null || typeStock === "") {
      alert("Type stock harus diisi");
      return false;
    }
    if (priceStock === null || priceStock === "") {
      alert("Price stock harus diisi");
      return false;
    }
    return true;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col py-32 min-h-screen text-center px-12">
        <h1>Daftar Stock</h1>
        <div className="h-12" />
        <button
          className="border border-dark_green py-1 px-3 w-1/4 hover:bg-dark_green/25 hover:text-white self-end"
          onClick={() => setManage("add")}
        >
          Tambah Stock
        </button>
        <div className="h-4" />
        <table className="table-auto border-collapse border border-dark_green">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-dark_green">
                Kode Barang
              </th>
              <th className="px-4 py-2 border border-dark_green">Nama</th>
              <th className="px-4 py-2 border border-dark_green">
                Jenis Barang
              </th>
              <th className="px-4 py-2 border border-dark_green">Stok</th>
              <th className="px-4 py-2 border border-dark_green">Harga</th>
              <th className="px-4 py-2 border border-dark_green">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length === 0 ? (
              <tr>
                <td className="px-4 py-2" colSpan="5">
                  Tidak ada data
                </td>
              </tr>
            ) : null}
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td className="px-4 py-2 border border-dark_green">
                  {stock.ID}
                </td>
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
                <td className="px-4 py-2 flex border-y-[0.1px] border-dark_green">
                  <button
                    className="border border-dark_green rounded-md py-1 px-3 w-full hover:bg-dark_green/25 hover:text-white"
                    onClick={() => deleteStock(stock.ID)}
                  >
                    Delete
                  </button>
                  <div className="w-4"></div>
                  <button
                    className="border border-dark_green rounded-md py-1 px-3 w-full hover:bg-dark_green/25 hover:text-white"
                    onClick={
                      () => tapEdit(stock.ID)
                      //   {
                      //   setIdStock(stock.ID);
                      //   setNameStock(stock.name_stock);
                      //   setUnitStock(stock.unit_stock);
                      //   setTotalStock(stock.total_stock);
                      //   setTypeStock(stock.type_stock);
                      //   setPriceStock(stock.price_stock);
                      //   setManage("edit");
                      // }
                    }
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
                    value={idStock}
                    onChange={(e) => setIdStock(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Nama Barang</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={nameStock}
                onChange={(e) => setNameStock(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Satuan Barang</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={unitStock}
                onChange={(e) => setUnitStock(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Jumlah Barang</label>
              <input
                type="number"
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={totalStock}
                onChange={(e) => setTotalStock(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Jenis Barang</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={typeStock}
                onChange={(e) => setTypeStock(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Harga Barang</label>
              <input
                type="number"
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={priceStock}
                onChange={(e) => setPriceStock(e.target.value)}
              />
            </div>
            <div className="h-8" />
            <button
              className="border border-dark_green rounded-md py-1 px-3 w-1/2 hover:bg-dark_green/25 hover:text-white"
              onClick={() =>
                manage === "add" ? addStock() : updateStock(idStock)
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
