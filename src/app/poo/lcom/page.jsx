"use client";

import { useState } from "react";
import { Split, ArrowLeft, Calculator, Info, Users, Link2, Unlink2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LCOMCalculator() {
  const router = useRouter();
  const [paresNoComparten, setParesNoComparten] = useState("");
  const [paresSiComparten, setParesSiComparten] = useState("");
  const [result, setResult] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const calculateLCOM = () => {
    const P = parseInt(paresNoComparten) || 0;
    const Q = parseInt(paresSiComparten) || 0;
    
    if (P === 0 && Q === 0) {
      alert("Por favor, ingresa al menos uno de los valores");
      return;
    }

    const LCOM = P - Q;
    setResult({ P, Q, LCOM });
  };

  const resetCalculator = () => {
    setParesNoComparten("");
    setParesSiComparten("");
    setResult(null);
  };

  const getCohesionLevel = (LCOM) => {
    if (LCOM === 0) {
      return { 
        level: "Alta Cohesión", 
        color: "text-green-400", 
        bg: "bg-green-500/20",
        description: "¡Excelente! Los métodos están bien cohesionados."
      };
    } else if (LCOM > 0) {
      const intensity = LCOM <= 5 ? "Moderada" : LCOM <= 10 ? "Alta" : "Muy Alta";
      return {
        level: `Baja Cohesión (${intensity})`,
        color: LCOM <= 5 ? "text-yellow-400" : LCOM <= 10 ? "text-orange-400" : "text-red-400",
        bg: LCOM <= 5 ? "bg-yellow-500/20" : LCOM <= 10 ? "bg-orange-500/20" : "bg-red-500/20",
        description: "Considera refactorizar la clase para mejorar la cohesión."
      };
    } else {
      return {
        level: "Cohesión Superior",
        color: "text-blue-400",
        bg: "bg-blue-500/20",  
        description: "Excelente cohesión entre métodos."
      };
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-indigo-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Regresar
        </button>
        
        <div className="flex items-center gap-3">
          <div className="bg-purple-600/20 p-3 rounded-full">
            <Split size={32} className="text-purple-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Métrica LCOM</h1>
            <p className="text-purple-200">Lack of Cohesion in Methods</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Panel de Información */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Info size={24} className="text-purple-300" />
            <h2 className="text-xl font-bold text-white">¿Qué es LCOM?</h2>
          </div>
          
          <div className="text-purple-100 space-y-4">
            <p>
              <strong>LCOM (Lack of Cohesion in Methods)</strong> mide cuán relacionados están 
              los métodos entre sí dentro de una clase, basándose en los atributos que comparten.
            </p>
            
            <div className="bg-purple-900/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">Fórmula:</h3>
              <div className="text-center text-2xl font-mono text-purple-200 mb-2">
                LCOM = |P| - |Q|
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-red-600/20 rounded-lg p-3 flex items-center gap-3">
                <Unlink2 size={20} className="text-red-300 flex-shrink-0" />
                <div>
                  <strong className="text-red-300">P:</strong> Pares de métodos que <strong>NO comparten</strong> atributos
                </div>
              </div>
              <div className="bg-green-600/20 rounded-lg p-3 flex items-center gap-3">
                <Link2 size={20} className="text-green-300 flex-shrink-0" />
                <div>
                  <strong className="text-green-300">Q:</strong> Pares de métodos que <strong>SÍ comparten</strong> atributos
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-purple-300 hover:text-white transition-colors underline"
            >
              {showExplanation ? "Ocultar" : "Ver"} interpretación de resultados
            </button>
            
            {showExplanation && (
              <div className="bg-purple-900/30 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-white mb-2">Interpretación:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 font-bold">LCOM = 0:</span>
                    <span>Alta cohesión (ideal)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-bold">LCOM 1-5:</span>
                    <span>Baja cohesión moderada</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-400 font-bold">LCOM 6-10:</span>
                    <span>Baja cohesión alta</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 font-bold">LCOM &gt; 10:</span>
                    <span>Baja cohesión muy alta</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold">LCOM &lt; 0:</span>
                    <span> Cohesión superior</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel de Calculadora */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Calculator size={24} className="text-purple-300" />
            <h2 className="text-xl font-bold text-white">Calculadora</h2>
          </div>

          <div className="space-y-6">
            {/* Ejemplo Visual */}
            <div className="bg-purple-900/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">Ejemplo:</h3>
              <div className="text-sm text-purple-100 space-y-1">
                <p>• Si tienes 3 métodos: method1, method2, method3</p>
                <p>• Pares posibles: (1,2), (1,3), (2,3) = 3 pares totales</p>
                <p>• Si solo (1,2) comparte atributos: P=2, Q=1</p>
                <p>• LCOM = 2 - 1 = 1</p>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className=" text-purple-200 font-medium mb-2 flex items-center gap-2">
                  <Unlink2 size={16} className="text-red-300" />
                  Pares que NO comparten atributos (P)
                </label>
                <input
                  type="number"
                  value={paresNoComparten}
                  onChange={(e) => setParesNoComparten(e.target.value)}
                  className="w-full bg-white/10 border border-purple-300/30 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                  placeholder="Ej: 2"
                  min="0"
                />
              </div>

              <div>
                <label className=" text-purple-200 font-medium mb-2 flex items-center gap-2">
                  <Link2 size={16} className="text-green-300" />
                  Pares que SÍ comparten atributos (Q)
                </label>
                <input
                  type="number"
                  value={paresSiComparten}
                  onChange={(e) => setParesSiComparten(e.target.value)}
                  className="w-full bg-white/10 border border-purple-300/30 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                  placeholder="Ej: 1"
                  min="0"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={calculateLCOM}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Calculator size={20} />
                Calcular LCOM
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
              <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-lg p-6 border border-purple-400/30">
                <h3 className="text-xl font-bold text-white mb-4">Resultado</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-purple-100">
                    <span>Fórmula:</span>
                    <span className="font-mono">LCOM = |P| - |Q|</span>
                  </div>
                  <div className="flex justify-between text-purple-100">
                    <span>Sustitución:</span>
                    <span className="font-mono">LCOM = {result.P} - {result.Q}</span>
                  </div>
                  <div className="border-t border-purple-400/30 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Métrica LCOM:</span>
                      <span className="text-3xl font-bold text-purple-300">{result.LCOM}</span>
                    </div>
                  </div>
                </div>

                {/* Interpretación */}
                <div className={`${getCohesionLevel(result.LCOM).bg} rounded-lg p-4`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Nivel de Cohesión:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCohesionLevel(result.LCOM).emoji}</span>
                      <span className={`font-bold text-lg ${getCohesionLevel(result.LCOM).color}`}>
                        {getCohesionLevel(result.LCOM).level}
                      </span>
                    </div>
                  </div>
                  <p className="text-purple-100 text-sm">
                    {getCohesionLevel(result.LCOM).description}
                  </p>
                  
                  {result.LCOM > 0 && (
                    <div className="mt-3 p-3 bg-purple-900/30 rounded-lg">
                      <p className="text-sm text-purple-100">
                        <strong>Recomendación:</strong> Considera dividir la clase en clases más pequeñas 
                        o revisar si los métodos realmente pertenecen a la misma responsabilidad.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}