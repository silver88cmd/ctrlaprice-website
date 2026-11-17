import Link from "next/link";
import ProductCard from "../components/product_card";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts(8);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">WELCOME TO CTRLA</p>

          <h1>
            Find the products
            <br />
            youre looking for.
          </h1>

          <p className="hero-description">
            Explore our product collection and discover
            quality products from CTRLA.
          </p>

          <Link href="/products" className="button button-light">
            Explore Products →
          </Link>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR COLLECTION</p>
              <h2>Featured Products</h2>
            </div>

            <Link href="/products" className="text-link">
              Browse catalog →
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="muted">
              Products will appear here once Supabase is connected.
            </p>
          )}
        </div>
      </section>

      <section className="section container cta-section">
        <div>
          <p className="eyebrow">NEED ASSISTANCE?</p>
          <h2>Looking for something specific?</h2>
          <p className="muted">
            Send us an inquiry about a product.
          </p>
        </div>

        <Link href="/inquiries" className="button button-dark">
          Make an Inquiry →
        </Link>
      </section>
    </>
  );
}