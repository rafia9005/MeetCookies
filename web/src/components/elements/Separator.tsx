import clsx from "clsx";

interface SeparatorProps {
  className?: string;
}

const Separator = ({ className }: SeparatorProps) => {
  return <hr className={clsx("border-t border-gray-200", className)} />;
};

export default Separator;

