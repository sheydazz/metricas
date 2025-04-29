"use client"
import { useState, useEffect } from 'react';
import { BarChart, Activity, Code, ArrowLeft, CheckCircle, RefreshCw, Calendar, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MetricaLOC() {
  const router=useRouter()
  // Estados para los inputs de LOC
  const [totalLOC, setTotalLOC] = useState("");
  const [numDesarrolladores, setNumDesarrolladores] = useState("");
  const [duracionDias, setDuracionDias] = useState("");
  const [defectosEncontrados, setDefectosEncontrados] = useState("");
  const [puntosFuncion, setPuntosFuncion] = useState("");
  
  // Estados para los resultados calculados
  const [productividadDiaria, setProductividadDiaria] = useState(0);
  const [productividadPorPersona, setProductividadPorPersona] = useState(0);
  const [defectosPorKLOC, setDefectosPorKLOC] = useState(0);
  const [calidadTexto, setCalidadTexto] = useState("");
  const [calidadColor, setCalidadColor] = useState("");
  const [eficienciaLOCporPF, setEficienciaLOCporPF] = useState(0);
  const [eficienciaTexto, setEficienciaTexto] = useState("");
  
  // Calcular todas las métricas cuando cambien los inputs
  useEffect(() => {
    calcularMetricas();
  }, [totalLOC, numDesarrolladores, duracionDias, defectosEncontrados, puntosFuncion]);
  
  const calcularMetricas = () => {
    // Validar que los inputs sean números
    const loc = parseFloat(totalLOC) || 0;
    const desarrolladores = parseFloat(numDesarrolladores) || 1;
    const dias = parseFloat(duracionDias) || 1;
    const defectos = parseFloat(defectosEncontrados) || 0;
    const pf = parseFloat(puntosFuncion) || 1;
    
    // Calcular productividad
    const prodDiaria = loc / dias;
    setProductividadDiaria(Math.round(prodDiaria));
    
    const prodPersona = loc / (dias * desarrolladores);
    setProductividadPorPersona(Math.round(prodPersona));
    
    // Clasificar productividad
    let rangoProductividad = "";
    if (prodPersona < 100) {
      rangoProductividad = "Baja (< 100 LOC/día)";
    } else if (prodPersona <= 300) {
      rangoProductividad = "Normal (100-300 LOC/día)";
    } else {
      rangoProductividad = "Alta (> 300 LOC/día)";
    }
    
    // Calcular calidad (defectos por KLOC)
    const defKLOC = (defectos / loc) * 1000;
    setDefectosPorKLOC(Math.round(defKLOC * 100) / 100);
    
    // Clasificar calidad
    if (defKLOC < 2) {
      setCalidadTexto("Excelente calidad (< 2 defectos/KLOC)");
      setCalidadColor("bg-green-600");
    } else if (defKLOC < 5) {
      setCalidadTexto("Buena calidad (2-5 defectos/KLOC)");
      setCalidadColor("bg-blue-600");
    } else if (defKLOC < 10) {
      setCalidadTexto("Calidad regular (5-10 defectos/KLOC)");
      setCalidadColor("bg-yellow-600");
    } else {
      setCalidadTexto("Calidad deficiente (> 10 defectos/KLOC)");
      setCalidadColor("bg-red-600");
    }
    
    // Calcular eficiencia (LOC por punto de función)
    const locPorPF = loc / pf;
    setEficienciaLOCporPF(Math.round(locPorPF));
    
    // Clasificar eficiencia
    if (locPorPF < 100) {
      setEficienciaTexto("Eficiencia óptima - Código conciso");
    } else if (locPorPF < 200) {
      setEficienciaTexto("Buena eficiencia");
    } else if (locPorPF < 500) {
      setEficienciaTexto("Eficiencia moderada");
    } else {
      setEficienciaTexto("Baja eficiencia - Posible código excesivo");
    }
  };
  
  const reiniciarFormulario = () => {
    setTotalLOC("");
    setNumDesarrolladores("");
    setDuracionDias("");
    setDefectosEncontrados("");
    setPuntosFuncion("");
  };

  return (
    <div className="bg-gradient-to-br from-blue-800 to-indigo-900 min-h-screen font-sans">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button onClick={() => router.push('/')} className="mr-4 bg-white/10 p-2 rounded-full">
              <ArrowLeft className="text-white" size={24} />
            </button >
            <h1 className="text-3xl font-bold text-white">Métricas LOC</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-600/30 px-3 py-1 rounded-full text-sm text-white">
              Lines Of Code
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de entrada de datos */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-6">Datos del Proyecto</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2 text-sm">Total de Líneas de Código (LOC)</label>
                <input
                  type="number"
                  value={totalLOC}
                  onChange={e => setTotalLOC(e.target.value)}
                  className="w-full bg-white/5 text-white border border-white/20 rounded-lg p-3 focus:outline-none focus:border-blue-400"
                  placeholder="Ej: 18000"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Número de Desarrolladores</label>
                <input
                  type="number"
                  value={numDesarrolladores}
                  onChange={e => setNumDesarrolladores(e.target.value)}
                  className="w-full bg-white/5 text-white border border-white/20 rounded-lg p-3 focus:outline-none focus:border-blue-400"
                  placeholder="Ej: 3"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Duración del Proyecto (días)</label>
                <input
                  type="number"
                  value={duracionDias}
                  onChange={e => setDuracionDias(e.target.value)}
                  className="w-full bg-white/5 text-white border border-white/20 rounded-lg p-3 focus:outline-none focus:border-blue-400"
                  placeholder="Ej: 30"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Defectos Encontrados</label>
                <input
                  type="number"
                  value={defectosEncontrados}
                  onChange={e => setDefectosEncontrados(e.target.value)}
                  className="w-full bg-white/5 text-white border border-white/20 rounded-lg p-3 focus:outline-none focus:border-blue-400"
                  placeholder="Ej: 21"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Puntos de Función</label>
                <input
                  type="number"
                  value={puntosFuncion}
                  onChange={e => setPuntosFuncion(e.target.value)}
                  className="w-full bg-white/5 text-white border border-white/20 rounded-lg p-3 focus:outline-none focus:border-blue-400"
                  placeholder="Ej: 12"
                />
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button 
                onClick={calcularMetricas}
                className="bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                <span>Calcular</span>
              </button>
              <button 
                onClick={reiniciarFormulario}
                className="bg-white/10 hover:bg-white/20 transition-all text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>
          
          {/* Panel de resultados */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col">
                <span className="text-white/70 text-sm mb-1">Total LOC</span>
                <span className="text-white text-2xl font-bold">{totalLOC ? totalLOC : "-"}</span>
                <div className="mt-2 flex items-center text-white/60 text-xs">
                  <Code size={14} className="mr-1" />
                  <span>Líneas de código</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col">
                <span className="text-white/70 text-sm mb-1">Duración</span>
                <span className="text-white text-2xl font-bold">{duracionDias ? duracionDias : "-"}</span>
                <div className="mt-2 flex items-center text-white/60 text-xs">
                  <Calendar size={14} className="mr-1" />
                  <span>Días de desarrollo</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col">
                <span className="text-white/70 text-sm mb-1">Equipo</span>
                <span className="text-white text-2xl font-bold">{numDesarrolladores ? numDesarrolladores : "-"}</span>
                <div className="mt-2 flex items-center text-white/60 text-xs">
                  <Users size={14} className="mr-1" />
                  <span>Desarrolladores</span>
                </div>
              </div>
            </div>
            
            {/* Productividad */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600/30 p-2 rounded-lg mr-3">
                  <Activity size={20} className="text-blue-300" />
                </div>
                <h2 className="text-xl font-semibold text-white">Productividad</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/70 text-sm mb-2">LOC por día (equipo)</p>
                  <div className="flex items-end gap-2">
                    <span className="text-white text-3xl font-bold">{productividadDiaria || 0}</span>
                    <span className="text-white/70 mb-1">LOC/día</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-white/70 text-sm mb-2">LOC por día por desarrollador</p>
                  <div className="flex items-end gap-2">
                    <span className="text-white text-3xl font-bold">{productividadPorPersona || 0}</span>
                    <span className="text-white/70 mb-1">LOC/día/persona</span>
                  </div>
                  <p className="text-white/80 text-sm mt-1">{
                    productividadPorPersona < 100 ? "Baja productividad (< 100 LOC/día)" :
                    productividadPorPersona <= 300 ? "Productividad normal (100-300 LOC/día)" :
                    "Alta productividad (> 300 LOC/día)"
                  }</p>
                </div>
              </div>
              
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    productividadPorPersona < 100 ? "bg-yellow-500" :
                    productividadPorPersona <= 300 ? "bg-green-500" :
                    "bg-blue-500"
                  }`}
                  style={{ width: `${Math.min(100, (productividadPorPersona / 400) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            {/* Calidad */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-600/30 p-2 rounded-lg mr-3">
                  <CheckCircle size={20} className="text-green-300" />
                </div>
                <h2 className="text-xl font-semibold text-white">Calidad</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/70 text-sm mb-2">Defectos encontrados</p>
                  <div className="flex items-end gap-2">
                    <span className="text-white text-3xl font-bold">{defectosEncontrados || "0"}</span>
                    <span className="text-white/70 mb-1">errores</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-white/70 text-sm mb-2">Defectos por KLOC</p>
                  <div className="flex items-end gap-2">
                    <span className="text-white text-3xl font-bold">{defectosPorKLOC || 0}</span>
                    <span className="text-white/70 mb-1">defectos/KLOC</span>
                  </div>
                  <p className={`text-sm mt-1 ${
                    defectosPorKLOC < 2 ? "text-green-300" :
                    defectosPorKLOC < 5 ? "text-blue-300" :
                    defectosPorKLOC < 10 ? "text-yellow-300" :
                    "text-red-300"
                  }`}>
                    {calidadTexto}
                  </p>
                </div>
              </div>
              
              <div className={`mt-4 p-4 rounded-xl text-center text-white font-medium ${calidadColor}`}>
                {defectosPorKLOC < 2 
                  ? "Código de excelente calidad con mínimos defectos" 
                  : defectosPorKLOC < 5 
                  ? "Código de buena calidad, dentro de los estándares aceptables" 
                  : defectosPorKLOC < 10 
                  ? "Calidad por debajo del estándar, requiere revisión" 
                  : "Calidad deficiente, se recomienda acciones correctivas inmediatas"
                }
              </div>
            </div>
            
            {/* Eficiencia */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="bg-purple-600/30 p-2 rounded-lg mr-3">
                  <BarChart size={20} className="text-purple-300" />
                </div>
                <h2 className="text-xl font-semibold text-white">Eficiencia</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-white/70 text-sm mb-2">Puntos de función</p>
                  <div className="flex items-end gap-2">
                    <span className="text-white text-3xl font-bold">{puntosFuncion || "0"}</span>
                    <span className="text-white/70 mb-1">PF</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-white/70 text-sm mb-2">LOC por punto de función</p>
                  <div className="flex items-end gap-2">
                    <span className="text-white text-3xl font-bold">{eficienciaLOCporPF || 0}</span>
                    <span className="text-white/70 mb-1">LOC/PF</span>
                  </div>
                  <p className="text-white/80 text-sm mt-1">{eficienciaTexto}</p>
                </div>
              </div>
              
              <div className="mt-4 bg-white/5 p-4 rounded-xl">
                <p className="text-white/90">
                  {eficienciaLOCporPF > 500 
                    ? "Código podría estar más optimizado y ser más conciso." 
                    : eficienciaLOCporPF > 200 
                    ? "Nivel de eficiencia es aceptable." 
                    : "Código es eficiente y bien optimizado."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-white/70">
              <Code size={20} />
              <span>Métricas de Líneas de Código (LOC)</span>
            </div>
            <div className="text-white/50 text-sm">
              Análisis de tamaño, productividad, calidad y eficiencia
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}