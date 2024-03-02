import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AddBookPage from "./pages/AddBookPage/AddBookPage";
import AllBooksPage from "./pages/BooksPage/AllBooksPage";
import EditBookPage from "./pages/EditBookPage/EditBookPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addNewBook" element={<AddBookPage />} />
      <Route path="/allBooks" element={<AllBooksPage />} />
      <Route path="/allBooks/:id" element={<EditBookPage />} />
    </Routes>
  );
}
