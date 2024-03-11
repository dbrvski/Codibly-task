import React from "react";

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
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Year</th>
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
