import { ShoppingCart } from "lucide-react";
import type { ProductType } from "../types/Product";
import { formatterPrice } from "../utils/formatter";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function Product({
  id,
  name,
  description,
  price,
  image,
  category,
  setProducts,
}: ProductType) {
  const { user } = useContext(UserContext);

  const handleDeletProduct = async (id: number) => {
    try {
      if (!id) {
        console.log("ID nao enoviado");
        return;
      }
      const response = await fetch(`http://localhost:3333/product/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Erro ao realizar a requisicao");
        return;
      }
      getProducts();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3333/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <img
          src={image}
          alt=""
          className="h-[83px] w-[100px] md:h-[166px] md:w-[200px]"
        />
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-white uppercase md:text-lg">
              {name}
            </p>
            {user?.admin && (
              <div
                className="flex cursor-pointer items-center rounded-md border px-1 text-xs text-red-500 uppercase"
                onClick={() => handleDeletProduct(id)}
              >
                Deletar
              </div>
            )}
          </div>
          <p className="md:text-md flex-1 text-xs text-[#F2DAAC]">
            {description}
          </p>
          <div className="flex items-center justify-end gap-2">
            <p className="text-sm text-[#F2DAAC]">{formatterPrice(price)}</p>
            <ShoppingCart size={18} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
