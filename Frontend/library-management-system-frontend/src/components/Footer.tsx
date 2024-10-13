const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`text-center py-4 border-t border-gray-200 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <p>&copy; {new Date().getFullYear()} Chalana Gayan Dhanawardhana</p>
      <p>Email: gayand.21@cse.mrt.ac.lk</p>
    </footer>
  );
};

export default Footer;
