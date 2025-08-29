import ProductDetails from "./components/ProductDetails";
import ProductsList from "./components/products/ProductsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
