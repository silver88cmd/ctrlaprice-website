import Link from "next/link";
import type { Product } from "@/lib/products";

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
          {product.quantity === 0 && (
            <span className="stock-status-badge">No stock available</span>
          )}
        </div>

        <div className="product-info">
          <p className="product-brand">{product.brand || "CTRLA"}</p>

          <h3>{product.product_name || "Unnamed Product"}</h3>

          <p className="product-number">Item No. {product.item_number}</p>

          <div className="product-card-bottom">
            <strong>
              {product.selling_price != null
                ? `₱${Number(product.selling_price).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}`
                : "Price on request"}
            </strong>

            <span>View details →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}