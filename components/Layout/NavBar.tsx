import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// third party
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import Button from "antd/lib/button";
import message from "antd/lib/message";
// utills
import { isAuth, removeCookie } from "utils/auth";
// context
import { AuthContext } from "context/AuthContext";
// components
import { LoginModal } from "components/Auth/Login";
import { RegisterModal } from "components/Auth/Register";

const NavBar = () => {
  const { setShowLogin, setShowRegister } = useContext(AuthContext);
  const router = useRouter();
  const handleLogout = () => {
    removeCookie("token");
    message.success("Successfully logged out");
    router.push("/");
  };

  return (
    <>
      <div className="bg-gray-900/50  sm:px-20 px-3 fixed inset-x-0 top-0 items-center z-50 h-12 transition duration-1000 ease-in-out flex justify-between">
        <Link href={"/"} className="text-2xl text-primary pb-2">
          <HomeOutlined />
        </Link>
        <div className="flex sm:gap-5 gap-2 z-20">
          {isAuth() ? (
            <>
              <Button href="/tasks" type="primary" shape="round">
                Tasks
              </Button>
              <Button onClick={handleLogout} type="link" shape="round">
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
