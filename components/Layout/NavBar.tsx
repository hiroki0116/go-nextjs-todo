import {useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// third party
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import Button from "antd/lib/button";
// utills
// context
import { AuthContext } from "context/AuthContext";
// components
import { LoginModal } from "components/Auth/Login";
import { RegisterModal } from "components/Auth/Register";

const NavBar = () => {
  const { setShowLogin, setShowRegister, isLoggedin, handleLogout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <div className="bg-gray-900/50  sm:px-20 px-3 fixed inset-x-0 top-0 items-center z-50 h-12 transition duration-1000 ease-in-out flex justify-between">
        <Link href={"/"} className="text-2xl text-primary pb-2">
          <HomeOutlined className="cursor-pointer hover:scale-150 transition duration-300 transform ease-in-out"/>
        </Link>
        <div className="flex sm:gap-5 gap-2 z-20">
          {isLoggedin ? (
            <>
              <Button type="primary" shape="round" onClick={()=>{router.push('/tasks')}}>
                Tasks
              </Button>
              <Button onClick={handleLogout} shape="round">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setShowRegister(true)}
                type="primary"
                shape="round"
              >
                Register
              </Button>
              <Button
                onClick={() => setShowLogin(true)}
                type="primary"
                shape="round"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default NavBar;
