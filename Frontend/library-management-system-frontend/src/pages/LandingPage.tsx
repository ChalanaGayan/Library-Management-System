import { Link } from "react-router-dom";
import { Button } from "antd";

const LandingPage = () => (
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
        textAlign: "center", // Centering text
      }}
    >
      <h1
        style={{ color: "black", fontWeight: "semi-bold", fontSize: "2.8rem" }}
      >
        Library Management System
      </h1>
      <p style={{ color: "black", fontSize: "0.8rem" }}>
        Technologies: ASP.NET Core, React, TypeScript, Ant Design, Tailwind CSS
      </p>
      <p
        className="pt-6 text-left"
        style={{ color: "black", fontSize: "0.9rem" }}
      >
        Created by: Chalana Gayan Dhanawardhana
      </p>
      <p
        className="pb-6 text-left"
        style={{ color: "black", fontSize: "0.9rem" }}
      >
        Email: gayand.21@cse.mrt.ac.lk
      </p>
      <Link to="/home">
        <Button type="primary">Access</Button>
      </Link>
    </div>
  </div>
);

export default LandingPage;
