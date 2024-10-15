import { Button, Form, Input, message, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "./LoginPage.css";

const { Title } = Typography;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { accessToken } = response.data;
      login(accessToken); // to save token in AuthContext

      message.success("Login successful!");
      navigate("/home"); // go to home page after successful login
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="login-page" style={{ backgroundColor: "#fff" }}>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={22} sm={16} md={10} lg={8}>
          <div className="form-container">
            <Button
              type="link"
              onClick={handleBackClick}
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                color: "#000",
                fontSize: "1rem",
                border: "2px solid black",
                transition: "color 0.3s, border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1890ff";
                e.currentTarget.style.borderColor = "#1890ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.borderColor = "black";
              }}
            >
              &larr; Back
            </Button>

            <Title level={1} style={{ textAlign: "center", color: "#000" }}>
              Login
            </Title>
            <Form name="login" onFinish={onFinish} layout="vertical">
              <Form.Item
                label={
                  <span style={{ color: "#000", fontSize: "1.3rem" }}>
                    Email
                  </span>
                }
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label={
                  <span style={{ color: "#000", fontSize: "1.3rem" }}>
                    Password
                  </span>
                }
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>

              <Form.Item>
                <Button
                  className="font-semibold text-lg"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
