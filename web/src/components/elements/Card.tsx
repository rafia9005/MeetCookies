import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardProps) => {
  return <div className={clsx("border-b p-4", className)}>{children}</div>;
};

export const CardContent = ({ children, className }: CardProps) => {
  return <div className={clsx("p-4", className)}>{children}</div>;
};

export const CardFooter = ({ children, className }: CardProps) => {
  return <div className={clsx("p-4", className)}>{children}</div>;
};

const Card = ({ children, className }: CardProps) => {
  return <div className={clsx("rounded-md shadow-sm", className)}>{children}</div>;
};

export default Card;

