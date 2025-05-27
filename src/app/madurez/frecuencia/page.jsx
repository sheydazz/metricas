"use client"
import React, { useState } from 'react';
import { ArrowLeft, SquareStack, Calculator, BarChart3, AlertTriangle, CheckCircle, AlertCircle, Clock, Percent } from 'lucide-react';

export default function CalculadoraFrecuenciaCambio() {
  const [cambiosModulo, setCambiosModulo] = useState('');
  const [periodoTiempo, setPeriodoTiempo] = useState('');
  const [unidadTiempo, setUnidadTiempo] = useState('meses');
  const [cambiosTotales, setCambiosTotales] = useState('');
  const [frecuenciaAbsoluta, setFrecuenciaAbsoluta] = useState(null);
  const [frecuenciaRelativa, setFrecuenciaRelativa] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const calcularFrecuencia = () => {
    const cambios = parseFloat(cambiosModulo);
    const periodo = parseFloat(periodoTiempo);
    const totales = parseFloat(cambiosTotales);
    
    if (isNaN(cambios) || isNaN(periodo) || isNaN(totales) || cambios < 0 || periodo <= 0 || totales <= 0) {
      alert('Por favor ingrese valores válidos y positivos');
      return;
    }

    if (cambios > totales) {
      alert('Los cambios del módulo no pueden ser mayores que los cambios totales');
      return;
    }
    
    const frecAbsoluta = cambios / periodo;
    const frecRelativa = (cambios / totales) * 100;
    
    setFrecuenciaAbsoluta(frecAbsoluta);
    setFrecuenciaRelativa(frecRelativa);
    setShowResult(true);
  };

  const limpiar = () => {
    setCambiosModulo('');
    setPeriodoTiempo('');
    setCambiosTotales('');
    setFrecuenciaAbsoluta(null);
    setFrecuenciaRelativa(null);
    setShowResult(false);
  };

  const obtenerColorIndicador = (valor) => {
    if (valor <= 10) return 'from-green-400 to-green-600';
    if (valor <= 25) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const obtenerTextoIndicador = (valor) => {
    if (valor <= 10) return { texto: 'Estable', icono: CheckCircle, color: 'text-green-300' };
    if (valor <= 25) return { texto: 'Moderadamente inestable', icono: AlertCircle, color: 'text-yellow-300' };
    return { texto: 'Muy inestable', icono: AlertTriangle, color: 'text-red-300' };
  };

  const obtenerColorFrecuenciaAbsoluta = (valor) => {
    if (valor <= 0.5) return 'from-green-400 to-green-600';
    if (valor <= 2) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const obtenerTextoFrecuenciaAbsoluta = (valor) => {
    if (valor <= 0.5) return { texto: 'Baja frecuencia', icono: CheckCircle, color: 'text-green-300' };
    if (valor <= 2) return { texto: 'Frecuencia moderada', icono: AlertCircle, color: 'text-yellow-300' };
    return { texto: 'Alta frecuencia', icono: AlertTriangle, color: 'text-red-300' };
  };

  const handleBack = () => {
    console.log('Navegando hacia atrás...');
  };

  return (
    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 min-h-screen flex flex-col items-center justify-center p-6">
      {/* Botón Regresar */}
      <div className="w-full max-w-6xl mb-8">
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
          <div className="bg-green-600/20 p-3 rounded-full">
            <SquareStack size={32} className="text-green-300" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Frecuencia de Cambio por Módulo
          </h1>
        </div>
        
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Panel de Entrada */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Calculator size={24} />
            Datos de Entrada
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Número de cambios en el módulo
              </label>
              <input
                type="number"
                value={cambiosModulo}
                onChange={(e) => setCambiosModulo(e.target.value)}
                placeholder="Ej: 15"
                min="0"
                step="1"
                className="w-full px-4 py-3 bg-white/20 border border-blue-300/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              <p className="text-blue-300 text-xs mt-1">
                Cambios realizados al módulo específico
              </p>
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Período de tiempo
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={periodoTiempo}
                  onChange={(e) => setPeriodoTiempo(e.target.value)}
                  placeholder="Ej: 6"
                  min="0.1"
                  step="0.1"
                  className="flex-1 px-4 py-3 bg-white/20 border border-blue-300/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <select
                  value={unidadTiempo}
                  onChange={(e) => setUnidadTiempo(e.target.value)}
                  className=" py-2 bg-white/20 border border-blue-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                >
                  <option value="días" className="bg-blue-800">Días</option>
                  <option value="semanas" className="bg-blue-800">Semanas</option>
                  <option value="meses" className="bg-blue-800">Meses</option>
                  <option value="años" className="bg-blue-800">Años</option>
                </select>
              </div>
              <p className="text-blue-300 text-xs mt-1">
                Tiempo de observación del módulo
              </p>
            </div>

            <div> 
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Cambios totales en el sistema
              </label>
              <input
                type="number"
                value={cambiosTotales}
                onChange={(e) => setCambiosTotales(e.target.value)}
                placeholder="Ej: 150"
                min="1"
                step="1"
                className="w-full px-4 py-3 bg-white/20 border border-blue-300/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              <p className="text-blue-300 text-xs mt-1">
                Total de cambios en todo el sistema
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={calcularFrecuencia}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/30"
              >
                Calcular Frecuencia
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

        {/* Panel Frecuencia Absoluta */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock size={24} />
            Frecuencia Absoluta
          </h2>

          {!showResult ? (
            <div className="flex flex-col items-center justify-center h-64 text-blue-300">
              <Clock size={48} className="mb-4 opacity-50" />
              <p className="text-center">
                Cambios por unidad de tiempo
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Indicador circular */}
              <div className="text-center">
                <div className={`mx-auto w-32 h-32 rounded-full bg-gradient-to-br ${obtenerColorFrecuenciaAbsoluta(frecuenciaAbsoluta)} flex items-center justify-center mb-4 shadow-lg`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {frecuenciaAbsoluta?.toFixed(2)}
                    </div>
                    <div className="text-xs text-white/80">cambios/{unidadTiempo}</div>
                  </div>
                </div>

                {/* Estado */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {(() => {
                    const { texto, icono: Icono, color } = obtenerTextoFrecuenciaAbsoluta(frecuenciaAbsoluta);
                    return (
                      <>
                        <Icono size={20} className={color} />
                        <span className={`font-semibold ${color}`}>{texto}</span>
                      </>
                    );
                  })()}
                </div>

                {/* Escala de referencia */}
                <div className="text-xs text-blue-200 space-y-1">
                  <div className="flex items-center gap-1 justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>≤0.5: Baja</span>
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>0.5-2: Moderada</span>
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>&gt;2: Alta</span>
                  </div>
                </div>
              </div>

              {/* Detalle del cálculo */}
              <div className="bg-white/10 rounded-lg p-4 text-sm">
                <h3 className="font-semibold text-white mb-2">Cálculo:</h3>
                <div className="text-blue-200 space-y-1">
                  <div>Cambios: {cambiosModulo}</div>
                  <div>Período: {periodoTiempo} {unidadTiempo}</div>
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <strong className="text-white">
                      {cambiosModulo} ÷ {periodoTiempo} = {frecuenciaAbsoluta?.toFixed(2)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel Frecuencia Relativa */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Percent size={24} />
            Frecuencia Relativa
          </h2>

          {!showResult ? (
            <div className="flex flex-col items-center justify-center h-64 text-blue-300">
              <Percent size={48} className="mb-4 opacity-50" />
              <p className="text-center">
                Porcentaje respecto al total
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Barra de progreso circular */}
              <div className="text-center">
                <div className="relative mx-auto w-32 h-32 mb-4">
                  {/* Círculo de fondo */}
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-white/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2.51 * Math.min(frecuenciaRelativa, 100)} 251.2`}
                      className={`${frecuenciaRelativa <= 10 ? 'text-green-400' : 
                                frecuenciaRelativa <= 25 ? 'text-yellow-400' : 'text-red-400'} 
                                transition-all duration-1000 ease-out`}
                    />
                  </svg>
                  
                  {/* Texto central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {frecuenciaRelativa?.toFixed(1)}%
                      </div>
                      <div className="text-xs text-white/80">del total</div>
                    </div>
                  </div>
                </div>

                {/* Estado */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {(() => {
                    const { texto, icono: Icono, color } = obtenerTextoIndicador(frecuenciaRelativa);
                    return (
                      <>
                        <Icono size={20} className={color} />
                        <span className={`font-semibold ${color}`}>{texto}</span>
                      </>
                    );
                  })()}
                </div>

                {/* Escala de referencia */}
                <div className="text-xs text-blue-200 space-y-1">
                  <div className="flex items-center gap-1 justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>≤10%: Estable</span>
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>10-25%: Moderado</span>
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>&gt;25%: Inestable</span>
                  </div>
                </div>
              </div>

              {/* Detalle del cálculo */}
              <div className="bg-white/10 rounded-lg p-4 text-sm">
                <h3 className="font-semibold text-white mb-2">Cálculo:</h3>
                <div className="text-blue-200 space-y-1">
                  <div>Cambios módulo: {cambiosModulo}</div>
                  <div>Cambios totales: {cambiosTotales}</div>
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <strong className="text-white">
                      ({cambiosModulo} ÷ {cambiosTotales}) × 100 = {frecuenciaRelativa?.toFixed(1)}%
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recomendaciones */}
      {showResult && (
        <div className="w-full max-w-6xl mt-8">
          <div className="bg-green-600/20 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4 text-lg">💡 Interpretación y Recomendaciones:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-200 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">Frecuencia Absoluta:</h4>
                {frecuenciaAbsoluta <= 0.5 && "Excelente estabilidad. El módulo se modifica raramente, lo que indica un diseño maduro y estable."}
                {frecuenciaAbsoluta > 0.5 && frecuenciaAbsoluta <= 2 && "Frecuencia moderada de cambios. Monitoree las razones de los cambios para identificar posibles mejoras en el diseño."}
                {frecuenciaAbsoluta > 2 && "Alta frecuencia de cambios indica posible inestabilidad en el diseño. Considere refactorizar para mejorar la estabilidad del módulo."}
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Frecuencia Relativa:</h4>
                {frecuenciaRelativa <= 10 && "El módulo tiene una participación baja en los cambios del sistema, lo que sugiere buena estabilidad relativa."}
                {frecuenciaRelativa > 10 && frecuenciaRelativa <= 25 && "Participación moderada en los cambios. Evalúe si es proporcional a la importancia del módulo en el sistema."}
                {frecuenciaRelativa > 25 && "Este módulo concentra una alta proporción de cambios del sistema. Considere dividirlo o revisar su diseño para mejorar la estabilidad general."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}