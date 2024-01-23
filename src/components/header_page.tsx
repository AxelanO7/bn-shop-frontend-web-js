import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { User } from "../interface/interface";
import axios from "axios";

interface HeaderPageProps {
  children: React.ReactNode;
  withLogo?: boolean;
}

export default function HeaderPage({
  children,
  withLogo = false,
}: HeaderPageProps) {
  // const [user, setUser] = useState<User>();

  useEffect(() => {
    // fetchUser();
  });

  // const fetchUser = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8080/api/user-login");
  //     if (res.status === 200) setUser(res.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <h1 className="text-stone_5 font-medium text-center text-3xl bg-white rounded-md shadow-md w-full flex justify-center items-center relative py-4">
      {withLogo && (
        <img src={logo} alt="Logo" className="w-16 h-16 absolute left-4" />
      )}
      {children}
      {/* <div className="absolute right-4">
        <p className="text-sm"> {user?.name_user}</p>
      </div> */}
    </h1>
  );
}
