import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Books from "./pages/books/Books";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;