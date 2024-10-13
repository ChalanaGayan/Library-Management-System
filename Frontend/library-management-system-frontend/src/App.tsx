import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
// import BookTable from "./components/BookTable";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      {/* <Route path="/test" element={<BookTable />} /> */}
    </Routes>
  </Router>
);

export default App;
