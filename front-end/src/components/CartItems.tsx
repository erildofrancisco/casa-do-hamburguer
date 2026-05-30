import { ChevronLeft, Trash } from "lucide-react";
import { formatterPrice } from "../utils/formatter";

type cartItemsProps = {
  name: string;
  price: number;
  img: string;
  id: string;
};

export const CartItems = ({ name, price, img, id }: cartItemsProps) => {
  const deleteItem = async () => {
    try {
      const response = await fetch(`http://localhost:3333/cartItems/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Erro ao realizar a requisicão");
        return;
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <img src={img} alt={name} className="w-25 rounded-md" />

      <div className="flex-1">
        <p className="text-sm font-bold uppercase">{name}</p>
        <p className="text-sm font-bold text-[#848484]">
          {formatterPrice(price)}
        </p>
        <div className="mt-1 flex items-center gap-4">
          <ChevronLeft
            size={25}
            className="cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
          />
          <p className="font-black">1</p>
          <ChevronLeft
            size={25}
            className="rotate-150 cursor-pointer rounded-md bg-[#C92A0E] p-1 text-white"
          />
        </div>
      </div>
      <Trash size={18} className="cursor-pointer" onClick={deleteItem} />
    </div>
  );
};
