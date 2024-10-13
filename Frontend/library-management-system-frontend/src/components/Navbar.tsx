import { Link } from "react-router-dom";
import { Layout, Button } from "antd";

const { Header } = Layout;

const Navbar = ({ darkMode }) => (
  <Header
    className={`navbar ${
      darkMode ? "bg-gray-900" : "bg-white"
    } flex justify-between items-center p-4 border-b border-gray-200`}
  >
    <h1
      className={`${
        darkMode ? "text-white" : "text-black"
      } text-xl font-mono font-bold m-0`}
    >
      Library Management System
    </h1>
    <Link to="/">
      <Button
        type="primary"
        className={`${
          darkMode ? "bg-blue-600" : "bg-blue-400"
        } hover:bg-blue-500`}
      >
        Home
      </Button>
    </Link>
  </Header>
);

export default Navbar;
