import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

type ButtonTextProps = {
  children: ReactNode;
};

type ButtonIconProps = {
  children: ReactNode;
};

function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      {...rest}
    >
      {children}
    </button>
  );
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <div className="text-black font-semibold text-base mx-2">{children}</div>
  );
}

function ButtonIcon({ children }: ButtonIconProps) {
  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
