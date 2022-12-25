import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
// third party
import Modal from "antd/lib/modal";
import Form from "antd/lib/form";
import Spin from "antd/lib/spin";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Divider from 'antd/lib/divider';
import message from 'antd/lib/message';
// context
import { AuthContext } from "context/AuthContext";
import { APIWithoutAuth } from "utils/api";
import { saveUserAndToken } from "utils/auth";

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
    const {
      setUser,
      setShowRegister,
      setShowLogin,
      showRegister
    } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [form] = Form.useForm();
  
    useEffect(() => {
      showRegister &&
        form.setFieldsValue({
          email: window.localStorage.getItem('emailForSignIn')
        });
        // eslint-disable-next-line
    }, [showRegister]);
    
    const handleSubmit = async (values: any) => {
      try {
        setLoading(true);
        const { email, password, first_name, last_name } = values;


        const userInfo = {
          email: email.toLowerCase().trim(),
          password,
          first_name: first_name.trim(),
          last_name: last_name.trim()
        };
  
        const {data} = await APIWithoutAuth.post('/users/signup', {...userInfo});
        const newUser = data.data;
        if (!newUser) {
            setLoading(false);
            message.error("Something went wrong. Please try again.");
            return;
        }
        setUser(newUser);
        saveUserAndToken(newUser,newUser["token"])
        form.resetFields();
        message.success('Account created successfully.');
        setLoading(false);
        setShowRegister(false);
        router.push("/tasks");
        return;
      } catch (error: any) {
        setLoading(false);
        message.error('Error in register.',error);
      }
    };
  
    const handleFormOnKeyPress = (e:any) => {
      if (e.which === 13 /* Enter */) {
        e.preventDefault();
      }
    };
  
    const emailForm = () => (
      <Form form={form} onFinish={handleSubmit} onKeyPress={handleFormOnKeyPress}>
        <span className="grid grid-cols-2 gap-4 mt-3">
          <Form.Item
            name="first_name"
            rules={[
              { required: true, message: 'Please enter your first name' },
              { whitespace: true, message: 'First name cannot be empty' },
              { max: 15, message: 'First name cannot be longer than 15 characters' }
            ]}
            required
          >
            <Input className="p-2 rounded font-dark-gray text-16" placeholder="First name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              { required: true, message: 'Please enter your last name' },
              { whitespace: true, message: 'Last name cannot be empty' },
              { max: 15, message: 'Last name cannot be longer than 15 characters' }
            ]}
            required
          >
            <Input className="p-2 rounded font-dark-gray text-16" placeholder="Last name" />
          </Form.Item>
        </span>
  
        <Form.Item
          name="email"
          validateFirst
          validateTrigger="onBlur"
          rules={[
            { required: true, message: 'Please enter your email' },
            { whitespace: true, message: 'Email cannot be empty' },
            { type: 'email', message: 'Not valid email' },
          ]}
          required
          normalize={(value) => value.trim()}
        >
          <Input className="p-2 rounded font-dark-gray text-16" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please enter password' },
            { whitespace: true, message: 'Password cannot be empty' }
          ]}
          required
        >
          <Input.Password className="p-2 rounded font-dark-gray text-16" placeholder="Password" disabled={loading} />
        </Form.Item>
        <Button className="w-full rounded h-auto py-2 mb-2" htmlType="submit" type="primary" disabled={loading}>
          Sign Up
        </Button>
        <Divider />
      </Form>
    );
  
    return (
      <Spin spinning={loading}>
        <div className="p-6">
          {emailForm()}
          <div className="font-dark-gray text-center tracking-tighter">
            Already have a Spare Staff account?
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
  