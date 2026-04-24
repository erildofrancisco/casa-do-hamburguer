import { useState } from "react";
import { CardPedido } from "../components/CardPedido";

export function Pedidos() {
  const [category, setCategory] = useState("Pendentes");

  const handleChangecategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getcategoryClass = (categoryName: string) => {
    const selectedElement =
      "rounded-md md:text-md flex h-7 w-24 items-center justify-center border-1 border-[#F2DAAC] bg-[#F2DAAC] text-sm font-bold text-[#161410] md:h-9 md:w-32 cursor-pointer";
    const noSelectedElement =
      "rounded-md md:text-md flex h-7 w-24 items-center justify-center border-1 border-[#F2DAAC] bg-[#161410] text-sm font-bold text-[#F2DAAC] hover:bg-[#F2DAAC] hover:text-[#161410] md:h-9 md:w-32 cursor-pointer";
    if (category === categoryName) {
      return selectedElement;
    } else {
      return noSelectedElement;
    }
  };

  return (
    <div className="mx-auto w-full px-3 text-white md:w-[737px] md:px-0">
      <div className="my-1 flex gap-2 md:my-3">
        <div
          className={getcategoryClass("Pendentes")}
          onClick={() => handleChangecategory("Pendentes")}
        >
          Pendentes
        </div>
        <div
          className={getcategoryClass("Retirados")}
          onClick={() => handleChangecategory("Retirados")}
        >
          Retirados
        </div>
        <div
          className={getcategoryClass("Cancelados")}
          onClick={() => handleChangecategory("Cancelados")}
        >
          Cancelados
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <CardPedido
          id={1}
          name="admin"
          date="01/01/2026"
          orderTime="10:20"
          deliveredTime="11:20"
          total={124.78}
        />
      </div>
    </div>
  );
}
