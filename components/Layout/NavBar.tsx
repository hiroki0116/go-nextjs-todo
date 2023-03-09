import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// third party
import Alert from "antd/lib/alert";
import BuildFilled from "@ant-design/icons/BuildFilled";
import Button from "antd/lib/button";
import Marquee from "react-fast-marquee";
// context
import { AuthContext } from "context/AuthContext";
// components
import { LoginModal } from "components/Auth/Login";
import { RegisterModal } from "components/Auth/Register";

const NavBar = () => {
  const { setShowLogin, setShowRegister, isLoggedin, handleLogout } =
    useContext(AuthContext);
  const router = useRouter();
  return (
    <>
      <div className="bg-gray-900/50 sm:px-20 px-3 items-center z-50 h-12 transition duration-1000 ease-in-out flex justify-between">
        <Link href={"/"} className="text-2xl text-primary">
          <div className="flex flex-col ">
            <BuildFilled className="self-center cursor-pointer hover:scale-150 transition duration-300 transform ease-in-out" />
            <div className="text-xs font-extrabold">TaskGO</div>
          </div>
        </Link>
        <div className="flex sm:gap-5 gap-2 z-20">
          {isLoggedin ? (
            <>
              <Button
                type="primary"
                shape="round"
                onClick={() => {
                  router.push("/tasks");
                }}
              >
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
      <Alert
        banner
        className=""
        message={
          <Marquee
            pauseOnHover
            gradient={false}
            className="font-montserrat"
            speed={150}
          >
            This program is running on a low budget, so please allow 30 seconds
            for the server to start up <span className="text-lg">☕</span>
          </Marquee>
        }
      />
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default NavBar;
