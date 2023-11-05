import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function UpdateOrderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="h-12" />
      <div className="flex flex-col px-8 py-12 grow text-dark_green ">
        <div className="flex w-full">
          <div className="flex-1">
            <h3 className="font-normal">Purchase Order</h3>
            <h2 className="text-[45px]">PO-0001</h2>
            <p>Prama Textile</p>
            <p>IS001</p>
            <p>Jl. Kamboja, Kec. Denpasar Tim., Kota Denpasar</p>
            <p>081238772950</p>
          </div>
          <div className="flex-1">
            <div className="flex">
              <p>Status Pembayaran</p>
              <div className="w-8" />
              <select name="status" id="status">
                <option value="paid">Lunas</option>
                <option value="unpaid">Menunggu</option>
              </select>
            </div>
            <div className="flex">
              <p>Tanggal Transaksi</p>
              <div className="w-8" />
              <p>23/06/2023</p>
            </div>
            <div className="flex">
              <p>Jenis Pembayaran</p>
              <div className="w-8" />
              <p>Tunai</p>
            </div>
          </div>
        </div>
        <div className="h-12" />
        <p>Pesanan</p>
        <table className="table-auto">
          <thead className="border-y w-full border-neutral-500">
            <tr>
              <th className="px-4 py-2 text-start">Kode Barang</th>
              <th className="px-4 py-2 text-start">Nama</th>
              <th className="px-4 py-2 text-start">Satuan</th>
              <th className="px-4 py-2 text-start">Jumlah</th>
              <th className="px-4 py-2 text-start">Harga Satuan</th>
              <th className="px-4 py-2 text-start">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">IS001</td>
                <td className="px-4 py-2">Kaos Oblong</td>
                <td className="px-4 py-2">Pcs</td>
                <td className="px-4 py-2">100</td>
                <td className="px-4 py-2">Rp. 25.000</td>
                <td className="px-4 py-2">Rp. 2.500.000</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="justify-end flex">
          <div>
            <div className="h-4" />
            <p>Total Rp.961.500</p>
            <div className="h-4" />
            <button className="border border-dark_green rounded-md py-1 px-3 hover:bg-dark_green/25 hover:text-black bg-dark_green text-white mr-16 w-min">
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
