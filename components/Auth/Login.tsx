import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
// third party
import Modal from "antd/lib/modal";
import Form from "antd/lib/form";
import Spin from "antd/lib/spin";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Divider from "antd/lib/divider";
import message from "antd/lib/message";
import cookie from "js-cookie";
// context
import { AuthContext } from "context/AuthContext";
import { APIWithoutAuth } from "utils/api";
import { saveUserAndToken } from "utils/auth";
const LoginModal = () => {
  const { showLogin, setShowLogin } = useContext(AuthContext);

  return (
    <Modal
      open={showLogin}
      onCancel={() => {
        setShowLogin(false);
      }}
      footer={null}
      className="w-full m-auto max-w-md"
      maskClosable={false}
    >
      <Login />
    </Modal>
  );
};

const Login = () => {
  const { setShowLogin, setShowRegister, setUser, showLogin } =
    useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (showLogin) {
      const email = String(window.localStorage.getItem("emailForSignIn") || "");
      setEmail(email);
    }
  }, [showLogin]);

  useEffect(() => {
    form.setFieldsValue({
      email: email?.toLowerCase().trim(),
    });
    //eslint-disable-next-line
  }, [email]);

  useEffect(() => {
    form.setFieldsValue({
      password,
    });
    //eslint-disable-next-line
  }, [password]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { email, password} = form.getFieldsValue();
      const {data} = await APIWithoutAuth.post("/users/login",{email, password});
      const existingUser = data.data;
      setUser(existingUser);
      saveUserAndToken(existingUser, existingUser.token);
      setShowLogin(false);
      form.resetFields();
      message.success("Login success.");
      router.push("/tasks");
    } catch (err: any) {
      console.log(err?.response?.data?.message);
      message.error(err?.message);
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
            Sign In
          </Button>
        </Form>
        <Divider />
        <div className="flex items-center justify-center">
          <div className="mr-2">{"Don't have an account?"}</div>
          <Button
            type="link"
            className="p-0 m-0"
            onClick={() => {
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
export { LoginModal, Login };
