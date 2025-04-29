'use client'

import { BarChart, Activity, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaginaInicio() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-4">Medidor de Métricas</h1>
        <p className="text-blue-200 text-xl">Seleccione una categoría para comenzar</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {/* Botón LOC */}
        <button onClick={() => router.push('/loc')} className="group bg-white/10 hover:bg-blue-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-blue-500/30">
          <div className="bg-blue-600/20 group-hover:bg-white/20 p-4 rounded-full mb-4">
            <BarChart size={40} className="text-blue-300 group-hover:text-white" />
          </div>
          <h2 className="text-white text-2xl font-bold">LOC</h2>
          <p className="text-blue-200 group-hover:text-blue-100 mt-2">Líneas de Código</p>
        </button>
        
        {/* Botón Puntos por Función */}
        <button onClick={() => router.push('/funcion')} className="group bg-white/10 hover:bg-purple-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-purple-500/30">
          <div className="bg-purple-600/20 group-hover:bg-white/20 p-4 rounded-full mb-4">
            <Activity size={40} className="text-purple-300 group-hover:text-white" />
          </div>
          <h2 className="text-white text-2xl font-bold">Puntos por Función</h2>
          <p className="text-blue-200 group-hover:text-blue-100 mt-2">Métricas funcionales</p>
        </button>
        
        {/* Botón Experiencia Usuario */}
        <button onClick={() => router.push('/user')} className="group bg-white/10 hover:bg-green-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-green-500/30">
          <div className="bg-green-600/20 group-hover:bg-white/20 p-4 rounded-full mb-4">
            <Users size={40} className="text-green-300 group-hover:text-white" />
          </div>
          <h2 className="text-white text-2xl font-bold">Experiencia Usuario</h2>
          <p className="text-blue-200 group-hover:text-blue-100 mt-2">Métricas de UX</p>
        </button>
      </div>
      
     
    </div>
  );
}