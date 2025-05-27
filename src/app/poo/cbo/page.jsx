"use client";

import { useState } from "react";
import { Network, ArrowLeft, Calculator, Info, Plus, X, Link, Target } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CBOCalculator() {
  const router = useRouter();
  const [className, setClassName] = useState("");
  const [coupledClasses, setCoupledClasses] = useState([]);
  const [result, setResult] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [cbo, setCbo] = useState(0);


  const calculateCBO = () => {
    if (!className.trim()) {
      alert("Por favor, ingresa el nombre de la clase a evaluar");
      return;
    }

    const CBO = cbo
    setResult({ className: className.trim(), CBO, coupledClasses: [...coupledClasses] });
  };

  const resetCalculator = () => {
    setClassName("");
    setCoupledClasses([]);
    setNewClass("");
    setResult(null);
  };

  const getCouplingLevel = (CBO) => {
    if (CBO === 0) {
      return { 
        level: "Sin Acoplamiento", 
        color: "text-blue-400", 
        bg: "bg-blue-500/20",
        description: "Clase independiente, excelente para reutilización."
      };
    } else if (CBO <= 3) {
      return { 
        level: "Acoplamiento Bajo", 
        color: "text-green-400", 
        bg: "bg-green-500/20",
        description: "Buen nivel de acoplamiento, fácil de mantener."
      };
    } else if (CBO <= 6) {
      return {
        level: "Acoplamiento Moderado",
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
        description: "Nivel aceptable, pero considera revisar dependencias."
      };
    } else if (CBO <= 10) {
      return {
        level: "Acoplamiento Alto",
        color: "text-orange-400",
        bg: "bg-orange-500/20",
        description: "Alto acoplamiento, dificulta mantenimiento y testing."
      };
    } else {
      return {
        level: "Acoplamiento Muy Alto",
        color: "text-red-400",
        bg: "bg-red-500/20",
        description: "Acoplamiento crítico, refactorización urgente necesaria."
      };
    }
  };

  const couplingTypes = [
    "Uso de atributos/métodos",
    "Instanciación de objetos",
    "Herencia (extends)",
    "Referencias en parámetros",
    "Variables locales",
    "Tipos de retorno",
    "Llamadas directas a métodos"
  ];

  return (
    <div className="bg-gradient-to-br from-green-700 to-teal-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-green-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Regresar
        </button>
        
        <div className="flex items-center gap-3">
          <div className="bg-green-600/20 p-3 rounded-full">
            <Network size={32} className="text-green-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Métrica CBO</h1>
            <p className="text-green-200">Coupling Between Objects</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Panel de Información */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Info size={24} className="text-green-300" />
            <h2 className="text-xl font-bold text-white">¿Qué es CBO?</h2>
          </div>
          
          <div className="text-green-100 space-y-4">
            <p>
              <strong>CBO (Coupling Between Objects)</strong> mide cuántas clases externas 
              están relacionadas o acopladas a una clase determinada, afectando la 
              mantenibilidad y reutilización del código.
            </p>
            
            <div className="bg-green-900/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">Fórmula:</h3>
              <div className="text-center text-lg font-mono text-green-200 mb-2">
                CBO = Número de clases externas acopladas
              </div>
            </div>

            <div className="bg-green-900/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-3">🔍 ¿Qué cuenta como acoplamiento?</h3>
              <div className="space-y-2">
                {couplingTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Link size={14} className="text-green-300 flex-shrink-0" />
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-green-300 hover:text-white transition-colors underline"
            >
              {showExplanation ? "Ocultar" : "Ver"} interpretación de resultados
            </button>
            
            {showExplanation && (
              <div className="bg-green-900/30 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-white mb-2">Interpretación:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-bold">CBO = 0:</span>
                    <span>Sin acoplamiento</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 font-bold">CBO 1-3:</span>
                    <span>Acoplamiento bajo (ideal)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-bold">CBO 4-6:</span>
                    <span>Acoplamiento moderado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-400 font-bold">CBO 7-10:</span>
                    <span>Acoplamiento alto</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 font-bold">CBO &gt; 10:</span>
                    <span>Acoplamiento muy alto</span>
                  </div>
                </div>
        
              </div>
            )}
          </div>
        </div>

        {/* Panel de Calculadora */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Calculator size={24} className="text-green-300" />
            <h2 className="text-xl font-bold text-white">Calculadora</h2>
          </div>

          <div className="space-y-6">
            {/* Ejemplo Visual */}
            <div className="bg-green-900/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">Ejemplo:</h3>
              <div className="text-sm text-green-100 space-y-1">
                <p><strong>Clase:</strong> Producto</p>
                <p><strong>Acoplada con:</strong> Carrito, Electrodoméstico, Alimento, Ropa</p>
                <p><strong>CBO =</strong> 4</p>
              </div>
            </div>

            {/* Input para nombre de clase */}
            <div>
              <label className=" text-green-200 font-medium mb-2 flex items-center gap-2">
                <Target size={16} className="text-green-300" />
                Nombre de la clase a evaluar
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full bg-white/10 border border-green-300/30 rounded-lg px-4 py-3 text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                placeholder="Ej: Producto, Usuario, etc."
              />
            </div>

            {/* Agregar clases acopladas */}
            <div>
              <label className=" text-green-200 font-medium mb-2 flex items-center gap-2">
                <Network size={16} className="text-green-300" />
                Clases externas acopladas
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={cbo}
                  onChange={(e) => setCbo(e.target.value)}
                  className="flex-1 bg-white/10 border border-green-300/30 rounded-lg px-4 py-3 text-white placeholder-green-300 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                  placeholder="Nombre de clase acoplada"
                />
               
              </div>
            </div>

           

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={calculateCBO}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Calculator size={20} />
                Calcular CBO
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
              <div className="bg-gradient-to-r from-green-800/50 to-teal-800/50 rounded-lg p-6 border border-green-400/30">
                <h3 className="text-xl font-bold text-white mb-4">Resultado</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-green-100">
                    <span>Clase evaluada:</span>
                    <span className="font-bold text-white">{result.className}</span>
                  </div>
                  <div className="flex justify-between text-green-100">
                    <span>Clases externas acopladas:</span>
                    <span className="font-mono">{cbo}</span>
                  </div>
                  <div className="border-t border-green-400/30 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Métrica CBO:</span>
                      <span className="text-3xl font-bold text-green-300">{result.CBO}</span>
                    </div>
                  </div>
                </div>

               

                {/* Interpretación */}
                <div className={`${getCouplingLevel(result.CBO).bg} rounded-lg p-4`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Nivel de Acoplamiento:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCouplingLevel(result.CBO).emoji}</span>
                      <span className={`font-bold text-lg ${getCouplingLevel(result.CBO).color}`}>
                        {getCouplingLevel(result.CBO).level}
                      </span>
                    </div>
                  </div>
                  <p className="text-green-100 text-sm mb-2">
                    {getCouplingLevel(result.CBO).description}
                  </p>
                  
                  {result.CBO > 6 && (
                    <div className="mt-3 p-3 bg-green-900/30 rounded-lg">
                      <p className="text-sm text-green-100">
                        <strong>Recomendaciones:</strong>
                      </p>
                      <ul className="text-sm text-green-100 mt-1 space-y-1">
                        <li>• Aplicar el patrón Dependency Injection</li>
                        <li>• Usar interfaces para reducir dependencias directas</li>
                        <li>• Considerar dividir la clase en clases más pequeñas</li>
                        <li>• Revisar si todas las dependencias son necesarias</li>
                      </ul>
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