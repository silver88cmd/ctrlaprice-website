"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";

export default function CartLink() {
  const { items } = useCart();

  return (
    <Link href="/cart" className="cart-nav-link">
      Cart <span className="cart-count">{items.length}</span>
    </Link>
  );
}
