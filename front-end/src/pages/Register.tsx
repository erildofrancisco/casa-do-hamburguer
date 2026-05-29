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
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!email || !password || !name || !bi) {
        setError("Todas as informacoes sao obrigatorias!");
        return;
      }
      if (password !== confirmPassword) {
        setError("As senhas não coincidem!");
        return;
      }
      const response = await fetch("http://localhost:3333/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email, password, bi }),
      });
      switch (response.status) {
        case 409:
          setError("E-mail já cadastrado!");
          break;
        case 400:
          setError("Todas as informações são obrigatorias!");
          break;
        case 201:
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setBi("");
          setError("");
          break;
        case 500:
          setError("Tente novamente mais tarde");
          break;
        default:
          setError("");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <form
      className="flex h-screen justify-center bg-[#161410]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img src="/logo.png" alt="" className="mx-auto mb-4" />
        </Link>
        <Input
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input
          placeholder="Confirme sua Senha"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <Input
          placeholder="BI"
          onChange={(e) => setBi(e.target.value)}
          value={bi}
        />
        <p className="font-bold text-red-500">{error}</p>
        <div className="mt-3 flex w-full flex-col gap-2">
          <Button title="Criar conta" type="submit" />
          <Link to="/login" className="w-full">
            <Button title="Ja tenho uma conta" variant="outline" />
          </Link>
        </div>
      </div>
    </form>
  );
}
