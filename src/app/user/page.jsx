"use client"
import { useState, useEffect } from 'react';
import { Users, ArrowLeft, PlusCircle, Check, X, Trash2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function MetricaExperienciaUsuario() {
  const [numeroPreguntasInput, setNumeroPreguntasInput] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [totalPuntos, setTotalPuntos] = useState(0);
  const [puntajeFinal, setPuntajeFinal] = useState(0);
  const [interpretacion, setInterpretacion] = useState("");
  const [color, setColor] = useState("bg-gray-600");
  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(true);
  const router = useRouter();
  // Inicializar preguntas cuando el usuario confirma la cantidad
  const inicializarPreguntas = () => {
    const num = parseInt(numeroPreguntasInput);
    if (isNaN(num) || num < 1) {
      return;
    }
    
    const nuevasPreguntas = [];
    for (let i = 1; i <= num; i++) {
      nuevasPreguntas.push({ id: i, respuesta: 0 });
    }
    
    setPreguntas(nuevasPreguntas);
    setMostrarConfiguracion(false);
  };

  const handleRespuestaChange = (id, valor) => {
    setPreguntas(preguntas.map(pregunta => 
      pregunta.id === id ? { ...pregunta, respuesta: valor } : pregunta
    ));
  };

  const calcularResultados = () => {
    // Calcular puntos según fórmula del documento
    const puntos = preguntas.reduce((total, pregunta) => {
      const valor = pregunta.respuesta;
      if (valor === 0) return total;
      
      // Aplicar fórmula según tipo de pregunta (par/impar)
      let puntaje = 0;
      
      if (pregunta.id % 2 === 1) { // Pregunta impar
        puntaje = valor - 1; // Para preguntas impares: valor - 1
      } else { // Pregunta par
        puntaje = 5 - valor; // Para preguntas pares: 5 - valor
      }
      
      return total + puntaje;
    }, 0);
    
    setTotalPuntos(puntos);
    
    // Multiplicar por 2.5 para obtener puntaje sobre 100
    const puntajeCalculado = Math.min(100, Math.round((puntos * 2.5) * 10) / 10);
    setPuntajeFinal(puntajeCalculado);
    
    // Determinar interpretación según tabla del documento
    if (puntajeCalculado >= 85) {
      setInterpretacion("Excelente / Altamente Satisfactorio");
      setColor("bg-green-600");
    } else if (puntajeCalculado >= 70) {
      setInterpretacion("Bueno / Aceptable");
      setColor("bg-blue-600");
    } else if (puntajeCalculado >= 50) {
      setInterpretacion("Regular / Necesita mejoras");
      setColor("bg-yellow-600");
    } else {
      setInterpretacion("Deficiente / Insatisfactorio");
      setColor("bg-red-600");
    }
  };
  
  const reiniciarEncuesta = () => {
    setMostrarConfiguracion(true);
    setPreguntas([]);
    setNumeroPreguntasInput("");
    setPuntajeFinal(0);
    setTotalPuntos(0);
    setInterpretacion("");
  };

  useEffect(() => {
    if (preguntas.length > 0) {
      calcularResultados();
    }
  }, [preguntas]);

  return (
    <div className="bg-gradient-to-br from-indigo-800 to-purple-900 min-h-screen font-sans">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button className="mr-4 bg-white/10 p-2 rounded-full" onClick={() => router.push('/')}>
              <ArrowLeft className="text-white" size={24} />
            </button>
            <h1 className="text-3xl font-bold text-white">Experiencia de Usuario</h1>
          </div>
        </div>
        
        {/* Configuración de número de preguntas */}
        {mostrarConfiguracion ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">Configurar encuesta</h2>
            
            <div className="mb-6">
              <label className="block text-white mb-2">Número de preguntas:</label>
              <input
                type="number"
                value={numeroPreguntasInput}
                onChange={(e) => setNumeroPreguntasInput(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ingrese cantidad de preguntas"
                min="1"
              />
            </div>
            
            <button
              onClick={inicializarPreguntas}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2"
            >
              <Check size={20} />
              <span>Comenzar evaluación</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Panel izquierdo - Preguntas */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Evaluación de Experiencia de Usuario</h2>
                <span className="bg-purple-700/50 text-white px-3 py-1 rounded-full text-sm">
                  {preguntas.length} preguntas
                </span>
              </div>
              
              <div className="space-y-6">
                {preguntas.map((pregunta) => (
                  <div key={pregunta.id} className="bg-white/5 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${pregunta.id % 2 === 0 ? 'bg-blue-600/30' : 'bg-purple-600/30'}`}>
                          <span className="text-white font-medium">{pregunta.id}</span>
                        </div>
                        <h3 className="text-white font-medium">Pregunta {pregunta.id}</h3>
                        {pregunta.respuesta > 0 && (
                          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        )}
                      </div>
                      <span className="text-xs text-white/70">
                        {pregunta.id % 2 === 0 ? 'Par' : 'Impar'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        {[1, 2, 3, 4, 5].map((valor) => (
                          <button
                            key={valor}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              pregunta.respuesta === valor 
                                ? 'bg-purple-600 text-white' 
                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                            }`}
                            onClick={() => handleRespuestaChange(pregunta.id, valor)}
                          >
                            {valor}
                          </button>
                        ))}
                      </div>
                      <div className="text-white/70 text-sm">
                        {pregunta.respuesta > 0 ? (
                          <div className="flex items-center gap-1">
                            <span>Respuesta: {pregunta.respuesta}</span>
                            <span className="ml-2 px-2 py-0.5 bg-red-500 rounded-full text-white text-xs">
                              {pregunta.id % 2 === 1 
                                ? `+${pregunta.respuesta - 1}` 
                                : `+${5 - pregunta.respuesta}`}
                            </span>
                          </div>
                        ) : (
                          <span>Sin respuesta</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Panel derecho - Resultados */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl flex flex-col">
              <h2 className="text-2xl font-semibold text-white mb-6">Resultados</h2>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="bg-white/5 rounded-xl p-5 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Puntos obtenidos</span>
                      <span className="text-white font-medium">{totalPuntos} pts</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-white/70">Factor multiplicador</span>
                      <span className="text-white font-medium">x 2.5</span>
                    </div>
                    <div className="h-px bg-white/10 mb-6"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-white text-lg">Puntaje final</span>
                      <span className="text-white text-2xl font-bold">{puntajeFinal}</span>
                    </div>
                  </div>
                  
                  <div className={`${color} rounded-xl p-5 mb-6 text-center`}>
                    <h3 className="text-white text-xl font-medium mb-1">
                      {puntajeFinal} es un puntaje {puntajeFinal >= 70 ? 'alto' : puntajeFinal >= 50 ? 'medio' : 'bajo'}
                    </h3>
                    <p className="text-white/90">
                      Los usuarios están <span className="font-bold">{
                        puntajeFinal >= 85 ? 'muy satisfechos' : 
                        puntajeFinal >= 70 ? 'satisfechos' : 
                        puntajeFinal >= 50 ? 'moderadamente satisfechos' : 'insatisfechos'
                      }</span> con la interfaz
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-5">
                    <h3 className="text-white font-medium mb-3">Interpretación:</h3>
                    <p className="text-white/90">{interpretacion}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={reiniciarEncuesta}
                      className="bg-white/10 hover:bg-white/20 transition-all text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                      <Trash2 size={20} />
                      <span>Reiniciar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Panel inferior - Información */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-white/70">
              <Users size={20} />
              <span>Métricas de Experiencia de Usuario</span>
            </div>
            <div className="text-white/50 text-sm">
              Basado en System Usability Scale (SUS)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
