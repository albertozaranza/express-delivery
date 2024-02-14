import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";

type HeaderProps = {
  title: string;
  cartQuantityItems?: number;
};

export function Header({ title, cartQuantityItems = 0 }: HeaderProps) {
  return (
    <div className="flex flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <div className="flex-1">
        <Image src={logo} className="h-6 w-32" alt="logo" />
        <div className="text-white text-xl font-semibold mt-2">{title}</div>
      </div>

      {cartQuantityItems > 0 && (
        <Link href="/cart">
          <button className="relative">
            <div className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center absolute bottom-4 z-10 left-3">
              <div className="text-slate-900 font-bold text-xs">
                {cartQuantityItems}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-shopping-bag"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </Link>
      )}
    </div>
  );
}
