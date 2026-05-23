import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export function Button({
  children,
  className = "",
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const styles = {
    primary: "bg-ink text-rice hover:bg-[#162733]",
    secondary: "bg-white/88 text-ink ring-1 ring-ink/10 hover:bg-white",
    ghost: "bg-transparent text-cinnabar hover:bg-cinnabar/10"
  }[variant];

  return (
    <button
      {...props}
      className={`inline-flex min-h-[52px] items-center justify-center rounded-[1.125rem] px-5 py-3 text-[15px] font-medium tracking-[0.01em] transition disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
