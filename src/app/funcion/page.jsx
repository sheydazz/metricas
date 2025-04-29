"use client"
import { useState, useEffect } from 'react';
import { Database, ArrowLeft, PlusCircle, Trash2, Calculator } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Activity, CheckCircle, DollarSign, FileCheck, Info } from 'lucide-react';

export default function MetricaFuncion() {
  const router = useRouter();
  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(true);
  const [esfuerzo, setEsfuerzo] = useState(0);
  const [errores, setErrores] = useState(0);
  const [costo, setCosto] = useState(0);
  const [paginasDoc, setPaginasDoc] = useState(0);
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const [indicadores, setIndicadores] = useState({
    entradas: { simple: 0, medio: 0, complejo: 0, subtotal: 0 },
    salidas: { simple: 0, medio: 0, complejo: 0, subtotal: 0 },
    peticiones: { simple: 0, medio: 0, complejo: 0, subtotal: 0 },
    archivos: { simple: 0, medio: 0, complejo: 0, subtotal: 0 },
    interfaces: { simple: 0, medio: 0, complejo: 0, subtotal: 0 }
  });

  const factoresPonderacion = {
    entradas: [3, 4, 6],
    salidas: [4, 5, 7],
    peticiones: [3, 4, 6],
    archivos: [7, 10, 15],
    interfaces: [5, 7, 20]  
  };

  const [factoresInfluencia, setFactoresInfluencia] = useState(Array(14).fill(0));
  const [cuentaTotal, setCuentaTotal] = useState(0);
  const [totalGI, setTotalGI] = useState(0);
  const [puntoFuncion, setPuntoFuncion] = useState(0);

  const nombresFactores = [
    "Comunicaciones de datos", "Procesamiento distribuido", "Objetivos de rendimiento",
    "Configuración de uso intensivo", "Tasas de transacción rápidas", "Entrada de datos en línea",
    "Amigabilidad en el diseño", "Actualización de datos en línea", "Procesamiento complejo",
    "Reusabilidad", "Facilidad de instalación", "Facilidad operacional",
    "Adaptabilidad", "Versatilidad"
  ];

  const iniciarCalculo = () => setMostrarConfiguracion(false);

  const handleCantidadChange = (tipo, complejidad, valor) => {
    if (valor < 0) valor = 0;
    const nuevo = { ...indicadores };
    nuevo[tipo][complejidad] = valor;
    nuevo[tipo].subtotal =
      nuevo[tipo].simple * factoresPonderacion[tipo][0] +
      nuevo[tipo].medio * factoresPonderacion[tipo][1] +
      nuevo[tipo].complejo * factoresPonderacion[tipo][2];
    setIndicadores(nuevo);
  };

  const handleFactorChange = (i, v) => {
    const arr = [...factoresInfluencia]; arr[i] = v; setFactoresInfluencia(arr);
  };

  const reiniciarCalculo = () => {
    setMostrarConfiguracion(true);
    setIndicadores({
      entradas: { simple: 0, medio: 0, complejo: 0, subtotal: 0 },
      salidas: { simple: 0, medio: 0, complejo: 0, subtotal: 0 },
      peticiones: { simple: 0, medio: 0, complejo: 0, subtotal: 0 },
      archivos: { simple: 0, medio: 0, complejo: 0, subtotal: 0 },
      interfaces: { simple: 0, medio: 0, complejo: 0, subtotal: 0 }
    });
    setFactoresInfluencia(Array(14).fill(0));
    setCuentaTotal(0); setTotalGI(0); setPuntoFuncion(0);
    setEsfuerzo(0); setErrores(0); setCosto(0); setPaginasDoc(0);
    setMostrarInfo(false);
  };

  useEffect(() => {
    if (!mostrarConfiguracion) {
      const ct = Object.values(indicadores).reduce((a, o) => a + o.subtotal, 0);
      const gi = factoresInfluencia.reduce((a, v) => a + v, 0);
      setCuentaTotal(ct);
      setTotalGI(gi);
      setPuntoFuncion(Math.round(ct * (0.65 + 0.01 * gi) * 100) / 100);
    }
  }, [indicadores, factoresInfluencia, mostrarConfiguracion]);


  const TablaValoresDominio = () => (
    <div className="bg-white/5 p-4 rounded-xl overflow-x-auto backdrop-blur-sm shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium">Tabla de valores del dominio de información</h3>
      </div>
      <table className="w-full text-white">
        <thead className="border-b border-white/20">
          <tr>
            <th className="text-left p-2">Parámetros (Indicadores)</th>
            <th className="text-center p-2">Cuenta</th>
            <th className="text-center p-2" colSpan={3}>Factor de Ponderación</th>
            <th className="text-center p-2">Subtotal</th>
          </tr>
          <tr><th/><th/><th className="text-sm">Simple</th><th className="text-sm">Medio</th><th className="text-sm">Complejo</th><th/></tr>
        </thead>
        <tbody>
          {['entradas','salidas','peticiones','archivos','interfaces'].map(tipo => (
            <tr key={tipo} className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="p-2 capitalize">{tipo === 'peticiones' ? 'Peticiones de usuario' : tipo === 'entradas' ? 'Entradas de usuario' : tipo === 'salidas' ? 'Salidas de usuario' : tipo === 'archivos' ? 'Archivos' : 'Interfaces externas'}</td>
              <td className="text-center">{indicadores[tipo].simple + indicadores[tipo].medio + indicadores[tipo].complejo}</td>
              {['simple','medio','complejo'].map(comp => (
                <td key={comp} className="text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-sm mr-2 text-indigo-300">×{factoresPonderacion[tipo][['simple','medio','complejo'].indexOf(comp)]}</span>
                    <input 
                      type="number"  
                      value={indicadores[tipo][comp]} 
                      onChange={e => handleCantidadChange(tipo, comp, parseInt(e.target.value)||0)} 
                      className="w-12 bg-white/10 border border-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </td>
              ))}
              <td className="text-center font-medium text-purple-300">{indicadores[tipo].subtotal}</td>
            </tr>
          ))}
          <tr className="border-t border-white/20 font-bold bg-indigo-900/30">
            <td colSpan={5} className="p-2 text-right">CUENTA_TOTAL:</td>
            <td className="text-center">{cuentaTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const FactoresInfluenciaComp = () => (
    <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium">Factores de Influencia (GI)</h3>
        <button 
          onClick={() => setMostrarInfo(!mostrarInfo)} 
          className="text-white/70 hover:text-white transition-colors"
        >
          <Info size={18} />
        </button>
      </div>
      
      {mostrarInfo && (
        <div className="mb-4 p-3 bg-indigo-800/50 rounded-lg text-white/90 text-sm">
          <p>Los factores de influencia tienen valores de 0 (sin influencia) a 5 (influencia fuerte).</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nombresFactores.map((n,i) => (
          <div key={i} className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <div className="flex justify-between mb-2">
              <span className="text-white/70 text-sm">{n}</span>
              <span className="text-white font-bold">{factoresInfluencia[i]}</span>
            </div>
            <div className="flex justify-between">
              {[0,1,2,3,4,5].map(v => (
                <button 
                  key={v} 
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    factoresInfluencia[i]===v
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`} 
                  onClick={()=>handleFactorChange(i,v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <span className="text-white/80 mr-2">TOTAL GI:</span>
        <span className="text-white font-bold">{totalGI}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-800 min-h-screen font-sans">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button 
              className="mr-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all" 
              onClick={()=>router.push('/')}
            >
              <ArrowLeft className="text-white" size={24}/>
            </button>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
              Métricas Orientadas a la Función
            </h1>
          </div>
        </div>
        
        {mostrarConfiguracion ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl max-w-md mx-auto border border-white/10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
                <Calculator size={40} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Calculadora de Puntos de Función</h2>
            <p className="text-white/80 mb-6">Esta herramienta le permitirá calcular el tamaño funcional de un sistema utilizando la metodología de Puntos de Función.</p>
            
            <div className="bg-indigo-900/30 p-4 rounded-lg mb-6">
              <h3 className="text-white font-medium mb-2">Pasos a seguir:</h3>
              <ul className="text-white/70 space-y-2 list-disc list-inside">
                <li>Contar cada medida por separado.</li>
                <li>Asociar un valor de complejidad a cada medida.</li>
                <li>Multiplicar cada medida por su factor de complejidad.</li>
                <li>Sumar para obtener el dominio de la información.</li>
                <li>Ajustar según los factores de influencia.</li>
              </ul>
            </div>
            
            <button 
              onClick={iniciarCalculo} 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <Calculator size={20}/>Iniciar cálculo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10">
              <TablaValoresDominio />
              
              <div className="mt-6">
                <FactoresInfluenciaComp />
              </div>
              
              <div className="mt-6 bg-white/5 p-4 rounded-xl backdrop-blur-sm shadow-lg">
                <h3 className="text-white font-medium mb-4">Cálculo del Punto Función</h3>
                <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 p-4 rounded-lg text-white border border-indigo-500/30">
                  <p>PF = CUENTA_TOTAL * (0.65 + 0.01 * TOTAL GI)</p>
                  <p>PF = {cuentaTotal} * (0.65 + 0.01 * {totalGI})</p>
                  <p>PF = {cuentaTotal} * {(0.65+0.01*totalGI).toFixed(2)}</p>
                  <p className="text-xl font-bold mt-2">PF = {puntoFuncion}</p>
                </div>
                
              </div>
              
              <div className="mt-6 bg-white/5 p-4 rounded-xl backdrop-blur-sm shadow-lg">
                <h3 className="text-white font-medium mb-4">Métricas Derivadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg text-white hover:bg-white/10 transition-colors">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-600/30 p-2 rounded-lg mr-3">
                        <Activity size={20} className="text-blue-300" />
                      </div>
                      <h4 className="font-medium">Productividad</h4>
                    </div>
                    <p className="text-white/80 mb-2">PF / Esfuerzo</p>
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-white/70 mr-2">Esfuerzo (días):</span>
                      <input 
                        type="number" 
                        placeholder='Esfuerzo' 
                        value={esfuerzo} 
                        onChange={e=>setEsfuerzo(parseInt(e.target.value)||0)} 
                        className="w-20 bg-white/10 border border-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="text-right font-medium text-blue-300">
                      {puntoFuncion>0 && esfuerzo>0 ? (puntoFuncion/esfuerzo).toFixed(2) : "–"} PF/día
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg text-white hover:bg-white/10 transition-colors">
                    <div className="flex items-center mb-3">
                      <div className="bg-pink-600/30 p-2 rounded-lg mr-3">
                        <CheckCircle size={20} className="text-pink-300" />
                      </div>
                      <h4 className="font-medium">Calidad</h4>
                    </div>
                    <p className="text-white/80 mb-2">Errores / PF</p>
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-white/70 mr-2">Número de errores:</span>
                      <input 
                        type="number" 
                        placeholder='Errores' 
                        value={errores} 
                        onChange={e=>setErrores(parseInt(e.target.value)||0)} 
                        className="w-20 bg-white/10 border border-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div className="text-right font-medium text-pink-300">
                      {puntoFuncion>0 && errores>0 ? (errores/puntoFuncion).toFixed(2) : "–"} errores/PF
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg text-white hover:bg-white/10 transition-colors">
                    <div className="flex items-center mb-3">
                      <div className="bg-green-600/30 p-2 rounded-lg mr-3">
                        <DollarSign size={20} className="text-green-300" />
                      </div>
                      <h4 className="font-medium">Costo</h4>
                    </div>
                    <p className="text-white/80 mb-2">Dólares / PF</p>
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-white/70 mr-2">Costo (USD):</span>
                      <input 
                        type="number" 
                        placeholder='Dólares' 
                        value={costo} 
                        onChange={e=>setCosto(parseInt(e.target.value)||0)} 
                        className="w-20 bg-white/10 border border-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div className="text-right font-medium text-green-300">
                      {puntoFuncion>0 && costo>0 ? (costo/puntoFuncion).toFixed(2) : "–"} USD/PF
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg text-white hover:bg-white/10 transition-colors">
                    <div className="flex items-center mb-3">
                      <div className="bg-yellow-600/30 p-2 rounded-lg mr-3">
                        <FileCheck size={20} className="text-yellow-300" />
                      </div>
                      <h4 className="font-medium">Documentación</h4>
                    </div>
                    <p className="text-white/80 mb-2">Págs. Doc. / PF</p>
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-white/70 mr-2">Páginas de doc:</span>
                      <input 
                        type="number" 
                        placeholder='Págs. Doc.' 
                        value={paginasDoc} 
                        onChange={e=>setPaginasDoc(parseInt(e.target.value)||0)} 
                        className="w-20 bg-white/10 border border-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div className="text-right font-medium text-yellow-300">
                      {puntoFuncion>0 && paginasDoc>0 ? (paginasDoc/puntoFuncion).toFixed(2) : "–"} págs/PF
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={reiniciarCalculo} 
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                >
                  <Trash2 size={20}/>Reiniciar
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center text-white/70 border border-white/10">
          <div className="flex items-center gap-2">
            <Database size={20}/>Métricas Orientadas a la Función
          </div>
          <div className="text-sm text-white/50">
            Basado en Function Point Analysis (FPA)
          </div>
        </div>
      </div>
    </div>
  );
}