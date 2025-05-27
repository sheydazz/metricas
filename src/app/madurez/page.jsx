"use client";

import { BrainCircuit, Split, Network, ArrowLeft,BarChart,SquareStack,GitCompareArrows } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MetricaPOO() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 min-h-screen flex flex-col items-center justify-center p-6">
     <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-green-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Regresar
        </button>
      <div className="text-center mb-16">
        
        <h1 className="text-5xl font-bold text-white mb-4">
          Medidor de indice de madurez
        </h1>
        <p className="text-blue-200 text-xl">
          Seleccione una opcion para comenzar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
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

        {/* Botón LOC */}
        <button
          onClick={() => router.push("/loc")}
          className="group bg-white/10 hover:bg-purple-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-purple-500/30"
        >
          <div className="bg-purple-600/20 group-hover:bg-white/20 p-4 rounded-full mb-4">
            <BarChart
              size={40}
              className="text-purple-300 group-hover:text-white"
            />
          </div>
          <h2 className="text-white text-2xl font-bold">Densidad de Errores en mantenimiento</h2>
          <p className="text-blue-200 group-hover:text-blue-100 mt-2">LOC</p>
        </button>

        {/* Botón Frecuencia de cambio por módulo */}
        <button
          onClick={() => router.push("/madurez/frecuencia")}
          className="group bg-white/10 hover:bg-green-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-green-500/30"
        >
          <div className="bg-green-600/20 group-hover:bg-white/20 p-4 rounded-full mb-4">
            <SquareStack
              size={40}
              className="text-green-300 group-hover:text-white"
            />
          </div>
          <h2 className="text-white text-2xl font-bold"> Frecuencia de cambio por módulo  </h2>
          <p className="text-blue-200 group-hover:text-blue-100 mt-2">CBO</p>
        </button>
         {/* Botón Maintainability Index (MI) –*/}
         <button
          onClick={() => router.push("/madurez/mantenibilidad")}
          className="group bg-white/10 hover:bg-yellow-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-yellow-500/30"
        >
          <div className="bg-yellow-600/20 group-hover:bg-white/20 p-4 rounded-full mb-4">
            <GitCompareArrows
              size={40}
              className="text-yellow-300 group-hover:text-white"
            />
          </div>
          <h2 className="text-white text-2xl font-bold"> Indice de mantenibilidad(MI)  </h2>
          <p className="text-blue-200 group-hover:text-blue-100 mt-2">MI</p>
        </button>
      </div>
   
    </div>
  );
}
