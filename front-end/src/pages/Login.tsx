import { Link } from "react-router";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Login() {
  return (
    <div className="flex h-screen justify-center bg-[#161410]">
      <div className="flex flex-col items-center justify-center gap-2">
        <Link to="/">
          <img src="/logo.png" alt="" className="mb-4" />
        </Link>
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" />
        <Button title="Login" />
        <Link to="/register" className="w-full">
          <Button title="Não tenho uma Conta" variant="outline" />
        </Link>
      </div>
    </div>
  );
}
