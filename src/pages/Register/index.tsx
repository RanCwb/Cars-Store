import react, { useEffect, useContext } from "react";
import logo from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

const schema = z.object({
  email: z.string().email("Email inválido").min(1, "Email obrigatório"),
  name: z.string().min(1, "Nome obrigatório").min(1, "Nome obrigatório"),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(20, { message: "A senha deve ter no máximo 20 caracteres" })
    .min(1, { message: "Senha obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const { handleInformation } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function checkLogin() {
      await signOut(auth);
    }
    checkLogin();
  }, []);

  async function onSubmit(data: FormData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      handleInformation({
        name: data.name,
        email: data.email,
        uid: userCredential.user.uid,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log("error", error);
    }
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
              error={errors.name?.message}
              register={register}
              type="text"
              placeholder="Digite seu nome"
              name="name"
            />
          </div>
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
            Registrar
          </button>
        </form>
        <p className="text-zinc-500">
          Ja possui uma conta? <Link to={"/login"}>Clique aqui!</Link>
        </p>
      </div>
    </Container>
  );
}
