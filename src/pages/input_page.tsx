// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Footer from "../layouts/footer";
// import Navbar from "../layouts/navbar";

// interface Input {
//   ID: number;
//   date_transaction: string;
//   id_input: number;
//   type_transaction: string;
// }



// export default function InputPage() {
//   const [inputs, setInputs] = useState<Input[]>([]);
//   const [manage, setManage] = useState<any>(null);

//   const [idInput, setIdInput] = useState(null);
//   const [dateInput, setDateInput] = useState(null);
//   const [codeInput, setCodeInput] = useState(null);
//   const [nameInput, setNameInput] = useState(null);
//   const [typeInput, setTypeInput] = useState(null);
//   const [totalInput, setTotalInput] = useState(null);
//   const [priceInput, setPriceInput] = useState(null);

//   useEffect(() => {
//     getInputs();
//   }, []);

//   const getInputs = async () => {
//     const response = await axios.get("http://localhost:8080/api/input");
//     if (response.status === 200) setInputs(response.data.data);
//     else alert("Input gagal diambil");
//   };

//   const addInput = async () => {
//     if (!validateInput()) return;
//     const response = await axios.post("http://localhost:8080/api/input", {
//       ID: null,
//       date_input: dateInput,
//       code_product: parseInt(codeInput!),
//       name_product: nameInput,
//       type_product: typeInput,
//       total_production: parseInt(totalInput!),
//       price_product: parseInt(priceInput!),
//     });
//     if (response.status === 201) {
//       alert("Input berhasil ditambahkan");
//       getInputs();
//     } else alert("Input gagal ditambahkan");
//     closeManage();
//   };

//   const updateOder = async (idProps: number) => {
//     if (!validateInput()) return;
//     const response = await axios.put(
//       `http://localhost:8080/api/input/${idProps}`,
//       {
//         ID: parseInt(idInput!),
//         date_input: dateInput,
//         code_product: parseInt(codeInput!),
//         name_product: nameInput,
//         type_product: typeInput,
//         total_production: parseInt(totalInput!),
//         price_product: parseInt(priceInput!),
//       }
//     );
//     if (response.status === 200) {
//       alert("Input berhasil diupdate");
//       getInputs();
//     } else alert("Input gagal diupdate");
//     closeManage();
//   };

//   const deleteInput = async (idProps: number) => {
//     const response = await axios.delete(
//       `http://localhost:8080/api/input/${idProps}`
//     );
//     if (response.status === 200) {
//       alert("Input berhasil dihapus");
//       getInputs();
//     } else alert("Input gagal dihapus");
//   };

//   const closeManage = () => {
//     setIdInput(null);
//     setDateInput(null);
//     setCodeInput(null);
//     setNameInput(null);
//     setTypeInput(null);
//     setTotalInput(null);
//     setPriceInput(null);
//     setManage(null);
//   };

