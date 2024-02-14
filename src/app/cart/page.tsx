"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";

import { formatCurrency } from "@/utils/functions/format-currency";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

const PHONE_NUMBER = "";

export default function Cart() {
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();
  const router = useRouter();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    const result = confirm(`Desejar remover ${product.title} do carrinho?`);

    if (result) {
      cartStore.remove(product.id);
    }
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return alert("Informe os dados da entrega.");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity}x ${product.title}`)
      .join("");

    const message = `
    🍔 NOVO PEDIDO
    \n Entregar em: ${address}

    ${products}

    \n Valor total: ${total}
    `;

    window.open(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    );

    cartStore.clear();
    router.replace("/");
  }

  return (
    <div className="flex-1 pt-8 h-max bg-slate-900">
      <Header title="Seu carrinho" />

      <div className="p-5 flex-1">
        {cartStore.products.length > 0 ? (
          <div className="border-b border-slate-700">
            {cartStore.products.map((product) => (
              <Product
                key={product.id}
                data={product}
                onClick={() => handleProductRemove(product)}
              />
            ))}
          </div>
        ) : (
          <div className="font-body text-slate-400 text-center my-8">
            Seu carrinho está vazio.
          </div>
        )}

        <div className="flex-row gap-2 items-center mt-5 mb-4">
          <div className="text-white text-xl font-subtitle">Total:</div>
          <div className="text-lime-400 text-2xl font-heading">{total}</div>
        </div>

        <input
          placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="p-5 gap-5">
        <Button onClick={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          {/* <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon> */}
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </div>
    </div>
  );
}
