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
import GoogleOutlined from "@ant-design/icons/GoogleOutlined";
// context
import { AuthContext } from "features/auth/store/AuthContext";
import { saveUserAndToken, signInWithGoogle } from "features/auth/utils/auth";
// graphql
import { SIGN_UP } from "graphql/mutations/auth";
import { apolloClient } from "graphql/apolloClient";
import { IUser } from "models/User";
import { FIND_USER_BY_EMAIL } from "graphql/queries/user";

const RegisterModal = () => {
  const { showRegister, setShowRegister } = useContext(AuthContext);
  return (
    <Modal
      open={showRegister}
      onCancel={() => {
        setShowRegister(false);
      }}
      footer={null}
      maskClosable={false}
      className="w-full m-auto max-w-md"
      width={500}
      centered
    >
      <Register />
    </Modal>
  );
};

const Register = () => {
  const { setUser, setShowRegister, setShowLogin, showRegister } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    showRegister &&
      form.setFieldsValue({
        email: window.localStorage.getItem("emailForSignIn"),
      });
    // eslint-disable-next-line
  }, [showRegister]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { email, password, name } = values;

      const userInfo = {
        email: email.toLowerCase().trim(),
        password,
        name: name.trim(),
        firebaseId: "",
      };
      const { data } = await apolloClient.mutate<{ createUser: IUser }>({
        mutation: SIGN_UP,
        variables: { input: { ...userInfo } },
      });
      const newUser = data?.createUser;

      if (!newUser) {
        setLoading(false);
        message.error("Something went wrong. Please try again.");
        return;
      }
      setUser(newUser);
      saveUserAndToken(newUser, newUser["token"]);
      form.resetFields();
      message.success("Account created successfully.");
      setLoading(false);
      setShowRegister(false);
      router.push("/tasks");
      return;
    } catch (error: any) {
      console.log(error);
      message.error("Error in register.", error);
      setLoading(false);
    }
  };

  const handleFormOnKeyPress = (e: any) => {
    if (e.which === 13 /* Enter */) {
      e.preventDefault();
    }
  };

  const checkEmailExists = () => ({
    async validator(_, value) {
      if (value) {
        try {
          const { data } = await apolloClient.query<{ userByEmail: IUser }>({
            query: FIND_USER_BY_EMAIL,
            variables: { email: value },
          });

          if (data?.userByEmail) {
            return Promise.reject(
              "We found an existing account with this email. Please click Login below."
            );
          }
        } catch (error) {
          return Promise.resolve();
        }
      }
      return Promise.resolve();
    },
  });

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

  const emailForm = () => (
    <Form form={form} onFinish={handleSubmit} onKeyPress={handleFormOnKeyPress}>
      <span className="grid grid-cols-2 gap-4 mt-3">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your nickname" }]}
          required
        >
          <Input
            className="p-2 rounded font-dark-gray text-16"
            placeholder="nickname"
          />
        </Form.Item>
      </span>

      <Form.Item
        name="email"
        validateFirst
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Please enter your email" },
          { whitespace: true, message: "Email cannot be empty" },
          { type: "email", message: "Not valid email" },
          checkEmailExists,
        ]}
        required
        normalize={(value) => value.trim()}
      >
        <Input
          className="p-2 rounded font-dark-gray text-16"
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please enter password" },
          { whitespace: true, message: "Password cannot be empty" },
          { min: 6, message: "Password needs to be minimum 6 characters." },
        ]}
        required
      >
        <Input.Password
          className="p-2 rounded font-dark-gray"
          placeholder="Password"
          disabled={loading}
        />
      </Form.Item>
      {/* {commonItem()} */}
      <Button
        className="w-full rounded h-auto py-2 mb-2"
        htmlType="submit"
        type="primary"
        disabled={loading}
      >
        Sign Up
      </Button>
      <div className="text-center text-gray-600">or</div>
      <Button
        icon={<GoogleOutlined />}
        className="w-full rounded-lg"
        onClick={handleGoogleSignIn}
      >
        Signup with Google
      </Button>
      <Divider />
    </Form>
  );

  return (
    <Spin spinning={loading}>
      <div className="p-6">
        {emailForm()}
        <div className="font-dark-gray text-center">
          Already have an account?
          <Button
            type="link"
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export { Register, RegisterModal };
