import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const LandingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAccessClick = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      setIsModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="landing-page"
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundImage: "url(/Background-Image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          filter: "brightness(0.3)",
          zIndex: 1,
        }}
      />
      <div
        className="container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "600px",
          backdropFilter: "blur(5px)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "black",
            fontWeight: "semi-bold",
            fontSize: "2.8rem",
          }}
        >
          Library Management System
        </h1>
        <p className="pb-6" style={{ color: "black", fontSize: "0.8rem" }}>
          Technologies: ASP.NET Core, React, TypeScript, Ant Design, Tailwind
          CSS
        </p>
        <p className="text-left" style={{ color: "black", fontSize: "1rem" }}>
          Chalana Gayan Dhanawardhana
        </p>
        <p
          className="pb-5 text-left"
          style={{ color: "green", fontSize: "1rem" }}
        >
          gayand.21@cse.mrt.ac.lk
        </p>
        <Button type="primary" onClick={handleAccessClick}>
          Access
        </Button>
      </div>

      <Modal
        className="text-center items-center"
        title="Authentication Required"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p className="pb-5">Please login or sign up to access the system</p>
        <Link to="/login">
          <Button type="primary">Login</Button>
        </Link>
        <Link to="/register" style={{ marginLeft: "10px" }}>
          <Button>Register</Button>
        </Link>
      </Modal>
    </div>
  );
};

export default LandingPage;
