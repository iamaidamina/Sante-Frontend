import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faTimes, faPaperPlane, faRobot } from '@fortawesome/free-solid-svg-icons';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

const FRECUENCIAS = [
  { id: 1, label: 'Cada 4 horas' },
  { id: 2, label: 'Cada 6 horas' },
  { id: 3, label: 'Cada 8 horas' },
  { id: 4, label: 'Cada 12 horas' },
  { id: 5, label: 'Cada 24 horas' },
];

const PREGUNTAS_FRECUENTES = [
  {
    pregunta: 'Como activo las notificaciones de WhatsApp?',
    respuesta: 'Ve a tu perfil (icono de usuario en la esquina superior derecha) > Informacion del Usuario > Seccion "Configuracion de WhatsApp" > Activa la casilla y guarda. Asegurate de tener tu numero de telefono registrado con codigo de pais (ej: +573001234567).',
  },
  {
    pregunta: 'Como cambio el tamano del texto?',
    respuesta: 'Haz clic en el boton redondo de accesibilidad en la esquina inferior derecha. Ahi puedes aumentar o reducir el tamano del texto, activar alto contraste y modo daltonismo.',
  },
  {
    pregunta: 'Donde veo mis reportes?',
    respuesta: 'En el menu lateral izquierdo, haz clic en "Reportes". Ahi veras tu tablero de analisis con graficos de adherencia semanal y mensual.',
  },
  {
    pregunta: 'Como edito mi perfil?',
    respuesta: 'Haz clic en tu nombre de usuario en la esquina superior derecha y selecciona "Informacion del Usuario". Ahi puedes editar tu nombre, telefono, fecha de nacimiento y configuracion de WhatsApp.',
  },
  {
    pregunta: 'Que hacer si olvido mi contrasena?',
    respuesta: 'En la pantalla de inicio de sesion, busca la opcion de recuperar contrasena. Se te enviara un correo electronico con instrucciones para restablecerla.',
  },
];

