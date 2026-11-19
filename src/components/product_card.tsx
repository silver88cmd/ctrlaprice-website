import Link from "next/link";
import type { Product } from "@/lib/products";
import AddToCartButton from "@/components/add-to-cart-button";
import UiIcon from "@/components/ui-icon";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.id}`} className="product-card-link">
        <div className="product-image">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.product_name ?? "Product"}
            />
          ) : (
            <span>No image available</span>
          )}
        </div>

        <div className="product-info">
          <p className="product-brand">{product.brand || "CTRLA"}</p>

          <h3 className="product-name">
            {product.product_name || "Unnamed Product"}
          </h3>

          <p className="product-number">
            <UiIcon name="tag" size={14} />
            <span>Item No. {product.item_number}</span>
          </p>

          <div className="product-card-bottom">
            <div className="product-stock-price">
              <span
                className={`product-stock${
                  product.quantity != null && product.quantity <= 0
                    ? " product-stock-empty"
                    : ""
                }`}
              >
                <UiIcon name="box" size={15} />
                {product.quantity == null
                  ? "Stock on request"
                  : product.quantity <= 0
                    ? "Out of stock"
                    : `${product.quantity} available`}
              </span>
              <span className="product-price-separator" aria-hidden="true">
                •
              </span>
              <strong className="product-price">
                {product.selling_price != null
                  ? `P ${Number(product.selling_price).toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "Price on request"}
              </strong>
            </div>
            <span className="product-view">
              View details <UiIcon name="arrow-right" size={14} />
            </span>
          </div>
        </div>
      </Link>
      <AddToCartButton
        product={{
          itemNumber: product.item_number,
          name: product.product_name ?? "",
          brand: product.brand ?? "",
          sellingPrice: product.selling_price,
        }}
      />
    </article>
  );
}