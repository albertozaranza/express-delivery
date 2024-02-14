import Link, { LinkProps } from "next/link";

type LinkButtonProps = LinkProps<string> & {
  title: string;
};

export function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link
      className="text-slate-300 text-center text-base font-regular"
      {...rest}
    >
      {title}
    </Link>
  );
}