const DIAGNOSTICOS = [
  {
    nombre: 'Diabetes',
    info: 'La diabetes es una enfermedad cronica donde el cuerpo no produce o no usa correctamente la insulina. Es importante controlar los niveles de azucar en sangre, seguir una dieta balanceada, hacer ejercicio regular y tomar los medicamentos segun lo indicado por tu medico.',
    consejos: [
      'Mide tu glucosa regularmente y lleva un registro.',
      'Evita el consumo excesivo de azucar y harinas refinadas.',
      'Camina al menos 30 minutos al dia.',
      'No te saltes comidas y come en horarios regulares.',
      'Asiste a tus controles medicos cada 3 meses.',
    ],
    organizaciones: [
      { nombre: 'Asociacion Colombiana de Diabetes', telefono: '(601) 345-5560', web: 'https://asodiabetes.org' },
      { nombre: 'Federacion Diabetologica Colombiana', telefono: '(601) 232-8425', web: 'https://fedediabetes.org' },
      { nombre: 'Fundacion Diabetes Cali', telefono: '(602) 668-1234', web: '' },
    ],
  },
  {
    nombre: 'Hipertension arterial',
    info: 'La hipertension es cuando la presion de la sangre en las arterias es constantemente alta. Esto puede danar el corazon, los rinones y otros organos si no se controla. Con medicamentos, dieta baja en sal y ejercicio, se puede manejar efectivamente.',
    consejos: [
      'Reduce el consumo de sal en tus comidas.',
      'Toma tu medicamento a la misma hora todos los dias.',
      'Controla tu presion arterial en casa y lleva un registro.',
      'Evita el estres excesivo, practica tecnicas de relajacion.',
      'Limita el consumo de alcohol y deja de fumar.',
    ],
    organizaciones: [
      { nombre: 'Sociedad Colombiana de Cardiologia', telefono: '(601) 523-1640', web: 'https://scc.org.co' },
      { nombre: 'Liga Colombiana contra el Infarto y la Hipertension', telefono: '(601) 657-2020', web: '' },
      { nombre: 'Linea de salud Cali', telefono: '(602) 554-2424', web: '' },
    ],
  },
  {
    nombre: 'Enfermedad renal cronica',
    info: 'La enfermedad renal cronica significa que los rinones estan danados y no pueden filtrar la sangre correctamente. Es importante seguir una dieta especial, controlar la presion arterial y la diabetes si las tienes, y asistir a tus controles nefrologicos.',
    consejos: [
      'Bebe suficiente agua pero no en exceso, segun indicacion medica.',
      'Reduce el consumo de sodio, potasio y fosforo.',
      'Controla tu presion arterial y glucosa.',
      'Evita medicamentos antiinflamatorios sin receta (ibuprofeno, naproxeno).',
      'Asiste a tus citas con nefrologia regularmente.',
    ],
    organizaciones: [
      { nombre: 'Asociacion Colombiana de Nefrologia', telefono: '(601) 616-1077', web: 'https://asocolnef.com' },
      { nombre: 'Fundacion Renal de Colombia', telefono: '(601) 744-7267', web: '' },
      { nombre: 'Red de Dialisis del Valle', telefono: '(602) 330-4500', web: '' },
    ],
  },
  {
    nombre: 'EPOC (Enfermedad Pulmonar)',
    info: 'La EPOC es una enfermedad pulmonar cronica que dificulta la respiracion. Incluye bronquitis cronica y enfisema. Dejar de fumar es lo mas importante. Los inhaladores y la rehabilitacion pulmonar ayudan a mejorar la calidad de vida.',
    consejos: [
      'Si fumas, busca ayuda para dejar de fumar.',
      'Usa tus inhaladores segun las indicaciones medicas.',
      'Evita la contaminacion del aire y el humo.',
      'Haz ejercicios de respiracion diariamente.',
      'Vacunate contra la gripe y neumonia cada ano.',
    ],
    organizaciones: [
      { nombre: 'Asociacion Colombiana de Neumologia', telefono: '(601) 249-1717', web: 'https://asoneumocito.org' },
      { nombre: 'Liga Antitabaquica Colombiana', telefono: '(601) 232-3456', web: '' },
      { nombre: 'Hospital Universitario del Valle', telefono: '(602) 620-6000', web: '' },
    ],
  },
  {
    nombre: 'Artritis / Enfermedades reumaticas',
    info: 'La artritis causa inflamacion y dolor en las articulaciones. Existen varios tipos como la artritis reumatoide y la osteoartritis. Con tratamiento adecuado, ejercicio suave y cuidado de las articulaciones, se puede mantener una buena calidad de vida.',
    consejos: [
      'Mantente activo con ejercicios de bajo impacto (natacion, caminata).',
      'Aplica calor o frio en las articulaciones doloridas.',
      'Toma tus medicamentos segun lo indicado.',
      'Mantiene un peso saludable para reducir presion en las articulaciones.',
      'Descansa cuando sientas fatiga, no te sobre-esfuerces.',
    ],
    organizaciones: [
      { nombre: 'Asociacion Colombiana de Reumatologia', telefono: '(601) 635-4050', web: 'https://asoreuma.org' },
      { nombre: 'Liga Colombiana contra el Reumatismo', telefono: '(601) 245-6789', web: '' },
      { nombre: 'Fundacion Valle del Lili - Reumatologia', telefono: '(602) 331-9090', web: 'https://valledellili.org' },
    ],
  },
  {
    nombre: 'Otro diagnostico',
    info: 'Si recibiste un diagnostico que no aparece en esta lista, te recomendamos hablar con tu medico para entender mejor tu condicion. Tambien puedes buscar informacion en fuentes confiables y contactar organizaciones de salud en tu ciudad.',
    consejos: [
      'Pregunta a tu medico todo lo que no entiendas sobre tu diagnostico.',
      'Busca un grupo de apoyo de pacientes con tu misma condicion.',
      'Lleva un diario de tus sintomas para compartir con tu medico.',
      'No te automediques, siempre consulta con un profesional.',
      'Usa SANTE para llevar el control de tus medicamentos y citas.',
    ],
    organizaciones: [
      { nombre: 'Secretaria de Salud de Cali', telefono: '(602) 554-2424', web: 'https://cali.gov.co/salud' },
      { nombre: 'Linea de salud nacional 106', telefono: '106', web: '' },
      { nombre: 'Supersalud - Linea gratuita', telefono: '01 8000 513 700', web: 'https://supersalud.gov.co' },
    ],
  },
];

const MENU_PRINCIPAL = [
  { id: 'medicamento', label: 'Registrar un medicamento' },
  { id: 'cita', label: 'Agendar una cita medica' },
  { id: 'examen', label: 'Registrar un examen' },
  { id: 'diagnostico', label: 'Acabo de recibir un diagnostico' },
  { id: 'preguntas', label: 'Tengo una pregunta' },
];

