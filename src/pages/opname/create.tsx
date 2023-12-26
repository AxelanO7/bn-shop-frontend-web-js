import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../../layouts/base";
import HeaderPage from "../../components/header_page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Stock {
  ID: number | null;
  code_product: string;
  name_product: string;
  unit_product: string;
  total_product: number;
  type_product: string;
  price_product: number;
}

interface Opname {
  ID: number | null;
  code_stock_opname: string;
  date_calculate: string;
}

interface DetailOpname {
  ID: number | null;
  id_opname: number;
  opname: Opname;
  code_product: string;
  name_finished: string;
  unit_product: string;
  type_product: string;
  price_unit: number;
  stock_real: number;
  stock_system: number;
  total_diff: number;
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
  name_finished: string;
  unit_product: string;
  total_used: number;
  type_product: string;
  price_unit: number;
}

export default function CreateOpname() {
  const [stocksOpnames, setStocksOpname] = useState<Stock[]>([]);
  const [stocksOpnameTemp, setStocksOpnameTemp] = useState<Stock[]>([]);
  const [opnames, setOpnames] = useState<Opname[]>([]);

  // order
  const [dateTransaction, setDateTransaction] = useState<string>();
  const [codeStockOpname, setCodeStockOpname] = useState<string>();

  const [lastIdOpname, setLastIdOpname] = useState<number>(0);

  // const [totalPrice, setTotalPrice] = useState<number>();

  const [maxTotals, setMaxTotals] = useState<number[]>([]);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    await axios
      .get("http://localhost:8080/api/paid/finished")
      .then((response) => {
        setStocksOpname(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal mendapatkan data");
      });

    await axios
      .get("http://localhost:8080/api/stock-opname")
      .then((response) => {
        setLastIdOpname(response.data.data[response.data.data.length - 1].ID);
      })
      .catch((error) => {
        console.log(error);
        alert("Gagal mendapatkan data");
      });
    setCodeStockOpname("OP" + (lastIdOpname + 1).toString().padStart(4, "0"));
  };

  const validateOpname = () => {
    if (!dateTransaction || !codeStockOpname) return false;
    return true;
  };

  const createOpname = async () => {
    // console.log(
    //   "stocksOpnameTemp",
    //   stocksOpnameTemp.map(
    //     (stockFinishedT): DetailOpname => ({
    //       ID: null,
    //       id_output: 0,
    //       output: {
    //         ID: 0,
    //         code_stock_opname: codeStockOpname || "",
    //         date_calculate: dateTransaction || "",
    //       },
    //       code_product: stockFinishedT.code_product,
    //       name_finished: stockFinishedT.name_product,
    //       unit_product: stockFinishedT.unit_product,
    //       stock_real: stockFinishedT.total_product,
    //       stock_system: maxTotals[stocksOpnameTemp.indexOf(stockFinishedT)],
    //       total_diff:
    //         maxTotals[stocksOpnameTemp.indexOf(stockFinishedT)] -
    //         stockFinishedT.total_product,
    //       type_product: stockFinishedT.type_product,
    //       price_unit: stockFinishedT.price_product,
    //     })
    //   )
    // );

    const resOpname = await axios.post(
      "http://localhost:8080/api/stock-opname",
      {
        ID: null,
        code_stock_opname: codeStockOpname || "",
        date_calculate: dateTransaction || "",
      }
    );
    if (resOpname.status !== 201) {
      alert("Order gagal ditambahkan");
      return;
    }

    const resDetail = await axios.post(
      "http://localhost:8080/api/stock-opnames",
      stocksOpnameTemp.map(
        (stockFinishedT): DetailOpname => ({
          ID: null,
          id_opname: resOpname.data.data.ID,
          opname: {
            ID: resOpname.data.data.ID,
            code_stock_opname: codeStockOpname || "",
            date_calculate: dateTransaction || "",
          },
          code_product: stockFinishedT.code_product,
          name_finished: stockFinishedT.name_product,
          unit_product: stockFinishedT.unit_product,
          stock_real: stockFinishedT.total_product,
          stock_system: maxTotals[stocksOpnameTemp.indexOf(stockFinishedT)],
          total_diff:
            maxTotals[stocksOpnameTemp.indexOf(stockFinishedT)] -
            stockFinishedT.total_product,
          type_product: stockFinishedT.type_product,
          price_unit: stockFinishedT.price_product,
        })
      )
    );
    if (resDetail.status !== 201) {
      alert("Detail order gagal ditambahkan");
      return;
    }

    const resAdjustStock = await axios.put(
      "http://localhost:8080/api/stock-opnames",
      stocksOpnameTemp.map(
        (stockFinishedT): DetailOutput => ({
          ID: null,
          id_output: resOpname.data.data.ID,
          output: {
            ID: resOpname.data.data.ID,
            date_output: dateTransaction || "",
            no_output: codeStockOpname || "",
          },
          code_product: stockFinishedT.code_product,
          name_finished: stockFinishedT.name_product,
          unit_product: stockFinishedT.unit_product,
          total_used: stockFinishedT.total_product,
          type_product: stockFinishedT.type_product,
          price_unit: stockFinishedT.price_product,
        })
      )
    );
    if (resAdjustStock.status !== 201) {
      alert("Order gagal ditambahkan");
      return;
    }
    alert("Order berhasil ditambahkan");
    window.location.href = "/stock";
    // handleTotalPrice();
  };

  const addStockList = () => {
    if (!validateOpname()) {
      alert("Silahkan isi form stok opname terlebih dahulu");
      return;
    }
    setOpnames([
      ...opnames,
      {
        ID: null,
        code_stock_opname: codeStockOpname || "",
        date_calculate: dateTransaction || "",
      },
    ]);

    setStocksOpnameTemp([
      ...stocksOpnameTemp,
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
    setMaxTotals([
      ...maxTotals.slice(0, index),
      ...maxTotals.slice(index + 1, maxTotals.length),
    ]);
    stocksOpnameTemp.splice(index, 1);
    setStocksOpnameTemp([...stocksOpnameTemp]);
    // handleTotalPrice();
  };

  // const handleTotalPrice = () => {
  //   setTotalPrice(
  //     stocksOpnameTemp.reduce(
  //       (total, item) => total + item.total_product * item.price_product,
  //       0
  //     )
  //   );
  // };

  return (
    <BaseLayout padding={12}>
      <HeaderPage>FORM STOK OPNAME</HeaderPage>
      <div className="h-12" />
      <div className="border border-dark_green rounded-2xl w-full py-8 bg-white">
        <div className="flex flex-col px-12">
          <div className="flex space-x-4  text-stone_5">
            <div className="flex-1 flex-col items-center space-y-6">
              <div className="flex items-center">
                <label>Tanggal Penghitungan</label>
                {/* <input
                  type="date"
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  onChange={(e) => setDateTransaction(e.target.value)}
                /> */}
                <DatePicker
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60"
                  selected={new Date(dateTransaction || Date.now())}
                  onChange={(date) =>
                    setDateTransaction(date?.toString().split("T")[0])
                  }
                  dateFormat="dd-MM-yyyy"
                />
              </div>
            </div>
            <div className="flex-1 flex-col items-center space-y-6">
              <div className="flex items-center">
                <label>Kode Stok Opname</label>
                <input
                  className="border border-dark_green rounded-md py-1 px-3 ml-4 w-60 bg-white"
                  value={"OP" + (lastIdOpname + 1).toString().padStart(4, "0")}
                  disabled
                  // onChange={(e) => setCodeStockOpname(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-4" />
        <div className="bg-green my-4 py-2">
          <p className="text-center text-white">Daftar barang opname</p>
        </div>
        <table className="table-auto text-center text-white bg-green w-full">
          <thead className="border-b border-dark_green">
            <tr>
              <th className="px-4 py-2">Nama Barang</th>
              <th className="px-4 py-2">Stok Real</th>
              <th className="px-4 py-2">Stok Sistem</th>
              <th className="px-4 py-2">Selisih</th>
              <th />
            </tr>
          </thead>
          <tbody className="border border-dark_green bg-white text-stone_5">
            {stocksOpnameTemp.length === 0 && (
              <tr>
                <td colSpan={8} className="py-2">
                  Tidak ada data
                </td>
              </tr>
            )}
            {stocksOpnameTemp.map((stockRawT, index) => (
              <tr key={stockRawT.ID} className="border-b border-dark_green">
                <td className="px-4 py-2">
                  <input
                    list="items"
                    className="border border-dark_green rounded-md py-1 px-3 text-center"
                    onChange={(e) => {
                      const stock = stocksOpnames.find(
                        (stock) => stock.name_product === e.target.value
                      );
                      if (!stock) return;
                      stockRawT.code_product = stock.code_product;
                      stockRawT.name_product = stock.name_product;
                      stockRawT.unit_product = stock.unit_product;
                      stockRawT.type_product = stock.type_product;
                      stockRawT.price_product = stock.price_product;
                      stockRawT.total_product = stock.total_product;
                      setStocksOpnameTemp([...stocksOpnameTemp]);
                      setMaxTotals([...maxTotals, stock.total_product]);
                      // handleTotalPrice();
                    }}
                  />
                  <datalist
                    id="items"
                    className="rounded-md py-1 px-3 text-center"
                  >
                    <option disabled selected>
                      Pilih Barang
                    </option>
                    {stocksOpnames.map((stockOpname) => (
                      <option value={stockOpname.name_product} />
                    ))}
                  </datalist>
                </td>
                <td className="px-4 py-2">
                  <input
                    className="border border-dark_green rounded-md py-1 px-3 text-center"
                    type="number"
                    min={0}
                    onChange={(e) => {
                      const totalItem: number = parseFloat(e.target.value);
                      stockRawT.total_product = totalItem;
                      setStocksOpnameTemp([...stocksOpnameTemp]);
                    }}
                  />
                </td>

                <td className="px-4 py-2">
                  <p className="py-1 px-3 w-full text-center">
                    {maxTotals[index] || "-"}
                  </p>
                </td>
                <td className="px-4 py-2">
                  <p className="py-1 px-3 w-full text-center">
                    {maxTotals[index] - stockRawT.total_product || "-"}
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
        </div>
        <button
          className="border border-dark_green rounded-md py-1 px-3 hover:bg-dark_green/25 hover:text-black bg-dark_green text-white mr-16 float-right"
          onClick={createOpname}
        >
          Ajukan
        </button>
      </div>
    </BaseLayout>
  );
}
