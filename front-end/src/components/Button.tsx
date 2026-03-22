type buttonType = {
  title: string;
  variant?: "default" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ title, variant = "default", ...props }: buttonType) {
  //w-full cursor-pointer rounded-md border-1 border-[#C92A0E] bg-[#C92A0E] py-2 text-sm text-white
  const buttonVariant = () => {
    if (variant === "default") {
      return "w-full cursor-pointer rounded-md border-1 border-[#C92A0E] bg-[#C92A0E] py-2 text-sm text-white";
    } else if (variant === "outline") {
      return "w-full cursor-pointer rounded-md border-1 border-[#C92A0E] bg-white py-2 text-sm text-[#C92A0E]";
    }
  };
  return (
    <button {...props} className={buttonVariant()}>
      {title}
    </button>
  );
}
