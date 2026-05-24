import React from "react";
import { products } from "../data/shopData";
import { ProductList } from "../components/ProductList";

export function SaleScreen() {
  return <ProductList data={products.filter((x) => x.oldPrice > 0)} />;
}
