import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ISingleProduct,
  IInitialData,
  IUseProducts,
} from "../types/useProductsTypes";
import baseUrl from "../axiosSetup";

const useProducts = (): IUseProducts => {
  const [products, setProducts] = useState<ISingleProduct[]>([]);
  const [filterId, setFilterId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");
    return parseInt(pageParam || "1", 10); //checking if page number exists onload
  });
  const navigate = useNavigate();

  //checking if params onload exist
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    if (idParam && parseInt(idParam, 10) >= 1) {
      setFilterId(parseInt(idParam, 10));
    }
  }, []);

  //fetching data
  const fetchData = async () => {
    try {
      const response = await baseUrl.get<IInitialData>(
        `products?page=${page}&per_page=5&filterId=${filterId}`
      );
      setProducts(response.data.data);
      setError(null);
    } catch (error) {
      setError("Error fetching data");
      //I could use smth like toastify but for this e.g. a regular div is enough:)
    }
  };

  //page change
  const fetchMore = () => setPage((p) => p + 1);
  const fetchLess = () => setPage((p) => (p > 1 ? p - 1 : p));

  //updating URL on filters change
  useEffect(() => {
    updateURL();
    fetchData();
  }, [filterId, page]);

  //updating params
  const updateURL = () => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (filterId >= 1) {
      params.set("id", filterId.toString());
    }
    navigate(`?${params.toString()}`, { replace: false });
  };

  return { products, filterId, error, page, fetchMore, fetchLess, setFilterId };
};

export default useProducts;
