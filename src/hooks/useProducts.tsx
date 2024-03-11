import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ISingleProduct,
  IInitialData,
  IUseProducts,
} from "../types/useProductsTypes";

const useProducts = (): IUseProducts => {
  const [products, setProducts] = useState<ISingleProduct[]>([]);
  const [filterId, setFilterId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  //page change
  const fetchMore = () => setPage((p) => p + 1);
  const fetchLess = () => setPage((p) => p - 1);

  //fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IInitialData>(
          `https://reqres.in/api/products?page=${page}&per_page=5`
        );
        setProducts(response.data.data);
      } catch (error) {
        setError("Error fetching data");
        //I could use smth like toastify but for this e.g. a regular div is enough:)
      }
    };

    fetchData();
  }, [page]);

  //adding params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    if (filterId || filterId === 0) {
      params.set("id", filterId.toString());
    }
    navigate(`?${params.toString()}`);
  }, [filterId, page, navigate]);

  return { products, filterId, error, page, fetchMore, fetchLess, setFilterId };
};

export default useProducts;
