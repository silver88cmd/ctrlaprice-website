"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-context";

export default function CartPage() {
  const { items, removeProduct } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectedProducts = items.filter((item) =>
    selectedItems.includes(item.itemNumber)
  );
  const inquiryItems = selectedProducts
    .map((item) => item.itemNumber)
    .join(", ");
  const inquiryHref = `/inquiries?item=${encodeURIComponent(inquiryItems)}`;

  function toggleSelected(itemNumber: string) {
    setSelectedItems((current) =>
      current.includes(itemNumber)
        ? current.filter((item) => item !== itemNumber)
        : [...current, itemNumber]
    );
  }

  return (
    <section className="section container">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Your Cart</h1>
          <p className="muted">
            Select one or more products to include in your inquiry.
          </p>
        </div>
        <Link href="/products" className="text-link">
          Continue browsing →
        </Link>
      </div>

      <p className="cart-warning" role="note">
        <strong>Important:</strong> Products added to your cart are kept only
        while this website remains open. Reloading the website will clear your
        cart.
      </p>

      {items.length > 0 ? (
        <>
          <div className="cart-list" aria-label="Products in your cart">
            {items.map((item) => (
              <article className="cart-item" key={item.itemNumber}>
                <label className="cart-select">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.itemNumber)}
                    onChange={() => toggleSelected(item.itemNumber)}
                    aria-label={`Select ${item.name} for inquiry`}
                  />
                </label>
                <div className="cart-item-info">
                  <p className="product-brand">{item.brand || "CTRLA"}</p>
                  <h2>{item.name || "Unnamed Product"}</h2>
                  <p className="product-number">Item No. {item.itemNumber}</p>
                </div>
                <strong className="cart-item-price">
                  {item.sellingPrice != null
                    ? `₱${Number(item.sellingPrice).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                      })}`
                    : "Price on request"}
                </strong>
                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => {
                    removeProduct(item.itemNumber);
                    setSelectedItems((current) =>
                      current.filter((selected) => selected !== item.itemNumber)
                    );
                  }}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>

          <div className="cart-actions">
            <p className="muted">
              {selectedProducts.length} product
              {selectedProducts.length === 1 ? "" : "s"} selected
            </p>
            {selectedProducts.length > 0 ? (
              <Link href={inquiryHref} className="button button-dark">
                Inquire About Selected Products →
              </Link>
            ) : (
              <button type="button" className="button button-dark" disabled>
                Select Products to Inquire
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="empty-state cart-empty-state">
          <h2>Your cart is empty</h2>
          <p className="muted">
            Add products from the catalog to prepare an inquiry.
          </p>
          <Link href="/products" className="button button-dark">
            Browse Products
          </Link>
        </div>
      )}
    </section>
  );
}
