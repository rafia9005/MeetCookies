import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const classes = clsx(
    "w-full rounded-md border border-input bg-muted/50 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary",
    className
  );

  return <input ref={ref} className={classes} {...props} />;
});

Input.displayName = "Input";

export default Input;

