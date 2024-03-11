import React, { useState } from "react";
import Modal from "react-modal";
import useProducts from "../hooks/useProducts";
import Filter from "../components/Filter";
import ProductList from "../components/ProductList";
import { useDebounce } from "use-debounce";
import "../styles/globals.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ISingleProduct } from "../types/useProductsTypes";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    fontSize: "3rem",
    padding: "5rem",
    backgroundColor: "rgba(193, 107, 37, 0.8)",
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
  const [selectedProduct, setSelectedProduct] = useState<ISingleProduct | null>(
    null
  );

  const [filterIdDebounced] = useDebounce(filterId, 500);
  const filteredProducts = filterIdDebounced
    ? allProducts.filter((product) => product.id === filterIdDebounced)
    : allProducts;

  const openModal = (product: ISingleProduct) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="wrapper">
      <h1>Product List</h1>
      {error && <p>{error}</p>}
      <Filter value={filterId} onChange={setFilterId} />
      <ProductList products={filteredProducts} onRowClick={openModal} />
      {page > 1 && (
        <button className="arrows" onClick={fetchLess}>
          <FaArrowLeft /> Less
        </button>
      )}
      {page < 3 && (
        <button className="arrows" onClick={fetchMore}>
          More <FaArrowRight />
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
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
            <button className="closeModal" onClick={closeModal}>
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
