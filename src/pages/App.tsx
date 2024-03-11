import React, { useState } from "react";
import Modal from "react-modal";
import useProducts from "../hooks/useProducts";
import Filter from "../components/Filter";
import ProductList from "../components/ProductList";
import { useDebounce } from "use-debounce";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const App: React.FC = () => {
  const {
    products: allProducts,
    filterId,
    error,
    page,
    fetchMore,
    fetchLess,
    setFilterId,
  } = useProducts();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [filterIdDebounced] = useDebounce(filterId, 500); // Użyjemy hooka useDebounce do opóźnienia aktualizacji wartości filterId

  const filteredProducts = filterIdDebounced
    ? allProducts.filter((product) => product.id === filterIdDebounced)
    : allProducts;

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h1>Product List</h1>
      {error && <p>{error}</p>}
      <Filter value={filterId} onChange={setFilterId} />
      <ProductList products={filteredProducts} onRowClick={openModal} />
      {page > 1 && <button onClick={fetchLess}>Less</button>}
      {page < 3 && <button onClick={fetchMore}>More</button>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Product Details"
      >
        <h2>Product Details</h2>
        {selectedProduct && (
          <div>
            <p>ID: {selectedProduct.id}</p>
            <p>Name: {selectedProduct.name}</p>
            <p>Year: {selectedProduct.year}</p>
            <p>Color: {selectedProduct.color}</p>
            <p>Pantone Value: {selectedProduct.pantone_value}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
