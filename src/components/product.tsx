import { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

type ProductDataProps = {
  title: string;
  description: string;
  thumbnail: StaticImport;
  quantity?: number;
};

type ProductProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  data: ProductDataProps;
};

export const Product = ({ data, ...rest }: ProductProps) => {
  return (
    <button className="w-full flex flex-row items-center pb-4" {...rest}>
      <Image
        src={data.thumbnail}
        className="w-20 h-20 rounded-md"
        alt="image"
      />

      <div className="ml-3">
        <div className="flex-row items-center">
          <div className="text-slate-100 font-medium text-base flex flex-1">
            {data.title}
          </div>

          {data.quantity && (
            <div className="text-slate-400 font-medium text-sm">
              x {data.quantity}
            </div>
          )}
        </div>

        <div className="text-slate-400 text-xs leading-5 mt-0.5">
          {data.description}
        </div>
      </div>
    </button>
  );
};
