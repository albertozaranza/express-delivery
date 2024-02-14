"use client";

import { useState, useRef } from "react";
import Link from "next/link";

import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { CATEGORIES, MENU } from "@/utils/data/products";
import { useCartStore } from "@/stores/cart-store";

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  const cartStore = useCartStore();
  const sectionListRef = useRef(null);

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    sectionListRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="flex flex-1 flex-col h-max bg-slate-900">
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

      <div className="flex flex-row gap-4 max-h-10 mt-5 px-5">
        {CATEGORIES.map((item) => (
          <CategoryButton
            key={item}
            title={item}
            onClick={() => handleCategorySelect(item)}
            isSelected={item === category}
          />
        ))}
      </div>

      <div className="px-5 pb-10">
        {MENU.map((item) => (
          <div key={item.title} ref={sectionListRef}>
            <div className="text-xl text-white font-semibold mt-8 mb-3">
              {item.title}
            </div>

            {item.data.map((data) => (
              <Link key={data.id} href={`/product/${data.id}`}>
                <Product data={data} />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
