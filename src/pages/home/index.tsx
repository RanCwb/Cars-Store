import { Container } from "../../components/container";

export function Home() {
  return (
    <Container>
      <section className="w-full  bg-white max-w-3xl mx-auto flex justify-center items-center gap-2 p-4 rounded-md">
        <input
          className="w-full border-2 rounded-md px-3 h-9 outline-none border-gray-200"
          placeholder="Digite nome do veículo"
          type="text"
        />
        <button className="bg-red-700 text-white rounded-md px-3 h-9  font-medium text-lg">
          Buscar
        </button>
      </section>

      <h1 className="text-3xl mt-6 font-bold text-center">
        Carros novos e usados em todo Brasil!
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
        <section className="w-full bg-white rounded-lg">
          <img
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202409/20240926/peugeot-408-2.0-allure-16v-flex-4p-manual-wmimagem22124235528.jpg?s=fill&w=552&h=414&q=60"
            alt="car"
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 hover:shadow-2xl transition-all"
          />
          <p className="font-bold mt-1 mb-2 px-2">PEUGEOUT DO VITAO</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">2014 | 2.0 | MANUAL</span>
            <strong className="text-black font-medium">1.000.000</strong>
          </div>

          <div className="w-full h-px bg-slate-400 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-700">Curitiba - PR</span>
          </div>
        </section>
        <section className="w-full bg-white rounded-lg">
          <img
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202409/20240926/peugeot-408-2.0-allure-16v-flex-4p-manual-wmimagem22124235528.jpg?s=fill&w=552&h=414&q=60"
            alt="car"
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 hover:shadow-2xl transition-all"
          />
          <p className="font-bold mt-1 mb-2 px-2">PEUGEOUT DO VITAO</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">2014 | 2.0 | MANUAL</span>
            <strong className="text-black font-medium">1.000.000</strong>
          </div>

          <div className="w-full h-px bg-slate-400 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-700">Curitiba - PR</span>
          </div>
        </section>
      </main>
    </Container>
  );
}
