import { Button, Card, Form, Input, Typography } from "antd";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../redux/slices/auth";

const SingInPage = () => {
  const dispatch = useDispatch()

  const onFinish = () => {
    dispatch( setAuth( true ) )
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Card
        title={
          <Typography.Title level={3} style={{ margin: 0 }}>
            Welcome
          </Typography.Title>
        }
        style={{ width: 400 }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: false, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: false, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default SingInPage;
