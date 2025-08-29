import ProductDetails from "./components/products/ProductDetails";
import ProductsList from "./components/products/ProductsList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
           <Route path="*" element={<p className="text-center mt-20 text-red-500">Page Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
