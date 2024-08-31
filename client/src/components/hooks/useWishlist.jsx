import { useState, useEffect } from "react";

export const useWishlist = (currentUser) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (currentUser) {
      // Fetch wishlist items for the current user from the server
      fetch(`http://localhost:5001/api/users/${currentUser.username}/wishlist`)
        .then((response) => response.json())
        .then((data) => setWishlist(data))
        .catch((error) => console.error("Error fetching wishlist:", error));

    } else {
      // Clear wishlist if no user is logged in
      setWishlist([]);
    }
  }, [currentUser]);

  const addToWishlist = (id) => {
    setWishlist([...wishlist, id]);
    // Update wishlist on the server
    updateWishlist([...wishlist, id]);
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item !== id));
    // Update wishlist on the server
    updateWishlist(wishlist.filter((item) => item !== id));
  };


  const updateWishlist = (updatedWishlist) => {
    if (currentUser) {

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlist: updatedWishlist }),
      };
      // Update wishlist on the server for the current user
      fetch(
        `http://localhost:5001/api/users/${currentUser.username}/wishlist`,
        requestOptions
      ).catch((error) =>
        console.error("Error updating wishlist on server:", error)
      );
    }
  };

  return { wishlist, addToWishlist, removeFromWishlist };
};
