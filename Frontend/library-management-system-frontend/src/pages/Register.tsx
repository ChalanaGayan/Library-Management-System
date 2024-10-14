import { Button, Form, Input, message, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPage.css"; // for background image styling

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();

  // Email and Password validation regex patterns
  const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, one uppercase, one special character
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email pattern

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      // Use environment variable for base URL
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/register`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        message.success("Registration successful! Redirecting to login...");
        navigate("/login"); // Navigate to login page on success
      }
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="register-page" style={{ backgroundColor: "#fff" }}>
      {/* Back Button */}

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
              Register
            </Title>
            <Form name="register" onFinish={onFinish} layout="vertical">
              <Form.Item
                label={
                  <span style={{ color: "#000", fontSize: "1.3rem" }}>
                    Email
                  </span>
                }
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    pattern: emailRegex,
                    message: "Please enter a valid email address!",
                  },
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
                  {
                    pattern: passwordRegex,
                    message:
                      "Password must be at least 8 characters, include one uppercase letter, and one special character (@, $, etc.)",
                  },
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
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
