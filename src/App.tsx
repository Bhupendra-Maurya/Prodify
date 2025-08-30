import Layout from "./components/layout/Layout";
import ProductsTable from "./components/products/ProductTable";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <Layout>
      <ProductsTable />
      <Toaster />
    </Layout>
  );
};

export default App;
