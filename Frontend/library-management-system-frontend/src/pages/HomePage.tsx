import { useState } from "react";
import BookTable from "../components/BookTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Switch } from "antd";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar darkMode={darkMode} />
      <div className="flex justify-between items-center p-4">
        <h1 className="text-4xl font-semibold">Books</h1>
        <div className="flex items-center">
          {darkMode ? (
            <span role="img" aria-label="moon" className="mr-2">
              🌙
            </span>
          ) : (
            <span role="img" aria-label="sun" className="mr-2">
              🌞
            </span>
          )}
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </div>
      </div>
      <div className="flex-grow p-4">
        <BookTable darkMode={darkMode} />
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default HomePage;
