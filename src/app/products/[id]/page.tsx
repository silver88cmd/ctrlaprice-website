import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProductDetailsPage({ params }: Props) {
  return (
    <Suspense
      fallback={<ProductDetailsSkeleton />}
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}

function ProductDetailsSkeleton() {
  return (
    <section
      className="section container"
      aria-busy="true"
      aria-label="Loading product details"
    >
      <span className="skeleton skeleton-back-link" />
      <div className="details-layout">
        <div className="skeleton details-image details-skeleton-image" />
        <div className="details-info details-skeleton-info">
          <span className="skeleton skeleton-line skeleton-detail-brand" />
          <span className="skeleton skeleton-line skeleton-detail-title" />
          <span className="skeleton skeleton-line skeleton-detail-number" />
          <span className="skeleton skeleton-line skeleton-detail-price" />
          <div className="details-skeleton-table">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index}>
                <span className="skeleton skeleton-line skeleton-detail-label" />
                <span className="skeleton skeleton-line skeleton-detail-value" />
              </div>
            ))}
          </div>
          <span className="skeleton skeleton-detail-button" />
        </div>
      </div>
    </section>
  );
}

async function ProductDetailsContent({ params }: Props) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) notFound();

  const price =
    product.selling_price != null
      ? `₱${Number(product.selling_price).toLocaleString("en-PH", {
          minimumFractionDigits: 2,
        })}`
      : "Price on request";

  return (
    <section className="section container">
      <Link href="/products" className="back-link">
        ← Back to Products
      </Link>

      <div className="details-layout">
        <div className="details-image">
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

        <div className="details-info">
          <p className="eyebrow">{product.brand || "CTRLA"}</p>
          <h1>{product.product_name || "Unnamed Product"}</h1>

          <p className="product-number">
            Item No. {product.item_number}
          </p>

          <p className="details-price">{price}</p>

          <div className="details-table">
            <div>
              <span>Brand</span>
              <strong>{product.brand || "—"}</strong>
            </div>
            <div>
              <span>Item Source</span>
              <strong>{product.item_source || "—"}</strong>
            </div>
            <div>
              <span>Unit</span>
              <strong>{product.unit || "—"}</strong>
            </div>
            <div>
              <span>Stock</span>
              <strong>
                {product.quantity === 0
                  ? "No stock available"
                  : product.quantity ?? "—"}
              </strong>
            </div>
          </div>

          <Link
            href={`/inquiries?item=${encodeURIComponent(product.item_number)}`}
            className="button button-dark inquiry-button"
          >
            Inquire About This Product →
          </Link>
        </div>
      </div>
    </section>
  );
}