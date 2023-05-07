import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithGoogle } from "features/auth/utils/auth";
// Third party
import message from "antd/lib/message";
import Divider from "antd/lib/divider";
import Spin from "antd/lib/spin";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import GoogleOutlined from "@ant-design/icons/GoogleOutlined";
import {
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
// utils
import { auth } from "utils/firebase";
// context
import { AuthContext } from "features/auth/store/AuthContext";
// graphql
import { FIND_USER_BY_EMAIL } from "graphql/queries/user";
import { apolloClient } from "utils/apolloClient";
import Modal from "antd/lib/modal";

type LoginProps = {
  setShowEmailInput: (showEmailInput: boolean) => void;
  inputEmail: string;
};

const LoginModal = () => {
  const { showLogin, setShowLogin } = useContext(AuthContext);

  return (
    <Modal
      open={showLogin}
      onCancel={() => {
        setShowLogin(false);
      }}
      footer={null}
      className="w-full m-auto"
      maskClosable={false}
    >
      <Login isToggle={true} />
    </Modal>
  );
};

const Login = ({ isToggle }: { isToggle?: boolean }) => {
  const { setShowLogin, setShowRegister, setUser, showLogin } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (showLogin) {
      const email = window.localStorage.getItem("emailForSignIn");
      if (email) {
        setEmail(email);
      }
    }
  }, [showLogin]);

  useEffect(() => {
    form.setFieldsValue({
      email: email.toLowerCase().trim(),
    });
    // setAttemptCount(1);
  }, [email]);

  useEffect(() => {
    form.setFieldsValue({
      password,
    });
    // eslint-disable-next-line
  }, [password]);

  const handleGoogleSignIn = () => {
    const props = {
      setLoading,
      setShowLogin,
      setUser,
      message,
      router,
    };
    signInWithGoogle(props);
  };

  const handleForgotPassword = () => {
    isToggle && setShowLogin(false);
    router.push("/auth/forgot-password");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await setPersistence(auth, browserLocalPersistence);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();
      const { data } = await apolloClient.query({
        query: FIND_USER_BY_EMAIL,
        variables: { email: user.email },
      });

      console.log(data);

      // setUser(data.data);
      // setLoading(false);
      // saveUserAndToken(data.data, idTokenResult.token);
      // form.resetFields();
      // message.success("Login success.");
      // setShowLogin(false);
      // router.push("/dashboard");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setShowLogin(false);
        setShowRegister(true);
        message.error(
          "We cannot find an account associated with this email. Please register."
        );
        return;
      }
      if (error.code === "auth/too-many-requests") {
        message.error(error.message);
        return;
      }
      message.error("Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="p-8">
        <Form form={form} className="w-full" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Not valid email" },
            ]}
            normalize={(value) => value.trim()}
          >
            <Input
              className="p-2 rounded text-16"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              disabled={loading}
              required
              data-testid="sign-in-email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              className="p-2 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              data-testid="sign-in-password"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full rounded h-auto py-2 mb-2"
            disabled={loading}
            data-testid="sign-in-submit"
          >
            Log In
          </Button>
          <div className="text-center text-gray-600">or</div>
          <Button
            className="w-full rounded-lg flex items-center"
            icon={<GoogleOutlined />}
            onClick={handleGoogleSignIn}
          >
            Log in with Google
          </Button>
        </Form>
        <Divider />
        <div className="flex items-center justify-center">
          <div className="mr-2">You do not have an account yet?</div>
          <Button
            type="link"
            className="p-0 m-0"
            onClick={async () => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export { Login, LoginModal };
