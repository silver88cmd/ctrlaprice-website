"use client";

import { useCart, type CartProduct } from "@/components/cart-context";

export default function AddToCartButton({
  product,
}: {
  product: CartProduct;
}) {
  const { items, addProduct } = useCart();
  const isAdded = items.some((item) => item.itemNumber === product.itemNumber);

  return (
    <button
      type="button"
      className="button button-outline add-to-cart-button"
      onClick={() => addProduct(product)}
      disabled={isAdded}
    >
      {isAdded ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
