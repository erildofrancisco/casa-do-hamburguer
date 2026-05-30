import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { Box, LayoutDashboard, LogOut, Plus, ShoppingCart } from "lucide-react";
import { Cart } from "./Cart";
import { CartItemContext } from "../contexts/CartItemsContext";

export function Header() {
  const { user, setUser } = useContext(UserContext);
  const { cartItems } = useContext(CartItemContext);
  const [showCart, setShowCart] = useState<boolean>(false);
  const location = useLocation();

  const handleAuthUser = async () => {
    try {
      const response = await fetch("http://localhost:3333/me", {
        credentials: "include",
      });
      if (response.status !== 200) {
        console.log("Deu ruim");
        return;
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3333/logout", {
        credentials: "include",
        method: "POST",
      });
      if (!response.ok) {
        console.log("Nao deu certo");
        return;
      }
      setUser(null);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  //handleAuthUser() - se eu chamar a funcao assim ela vai ficar em loop infinito, e por isso que preciso usar o useEffect
  useEffect(() => {
    handleAuthUser();
  }, []);

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border";
    if (location.pathname == path) {
      return `${baseClass} bg-[#F2DAAC] text-[#161410]`;
    }
    return baseClass;
  };

  return (
    <div className="bg-[#161410]">
      {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-184.25 md:p-0">
        <Link to="/">
          <img src="/logo.png" alt="" />
        </Link>
        {user ? (
          <div className="hidden items-center gap-8 text-white md:flex">
            {user.admin && (
              <div className="flex items-center gap-2 text-[#F2DAAC]">
                <Link to="/">
                  <div className={getNavItemClass("/")}>
                    <Box size={18} />
                  </div>
                </Link>
                <Link to="/pedidos">
                  <div className={getNavItemClass("/pedidos")}>
                    <LayoutDashboard size={18} />
                  </div>
                </Link>
                <div className="flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border">
                  <Plus size={18} />
                </div>
              </div>
            )}
            <div className="relative cursor-pointer">
              <ShoppingCart size={18} onClick={() => setShowCart(!showCart)} />
              <p className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] text-[#161410]">
                {cartItems.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p>{user.name}</p>
              <LogOut
                size={18}
                className="cursor-pointer"
                onClick={() => handleLogout()}
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-8.75 w-32.5 cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
