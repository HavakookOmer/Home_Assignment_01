import { useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { Login } from "./components/Login";
import { useProducts } from "./components/hooks/useProducts";
import { useWishlist } from "./components/hooks/useWishlist";
import { useAuth } from "./components/hooks/useAuth";
import Button from "./components/common/Button";
import Pagination from "./components/Pagination";
import logo from "./assets/download.png";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  const { currentUser, login, logout } = useAuth();
  const { products, totalPages } = useProducts(currentPage, showWishlistOnly, currentUser?.username);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useWishlist(currentUser);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowWishlistChange = () => {
    setShowWishlistOnly(!showWishlistOnly);
    setCurrentPage(1);
  };

  const onLogin = (user) => {
    login(user.username, user.password);
    setCurrentPage(1);
  };

  const onLogout = () => {
    logout();
    setShowWishlistOnly(false);
    setCurrentPage(1);
  };

  return (

    <div className="grid auto-rows-max">
      {/* header */}
      <div className="flex items-center justify-between p-10">
        <div className="flex items-end">
          <img className="h-8" src={logo} alt="logo" />
          <h1 className="ml-5 text-2xl font-bold text-gray-900">
            Company Name
          </h1>
        </div>
        {currentUser ? (
          <div className="flex items-baseline">
            <p className="text-gray-900 flex flex-row m-4">
              Hello {currentUser.name}
            </p>
            <Button
              variant="primary"
              label="Log out"
              onClick={() => {
                onLogout();
              }}
            />
          </div>
        ) : (
          <Login onLogin={onLogin} />
        )}
      </div>
      <div className="row-span-9">
        <div className="flex justify-start pl-10 pb-2 items-center mb-2">
          <input
            type="checkbox"
            checked={showWishlistOnly}
            onChange={handleShowWishlistChange}
            disabled={!currentUser}
            className="h-4 w-4"
          />
          <p className="ml-2 font-normal font-sans text-base">
            Show only products from wishlist
          </p>
        </div>
        {/* main */}
        <div className="grid justify-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4  ">
          {products.map((product) =>

            showWishlistOnly && !wishlist.includes(product.id) ? null : (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  inWishlist: wishlist.includes(product.id),
                }}
                onAddToWishlist={addToWishlist}
                onRemoveFromWishlist={removeFromWishlist}
                disabled={!currentUser}
              />
            )
          )}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>

  );
};

export default App;