//   const validateInput = () => {
//     if (dateInput === null || dateInput === "") {
//       alert("Tanggal Transaksi harus diisi");
//       return false;
//     }
//     if (codeInput === null || codeInput === "") {
//       alert("Kode Produk harus diisi");
//       return false;
//     }
//     if (nameInput === null || nameInput === "") {
//       alert("Nama Produk harus diisi");
//       return false;
//     }
//     if (typeInput === null || typeInput === "") {
//       alert("Tipe Produk harus diisi");
//       return false;
//     }
//     if (totalInput === null || totalInput === "") {
//       alert("Total Produksi harus diisi");
//       return false;
//     }
//     if (priceInput === null || priceInput === "") {
//       alert("Harga Produk harus diisi");
//       return false;
//     }
//     return true;
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col py-32 min-h-screen text-center px-12">
//         <h1>Daftar Input</h1>
//         <div className="h-12" />
//         <button
//           className="binput binput-dark_green py-1 px-3 w-1/4 hover:bg-dark_green/25 hover:text-white self-end"
//           // onClick={() => setManage("add")}
//           onClick={() => setManage("add")}
//         >
//           Tambah Input
//         </button>
//         <div className="h-4" />
//         <table className="table-auto binput binput-dark_green">
//           <thead>
//             <tr>
//               <th className="binput binput-dark_green px-4 py-2">
//                 Tanggal Transaksi
//               </th>
//               <th className="binput binput-dark_green px-4 py-2">
//                 Purchase Input
//               </th>
//               <th className="binput binput-dark_green px-4 py-2">Name Input</th>
//               <th className="binput binput-dark_green px-4 py-2">Status</th>
//               <th className="binput binput-dark_green px-4 py-2">Aksi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {inputs.length === 0 ? (
//               <tr>
//                 <td
//                   className="binput binput-dark_green px-4 py-2 text-center"
//                   colSpan={5}
//                 >
//                   Tidak ada data
//                 </td>
//               </tr>
//             ) : null}
//             {inputs.map((input: Input) => (
//               <tr key={input.ID}>
//                 <td className="binput binput-dark_green px-4 py-2">
//                   {input.date_transaction}
//                 </td>
//                 <td className="binput binput-dark_green px-4 py-2">
//                   {input.ID}
//                 </td>
//                 <td className="binput binput-dark_green px-4 py-2">
//                   {input.input.name_input}
//                 </td>
//                 <td className="binput binput-dark_green px-4 py-2">
//                   {input.type_transaction}
//                 </td>
//                 <td className="binput-y-[0.1px] binput-dark_green px-4 py-2 flex flex-row">
//                   <button
//                     className="binput binput-dark_green rounded-md py-1 px-3 w-full hover:bg-dark_green/25 hover:text-white"
//                     onClick={() => deleteInput(input.ID)}
//                   >
//                     Delete
//                   </button>
//                   <div className="w-4"></div>
//                   <button
//                     className="binput binput-dark_green rounded-md py-1 px-3 w-full hover:bg-dark_green/25 hover:text-white"
//                     onClick={() => {
//                       setIdInput(input.ID);
//                       setDateTransaction(input.date_transaction);
//                       setIdInput(input.id_input);
//                       setTypeTransaction(input.type_transaction);
//                       setManage("edit");
//                     }}
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {manage !== null ? (
//           <div className="w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-[1] flex flex-col justify-center items-center bg-white rounded-md shadow-md binput binput-dark_green px-10 py-10">
//             <button
//               className="absolute top-4 right-4 text-red-500"
//               onClick={() => closeManage()}
//             >
//               X
//             </button>
//             <label className="text-2xl">
//               {manage === "add"
//                 ? "Tambah Input"
//                 : manage === "edit"
//                 ? "Ubah Input"
//                 : "Input"}
//             </label>
//             {manage === "add" ? null : (
//               <>
//                 <div className="h-4" />
//                 <div className="flex flex-col w-1/2">
//                   <label className="text-left">ID Input</label>
//                   <input
//                     className="binput binput-dark_green rounded-md py-1 px-3 w-full"
//                     type="number"
//                     value={idInput}
//                     onChange={(e) => setIdInput(e.target.value)}
//                   />
//                 </div>
//               </>
//             )}
//             <div className="h-4" />
//             <div className="flex flex-col w-1/2">
//               <label className="text-left">Tanggal Transaksi</label>
//               <input
//                 className="binput binput-dark_green rounded-md py-1 px-3 w-full"
//                 value={dateTransaction}
//                 onChange={(e) => setDateTransaction(e.target.value)}
//               />
//             </div>
//             <div className="h-4" />
//             <div className="flex flex-col w-1/2">
//               <label className="text-left">Input</label>
//               <select
//                 className="binput binput-dark_green rounded-md py-1 px-3 w-full"
//                 defaultValue={inputs[0].ID}
//                 value={idInput}
//                 onChange={(e) => setIdInput(e.target.value)}
//               >
//                 {inputs.map((input) => (
//                   <option key={input.ID} value={input.ID} selected={input.ID}>
//                     {input.name_input}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="h-4" />
//             <div className="flex flex-col w-1/2">
//               <label className="text-left">Status</label>
//               <input
//                 className="binput binput-dark_green rounded-md py-1 px-3 w-full"
//                 value={typeTransaction}
//                 onChange={(e) => setTypeTransaction(e.target.value)}
//               />
//             </div>
//             <div className="h-4" />
//             <button
//               className="binput binput-dark_green rounded-md py-1 px-3 w-1/2 hover:bg-dark_green/25 hover:text-white"
//               onClick={() =>
//                 manage === "add" ? addInput() : updateOder(idInput)
//               }
//             >
//               {manage === "add"
//                 ? "Tambah"
//                 : manage === "edit"
//                 ? "Ubah"
//                 : "Simpan"}
//             </button>
//           </div>
//         ) : null}
//       </div>
//       <Footer />
//     </>
//   );
// }
