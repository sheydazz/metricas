"use client";

import { useState } from "react";
import { BrainCircuit, ArrowLeft, Calculator, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ComplejidadCiclomatica() {
  const router = useRouter();
  const [edges, setEdges] = useState("");
  const [nodes, setNodes] = useState("");
  const [components, setComponents] = useState("1");
  const [result, setResult] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const calculateComplexity = () => {
    const E = parseInt(edges) || 0;
    const N = parseInt(nodes) || 0;
    const P = parseInt(components) || 1;
    
    if (E === 0 && N === 0) {
      alert("Por favor, ingresa al menos el número de nodos y aristas");
      return;
    }

    const M = E - N + (2 * P);
    setResult({ E, N, P, M });
  };

  const resetCalculator = () => {
    setEdges("");
    setNodes("");
    setComponents("1");
    setResult(null);
  };

  const getComplexityLevel = (M) => {
    if (M <= 10) return { level: "Baja", color: "text-green-400", bg: "bg-green-500/20" };
    if (M <= 20) return { level: "Moderada", color: "text-yellow-400", bg: "bg-yellow-500/20" };
    if (M <= 50) return { level: "Alta", color: "text-orange-400", bg: "bg-orange-500/20" };
    return { level: "Muy Alta", color: "text-red-400", bg: "bg-red-500/20" };
  };

  return (
    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Regresar
        </button>
        
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-3 rounded-full">
            <BrainCircuit size={32} className="text-blue-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Complejidad Ciclomática</h1>
            <p className="text-blue-200">Métrica de McCabe</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Panel de Información */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Info size={24} className="text-blue-300" />
            <h2 className="text-xl font-bold text-white">¿Qué es la Complejidad Ciclomática?</h2>
          </div>
          
          <div className="text-blue-100 space-y-4">
            <p>
              La <strong>complejidad ciclomática</strong> (McCabe) mide la complejidad lógica de un programa 
              calculando cuántos caminos de ejecución independientes existen.
            </p>
            
            <div className="bg-blue-900/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">Fórmula:</h3>
              <div className="text-center text-2xl font-mono text-blue-200 mb-2">
                M = E - N + 2P
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-green-600/20 rounded-lg p-3">
                <strong className="text-green-300">E (Aristas):</strong> Número de transiciones posibles entre sentencias
              </div>
              <div className="bg-purple-600/20 rounded-lg p-3">
                <strong className="text-purple-300">N (Nodos):</strong> Número de bloques de código o decisiones
              </div>
              <div className="bg-orange-600/20 rounded-lg p-3">
                <strong className="text-orange-300">P (Componentes):</strong> Número de componentes conexos (usualmente 1)
              </div>
            </div>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-blue-300 hover:text-white transition-colors underline"
            >
              {showExplanation ? "Ocultar" : "Ver"} interpretación de resultados
            </button>
            
            {showExplanation && (
              <div className="bg-blue-900/30 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-400">1-10:</span>
                  <span>Complejidad Baja (Simple)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-400">11-20:</span>
                  <span>Complejidad Moderada</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-400">21-50:</span>
                  <span>Complejidad Alta (Riesgoso)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400">&gt;50:</span>
                  <span>Complejidad Muy Alta (Crítico)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel de Calculadora */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Calculator size={24} className="text-blue-300" />
            <h2 className="text-xl font-bold text-white">Calculadora</h2>
          </div>

          <div className="space-y-6">
            {/* Inputs */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-blue-200 font-medium mb-2">
                  Aristas (E) - Transiciones
                </label>
                <input
                  type="number"
                  value={edges}
                  onChange={(e) => setEdges(e.target.value)}
                  className="w-full bg-white/10 border border-blue-300/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                  placeholder="Ej: 9"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-blue-200 font-medium mb-2">
                  Nodos (N) - Bloques de código
                </label>
                <input
                  type="number"
                  value={nodes}
                  onChange={(e) => setNodes(e.target.value)}
                  className="w-full bg-white/10 border border-blue-300/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                  placeholder="Ej: 8"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-blue-200 font-medium mb-2">
                  Componentes (P) - Componentes conexos
                </label>
                <input
                  type="number"
                  value={components}
                  onChange={(e) => setComponents(e.target.value)}
                  className="w-full bg-white/10 border border-blue-300/30 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                  placeholder="1"
                  min="1"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={calculateComplexity}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Calculator size={20} />
                Calcular
              </button>
              <button
                onClick={resetCalculator}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Limpiar
              </button>
            </div>

            {/* Resultado */}
            {result && (
              <div className="bg-gradient-to-r from-blue-800/50 to-purple-800/50 rounded-lg p-6 border border-blue-400/30">
                <h3 className="text-xl font-bold text-white mb-4">Resultado</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-blue-100">
                    <span>Fórmula:</span>
                    <span className="font-mono">M = E - N + 2P</span>
                  </div>
                  <div className="flex justify-between text-blue-100">
                    <span>Sustitución:</span>
                    <span className="font-mono">M = {result.E} - {result.N} + 2({result.P})</span>
                  </div>
                  <div className="border-t border-blue-400/30 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Complejidad Ciclomática:</span>
                      <span className="text-3xl font-bold text-blue-300">{result.M}</span>
                    </div>
                  </div>
                </div>

                {/* Interpretación */}
                <div className={`${getComplexityLevel(result.M).bg} rounded-lg p-4`}>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Nivel de Complejidad:</span>
                    <span className={`font-bold text-lg ${getComplexityLevel(result.M).color}`}>
                      {getComplexityLevel(result.M).level}
                    </span>
                  </div>
                  <p className="text-blue-100 text-sm mt-2">
                    Se requieren mínimo <strong>{result.M} pruebas</strong> para cubrir todos los caminos de ejecución.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}