export default function ChatBotAsistente() {
  const [isOpen, setIsOpen] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [flujoActual, setFlujoActual] = useState(null);
  const [pasoActual, setPasoActual] = useState(0);
  const [datosRecolectados, setDatosRecolectados] = useState({});
  const [inputTexto, setInputTexto] = useState('');
  const [inputTipo, setInputTipo] = useState('text');
  const [esperandoInput, setEsperandoInput] = useState(false);
  const [campoActual, setCampoActual] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  const agregarMensajeBot = (texto) => {
    setMensajes((prev) => [...prev, { tipo: 'bot', texto }]);
  };

  const agregarMensajeUsuario = (texto) => {
    setMensajes((prev) => [...prev, { tipo: 'usuario', texto }]);
  };

  const abrirChat = () => {
    setIsOpen(true);
    if (mensajes.length === 0) {
      mostrarMenuPrincipal();
    }
  };

  const mostrarMenuPrincipal = () => {
    setFlujoActual(null);
    setPasoActual(0);
    setDatosRecolectados({});
    setEsperandoInput(false);
    setInputTexto('');
    setMensajes([{ tipo: 'bot', texto: 'Hola! Soy el asistente de SANTE. En que puedo ayudarte?' }]);
  };

  const seleccionarOpcion = (opcionId) => {
    if (opcionId === 'medicamento') {
      agregarMensajeUsuario('Registrar un medicamento');
      setFlujoActual('medicamento');
      setPasoActual(0);
      setDatosRecolectados({});
      iniciarFlujoMedicamento();
    } else if (opcionId === 'cita') {
      agregarMensajeUsuario('Agendar una cita medica');
      setFlujoActual('cita');
      setPasoActual(0);
      setDatosRecolectados({});
      cargarEspecialidades();
      iniciarFlujoCita();
    } else if (opcionId === 'examen') {
      agregarMensajeUsuario('Registrar un examen');
      setFlujoActual('examen');
      setPasoActual(0);
      setDatosRecolectados({});
      iniciarFlujoExamen();
    } else if (opcionId === 'diagnostico') {
      agregarMensajeUsuario('Acabo de recibir un diagnostico');
      setFlujoActual('diagnostico');
      agregarMensajeBot('Entiendo que recibir un diagnostico puede ser dificil. Estoy aqui para ayudarte. Selecciona tu diagnostico o el mas parecido:');
    } else if (opcionId === 'preguntas') {
      agregarMensajeUsuario('Tengo una pregunta');
      setFlujoActual('preguntas');
      agregarMensajeBot('Selecciona la pregunta que te interesa:');
    } else if (opcionId === 'menu') {
      mostrarMenuPrincipal();
    }
  };

  const cargarEspecialidades = async () => {
    try {
      const response = await fetchWithAuth('/api/catalog/especialidades');
      if (response.ok) {
        const data = await response.json();
        setEspecialidades(data);
      }
    } catch {
      setEspecialidades([]);
    }
  };

  // --- FLUJO MEDICAMENTO ---
  const iniciarFlujoMedicamento = () => {
    setTimeout(() => {
      agregarMensajeBot('Vamos a registrar tu medicamento. Como se llama?');
      setEsperandoInput(true);
      setCampoActual('nombre');
      setInputTipo('text');
    }, 500);
  };

  const procesarPasoMedicamento = (valor) => {
    const paso = pasoActual;
    const datos = { ...datosRecolectados };

    if (paso === 0) {
      datos.nombre = valor;
      setDatosRecolectados(datos);
      setPasoActual(1);
      agregarMensajeBot('Cual es la dosis o descripcion? (ej: 500mg, 1 tableta)');
      setEsperandoInput(true);
      setCampoActual('descripcion');
      setInputTipo('text');
    } else if (paso === 1) {
      datos.descripcion = valor;
      setDatosRecolectados(datos);
      setPasoActual(2);
      agregarMensajeBot('Cada cuantas horas debes tomarlo?');
      setEsperandoInput(false);
    } else if (paso === 2) {
      datos.id_frecuencia = parseInt(valor);
      datos.frecuenciaTexto = FRECUENCIAS.find((f) => f.id === parseInt(valor))?.label || valor;
      setDatosRecolectados(datos);
      setPasoActual(3);
      agregarMensajeBot('Donde lo almacenas? (opcional, puedes escribir "ninguno")');
      setEsperandoInput(true);
      setCampoActual('almacenamiento');
      setInputTipo('text');
    } else if (paso === 3) {
      datos.almacenamiento = valor === 'ninguno' ? '' : valor;
      setDatosRecolectados(datos);
      setPasoActual(4);
      agregarMensajeBot(
        `Resumen del medicamento:\n` +
        `- Nombre: ${datos.nombre}\n` +
        `- Descripcion: ${datos.descripcion}\n` +
        `- Frecuencia: ${datos.frecuenciaTexto}\n` +
        `- Almacenamiento: ${datos.almacenamiento || 'No especificado'}\n\n` +
        `Esta correcto?`
      );
      setEsperandoInput(false);
    }
  };

  const confirmarMedicamento = async () => {
    agregarMensajeUsuario('Confirmar');
    setEnviando(true);
    try {
      const payload = {
        nombre: datosRecolectados.nombre,
        descripcion: datosRecolectados.descripcion,
        id_frecuencia: datosRecolectados.id_frecuencia,
        almacenamiento: datosRecolectados.almacenamiento,
      };
      const response = await fetchWithAuth('/api/medications', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        agregarMensajeBot('Medicamento registrado con exito! Puedes verlo en la seccion de Medicamentos.');
      } else {
        agregarMensajeBot('Hubo un error al registrar el medicamento. Intentalo de nuevo.');
      }
    } catch {
      agregarMensajeBot('Error de conexion. Verifica tu internet e intentalo de nuevo.');
    }
    setEnviando(false);
    setFlujoActual('finalizado');
  };

  // --- FLUJO CITA ---
  const iniciarFlujoCita = () => {
    setTimeout(() => {
      agregarMensajeBot('Vamos a agendar tu cita. Como se llama tu medico?');
      setEsperandoInput(true);
      setCampoActual('nombre_medico');
      setInputTipo('text');
    }, 500);
  };

  const procesarPasoCita = (valor) => {
    const paso = pasoActual;
    const datos = { ...datosRecolectados };

    if (paso === 0) {
      datos.nombre_medico = valor;
      setDatosRecolectados(datos);
      setPasoActual(1);
      agregarMensajeBot('Que especialidad medica?');
      setEsperandoInput(false);
    } else if (paso === 1) {
      datos.id_especialidad = parseInt(valor);
      datos.especialidadTexto = especialidades.find((e) => e.id_especialidad === parseInt(valor))?.nombre || valor;
      setDatosRecolectados(datos);
      setPasoActual(2);
      agregarMensajeBot('Es una cita periodica o individual?');
      setEsperandoInput(false);
    } else if (paso === 2) {
      datos.tipo = valor;
      setDatosRecolectados(datos);
      setPasoActual(3);
      agregarMensajeBot('En que lugar o clinica es la cita?');
      setEsperandoInput(true);
      setCampoActual('lugar');
      setInputTipo('text');
    } else if (paso === 3) {
      datos.lugar = valor;
      setDatosRecolectados(datos);
      setPasoActual(4);
      agregarMensajeBot('Que fecha y hora tiene la cita?');
      setEsperandoInput(true);
      setCampoActual('fecha_hora');
      setInputTipo('datetime-local');
    } else if (paso === 4) {
      datos.fecha_hora = valor;
      const fechaFormateada = new Date(valor).toLocaleString('es-CO');
      datos.fechaTexto = fechaFormateada;
      setDatosRecolectados(datos);
      setPasoActual(5);
      agregarMensajeBot('Alguna nota o descripcion adicional? (opcional, puedes escribir "ninguna")');
      setEsperandoInput(true);
      setCampoActual('descripcion');
      setInputTipo('text');
    } else if (paso === 5) {
      datos.descripcion = valor === 'ninguna' ? '' : valor;
      setDatosRecolectados(datos);
      setPasoActual(6);
      agregarMensajeBot(
        `Resumen de la cita:\n` +
        `- Medico: ${datos.nombre_medico}\n` +
        `- Especialidad: ${datos.especialidadTexto}\n` +
        `- Tipo: ${datos.tipo}\n` +
        `- Lugar: ${datos.lugar}\n` +
        `- Fecha: ${datos.fechaTexto}\n` +
        `- Nota: ${datos.descripcion || 'Ninguna'}\n\n` +
        `Esta correcto?`
      );
      setEsperandoInput(false);
    }
  };

  const confirmarCita = async () => {
    agregarMensajeUsuario('Confirmar');
    setEnviando(true);
    try {
      const payload = {
        nombre_medico: datosRecolectados.nombre_medico,
        id_especialidad: datosRecolectados.id_especialidad,
        tipo: datosRecolectados.tipo,
        lugar: datosRecolectados.lugar,
        fecha_hora: datosRecolectados.fecha_hora,
        descripcion: datosRecolectados.descripcion,
      };
      const response = await fetchWithAuth('/api/appointments', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        agregarMensajeBot('Cita agendada con exito! Puedes verla en la seccion de Citas. Recibiras un recordatorio por WhatsApp si lo tienes activado.');
      } else {
        agregarMensajeBot('Hubo un error al agendar la cita. Intentalo de nuevo.');
      }
    } catch {
      agregarMensajeBot('Error de conexion. Verifica tu internet e intentalo de nuevo.');
    }
    setEnviando(false);
    setFlujoActual('finalizado');
  };

  // --- FLUJO EXAMEN ---
  const iniciarFlujoExamen = () => {
    setTimeout(() => {
      agregarMensajeBot('Vamos a registrar tu examen. Que examen te van a realizar?');
      setEsperandoInput(true);
      setCampoActual('nombre_examen');
      setInputTipo('text');
    }, 500);
  };

  const procesarPasoExamen = (valor) => {
    const paso = pasoActual;
    const datos = { ...datosRecolectados };

    if (paso === 0) {
      datos.nombre_examen = valor;
      setDatosRecolectados(datos);
      setPasoActual(1);
      agregarMensajeBot('Quien es el medico que lo ordeno?');
      setEsperandoInput(true);
      setCampoActual('nombre_medico');
      setInputTipo('text');
    } else if (paso === 1) {
      datos.nombre_medico = valor;
      setDatosRecolectados(datos);
      setPasoActual(2);
      agregarMensajeBot('En que lugar o laboratorio?');
      setEsperandoInput(true);
      setCampoActual('lugar');
      setInputTipo('text');
    } else if (paso === 2) {
      datos.lugar = valor;
      setDatosRecolectados(datos);
      setPasoActual(3);
      agregarMensajeBot('Que fecha y hora tiene el examen?');
      setEsperandoInput(true);
      setCampoActual('fecha_hora');
      setInputTipo('datetime-local');
    } else if (paso === 3) {
      datos.fecha_hora = valor;
      const fechaFormateada = new Date(valor).toLocaleString('es-CO');
      datos.fechaTexto = fechaFormateada;
      setDatosRecolectados(datos);
      setPasoActual(4);
      agregarMensajeBot('Alguna nota adicional? (opcional, puedes escribir "ninguna")');
      setEsperandoInput(true);
      setCampoActual('descripcion');
      setInputTipo('text');
    } else if (paso === 4) {
      datos.descripcion = valor === 'ninguna' ? '' : valor;
      setDatosRecolectados(datos);
      setPasoActual(5);
      agregarMensajeBot(
        `Resumen del examen:\n` +
        `- Examen: ${datos.nombre_examen}\n` +
        `- Medico: ${datos.nombre_medico}\n` +
        `- Lugar: ${datos.lugar}\n` +
        `- Fecha: ${datos.fechaTexto}\n` +
        `- Nota: ${datos.descripcion || 'Ninguna'}\n\n` +
        `Esta correcto?`
      );
      setEsperandoInput(false);
    }
  };

  const confirmarExamen = async () => {
    agregarMensajeUsuario('Confirmar');
    setEnviando(true);
    try {
      const payload = {
        nombre_examen: datosRecolectados.nombre_examen,
        nombre_medico: datosRecolectados.nombre_medico,
        lugar: datosRecolectados.lugar,
        fecha_hora: datosRecolectados.fecha_hora,
        descripcion: datosRecolectados.descripcion,
      };
      const response = await fetchWithAuth('/api/tests', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        agregarMensajeBot('Examen registrado con exito! Puedes verlo en la seccion de Examenes.');
      } else {
        agregarMensajeBot('Hubo un error al registrar el examen. Intentalo de nuevo.');
      }
    } catch {
      agregarMensajeBot('Error de conexion. Verifica tu internet e intentalo de nuevo.');
    }
    setEnviando(false);
    setFlujoActual('finalizado');
  };

  // --- ENVIAR INPUT ---
  // Detectar si la pregunta es sobre medicamentos, efectos secundarios, automedicación o sobredosis
  const esPreguntaGemini = (texto) => {
    const patrones = [
      /efectos? secundarios?/i,
      /automedica(cion|r|do|da)?/i,
      /sobredosis/i,
      /qué pasa si tomo/i,
      /qué pasa si me automedico/i,
      /qué pasa si tomo sobredosis/i,
      /interacciones?/i,
      /puedo mezclar/i,
      /es peligroso/i,
      /riesgos?/i,
      /puedo tomar/i,
      /puedo consumir/i,
      /contraindicaciones?/i,
      /para qué sirve/i,
      /información de/i,
      /informacion de/i,
      /medicamento/i
    ];
    return patrones.some((pat) => pat.test(texto));
  };

  const enviarInput = async () => {
    const valor = inputTexto.trim();
    if (!valor) return;

    agregarMensajeUsuario(valor);
    setInputTexto('');
    setEsperandoInput(false);

    // Si es pregunta para Gemini, consulta al backend
    if (esPreguntaGemini(valor)) {
      agregarMensajeBot('Consultando a Gemini, por favor espera...');
      setEnviando(true);
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || 'https://sante-backend-production-a693.up.railway.app'}/api/gemini/chat`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ pregunta: valor })
          }
        );
        const data = await response.json();
        if (data && data.respuesta) {
          agregarMensajeBot(data.respuesta);
        } else {
          agregarMensajeBot('No se pudo obtener respuesta de Gemini.');
        }
      } catch (err) {
        agregarMensajeBot('Error al consultar Gemini. Intenta de nuevo más tarde.');
      }
      setEnviando(false);
      return;
    }

    if (flujoActual === 'medicamento') {
      procesarPasoMedicamento(valor);
    } else if (flujoActual === 'cita') {
      procesarPasoCita(valor);
    } else if (flujoActual === 'examen') {
      procesarPasoExamen(valor);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enviarInput();
    }
  };

  // --- SELECCIONAR BOTON ---
  const seleccionarBotonFlujo = (valor, label) => {
    agregarMensajeUsuario(label);

    if (flujoActual === 'medicamento') {
      procesarPasoMedicamento(valor);
    } else if (flujoActual === 'cita') {
      procesarPasoCita(valor);
    } else if (flujoActual === 'examen') {
      procesarPasoExamen(valor);
    }
  };

  // --- CANCELAR ---
  const cancelar = () => {
    agregarMensajeUsuario('Cancelar');
    agregarMensajeBot('Operacion cancelada. En que mas puedo ayudarte?');
    setFlujoActual(null);
    setPasoActual(0);
    setDatosRecolectados({});
    setEsperandoInput(false);
  };

  // --- RENDER BOTONES SEGUN ESTADO ---
  const renderBotones = () => {
    // Menu principal
    if (!flujoActual) {
      return (
        <div style={styles.botonesContainer}>
          {MENU_PRINCIPAL.map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => seleccionarOpcion(opcion.id)}
              style={styles.botonOpcion}
            >
              {opcion.label}
            </button>
          ))}
        </div>
      );
    }

    // Preguntas frecuentes
    if (flujoActual === 'preguntas') {
      return (
        <div style={styles.botonesContainer}>
          {PREGUNTAS_FRECUENTES.map((pf, index) => (
            <button
              key={index}
              onClick={() => {
                agregarMensajeUsuario(pf.pregunta);
                agregarMensajeBot(pf.respuesta);
                setFlujoActual('finalizado');
              }}
              style={styles.botonOpcion}
            >
              {pf.pregunta}
            </button>
          ))}
          <button onClick={() => seleccionarOpcion('menu')} style={styles.botonSecundario}>
            Volver al menu
          </button>
        </div>
      );
    }

    // Diagnosticos - seleccion
    if (flujoActual === 'diagnostico') {
      return (
        <div style={styles.botonesContainer}>
          {DIAGNOSTICOS.map((diag, index) => (
            <button
              key={index}
              onClick={() => {
                agregarMensajeUsuario(diag.nombre);
                agregarMensajeBot(diag.info);

                const consejosTexto = diag.consejos.map((c, i) => `${i + 1}. ${c}`).join('\n');
                setTimeout(() => {
                  agregarMensajeBot(`Consejos para tu dia a dia:\n${consejosTexto}`);
                }, 800);

                const orgsTexto = diag.organizaciones
                  .map((o) => `${o.nombre}\nTel: ${o.telefono}${o.web ? `\nWeb: ${o.web}` : ''}`)
                  .join('\n\n');
                setTimeout(() => {
                  agregarMensajeBot(`Organizaciones que pueden ayudarte:\n\n${orgsTexto}`);
                }, 1600);

                setTimeout(() => {
                  agregarMensajeBot('Recuerda: no estas solo en esto. SANTE te ayuda a llevar el control de tus medicamentos y citas. Si necesitas algo mas, estoy aqui.');
                  setFlujoActual('finalizado');
                }, 2400);
              }}
              style={styles.botonOpcion}
            >
              {diag.nombre}
            </button>
          ))}
          <button onClick={() => seleccionarOpcion('menu')} style={styles.botonSecundario}>
            Volver al menu
          </button>
        </div>
      );
    }

    // Finalizado
    if (flujoActual === 'finalizado') {
      return (
        <div style={styles.botonesContainer}>
          <button onClick={() => mostrarMenuPrincipal()} style={styles.botonOpcion}>
            Necesito algo mas
          </button>
          <button onClick={() => setIsOpen(false)} style={styles.botonSecundario}>
            Cerrar chat
          </button>
        </div>
      );
    }

    // Medicamento paso 2: frecuencia
    if (flujoActual === 'medicamento' && pasoActual === 2) {
      return (
        <div style={styles.botonesContainer}>
          {FRECUENCIAS.map((f) => (
            <button
              key={f.id}
              onClick={() => seleccionarBotonFlujo(String(f.id), f.label)}
              style={styles.botonOpcion}
            >
              {f.label}
            </button>
          ))}
        </div>
      );
    }

    // Medicamento paso 4: confirmacion
    if (flujoActual === 'medicamento' && pasoActual === 4) {
      return (
        <div style={styles.botonesContainer}>
          <button onClick={confirmarMedicamento} disabled={enviando} style={styles.botonConfirmar}>
            {enviando ? 'Registrando...' : 'Confirmar'}
          </button>
          <button onClick={cancelar} style={styles.botonCancelar}>
            Cancelar
          </button>
        </div>
      );
    }

    // Cita paso 1: especialidades
    if (flujoActual === 'cita' && pasoActual === 1) {
      return (
        <div style={styles.botonesContainer}>
          {especialidades.map((e) => (
            <button
              key={e.id_especialidad}
              onClick={() => seleccionarBotonFlujo(String(e.id_especialidad), e.nombre)}
              style={styles.botonOpcion}
            >
              {e.nombre}
            </button>
          ))}
        </div>
      );
    }

    // Cita paso 2: tipo
    if (flujoActual === 'cita' && pasoActual === 2) {
      return (
        <div style={styles.botonesContainer}>
          <button onClick={() => seleccionarBotonFlujo('periodica', 'Periodica')} style={styles.botonOpcion}>
            Periodica
          </button>
          <button onClick={() => seleccionarBotonFlujo('individual', 'Individual')} style={styles.botonOpcion}>
            Individual
          </button>
        </div>
      );
    }

    // Cita paso 6: confirmacion
    if (flujoActual === 'cita' && pasoActual === 6) {
      return (
        <div style={styles.botonesContainer}>
          <button onClick={confirmarCita} disabled={enviando} style={styles.botonConfirmar}>
            {enviando ? 'Agendando...' : 'Confirmar'}
          </button>
          <button onClick={cancelar} style={styles.botonCancelar}>
            Cancelar
          </button>
        </div>
      );
    }

    // Examen paso 5: confirmacion
    if (flujoActual === 'examen' && pasoActual === 5) {
      return (
        <div style={styles.botonesContainer}>
          <button onClick={confirmarExamen} disabled={enviando} style={styles.botonConfirmar}>
            {enviando ? 'Registrando...' : 'Confirmar'}
          </button>
          <button onClick={cancelar} style={styles.botonCancelar}>
            Cancelar
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={styles.container}>
      {/* Panel de chat */}
      {isOpen && (
        <div style={styles.panel} role="dialog" aria-label="Asistente virtual SANTE">
          {/* Encabezado */}
          <div style={styles.panelHeader}>
            <div style={styles.headerInfo}>
              <FontAwesomeIcon icon={faRobot} style={styles.headerIcon} />
              <div>
                <h3 style={styles.headerTitle}>Asistente SANTE</h3>
                <span style={styles.headerStatus}>En linea</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Area de mensajes */}
          <div style={styles.mensajesArea} ref={chatRef} role="log" aria-live="polite" aria-label="Mensajes del asistente">
            {mensajes.map((msg, index) => (
              <div
                key={index}
                style={msg.tipo === 'bot' ? styles.mensajeBot : styles.mensajeUsuario}
              >
                {msg.tipo === 'bot' && (
                  <div style={styles.avatarBot}>
                    <FontAwesomeIcon icon={faRobot} style={{ fontSize: '12px' }} />
                  </div>
                )}
                <div
                  style={msg.tipo === 'bot' ? styles.burbujaBot : styles.burbujaUsuario}
                >
                  {msg.texto.split('\n').map((linea, i) => (
                    <React.Fragment key={i}>
                      {linea}
                      {i < msg.texto.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}

            {/* Botones de accion */}
            {renderBotones()}
          </div>

          {/* Input de texto */}
          {esperandoInput && (
            <div style={styles.inputArea}>
              <input
                type={inputTipo}
                value={inputTexto}
                onChange={(e) => setInputTexto(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu respuesta..."
                style={styles.inputTexto}
                aria-label="Escribe tu respuesta"
                autoFocus
              />
              <button onClick={enviarInput} style={styles.botonEnviar}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Boton flotante */}
      <button
        onClick={abrirChat}
        style={{
          ...styles.fab,
          display: isOpen ? 'none' : 'flex',
        }}
        aria-label="Abrir asistente de SANTE"
      >
        <FontAwesomeIcon icon={faCommentDots} style={{ fontSize: '24px' }} />
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '24px',
    left: '24px',
    zIndex: 8500,
    fontFamily: "'DM Sans', sans-serif",
  },
  fab: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: 'none',
    background: 'linear-gradient(135deg, #0A4D68 0%, #088395 100%)',
    color: '#ffffff',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    width: '380px',
    height: '520px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    background: 'linear-gradient(135deg, #0A4D68 0%, #088395 100%)',
    color: '#ffffff',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerIcon: {
    fontSize: '24px',
    opacity: 0.9,
  },
  headerTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
  },
  headerStatus: {
    fontSize: '12px',
    opacity: 0.8,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px',
    opacity: 0.8,
  },
  mensajesArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: '#f8fafc',
  },
  mensajeBot: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
  mensajeUsuario: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  avatarBot: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#0A4D68',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
  },
  burbujaBot: {
    backgroundColor: '#ffffff',
    color: '#334155',
    padding: '10px 14px',
    borderRadius: '4px 16px 16px 16px',
    fontSize: '14px',
    lineHeight: 1.5,
    maxWidth: '260px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
  },
  burbujaUsuario: {
    backgroundColor: '#0A4D68',
    color: '#ffffff',
    padding: '10px 14px',
    borderRadius: '16px 4px 16px 16px',
    fontSize: '14px',
    lineHeight: 1.5,
    maxWidth: '260px',
  },
  botonesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '4px',
  },
  botonOpcion: {
    padding: '10px 14px',
    borderRadius: '12px',
    border: '2px solid #0A4D68',
    backgroundColor: '#ffffff',
    color: '#0A4D68',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
  },
  botonSecundario: {
    padding: '8px 14px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'center',
  },
  botonConfirmar: {
    padding: '10px 14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #0A4D68 0%, #088395 100%)',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  botonCancelar: {
    padding: '10px 14px',
    borderRadius: '12px',
    border: '2px solid #ef4444',
    backgroundColor: '#ffffff',
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  inputArea: {
    display: 'flex',
    padding: '12px 16px',
    borderTop: '1px solid #e2e8f0',
    gap: '8px',
    backgroundColor: '#ffffff',
  },
  inputTexto: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    outline: 'none',
    color: '#0f172a',
  },
  botonEnviar: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    border: 'none',
    background: '#0A4D68',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
};
