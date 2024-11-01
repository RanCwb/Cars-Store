import react from "react";
import logo from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Email inválido").min(1, "Email obrigatório"),
  password: z.string().min(1, { message: "Senha obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <div className="w-full min-h-screen flex-col flex justify-center items-center gap-4">
        <Link className="mb-8 max-w-sm w-full" to={"/login"}>
          <img className="w-full" src={logo} alt=" logo" />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full max-w-xl rounded-lg p-4"
        >
          <div className="mb-3">
            <Input
              error={errors.email?.message}
              type="text"
              placeholder="Digite seu email"
              name="email"
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              error={errors.password?.message}
              register={register}
              type="password"
              placeholder="Digite sua senha"
              name="password"
            />
          </div>
          <button
            type="submit"
            className="bg-red-700 text-white rounded-md px-3 h-9  font-medium text-lg w-full hover:bg-red-600"
          >
            Entrar
          </button>
        </form>
        <p className="text-zinc-500">
          Não possui uma conta? <Link to={"/register"}>Cadastre-se</Link>
        </p>
      </div>
    </Container>
  );
}
