import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Books from "./pages/books/Books";
import NotFound from "./pages/not-found/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;