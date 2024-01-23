import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import { useReactToPrint } from "react-to-print";
import { DetailOrder, User } from "../../interface/interface";

export default function ReportOrderPage() {
  const [detailOrders, setDetailOrders] = useState<DetailOrder[]>([]);
  const conponentPDF = React.useRef<HTMLTableElement>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const startDate = window.location.pathname.split("/")[2];
    const endDate = window.location.pathname.split("/")[3];

    getDetailOrders(
      startDate ? startDate : "2021-09-01",
      endDate ? endDate : "2021-09-30"
    );
    // fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user-login");
      if (res.status === 200) setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailOrders = async (startDate: string, endDate: string) => {
    await axios
      .get(
        `http://localhost:8080/api/date/order/?date-start=${startDate}&date-end=${endDate}`
      )
      .then((res) => {
        if (res.status === 200) setDetailOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePrint = useReactToPrint({
    content: () => conponentPDF.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 12mm 12mm 12mm 12mm;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
      }
    `,
    documentTitle: "Laporan Pemesanan Barang",
    onAfterPrint: () => alert("Data tersimpan"),
  });

  return (
    <BaseLayout padding={12} text_color="stone_5">
      <div id="printTable" ref={conponentPDF}>
        <HeaderPage withLogo={true}>LAPORAN PEMESANAN BAHAN BAKU</HeaderPage>
        <div className="h-16" />
        <div className="flex justify-end">
          <button
            className="border border-dark_green w-max px-12 bg-white"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
        <div className="h-8" />
        <table className="table-auto text-center text-white bg-green shadow-md w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-dark_green">
                Purchase Order
              </th>
              <th className="px-4 py-2 border border-dark_green">Nama</th>
              <th className="px-4 py-2 border border-dark_green">
                Jenis Barang
              </th>
              <th className="px-4 py-2 border border-dark_green">Stok</th>
              <th className="px-4 py-2 border border-dark_green">User</th>
              <th className="px-4 py-2 border border-dark_green">Harga</th>
            </tr>
          </thead>
          <tbody className="border border-dark_green bg-white text-stone_5">
            {detailOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-2 border border-dark_green">
                  Tidak ada data
                </td>
              </tr>
            ) : null}
            {detailOrders.map((detailOrder, index) => (
              <tr key={index}>
                <td className="border-x border-dark_green">
                  {detailOrder.order.purchase_order}
                </td>
                <td className="border-x border-dark_green">
                  {detailOrder.name_product}
                </td>
                <td className="border-x border-dark_green">
                  {detailOrder.type_product}
                </td>
                <td className="border-x border-dark_green">
                  {detailOrder.total_product}
                </td>
                <td className="border-x border-dark_green">
                  {detailOrder.order.user.name_user}
                </td>
                <td className="border-x border-dark_green">
                  {detailOrder.price_product}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4" />
        <div className="flex justify-between">
          <p className="border border-dark_green w-max px-4 bg-white">
            Jumlah Total :{" "}
            {detailOrders.reduce(
              (total, detailOrder) => total + detailOrder.total_product,
              0
            )}
          </p>
        </div>
      </div>
    </BaseLayout>
  );
}
