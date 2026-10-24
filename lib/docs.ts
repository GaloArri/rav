// Documentación de cada device, para /soporte/[producto].
// Todo lo de acá sale del documento "Plug-ins RAV para Ableton Live" y de las
// capturas de las interfaces. No inventar comportamiento que no esté ahí.

export type Paso = { titulo: string; texto: string };
export type Duda = { pregunta: string; respuesta: string };

export type Doc = {
  /** Una línea: para qué sirve, antes de cualquier instrucción. */
  para: string;
  /** Dónde va dentro del Set. */
  dondeVa: string;
  /** Si trae archivos al lado del .amxd que no se pueden separar. */
  enCarpeta?: boolean;
  /** Lo que hay que saber para usarlo, en orden. */
  uso: Paso[];
  /** Lo que más se pregunta cuando algo no anda. */
  dudas: Duda[];
};

/** Vale para todos: se descarga, se copia a la User Library y aparece en Live. */
export const INSTALACION: Paso[] = [
  {
    titulo: "Descargá el archivo",
    texto:
      "Te llega por mail un link de descarga que vale siete días. Si se te venció, escribinos y te lo renovamos.",
  },
  {
    titulo: "Copialo a la User Library de Ableton",
    texto:
      "En Mac está en Música / Ableton / User Library / Presets / Audio Effects / Max Audio Effect. Si el device vino en carpeta, mové la carpeta entera: los archivos que están al lado del .amxd son el motor y no pueden quedar en otro lado.",
  },
  {
    titulo: "Refrescá el navegador de Live",
    texto:
      "Si Ableton ya estaba abierto, apretá el botón de refrescar en el navegador de Live o cerrá y volvé a abrir el programa. Hasta que no lo hagas, el device no figura en la lista.",
  },
  {
    titulo: "Arrastralo a una pista",
    texto:
      "Y listo, no hay nada que instalar aparte ni ninguna licencia que activar dentro de Ableton.",
  },
];

/** Dudas que son iguales para los diez. */
export const DUDAS_COMUNES: Duda[] = [
  {
    pregunta: "No aparece en Ableton",
    respuesta:
      "Casi siempre quedó fuera de la User Library. Fijate que esté adentro, y que en Preferences, pestaña Library, Live esté apuntando a esa carpeta.",
  },
  {
    pregunta: "Está en inglés",
    respuesta:
      "Todos arrancan en inglés. Abajo a la izquierda hay un chip EN / ES: tocalo y pasa a castellano. Cada device recuerda el suyo, así que si tenés varios cargados hay que cambiarlos uno por uno.",
  },
  {
    pregunta: "Lo moví de carpeta y dejó de andar",
    respuesta:
      "Pasa con los que vienen en carpeta: el .amxd necesita los archivos que están al lado. Si lo mudás, mudá la carpeta entera.",
  },
];

