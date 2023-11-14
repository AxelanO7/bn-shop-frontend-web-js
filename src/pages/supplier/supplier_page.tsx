import React, { useEffect, useState } from "react";
import axios from "axios";
import Base from "../../layouts/base";

interface Supplier {
  ID: number;
  name_supplier: string;
  phone: number;
  address: string;
}

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [manage, setManage] = useState<string | null>(null);

  const [idSupplier, setIdSupplier] = useState<number | null>(null);
  const [nameSupplier, setNameSupplier] = useState<string | null>(null);
  const [phone, setPhone] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    const response = await axios.get("http://localhost:8080/api/supplier");
    if (response.status === 200) {
      setSuppliers(response.data.data);
    } else alert("Supplier gagal diambil");
  };

  const addSupplier = async () => {
    if (!validateSupplier()) return;
    const response = await axios.post("http://localhost:8080/api/supplier", {
      ID: null,
      name_supplier: nameSupplier,
      phone: phone === 0 ? null : phone,
      address: address,
    });
    if (response.status === 201) {
      alert("Supplier berhasil ditambahkan");
      getSuppliers();
    } else alert("Supplier gagal ditambahkan");
    closeManage();
  };

  const updateSupplier = async (idProps: number) => {
    if (!validateSupplier()) return;
    const response = await axios.put(
      `http://localhost:8080/api/supplier/${idProps}`,
      {
        ID: idProps,
        name_supplier: nameSupplier,
        phone: phone,
        address: address,
      }
    );
    if (response.status === 200) {
      alert("Supplier berhasil diupdate");
      getSuppliers();
    } else alert("Supplier gagal diupdate");
    closeManage();
  };

  const deleteSupplier = async (idProps: string) => {
    const response = await axios.delete(
      `http://localhost:8080/api/supplier/${idProps}`
    );
    if (response.status === 200) {
      alert("Supplier berhasil dihapus");
      getSuppliers();
    } else alert("Supplier gagal dihapus");
  };

  const closeManage = () => {
    setIdSupplier(null);
    setNameSupplier(null);
    setPhone(null);
    setAddress(null);
    setManage(null);
  };

  const validateSupplier = () => {
    if (nameSupplier === null || nameSupplier === "") {
      alert("Nama supplier tidak boleh kosong");
      return false;
    } else if (phone === null || phone === 0) {
      alert("Telepon tidak boleh kosong");
      return false;
    } else if (address === null || address === "") {
      alert("Alamat tidak boleh kosong");
      return false;
    }
    return true;
  };

  return (
    <Base>
      <div className="flex flex-col justify-center p-12">
        <h1>Daftar Supplier</h1>
        <div className="h-12" />
        <button
          className="border border-dark_green py-1 px-3 w-1/4 hover:bg-dark_green/25 hover:text-white self-end"
          onClick={() => setManage("add")}
        >
          Tambah Supplier
        </button>
        <div className="h-4" />
        <table className="table-auto border-collapse border border-dark_green">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-dark_green">
                ID Supplier
              </th>
              <th className="px-4 py-2 border border-dark_green">
                Nama Supplier
              </th>
              <th className="px-4 py-2 border border-dark_green">Telepon</th>
              <th className="px-4 py-2 border border-dark_green">Alamat</th>
              <th className="px-4 py-2 border border-dark_green">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td className="px-4 py-2" colSpan={5}>
                  Tidak ada data
                </td>
              </tr>
            ) : null}
            {suppliers.map((supplier) => (
              <tr key={supplier.ID}>
                <td className="px-4 py-2 border border-dark_green">
                  {supplier.ID}
                </td>
                <td className="px-4 py-2 border border-dark_green">
                  {supplier.name_supplier}
                </td>
                <td className="px-4 py-2 border border-dark_green">
                  {supplier.phone}
                </td>
                <td className="px-4 py-2 border border-dark_green">
                  {supplier.address}
                </td>
                <td className="px-4 py-2 flex border-y-[0.1px] border-dark_green">
                  <button
                    className="border border-dark_green rounded-md py-1 px-3 w-full hover:bg-dark_green/25 hover:text-white"
                    onClick={() => deleteSupplier(supplier.ID.toString())}
                  >
                    Delete
                  </button>
                  <div className="w-4"></div>
                  <button
                    className="border border-dark_green rounded-md py-1 px-3 w-full hover:bg-dark_green/25 hover:text-white"
                    onClick={() => {
                      setIdSupplier(supplier.ID);
                      setNameSupplier(supplier.name_supplier);
                      setPhone(supplier.phone);
                      setAddress(supplier.address);
                      setManage("edit");
                    }}
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
                ? "Tambah Supplier"
                : manage === "edit"
                ? "Ubah Supplier"
                : "Supplier"}
            </label>
            {manage === "add" ? null : (
              <>
                <div className="h-4" />
                <div className="flex flex-col w-1/2">
                  <label className="text-left">ID Supplier</label>
                  <input
                    className="border border-dark_green rounded-md py-1 px-3 w-full"
                    type="number"
                    value={idSupplier!}
                    onChange={(e) => setIdSupplier(parseInt(e.target.value))}
                  />
                </div>
              </>
            )}
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Nama Supplier</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={nameSupplier!}
                onChange={(e) => setNameSupplier(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Telepon</label>
              <input
                type="number"
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={phone!}
                onChange={(e) => setPhone(parseInt(e.target.value))}
              />
            </div>
            <div className="h-4" />
            <div className="flex flex-col w-1/2">
              <label className="text-left">Alamat</label>
              <input
                className="border border-dark_green rounded-md py-1 px-3 w-full"
                value={address!}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <button
              className="border border-dark_green rounded-md py-1 px-3 w-1/2 hover:bg-dark_green/25 hover:text-white"
              onClick={() =>
                manage === "add" ? addSupplier() : updateSupplier(idSupplier!)
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
    </Base>
  );
}
