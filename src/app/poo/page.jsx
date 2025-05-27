"use client";

import { BrainCircuit, Split, Network, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MetricaPOO() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-16">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-green-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Regresar
        </button>
        <h1 className="text-5xl font-bold text-white mb-4">
          Medidor de Metricas POO
        </h1>
        <p className="text-blue-200 text-xl">
          Seleccione una opcion para comenzar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {/* Botón COMPLEJIDAD CICLOMATICA */}
        <button
          onClick={() => router.push("/poo/ciclomatica")}
          className="group bg-white/10 hover:bg-blue-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-blue-500/30"
        >
          <div className="bg-blue-600/20 group-hover:bg-white/20 p-4 rounded-full mb-4">
            <BrainCircuit
              size={40}
              className="text-blue-300 group-hover:text-white"
            />
          </div>
          <h2 className="text-white text-2xl font-bold"> Complejidad</h2>
          <p className="text-blue-200 group-hover:text-blue-100 mt-2">
            Complejidad Ciclomatica
          </p>
        </button>

        {/* Botón LCOM */}
        <button
          onClick={() => router.push("/poo/lcom")}
          className="group bg-white/10 hover:bg-purple-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-purple-500/30"
        >
          <div className="bg-purple-600/20 group-hover:bg-white/20 p-4 rounded-full mb-4">
            <Split
              size={40}
              className="text-purple-300 group-hover:text-white"
            />
          </div>
          <h2 className="text-white text-2xl font-bold">Cohesion</h2>
          <p className="text-blue-200 group-hover:text-blue-100 mt-2">LCOM</p>
        </button>

        {/* Botón CBO */}
        <button
          onClick={() => router.push("/poo/cbo")}
          className="group bg-white/10 hover:bg-green-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-green-500/30"
        >
          <div className="bg-green-600/20 group-hover:bg-white/20 p-4 rounded-full mb-4">
            <Network
              size={40}
              className="text-green-300 group-hover:text-white"
            />
          </div>
          <h2 className="text-white text-2xl font-bold"> Acoplamiento </h2>
          <p className="text-blue-200 group-hover:text-blue-100 mt-2">CBO</p>
        </button>
      </div>
   
    </div>
  );
}
