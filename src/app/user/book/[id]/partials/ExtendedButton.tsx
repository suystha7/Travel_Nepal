import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ButtonProps {
  text?: string;
  variant?: "default" | "outline";
  className?: string;
  type?: "button" | "submit";
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  loadingText?: string;
}
const ExtendedButton = ({
  text = "",
  variant = "outline",
  className,
  type,
  isLoading,
  onClick,
  disabled,
  loadingText,
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "px-5 py-3 bg-primary-500 rounded-3xl text-white hover:bg-primary-400 hover:text-white typography-extra-large-body font-medium shadow-[0px_2px_4px_-2px_#0000001A] shadow-[0px_4px_6px_-1px_#0000001A]",
        {
          "opacity-80": isLoading,
        },
        className
      )}
      type={type || "button"}
      variant={variant}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span className="flex space-x-1">
          <Loader2 className="mr-1 animate-spin" /> {loadingText}
        </span>
      ) : (
        <>
          <span className="flex justify-center items-center gap-1">{text}</span>
        </>
      )}
    </Button>
  );
};

export default ExtendedButton;
