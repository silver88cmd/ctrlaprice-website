"use client";

import { useState } from "react";
import Link from "next/link";
import CartLink from "@/components/cart-link";
import UiIcon from "@/components/ui-icon";

export default function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`menu-toggle${isOpen ? " menu-toggle-open" : ""}`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        className={`main-nav${isOpen ? " main-nav-open" : ""}`}
        aria-label="Main navigation"
        onClick={() => setIsOpen(false)}
      >
        <Link href="/">
          <UiIcon name="home" size={16} />
          Home
        </Link>
        <Link href="/products">
          <UiIcon name="grid" size={16} />
          Products
        </Link>
        <Link href="/inquiries">
          <UiIcon name="mail" size={16} />
          Inquiries
        </Link>
        <CartLink />
      </nav>
    </>
  );
}
