import PropTypes from 'prop-types';
import Button from "./common/Button";
import logo from "../assets/download.png";


export const ProductCard = (props) => {
  const { product, onAddToWishlist, onRemoveFromWishlist, disabled } = props;

  return (
    <div className="card-container">
      <img src={logo} alt={product.title} className="w-full h-24 sm:h-32 object-cover" />
      <h3 className="font-bold">{product.title}</h3>
      <p className="text-gray-500 text-sm text-pretty break-normal line-clamp-3">
        {product.description}
      </p>
      <div className="flex justify-between items-baseline mt-4">
        <span>{product.price}</span>
        {!disabled &&
          (product.inWishlist ? (
            <Button
              variant="ghost"
              label="Remove"
              onClick={() => onRemoveFromWishlist(product.id)}
            />
          ) : (
            <Button
              variant="ghost"
              label="Add"
              onClick={() => onAddToWishlist(product.id)}
            />
          ))}
      </div>

    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
  onRemoveFromWishlist: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
