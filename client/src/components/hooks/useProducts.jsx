import { useState, useEffect } from "react";

export const useProducts = (page,isWishlist = false, username = "") => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {

    const url = isWishlist
    ? `http://localhost:5001/api/wishlist?username=${username}&page=${page}&limit=10`
    : `http://localhost:5001/api/products?page=${page}&limit=10`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 10));
      });
  }, [isWishlist, page, username]);

  return { products, totalPages };
};
