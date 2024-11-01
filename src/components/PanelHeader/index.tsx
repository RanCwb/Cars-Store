import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

async function handleLogout() {
  await signOut(auth);
}

export function PanelHeader() {
  return (
    <div className="w-full flex items-center  bg-red-700 rounded-lg gap-4 h-10 text-white font-medium px-4">
      <Link to={"/"}>Inicío</Link>
      <Link to={"/"}>Cadastrar veículo</Link>

      <button className="ml-auto" onClick={handleLogout}>
        <span>Sair</span>
      </button>
    </div>
  );
}
