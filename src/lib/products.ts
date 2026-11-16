import { cacheLife } from "next/cache";
import { supabase } from "@/lib/supabase";

export type Product = {
  id: number;
  item_number: string;
  product_name: string | null;
  brand: string | null;
  quantity: number | null;
  reorder_level: number | null;
  item_source: string | null;
  unit: string | null;
  selling_price: number | null;
  online_price: number | null;
  category: string | null;
  image_path: string | null;
  image_url: string | null;
};

export async function getProducts(limit?: number) {
  "use cache";
  cacheLife("hours");

  let query = supabase
    .from("products")
    .select("*")
    .order("product_name", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error("Error loading products:", error.message);
    return [];
  }

  return (data ?? []) as Product[];
}

export async function getProduct(id: string) {
  "use cache";
  cacheLife("hours");

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error loading product:", error.message);
    return null;
  }

  return data as Product | null;
}

export async function getCategories() {
  "use cache";
  cacheLife("hours");

  const { data, error } = await supabase
    .from("products")
    .select("category")
    .not("category", "is", null)
    .order("category");

  if (error) return [];

  return [...new Set(
    (data ?? [])
      .map((item) => item.category)
      .filter((category): category is string => Boolean(category))
  )];
}

export async function getBrands() {
  "use cache";
  cacheLife("hours");

  const { data, error } = await supabase
    .from("products")
    .select("brand")
    .not("brand", "is", null)
    .order("brand");

  if (error) {
    console.error("Error loading product brands:", error.message);
    return [];
  }

  return [...new Set(
    (data ?? [])
      .map((item) => item.brand?.trim())
      .filter((brand): brand is string => Boolean(brand))
  )];
}