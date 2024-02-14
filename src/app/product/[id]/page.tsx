"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useCartStore } from "@/stores/cart-store";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

export default function Product({ params: { id } }) {
  const router = useRouter();

  const cartStore = useCartStore();

  const product = PRODUCTS.find((product) => product.id === id);

  function handleAddToCart() {
    if (product) {
      cartStore.add(product);

      router.replace("/");
    }
  }

  if (!product) {
    return <Link href="/" />;
  }

  return (
    <div className="flex-1 h-max bg-slate-900">
      <Image
        src={product.cover}
        className="w-full h-52 object-cover"
        alt="product image"
      />

      <div className="p-5 mt-8 flex-1">
        <div className="text-white text-xl font-semibold">{product.title}</div>

        <div className="text-lime-400 text-2xl font-semibold my-2">
          {formatCurrency(product.price)}
        </div>

        <div className="text-slate-400 font-regular text-base leading-6 mb-6">
          {product.description}
        </div>

        {product.ingredients.map((ingredient) => (
          <div
            className="text-slate-400 font-regular text-base leading-6"
            key={ingredient}
          >
            {"\u2022"} {ingredient}
          </div>
        ))}
      </div>

      <div className="p-5 pb-8 gap-5">
        <Button onClick={handleAddToCart}>
          {/* <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon> */}

          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </div>
    </div>
  );
}
