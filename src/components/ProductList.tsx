import React from "react";
import "../styles/globals.css";

interface IProduct {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface IProductListProps {
  products: IProduct[];
  onRowClick: (product: IProduct) => void;
}

const ProductList: React.FC<IProductListProps> = ({ products, onRowClick }) => {
  return (
    <table className="productList">
      <thead>
        <tr>
          <th className="productListHeaders">ID</th>
          <th className="productListHeaders">Name</th>
          <th className="productListHeaders">Year</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            style={{ backgroundColor: product.color }}
            onClick={() => onRowClick(product)}
          >
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
