import { useState } from "react";
import { Input } from "../components/Input";
import { Link } from "react-router";
import { Button } from "../components/Button";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bi, setBi] = useState("");
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <form
      className="flex h-screen justify-center bg-[#161410]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Link to="/">
          <img src="/logo.png" alt="" className="mb-4" />
        </Link>
        <Input placeholder="Nome" onChange={(e) => setName(e.target.value)} />
        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Confirme sua Senha"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Input placeholder="BI" onChange={(e) => setBi(e.target.value)} />
        <Button title="Criar conta" />
        <Link to="/login" className="w-full">
          <Button title="Ja tenho uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
}
