import { useEffect, useState } from "react";
import { Product } from "../components/Product";
import type { ProductType } from "../types/Product";

export function Home() {
  const [category, setCategory] = useState("Hambuguers");
  const [products, setProducts] = useState<ProductType[]>([]);

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
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

  /**
   * para filtrar productos por categoria eu nem preciso
   * fazer chamadas a api, posso apenas manipular o array
   */
  const filteredProducts = products.filter((product) => {
    return product.category === category;
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProducts();
  }, []);

  return (
    <div className="mx-auto w-full px-3 md:w-[737px] md:px-0">
      <div className="my-1 flex gap-2 md:my-3">
        <div
          className={getCategoryClass("Hambuguers")}
          onClick={() => handleChangeCategory("Hambuguers")}
        >
          Hamburguer
        </div>
        <div
          className={getCategoryClass("Bebidas")}
          onClick={() => handleChangeCategory("Bebidas")}
        >
          Bebidas
        </div>
        <div
          className={getCategoryClass("Porções")}
          onClick={() => handleChangeCategory("Porções")}
        >
          Porções
        </div>
      </div>

      <p className="mt-2 mb-2 font-bold text-[#F2DAAC] uppercase">{category}</p>
      <div className="flex flex-col gap-2 md:gap-3">
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            category={product.category}
            setProducts={setProducts}
          />
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-white">Não há produto para essa categoria</p>
        )}
      </div>
    </div>
  );
}
