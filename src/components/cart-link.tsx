"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import UiIcon from "@/components/ui-icon";

export default function CartLink() {
  const { items } = useCart();

  return (
    <Link href="/cart" className="cart-nav-link">
      <UiIcon name="cart" size={17} />
      Cart <span className="cart-count">{items.length}</span>
    </Link>
  );
}
