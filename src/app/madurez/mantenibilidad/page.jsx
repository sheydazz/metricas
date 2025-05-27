"use client"
import React, { useState } from 'react';
import { ArrowLeft, GitCompareArrows, Calculator, BarChart3, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CalculadoraMI() {
  const [cc, setCc] = useState('');
  const router = useRouter();
  const [loc, setLoc] = useState('');
  const [mi, setMi] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const calcularMI = () => {
    const complejidadCiclomatica = parseFloat(cc);
    const lineasCodigo = parseFloat(loc);
    
    if (isNaN(complejidadCiclomatica) || isNaN(lineasCodigo) || complejidadCiclomatica < 0 || lineasCodigo < 0) {
      alert('Por favor ingrese valores válidos y positivos');
      return;
    }
    
    const indiceMantenibilidad = 100 - (complejidadCiclomatica + (lineasCodigo / 10));
    setMi(Math.max(0, indiceMantenibilidad)); // Evitar valores negativos
    setShowResult(true);
  };

  const limpiar = () => {
    setCc('');
    setLoc('');
    setMi(null);
    setShowResult(false);
  };

  const obtenerColorIndicador = (valor) => {
    if (valor >= 85) return 'from-green-400 to-green-600';
    if (valor >= 65) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const obtenerTextoIndicador = (valor) => {
    if (valor >= 85) return { texto: 'Alta mantenibilidad', icono: CheckCircle, color: 'text-green-300' };
    if (valor >= 65) return { texto: 'Mantenibilidad aceptable', icono: AlertCircle, color: 'text-yellow-300' };
    return { texto: 'Difícil de mantener', icono: AlertTriangle, color: 'text-red-300' };
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 min-h-screen flex flex-col items-center justify-center p-6">
      {/* Botón Regresar */}
      <div className="w-full max-w-4xl mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-green-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Regresar
        </button>
      </div>

      {/* Título */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="bg-yellow-600/20 p-3 rounded-full">
            <GitCompareArrows size={32} className="text-yellow-300" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Índice de Mantenibilidad (MI)
          </h1>
        </div>
        
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Panel de Entrada */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Calculator size={24} />
            Datos de Entrada
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Complejidad Ciclomática (CC)
              </label>
              <input
                type="number"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                placeholder="Ej: 15"
                min="0"
                step="0.1"
                className="w-full px-4 py-3 bg-white/20 border border-blue-300/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <p className="text-blue-300 text-xs mt-1">
                Número de rutas linealmente independientes
              </p>
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Líneas de Código (LOC)
              </label>
              <input
                type="number"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                placeholder="Ej: 500"
                min="0"
                step="1"
                className="w-full px-4 py-3 bg-white/20 border border-blue-300/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <p className="text-blue-300 text-xs mt-1">
                Total de líneas de código fuente
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={calcularMI}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-yellow-500/30"
              >
                Calcular MI
              </button>
              <button
                onClick={limpiar}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors border border-white/30"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Panel de Resultados */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 size={24} />
            Resultado
          </h2>

          {!showResult ? (
            <div className="flex flex-col items-center justify-center h-64 text-blue-300">
              <GitCompareArrows size={48} className="mb-4 opacity-50" />
              <p className="text-center">
                Ingrese los valores y presione "Calcular MI" para ver el resultado
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Velocímetro */}
              <div className="text-center">
                <div className="relative mx-auto w-48 h-24 mb-4">
                  {/* Fondo del velocímetro */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-t-full opacity-30"></div>
                  
                  {/* Indicador principal */}
                  <div className={`absolute inset-2 bg-gradient-to-r ${obtenerColorIndicador(mi)} rounded-t-full flex items-end justify-center pb-4`}>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">
                        {mi?.toFixed(1)}
                      </div>
                      <div className="text-sm text-white/80">MI</div>
                    </div>
                  </div>
                </div>

                {/* Estado */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {(() => {
                    const { texto, icono: Icono, color } = obtenerTextoIndicador(mi);
                    return (
                      <>
                        <Icono size={20} className={color} />
                        <span className={`font-semibold ${color}`}>{texto}</span>
                      </>
                    );
                  })()}
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                  <div
                    className={`h-4 rounded-full bg-gradient-to-r ${obtenerColorIndicador(mi)} transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min(mi, 100)}%` }}
                  ></div>
                </div>

                {/* Escala de referencia */}
                <div className="text-xs text-blue-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      85-100: Alta
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      65-84: Aceptable
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      &lt;65: Difícil
                    </span>
                  </div>
                </div>
              </div>

              {/* Detalles del cálculo */}
              <div className="bg-white/10 rounded-lg p-4 text-sm">
                <h3 className="font-semibold text-white mb-2">Detalle del cálculo:</h3>
                <div className="text-blue-200 space-y-1">
                  <div>Complejidad Ciclomática: {cc}</div>
                  <div>Líneas de Código: {loc}</div>
                  <div>LOC/10: {(parseFloat(loc) / 10).toFixed(1)}</div>
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <strong className="text-white">
                      MI = 100 - ({cc} + {(parseFloat(loc) / 10).toFixed(1)}) = {mi?.toFixed(1)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="bg-blue-600/20 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">💡 Recomendaciones:</h3>
                <div className="text-blue-200 text-sm">
                  {mi >= 85 && "¡Excelente! El código es altamente mantenible. Continúe con las buenas prácticas."}
                  {mi >= 65 && mi < 85 && "Mantenibilidad aceptable. Considere refactorizar las partes más complejas."}
                  {mi < 65 && "Se recomienda refactorizar el código para mejorar su mantenibilidad. Reduzca la complejidad y divida en módulos más pequeños."}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}