import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CartLink from "@/components/cart-link";
import { CartProvider } from "@/components/cart-context";
import "./globals.css";

const currentYear = 2026;

export const metadata: Metadata = {
  title: "CTRLA | Product Catalog",
  description: "Explore the CTRLA product catalog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="site-header">
            <div className="container header-content">
              <Link href="/" className="brand-logo" aria-label="CTRLA home">
                <Image
                  src="/images/2d_logo_caps.png"
                  alt="CTRLA"
                  width={64}
                  height={64}
                  priority
                />
                <span className="brand">
                  CTRLA<span>.</span>
                </span>
              </Link>

              <nav className="main-nav">
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <Link href="/inquiries">Inquiries</Link>
                <CartLink />
              </nav>

            </div>
          </header>

          <main>{children}</main>

          <footer className="site-footer">
            <div className="container footer-content">
              <div className="footer-brand-block">
                <Link href="/" className="footer-logo" aria-label="CTRLA home">
                  <Image
                    src="/images/2d_logo_caps.png"
                    alt="CTRLA"
                    width={72}
                    height={72}
                  />
                  <span className="brand footer-brand">
                    CTRLA<span>.</span>
                  </span>
                </Link>
                <p className="footer-company-name">
                  Control A Trading and Services Corporation
                </p>
                <p>Explore our product collection.</p>
              </div>

              <address className="footer-contact">
                <strong>Visit or contact us</strong>
                <span>728 General Luis St. Caybiga Caloocan City</span>
                <span>VAT Reg. TIN: 601-163-860-00000</span>
                <span>
                  Tel.: <a href="tel:83324584">8332-4584</a>
                </span>
                <span>
                  Cel.: <a href="tel:+639458258802">09458258802</a>
                </span>
              </address>

              <p className="footer-copyright">
                © {currentYear} CTRLA. All rights reserved.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}