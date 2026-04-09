import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "@/pages/home/Home";
import Books from "@/pages/books/Books";
import NotFound from "@/pages/not-found/NotFound";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import AdminAuthors from "@/pages/admin/authors/Authors";
import AdminBooks from "@/pages/admin/books/Books";
import Currencies from "@/pages/admin/currencies/Currencies";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import AdminGenres from "@/pages/admin/genres/Genres";
import AdminLayout from "@/layouts/AdminLayout";
import { ToastContainer, Zoom } from "react-toastify";
import Cart from "./pages/cart/Cart";
import PublicLayout from "./layouts/PublicLayout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Layout */}
          <Route path="/" element={<PublicLayout />}>
            <Route index path="" element={<Home />} />
            <Route path="books" element={<Books />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Protected Layout */}
          <Route path="/" element={<ProtectedLayout />}>
            {/* Admin Routes */}
            <Route path="admin" element={<AdminLayout />}>
              <Route path="authors" element={<AdminAuthors />} />
              <Route path="books" element={<AdminBooks />} />
              <Route path="currencies" element={<Currencies />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="genres" element={<AdminGenres />} />
            </Route>

            {/* Customer */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Zoom}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
