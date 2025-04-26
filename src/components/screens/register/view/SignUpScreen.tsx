"use client";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import SignUpViewModel from "../viewModel/SignUpViewModel";
import { defaultAuthenRepo } from "@/api/features/authenticate/AuthenRepo";

const SignUp = () => {
    const {isLoading, handleSignUp} = SignUpViewModel(defaultAuthenRepo);
    const onFinish = async (values: any) => {
        console.log("Received values of form: ", values);
        const data = {
            name: values.Name,
            email: values.email,
            phone: values.phone,
            address: values.address,
            password: values.password,
        };
        await handleSignUp(data);
    };

    return (
        <div
          className="max-w-[600px] p-6 h-full border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-center items-center mx-auto mt-6"
          style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
            <Form name="signup" layout="vertical"
            onFinish={onFinish}
             className="w-full"
              >
               <div className="flex justify-center items-center mb-4">
                  <img
                    src="/image/logo.png"
                    alt="YourVibes"
                    className="font-cursive text-black w-[60%] sm:w-[50%] md:w-[40%]"
                  />
                </div>
                <Form.Item
              name="Name"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input placeholder={"Họ tên"} className="w-full" />
            </Form.Item>
            <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!"},
              {
                pattern: /^\d{10}$/,
                message: "Số điện thoại không phù hợp!",
              },
            ]}
          >
            <Input placeholder={"Số điện thoại"} className="w-full" />
          </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Form.Item>
              <Form.Item
            name="password"
            rules={[
              { required: true, message:"Vui lòng nhập mật khẩu!"},
              {
                min: 8,
                message:"Mật khẩu phải từ 8 kí tự!",
              },
            ]}
          >
            <Input.Password placeholder={"Mật khẩu"} className="w-full" />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message:  "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    {
                      message: "Vui lòng xác nhận mật khẩu!"
                    }
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder={"Xác nhận mất khẩu"} className="w-full" />
          </Form.Item>
          <Form.Item
  name="address"
  rules={[
    { min: 5, message: "Địa chỉ phải có ít nhất 5 ký tự" },
  ]}
>
<Input.TextArea placeholder={"Địa chỉ"} className="w-full" rows={3} />

</Form.Item>

<Button
            type="primary"
            // block
            size="large"
            htmlType="submit"
            loading={isLoading}
               className="w-full bg-black text-white py-8 rounded-md hover:bg-gray-800"
          >
            {"Đăng ký"}
          </Button>

          {/* Additional Links */}
          <div className="mt-4 text-center">
            <span>
              {"Bạn đã có tài khoản?"}{" "}
              <a href="/login" className="text-blue-500">
                {"Đăng nhập ngay!"}
              </a>
            </span>
          </div>
            </Form>
        </div>
    );
    }
export default SignUp;