export const DOCS: Record<string, Doc> = {
  "rav-timer": {
    para: "Es la base del sistema: lee el Set y levanta la página que mira todo el equipo.",
    dondeVa: "Una pista MIDI cualquiera del Set.",
    enCarpeta: true,
    uso: [
      {
        titulo: "Escaneá el show",
        texto:
          "MAKE arma el show leyendo los clips del track de playback. Si después cambiás el Set, SCAN lo vuelve a leer. Mientras no escanees, los relojes no tienen de dónde sacar los tiempos.",
      },
      {
        titulo: "Pasale la dirección al equipo",
        texto:
          "Abajo del device están LOCAL y PUBLIC. LOCAL es la dirección en la red del show, en el puerto 8097: cualquiera en la misma WiFi la abre en el celular. PUBLIC es un link para quien no está en esa red.",
      },
      {
        titulo: "Cada uno entra con su rol",
        texto:
          "Al abrir la página se elige el rol. El transporte lo ve solamente quien entra como PLAYBACK; el resto ve los mismos tiempos pero no puede tocar nada.",
      },
      {
        titulo: "Las notas son de cada uno",
        texto:
          "Cada persona deja sus notas por tema sin pisar las de los demás, y el setlist con las notas se exporta a PDF desde la misma página.",
      },
      {
        titulo: "Las ventanas aparte",
        texto:
          "POP UP abre el reloj grande, para mandarlo a un segundo monitor o a una pantalla de escenario. SETLIST abre la lista completa en su propia ventana.",
      },
    ],
    dudas: [
      {
        pregunta: "El celular no abre la página",
        respuesta:
          "Tiene que estar en la misma red que la computadora de playback. Si la red del lugar separa los dispositivos entre sí —muchas WiFi de hotel y de venue lo hacen— usá el link público.",
      },
      {
        pregunta: "Los tiempos no coinciden con el Set",
        respuesta:
          "Volvé a escanear con SCAN. El device no se entera solo de que moviste clips o marcadores.",
      },
      {
        pregunta: "No veo el timecode",
        respuesta:
          "El timecode lo publica el RAV LTC. Si ese device no está cargado en el Set, el Timer no tiene de dónde leerlo.",
      },
    ],
  },

  "rav-full-setlist": {
    para: "Arma la lista real de temas del show, en vez de los puntos de disparo.",
    dondeVa: "Una pista MIDI. Necesita el RAV Timer cargado en el mismo Set.",
    uso: [
      {
        titulo: "Leé el show",
        texto:
          "READ THE SHOW trae todo lo que hay en el Set. A la izquierda ves eso; a la derecha, lo que va a salir publicado.",
      },
      {
        titulo: "Sacá lo que no es un tema",
        texto:
          "Lo que sacás queda en gris: sigue estando en el show, simplemente no se publica. Los marcadores suelen estar donde hay que disparar algo, no donde empieza cada tema.",
      },
      {
        titulo: "Agregá los temas de los medleys",
        texto:
          "Los que viven adentro de un medley no tienen marcador propio. Poné el cursor de Live donde empieza el tema y agregalo a mano.",
      },
      {
        titulo: "Mandala a la web",
        texto:
          "SEND TO THE WEB publica la lista. Hasta que no la mandes, el estado dice NOT SENT y el equipo sigue viendo la lista vieja.",
      },
    ],
    dudas: [
      {
        pregunta: "El equipo ve otra lista",
        respuesta:
          "Fijate el estado: si dice NOT SENT, armaste la lista pero no la publicaste. Apretá SEND TO THE WEB.",
      },
      {
        pregunta: "Falta un tema",
        respuesta:
          "Si corre derecho dentro de un medley, no tiene marcador. Hay que agregarlo a mano poniendo el cursor de Live donde empieza.",
      },
    ],
  },

  "rav-remote": {
    para: "Convierte la página del Timer en un control remoto.",
    dondeVa: "Una pista MIDI. Necesita el RAV Timer cargado en el mismo Set.",
    uso: [
      {
        titulo: "No hay nada que configurar",
        texto:
          "Se arrastra y listo. Avisa cada dos segundos que está presente, y con eso el Timer sabe que puede mostrar los controles en la página.",
      },
      {
        titulo: "Desde la web",
        texto:
          "Aparecen PLAY y PAUSE, y tocando un tema de la lista se salta a él.",
      },
      {
        titulo: "Desde el device",
        texto:
          "El panel muestra el tema que suena y el que sigue, y tiene PLAY y PAUSE para manejarlo también desde la computadora.",
      },
    ],
    dudas: [
      {
        pregunta: "No veo PLAY ni PAUSE en el celular",
        respuesta:
          "Dos motivos posibles: el módulo no está cargado en el Set, o entraste con un rol que no es PLAYBACK. El transporte lo ve solo ese rol.",
      },
    ],
  },

  "rav-tune": {
    para: "Lleva la pantalla del Auto-Tune al celular o al iPad.",
    dondeVa: "Una pista MIDI. Necesita el RAV Timer y el RAV Bridge en el mismo Set.",
    uso: [
      {
        titulo: "Se arrastra y no se toca más",
        texto:
          "El device solo muestra las direcciones. Todo lo demás pasa en la página del Timer.",
      },
      {
        titulo: "La pantalla",
        texto:
          "Aparecen las cuatro perillas —Retune, Flex, Humanize y Vibrato— más la tonalidad y la escala. El botón de pantalla completa la deja en grande, para tener el tablet al lado de la consola.",
      },
    ],
    dudas: [
      {
        pregunta: "Veo la pantalla pero las perillas están en cero y no mueven nada",
        respuesta:
          "Falta el RAV Bridge. Este módulo abre la pantalla; el que habla con el Auto-Tune es el Bridge. Sin él no hay valores que mostrar ni nada que mover.",
      },
    ],
  },

  "rav-bridge": {
    para: "Maneja el Antares Auto-Tune de la UAD Console desde Ableton.",
    dondeVa: "Una pista MIDI.",
    enCarpeta: true,
    uso: [
      {
        titulo: "Elegí el canal MIDI",
        texto:
          "Arriba a la derecha está MIDI CH. Tiene que coincidir con el que escucha el Auto-Tune en la Console.",
      },
      {
        titulo: "Las perillas son parámetros de Live",
        texto:
          "Retune Speed, Flex Tune, Humanize, Tracking y Natural Vibrato se automatizan en la línea de tiempo y se mapean a un controlador, como cualquier parámetro de Ableton.",
      },
      {
        titulo: "El Retune Speed es el de verdad",
        texto:
          "No es un rango lineal: está armado sobre la curva real medida del plug-in. El número que ves en Live es el que ves en el Auto-Tune.",
      },
      {
        titulo: "Tonalidad, escala y presets",
        texto:
          "La tonalidad y la escala tienen su propio CC asignable, y se pueden usar escalas propias. Los presets se guardan con nombre y se llaman por número.",
      },
    ],
    dudas: [
      {
        pregunta: "Muevo las perillas y el Auto-Tune no responde",
        respuesta:
          "Revisá que el canal MIDI del device sea el mismo que el del Auto-Tune en la Console, y que la Console esté corriendo con el plug-in insertado.",
      },
      {
        pregunta: "Los valores llegan tarde",
        respuesta:
          "El device muestra la latencia que reporta la Console. Si ese número es alto, el retraso viene de ahí y no del device.",
      },
    ],
  },

  "rav-bypass": {
    para: "Prende y apaga el bypass del Auto-Tune. Nada más.",
    dondeVa: "Una pista MIDI.",
    enCarpeta: true,
    uso: [
      {
        titulo: "Automatizalo por tema",
        texto:
          "Es un parámetro de Live: lo dibujás en el Arrangement y el tune se apaga solo donde el cantante habla.",
      },
      {
        titulo: "O mapealo",
        texto:
          "Se mapea a una tecla o a un pedal, para apagarlo a mano sin ir a tocar la Console.",
      },
    ],
    dudas: [
      {
        pregunta: "No pasa nada al apretarlo",
        respuesta:
          "Igual que el Bridge: el canal MIDI del device tiene que coincidir con el del Auto-Tune en la Console.",
      },
    ],
  },

  "rav-ltc": {
    para: "Lee el timecode SMPTE que entra por audio y lo muestra en grande.",
    dondeVa:
      "Es el único que va en una pista de AUDIO: la que trae el LTC. Es un efecto de audio, no un instrumento.",
    uso: [
      {
        titulo: "Cuidá el nivel",
        texto:
          "Entre −18 y −3 dBFS, sin filtros fuertes en el camino. Es lo único que hay que mirar para que lea limpio.",
      },
      {
        titulo: "Engancha solo",
        texto:
          "No hay que elegir formato: lo detecta y lo muestra. El audio pasa sin tocarse, así que podés dejarlo puesto sin miedo.",
      },
      {
        titulo: "Mirá el fondo",
        texto:
          "Verde mientras está leyendo, rojo cuando el código se frena. Se ve de lejos y de reojo, que es para lo que está.",
      },
      {
        titulo: "La ventana aparte",
        texto: "POP UP la saca a su propia ventana, para dejarla en otro monitor.",
      },
    ],
    dudas: [
      {
        pregunta: "Está en rojo",
        respuesta:
          "El código se frenó o no está llegando. Revisá que la pista de audio sea la del LTC, que esté sonando, y el nivel de entrada.",
      },
      {
        pregunta: "Los números saltan",
        respuesta:
          "Suele ser nivel: muy bajo o muy saturado. Llevalo a la franja de −18 a −3 dBFS y sacá cualquier filtro que esté en el camino.",
      },
      {
        pregunta: "El equipo no ve el timecode en el celular",
        respuesta:
          "El Timer lo publica, pero necesita que este device esté cargado en el Set.",
      },
    ],
  },

  "rav-cdj": {
    para: "Maneja el transporte de Ableton desde una CDJ.",
    dondeVa: "Los dos devices, Control y Monitor, en pistas MIDI.",
    uso: [
      {
        titulo: "Preparate el Set",
        texto:
          "Los clips van con Warp en Re-Pitch y la música tiene que estar en Arrangement. Sin eso el plato no suena a vinilo.",
      },
      {
        titulo: "Aprendé el mapeo",
        texto:
          "En el Control, click en una fila y movés el control de la CDJ: lo aprende. Option + click borra. Se hace una vez y queda guardado.",
      },
      {
        titulo: "Los hot cues",
        texto:
          "Los ocho saltan a los locators de la sesión, en orden de tiempo. No se asignan a mano: salen de los locators que ya tenés.",
      },
      {
        titulo: "El pitch y el jog",
        texto:
          "El pitch mueve el tempo sobre la base, con los rangos de la CDJ: ±6, ±10, ±16 y WIDE, con inversión si el fader queda al revés. El jog sin tocar el plato empuja o frena el tempo un instante; con la mano en el plato y VINYL prendido la sesión se frena y avanza a la velocidad del plato, y hacia atrás rebobina en silencio.",
      },
      {
        titulo: "Probalo sin la CDJ",
        texto:
          "El plato y los botones del Monitor andan con el mouse, así que podés dejar todo listo en tu casa.",
      },
    ],
    dudas: [
      {
        pregunta: "El plato no suena a vinilo",
        respuesta:
          "Los clips tienen que estar con Warp en Re-Pitch. Con otro modo de warp, Ableton corrige el tono y se pierde el efecto.",
      },
      {
        pregunta: "No responde nada",
        respuesta:
          "Mirá la pestaña MIDI del Monitor: ahí ves los mensajes que entran. Si no entra nada, el problema está antes del device.",
      },
      {
        pregunta: "El pitch va al revés",
        respuesta: "Prendé la inversión en el Control.",
      },
    ],
  },

  "rav-qc-preset": {
    para: "Cambia setlist, preset y escena del Quad Cortex desde Ableton.",
    dondeVa: "Una pista MIDI, con el Quad Cortex conectado.",
    uso: [
      {
        titulo: "Canal MIDI",
        texto: "El del device tiene que ser el mismo que el del Quad Cortex.",
      },
      {
        titulo: "Automatizá por tema",
        texto:
          "Setlist, preset y escena son parámetros de Live. Los dibujás en el Arrangement y el equipo llega a cada tema con lo que corresponde, sin que nadie toque nada.",
      },
      {
        titulo: "El retardo entre preset y escena",
        texto:
          "Hay un retardo ajustable en milisegundos entre los dos mensajes, porque a veces el Quad necesita un respiro. Si el cambio de escena se pierde, subilo.",
      },
      {
        titulo: "Si el equipo se reinició",
        texto:
          "RESEND vuelve a mandar el estado. Y con la opción de envío al cargar, la sesión arranca mandando todo sola.",
      },
    ],
    dudas: [
      {
        pregunta: "Cambia el preset pero no la escena",
        respuesta:
          "Subí el retardo entre los dos mensajes. El Quad se come el segundo si llega demasiado pegado al primero.",
      },
      {
        pregunta: "No cambia nada",
        respuesta:
          "Revisá el canal MIDI y que el Quad esté conectado. El punto de MIDI del device se prende cuando hay comunicación.",
      },
    ],
  },

  "rav-spd-kit": {
    para: "Cambia el kit de la Roland SPD-SX PRO desde Ableton.",
    dondeVa: "Una pista MIDI, con la SPD-SX PRO conectada.",
    uso: [
      {
        titulo: "Preparate la SPD",
        texto:
          "En SYSTEM MIDI tiene que estar Program Change Rx en ON, y el canal igual al del device. Sin eso la SPD ignora el mensaje.",
      },
      {
        titulo: "Elegí el kit",
        texto:
          "Por número, con sus bancos MSB y LSB, o moviéndolo de a uno con los botones. El device muestra el Program Change y los bancos que está mandando.",
      },
      {
        titulo: "Automatizá por tema",
        texto:
          "El número de kit es un parámetro de Live: la SPD llega a cada tema con el kit puesto y el baterista no tiene que buscarlo.",
      },
      {
        titulo: "Los pads",
        texto:
          "Arriba están los nueve con su nota, para ver de un vistazo qué manda cada uno. La nota del primero se configura y el resto sale en orden.",
      },
    ],
    dudas: [
      {
        pregunta: "No cambia de kit",
        respuesta:
          "Es casi siempre la SPD: Program Change Rx tiene que estar en ON en SYSTEM MIDI, y el canal tiene que coincidir.",
      },
      {
        pregunta: "Cambia al kit equivocado",
        respuesta:
          "Mirá los bancos. El device muestra el PC, el MSB y el LSB que manda; si los bancos no son los que la SPD espera, cae en otro kit.",
      },
    ],
  },
};

export const porDoc = (slug: string): Doc | undefined => DOCS[slug];
