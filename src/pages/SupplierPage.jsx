import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [manage, setManage] = useState(false);

  const [idSupplier, setIdSupplier] = useState(0);
  const [nameSupplier, setNameSupplier] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    const response = await axios.get("http://localhost:8080/api/supplier");
    setSuppliers(response.data.data);
  };

  const addSupplier = async () => {
    const response = await axios.post("http://localhost:8080/api/supplier", {
      ID: null,
      name_supplier: nameSupplier,
      phone: parseInt(phone),
      address: address,
    });
    if (response.status === 201) {
      alert("Supplier berhasil ditambahkan");
      getSuppliers();
    } else {
      alert("Supplier gagal ditambahkan");
    }
  };

  const updateSupplier = async (id) => {
    const response = await axios.put(
      `http://localhost:8080/api/supplier/${id}`,
      {
        ID: parseInt(id),
        name_supplier: nameSupplier,
        phone: parseInt(phone),
        address: address,
      }
    );
    if (response.status === 200) {
      alert("Supplier berhasil diupdate");
      getSuppliers();
    } else {
      alert("Supplier gagal diupdate");
    }
  };

  const deleteSupplier = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/supplier/${id}`
    );
    if (response.status === 200) {
      alert("Supplier berhasil dihapus");
      getSuppliers();
    } else {
      alert("Supplier gagal dihapus");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col py-32 min-h-screen text-center px-40">
        <h1>Daftar Supplier</h1>
        <div className="h-8" />
        {manage ? (
          <div className="w-full flex flex-row justify-center">
            <div className="flex flex-col w-1/3">
              <div className="flex flex-row justify-between">
                <label>ID Supplier</label>
                <input
                  type="number"
                  className="border border-dark_green"
                  onChange={(e) => setIdSupplier(e.target.value)}
                />
              </div>
              <div className="h-4" />
              <div className="flex flex-row justify-between">
                <label>Name Supplier</label>
                <input
                  type="text"
                  className="border border-dark_green"
                  onChange={(e) => setNameSupplier(e.target.value)}
                />
              </div>
              <div className="h-4" />
              <div className="flex flex-row justify-between">
                <label>Telepon</label>
                <input
                  type="number"
                  className="border border-dark_green"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="h-4" />
              <div className="flex flex-row justify-between">
                <label>Alamat</label>
                <input
                  type="text"
                  className="border border-dark_green"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="w-12" />
            <div className="flex flex-col justify-between w-min">
              <button
                className="border border-dark_green rounded-md py-1 px-3"
                onClick={() => addSupplier()}
              >
                Tambah
              </button>
              <button
                className="border border-dark_green rounded-md py-1 px-3"
                onClick={() => deleteSupplier(idSupplier)}
              >
                Hapus
              </button>
              <button
                className="border border-dark_green rounded-md py-1 px-3"
                onClick={() => updateSupplier(idSupplier)}
              >
                Simpan
              </button>
              <button
                className="border border-dark_green rounded-md py-1 px-3"
                onClick={() => setManage(false)}
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          <button
            className="border border-dark_green px-4 py-1 flex flex-row items-center justify-center w-min space-x-4"
            onClick={() => setManage(true)}
          >
            <p className="text-2xl">+</p>
            <p>Aksi</p>
          </button>
        )}
        <div className="h-4" />
        <table className="table-auto border border-dark_green">
          <thead>
            <tr>
              <th className="border border-dark_green px-4 py-2">
                ID Supplier
              </th>
              <th className="border border-dark_green px-4 py-2">
                Nama Supplier
              </th>
              <th className="border border-dark_green px-4 py-2">Telepon</th>
              <th className="border border-dark_green px-4 py-2">Alamat</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td className="border border-dark_green px-4 py-2">
                  {supplier.ID}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {supplier.name_supplier}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {supplier.phone}
                </td>
                <td className="border border-dark_green px-4 py-2">
                  {supplier.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
