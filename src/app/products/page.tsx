import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "../../components/product_card";
import { supabase } from "@/lib/supabase";
import { getBrands, type Product } from "@/lib/products";

const PAGE_SIZE = 12;

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    page?: string;
  }>;
};

export default function ProductsPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<ProductCatalogSkeleton />}>
      <ProductsPageContent searchParams={searchParams} />
    </Suspense>
  );
}

function ProductCatalogSkeleton() {
  return (
    <section className="section container" aria-busy="true" aria-label="Loading products">
      <div className="catalog-heading">
        <p className="eyebrow">CTRLA COLLECTION</p>
        <h1>Our Products</h1>
        <p className="muted">Browse our available products and find what you need.</p>
      </div>

      <div className="catalog-filters">
        <span className="skeleton skeleton-search" />
        <span className="skeleton skeleton-category" />
        <span className="skeleton skeleton-button" />
      </div>

      <div className="brand-tabs" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span className="skeleton skeleton-tab" key={index} />
        ))}
      </div>

      <div className="product-grid">
        {Array.from({ length: PAGE_SIZE }, (_, index) => (
          <article className="product-card skeleton-product-card" key={index}>
            <div className="skeleton skeleton-product-image" />
            <div className="skeleton-product-info">
              <span className="skeleton skeleton-line skeleton-brand" />
              <span className="skeleton skeleton-line skeleton-name" />
              <span className="skeleton skeleton-line skeleton-item-number" />
              <span className="skeleton skeleton-line skeleton-price" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

async function ProductsPageContent({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.q?.trim() ?? "";
  const brand = params.brand?.trim() ?? "";
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("product_name", { ascending: true });

  if (search) {
    const safeSearch = search.replace(/[,%()]/g, " ");
    query = query.or(
      `product_name.ilike.%${safeSearch}%,item_number.ilike.%${safeSearch}%,brand.ilike.%${safeSearch}%`
    );
  }

  if (brand) {
    query = query.eq("brand", brand);
  }

  const from = (currentPage - 1) * PAGE_SIZE;
  const [{ data, error, count }, brands] = await Promise.all([
    query.range(from, from + PAGE_SIZE - 1),
    getBrands(),
  ]);

  const products = (data ?? []) as Product[];
  const totalProducts = count ?? 0;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  return (
    <section className="section container">
      <div className="catalog-heading">
        <p className="eyebrow">CTRLA COLLECTION</p>
        <h1>Our Products</h1>
        <p className="muted">
          Browse our available products and find what you need.
        </p>
      </div>

      <form action="/products" className="catalog-filters">
        <input
          type="search"
          name="q"
          defaultValue={search}
          placeholder="Search product name, item number, or brand..."
          className="search-input"
        />

        {brand && <input type="hidden" name="brand" value={brand} />}

        <button className="button button-dark" type="submit">
          Search
        </button>

        {(search || brand) && (
          <Link href="/products" className="clear-link">
            Clear filters
          </Link>
        )}
      </form>

      <nav className="brand-tabs" aria-label="Filter products by brand">
        <Link
          href={buildProductsHref({ search })}
          className={`brand-tab${brand ? "" : " brand-tab-active"}`}
          aria-current={brand ? undefined : "page"}
        >
          All brands
        </Link>
        {brands.map((item) => (
          <Link
            key={item}
            href={buildProductsHref({
              search,
              brand: item,
            })}
            className={`brand-tab${brand === item ? " brand-tab-active" : ""}`}
            aria-current={brand === item ? "page" : undefined}
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="results-heading">
        <p>
          Showing <strong>{products.length}</strong> of{" "}
          <strong>{totalProducts}</strong> products
        </p>
        <div>
          {brand && <span>Brand: {brand}</span>}
        </div>
      </div>

      {error ? (
        <p className="error-message">
          Unable to load products. Please try again.
        </p>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try a different search term or category.</p>
        </div>
      )}

      {!error && totalPages > 1 && (
        <nav className="pagination" aria-label="Product pages">
          {currentPage > 1 ? (
            <Link
              href={buildProductsHref({
                search,
                brand,
                page: currentPage - 1,
              })}
              className="pagination-link"
            >
              Previous
            </Link>
          ) : (
            <span className="pagination-link pagination-disabled">Previous</span>
          )}
          <span className="pagination-status">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link
              href={buildProductsHref({
                search,
                brand,
                page: currentPage + 1,
              })}
              className="pagination-link"
            >
              Next
            </Link>
          ) : (
            <span className="pagination-link pagination-disabled">Next</span>
          )}
        </nav>
      )}
    </section>
  );
}

function buildProductsHref({
  search,
  brand,
  page,
}: {
  search?: string;
  brand?: string;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (brand) params.set("brand", brand);
  if (page && page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}