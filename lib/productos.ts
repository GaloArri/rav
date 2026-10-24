import { DOLAR } from "./tienda";

// Catálogo del store. Fuente única de verdad: editar acá y deployar.
// Cuando pase de ~50 productos conviene mover esto a Supabase.

export type Linea = "software" | "stock" | "pedido";

export type Producto = {
  slug: string;
  nombre: string;
  linea: Linea;
  resumen: string; // una línea, se ve en el listado
  resumenEn?: string; // el mismo resumen en inglés
  descripcion: string; // párrafo, se ve en la ficha
  descripcionEn?: string; // la misma descripción en inglés
  precioARS?: number; // sin definir => "Consultar"
  precioUSD?: number;
  imagenes: string[];
  specs: { label: string; valor: string }[];
  // sólo software
  version?: string;
  requisitos?: string[];
  descarga?: string; // link de compra externo (Paddle / Gumroad)
  docs?: string; // link a la doc del device
  incluye?: string[]; // sólo packs: slugs de los devices que trae adentro
};

export const LINEAS: Record<Linea, { titulo: string; bajada: string; entrega: string }> = {
  software: {
    titulo: "Software",
    bajada:
      "Diez devices de Max for Live para el trabajo de playback en vivo. El RAV Timer es la base: los demás se le enchufan o andan solos.",
    entrega: "Descarga inmediata",
  },
  stock: {
    titulo: "Hardware y accesorios",
    bajada:
      "Talkback, timecode y soportes. Lo que se rompe, se pierde y se olvida en cada gira, armado en el taller.",
    entrega: "Se arma en el taller",
  },
  pedido: {
    titulo: "A pedido",
    bajada:
      "Trabajos que no tienen dos iguales: se charlan, se cotizan y se fabrican para cada caso.",
    entrega: "Se cotiza, plazo según trabajo",
  },
};

export const PRODUCTOS: Producto[] = [
  // ─── Packs ─────────────────────────────────────────────────────────────
  // Los módulos del Timer no sirven sueltos, así que el pack es la forma
  // natural de comprarlos. Los precios sueltos no se tocan: el pack es el
  // que tiene que convenir.
  {
    slug: "pack-playback",
    nombre: "RAV Show Control Bundle",
    linea: "software",
    resumen:
      "El Timer y sus cuatro módulos: el sistema completo de playback en vivo.",
    resumenEn: "The Timer and its four modules: the full live playback system.",
    descripcion:
      "El RAV Timer con todo lo que se enchufa a su página web. Es la forma de comprar el sistema entero y no device por device.\n\nTrae el Timer, que lee el Set y publica los tiempos del show; el Full Setlist, que arma la lista real de temas; el Remote, que agrega play, pausa y salto de tema; el Tune, que agrega la pantalla de Auto-Tune, y el Bridge, que es el que le habla al Auto-Tune de la Console y sin el cual esa pantalla no muestra valores.\n\nSueltos son US$ 115.",
    descripcionEn:
      "The RAV Timer with everything that plugs into its web page. This is how you buy the whole system instead of one device at a time.\n\nIt includes the Timer, which reads the Set and publishes the show clocks; Full Setlist, which builds the real song list; Remote, which adds play, pause and song jump; Tune, which adds the Auto-Tune screen; and Bridge, which is what talks to the Auto-Tune in Console and without which that screen shows no values.\n\nSeparately they come to US$ 115.",
    precioUSD: 90,
    imagenes: [
      "/images/products/rav-timer-web.webp",
      "/images/products/rav-timer.webp",
      "/images/products/rav-timer-celulares.webp",
    ],
    specs: [
      { label: "Trae", valor: "5 devices" },
      { label: "Sueltos", valor: "US$ 115" },
      { label: "Ahorro", valor: "US$ 25" },
      { label: "Formato", valor: "Max for Live (.amxd)" },
    ],
    requisitos: [
      "Ableton Live Suite, o Live Standard con Max for Live",
      "Red local para la página del equipo",
      "Antares Auto-Tune en UAD Console, para el Bridge y el Tune",
    ],
    descarga: "",
    incluye: ["rav-timer", "rav-full-setlist", "rav-remote", "rav-tune", "rav-bridge"],
  },
  {
    slug: "pack-completo",
    nombre: "RAV Bundle Completo",
    linea: "software",
    resumen: "Los diez devices, todo lo que hacemos para Ableton.",
    resumenEn: "All ten devices, everything we make for Ableton.",
    descripcion:
      "Todo el software de RAV en una sola compra: el sistema del Timer entero, el control del Auto-Tune, el lector de timecode, la CDJ y los dos devices de escenario, el Quad Cortex y la SPD-SX PRO.\n\nEs lo que usamos nosotros en un rack de playback completo.\n\nSueltos son US$ 237.",
    descripcionEn:
      "All of RAV's software in one purchase: the whole Timer system, Auto-Tune control, the timecode reader, the CDJ, and the two stage devices for the Quad Cortex and the SPD-SX PRO.\n\nIt is what we run ourselves in a full playback rack.\n\nSeparately they come to US$ 237.",
    precioUSD: 140,
    imagenes: [
      "/images/products/pack-completo.webp",
      "/images/products/rav-timer-web.webp",
    ],
    specs: [
      { label: "Trae", valor: "Los 10 devices" },
      { label: "Sueltos", valor: "US$ 237" },
      { label: "Ahorro", valor: "US$ 97" },
      { label: "Formato", valor: "Max for Live (.amxd)" },
    ],
    requisitos: [
      "Ableton Live Suite, o Live Standard con Max for Live",
      "Cada device pide además su equipo: ver la ficha de cada uno",
    ],
    descarga: "",
    incluye: [
      "rav-timer",
      "rav-full-setlist",
      "rav-remote",
      "rav-tune",
      "rav-bridge",
      "rav-bypass",
      "rav-ltc",
      "rav-cdj",
      "rav-qc-preset",
      "rav-spd-kit",
    ],
  },

  // ─── Software ──────────────────────────────────────────────────────────
  // Los textos salen del documento "Plug-ins RAV para Ableton Live" (21-10-2026).
  // El RAV Timer es la base: los módulos se enchufan a su página web.
  {
    slug: "rav-timer",
    nombre: "RAV Timer",
    linea: "software",
    resumen:
      "Lee el Set de Ableton y publica los tiempos del show en una página web.",
    resumenEn: "Reads the Ableton Set and publishes the show's clocks to a web page.",
    descripcion:
      "Se carga en una pista MIDI, escanea los clips del track de playback y arma el show: tema actual, tema que sigue, cuánto le queda al tema y cuánto al show entero. Si el Set tiene secciones marcadas, muestra en cuál está y cuánto le falta.\n\nAl mismo tiempo levanta una página web en la red local, en el puerto 8097. El device muestra la dirección; cualquiera en la misma WiFi la abre en el celular y ve lo mismo que vos, en tiempo real. También genera un link público para quien no esté en la red.\n\nEn la página, cada uno del equipo entra con su rol y puede dejar notas por tema, las suyas, sin pisar las de los demás. Hay exportación a PDF del setlist con las notas, y cada aparato elige idioma y tema claro u oscuro sin afectar a los demás.\n\nAdemás de la web, el device tiene una ventana aparte con el reloj grande, para dejarla en un segundo monitor o mandarla a una pantalla de escenario, y otra con el setlist completo. Lee también el timecode SMPTE, el BPM de Live y la tonalidad del tema, y los muestra junto a los relojes.",
    descripcionEn:
      "It loads on a MIDI track, scans the clips on the playback track and builds the show: current song, next song, time left in the song and time left in the whole show. If the Set has sections marked, it shows which one you are in and how much is left.\n\nAt the same time it serves a web page on the local network, on port 8097. The device shows the address; anyone on the same WiFi opens it on their phone and sees exactly what you see, live. It also generates a public link for anyone who is not on the network.\n\nOn that page each person signs in with their role and can leave notes per song — their own, without touching anyone else's. The setlist and notes export to PDF, and each device picks its own language and light or dark theme without affecting the others.\n\nBesides the web page, the device opens a separate window with the big clock, to put on a second monitor or send to a stage screen, and another with the full setlist. It also reads SMPTE timecode, Live's BPM and the key of the song, and shows them next to the clocks.",
    precioUSD: 45,
    imagenes: [
      "/images/products/rav-timer.webp",
      "/images/products/rav-timer-web.webp",
      "/images/products/rav-timer-celulares.webp",
      "/images/products/rav-timer-ventanas.webp",
    ],
    specs: [
      { label: "Se carga en", valor: "Pista MIDI" },
      { label: "Muestra", valor: "Tema actual, el que sigue, y lo que falta del tema y del show" },
      { label: "Página web", valor: "Red local en el puerto 8097, más link público" },
      { label: "Roles", valor: "Cada uno entra con el suyo; el transporte lo ve solo PLAYBACK" },
      { label: "Notas", valor: "Por tema y por persona, sin pisarse" },
      { label: "Exporta", valor: "Setlist con notas a PDF" },
      { label: "Idioma y tema", valor: "Castellano o inglés, claro u oscuro, por aparato" },
      { label: "En el device", valor: "Transporte PLAY, PAUSE, UP y DOWN" },
      { label: "Ventanas aparte", valor: "Reloj grande y setlist completo, con POP UP y SETLIST" },
      { label: "Escanear el Set", valor: "MAKE arma el show y SCAN lo vuelve a leer" },
      { label: "Lee además", valor: "Timecode SMPTE, BPM de Live y tonalidad" },
      { label: "Formato", valor: "Max for Live (.amxd), viene en carpeta" },
    ],
    // TODO: versión real
    requisitos: [
      "Ableton Live Suite, o Live Standard con Max for Live",
      "Red local para la página del equipo",
    ],
    descarga: "",
    docs: "/soporte/rav-timer",
  },
  {
    slug: "rav-full-setlist",
    nombre: "RAV Full Setlist",
    linea: "software",
    resumen:
      "Arma la lista de temas del show y la publica en la página del Timer.",
    resumenEn: "Builds the show's real song list and publishes it to the Timer page.",
    descripcion:
      "En un Set de playback los marcadores suelen estar donde hay que disparar algo, no donde empieza cada tema: los temas que corren derecho no llevan marcador. Para el operador eso alcanza; para el resto del equipo, esa lista no es el show.\n\nEste anexo del Timer arma la lista de verdad. A la izquierda ves todo lo que hay en el Set, a la derecha lo que sale publicado a la web. Lo que sacás queda en gris: sigue estando en el show, simplemente no se publica. Y los temas que viven dentro de un medley, sin marcador propio, los agregás a mano poniendo el cursor de Live donde empieza el tema.\n\nCada fila muestra si el show sigue de largo o frena ahí, y cuánto dura. Una vez armada, esa lista es la que ve todo el equipo en la página del Timer.",
    descripcionEn:
      "In a playback Set the markers usually sit where something has to be fired, not where each song starts: songs that run straight through carry no marker. That is enough for the operator; for everyone else, that list is not the show.\n\nThis Timer add-on builds the real list. On the left you see everything in the Set, on the right what gets published to the web. What you remove turns grey: it is still in the show, it simply is not published. Songs that live inside a medley, with no marker of their own, you add by hand by placing Live's cursor where the song starts.\n\nEach row shows whether the show runs on or stops there, and how long it lasts. Once built, that list is what the whole crew sees on the Timer page.",
    precioUSD: 15,
    imagenes: [
      "/images/products/rav-full-setlist.webp",
    ],
    specs: [
      { label: "Requiere", valor: "RAV Timer" },
      { label: "Arma", valor: "La lista real de temas, no los puntos de disparo" },
      { label: "Edición", valor: "Lo que sacás queda en gris: sigue en el show, no se publica" },
      { label: "Medleys", valor: "Agregás los temas sin marcador con el cursor de Live" },
      { label: "Cada fila", valor: "Si el show sigue o frena ahí, y la duración" },
      { label: "Estado", valor: "Cuántos temas van a la web, cuánto dura el show y si ya se mandó" },
      { label: "Acciones", valor: "Leer el show, armar la lista y mandarla a la web" },
      { label: "Formato", valor: "Max for Live (.amxd)" },
    ],
    // TODO: versión real
    requisitos: [
      "RAV Timer instalado",
      "Ableton Live Suite, o Live Standard con Max for Live",
    ],
    descarga: "",
    docs: "/soporte/rav-full-setlist",
  },
  {
    slug: "rav-remote",
    nombre: "RAV Remote",
    linea: "software",
    resumen:
      "Agrega play, pausa y salto de tema a la página del Timer.",
    resumenEn: "Adds play, pause and song jump to the Timer page.",
    descripcion:
      "Con este módulo cargado en el Set, la página del Timer deja de ser solo para mirar: aparecen PLAY y PAUSE, y tocás un tema de la lista para saltar a él. Es lo que convierte la web en un control remoto.\n\nEn el device no hay nada que configurar: se arrastra a una pista MIDI y listo. Su panel es chico, muestra el tema que suena y el que sigue, y tiene PLAY y PAUSE para manejarlo también desde la compu. Avisa cada dos segundos que está presente, así el Timer sabe que puede mostrar los controles.\n\nLos controles los ve únicamente quien entró con el rol PLAYBACK. El resto del equipo sigue viendo la misma página sin poder tocar el transporte, que es exactamente lo que querés en un show.",
    descripcionEn:
      "With this module loaded in the Set, the Timer page stops being something you only watch: PLAY and PAUSE appear, and tapping a song in the list jumps to it. This is what turns the page into a remote control.\n\nThere is nothing to configure on the device: drag it onto a MIDI track and that's it. Its panel is small — it shows the current and next song, and has PLAY and PAUSE so you can drive it from the computer too. It announces itself every two seconds, so the Timer knows it can show the controls.\n\nOnly whoever signed in with the PLAYBACK role sees those controls. The rest of the crew sees the same page without being able to touch the transport, which is exactly what you want during a show.",
    precioUSD: 15,
    imagenes: [
      "/images/products/rav-remote.webp",
      "/images/products/rav-remote-celular.webp",
    ],
    specs: [
      { label: "Requiere", valor: "RAV Timer" },
      { label: "Habilita", valor: "PLAY, PAUSE y saltar de tema desde la web" },
      { label: "Permisos", valor: "Los controles los ve solo el rol PLAYBACK" },
      { label: "Configuración", valor: "Ninguna: se arrastra a una pista MIDI" },
      { label: "En el device", valor: "Tema actual, el que sigue, y PLAY / PAUSE" },
      { label: "Formato", valor: "Max for Live (.amxd)" },
    ],
    // TODO: versión real
    requisitos: [
      "RAV Timer instalado",
      "Ableton Live Suite, o Live Standard con Max for Live",
    ],
    descarga: "",
    docs: "/soporte/rav-remote",
  },
  {
    slug: "rav-tune",
    nombre: "RAV Tune",
    linea: "software",
    resumen:
      "Agrega la pantalla de control del Auto-Tune a la página del Timer.",
    resumenEn: "Adds the Auto-Tune control screen to the Timer page.",
    descripcion:
      "Habilita la pantalla de Auto-Tune dentro de la página del Timer: las cuatro perillas, Retune, Flex, Humanize y Vibrato, más la tonalidad y la escala, con una vista a pantalla completa pensada para tener el tablet al lado de la consola.\n\nSe arrastra a una pista MIDI y no se toca más. Trabaja junto al RAV Bridge: el Bridge es el que habla con el Auto-Tune, y este módulo es el que abre la pantalla para manejarlo a distancia.",
    descripcionEn:
      "It enables the Auto-Tune screen inside the Timer page: the four knobs — Retune, Flex, Humanize and Vibrato — plus key and scale, with a full-screen view meant for keeping a tablet next to the console.\n\nDrag it onto a MIDI track and forget about it. It works together with RAV Bridge: the Bridge is what talks to the Auto-Tune, and this module is what opens the screen to drive it from a distance.",
    precioUSD: 15,
    imagenes: [
      "/images/products/rav-tune.webp",
      "/images/products/rav-tune-celular.webp",
    ],
    specs: [
      { label: "Requiere", valor: "RAV Timer y RAV Bridge" },
      { label: "Habilita", valor: "La pantalla de Auto-Tune en la página del Timer" },
      { label: "Controla", valor: "Retune, Flex, Humanize, Vibrato, tonalidad y escala" },
      { label: "Vista", valor: "Pantalla completa, pensada para iPad" },
      { label: "Formato", valor: "Max for Live (.amxd)" },
    ],
    // TODO: versión real
    requisitos: [
      "RAV Timer y RAV Bridge instalados",
      "Ableton Live Suite, o Live Standard con Max for Live",
    ],
    descarga: "",
    docs: "/soporte/rav-tune",
  },
  {
    slug: "rav-bridge",
    nombre: "RAV Bridge",
    linea: "software",
    resumen:
      "Controla el Antares Auto-Tune de la UAD Console desde Ableton.",
    resumenEn: "Controls the Antares Auto-Tune running in UAD Console from Ableton.",
    descripcion:
      "Puente MIDI entre Live y el Antares Auto-Tune que corre en la UAD Console. Desde el device manejás Retune Speed, Flex Tune, Humanize, Tracking y Natural Vibrato, más la tonalidad y la escala, con escalas propias y presets que se guardan con nombre.\n\nLo importante es que todo eso son parámetros de Live: se automatizan en la línea de tiempo y se mapean a un controlador. El Retune Speed no es un rango lineal cualquiera, está armado sobre la curva real medida del plug-in, así que el número que ves en Live es el que ves en el Auto-Tune.\n\nCon el Bridge cargado, la página del Timer muestra esos valores en vivo, y con el RAV Tune se manejan desde el celular o el iPad.",
    descripcionEn:
      "A MIDI bridge between Live and the Antares Auto-Tune running in UAD Console. From the device you control Retune Speed, Flex Tune, Humanize, Tracking and Natural Vibrato, plus key and scale, with custom scales and presets saved by name.\n\nWhat matters is that all of those are Live parameters: they automate on the timeline and map to a controller. Retune Speed is not some arbitrary linear range — it is built on the plug-in's real measured curve, so the number you see in Live is the number you see in the Auto-Tune.\n\nWith the Bridge loaded, the Timer page shows those values live, and with RAV Tune you drive them from a phone or tablet.",
    precioUSD: 25,
    imagenes: [
      "/images/products/rav-bridge.webp",
    ],
    specs: [
      { label: "Controla", valor: "Antares Auto-Tune corriendo en UAD Console" },
      { label: "Parámetros", valor: "Retune Speed, Flex Tune, Humanize, Tracking, Natural Vibrato, tonalidad y escala" },
      { label: "CC", valor: "Tonalidad y escala con CC asignable" },
      { label: "Escalas", valor: "Las del plug-in, más escalas propias" },
      { label: "Automatización", valor: "Todos son parámetros de Live: se automatizan y se mapean" },
      { label: "Retune Speed", valor: "Sobre la curva real medida del plug-in" },
      { label: "Presets", valor: "Se guardan con nombre y se llaman por número" },
      { label: "Console", valor: "Muestra la latencia que reporta, y tiene modo UA Direct" },
      { label: "Formato", valor: "Max for Live (.amxd), viene en carpeta" },
    ],
    // TODO: versión real
    requisitos: [
      "Ableton Live Suite, o Live Standard con Max for Live",
      "Antares Auto-Tune corriendo en UAD Console",
    ],
    descarga: "",
    docs: "/soporte/rav-bridge",
  },
  {
    slug: "rav-bypass",
    nombre: "RAV Bypass",
    linea: "software",
    resumen:
      "Activa y desactiva el bypass del Auto-Tune desde Ableton.",
    resumenEn: "Switches the Auto-Tune bypass on and off from Ableton.",
    descripcion:
      "Hace una sola cosa: activa y desactiva el bypass del Auto-Tune insertado en la UAD Console, desde Ableton. Nada más.\n\nEs un parámetro de Live, así que se automatiza por tema o se mapea a una tecla o a un pedal. Sirve para el momento en que el cantante habla y no querés el tune puesto, sin ir a tocar la Console.",
    descripcionEn:
      "It does one thing: it switches the bypass of the Auto-Tune inserted in UAD Console on and off, from Ableton. Nothing else.\n\nIt is a Live parameter, so you automate it per song or map it to a key or a footswitch. It is for the moment the singer talks and you don't want the tune on, without walking over to the Console.",
    precioUSD: 20,
    imagenes: [
      "/images/products/rav-bypass.webp",
    ],
    specs: [
      { label: "Hace", valor: "Prende y apaga el bypass del Auto-Tune" },
      { label: "Automatización", valor: "Parámetro de Live: por tema, o mapeado a tecla o pedal" },
      { label: "Formato", valor: "Max for Live (.amxd), viene en carpeta" },
    ],
    // TODO: versión real
    requisitos: [
      "Ableton Live Suite, o Live Standard con Max for Live",
      "Antares Auto-Tune corriendo en UAD Console",
    ],
    descarga: "",
    docs: "/soporte/rav-bypass",
  },
  {
    slug: "rav-ltc",
    nombre: "RAV LTC",
    linea: "software",
    resumen:
      "Decodifica el timecode SMPTE de una pista de audio de Live.",
    resumenEn: "Decodes SMPTE timecode from an audio track in Live.",
    descripcion:
      "Es el único de la familia que va en una pista de audio: la que trae el LTC. El audio pasa sin tocarse, y el device lo decodifica y muestra el timecode en grande, horas, minutos, segundos y cuadros.\n\nEl fondo avisa el estado de un vistazo: verde mientras está leyendo, rojo cuando el código se frena. No hay que apretar nada ni elegir formato: engancha solo.\n\nPara que lea limpio, el nivel de entrada conviene entre −18 y −3 dBFS, sin filtros fuertes en el camino. El Timer lo toma y lo muestra junto a los relojes del show, así que el equipo ve el timecode en el celular.",
    descripcionEn:
      "It is the only one in the family that goes on an audio track: the one carrying the LTC. The audio passes through untouched, and the device decodes it and shows the timecode in large type — hours, minutes, seconds and frames.\n\nThe background tells you the state at a glance: green while it is reading, red when the code stops. Nothing to press, no format to choose: it locks on by itself.\n\nFor a clean read, keep the input level between −18 and −3 dBFS, with no heavy filtering in the path. The Timer picks it up and shows it next to the show clocks, so the crew sees the timecode on their phones.",
    precioUSD: 19,
    imagenes: [
      "/images/products/rav-ltc.webp",
    ],
    specs: [
      { label: "Se carga en", valor: "Pista de audio, la que trae el LTC" },
      { label: "Audio", valor: "Pasa sin tocarse" },
      { label: "Muestra", valor: "Horas, minutos, segundos y cuadros" },
      { label: "Estado", valor: "Verde mientras lee, rojo cuando el código se frena" },
      { label: "Enganche", valor: "Automático: detecta el formato y lo muestra" },
      { label: "Ventana aparte", valor: "POP UP, para dejarla en otro monitor" },
      { label: "Nivel recomendado", valor: "Entre −18 y −3 dBFS, sin filtros fuertes" },
      { label: "Integración", valor: "El Timer lo publica junto a los relojes del show" },
      { label: "Formato", valor: "Max for Live (.amxd), efecto de audio" },
    ],
    // TODO: versión real
    requisitos: ["Ableton Live Suite, o Live Standard con Max for Live"],
    descarga: "",
    docs: "/soporte/rav-ltc",
  },
  {
    slug: "rav-cdj",
    nombre: "RAV CDJ",
    linea: "software",
    resumen:
      "Controla el transporte de Ableton desde una Pioneer CDJ.",
    resumenEn: "Drives Ableton's transport from a Pioneer CDJ.",
    descripcion:
      "Dos devices que trabajan juntos. El Monitor es la pantalla: botones CUE y PLAY, un plato que gira con el transporte, la posición, el BPM, el contador de beats y una vista del set con los locators. Tiene una pestaña MIDI con los mensajes que entran, y el plato y los botones andan con el mouse, así que se prueba todo sin tener la CDJ delante. El Control es el motor: mapeo con learn para play y pausa, cue, toque y giro del jog, pitch y ocho hot cues, más el modo VINYL.\n\nQué hace cada control:\n• PLAY / PAUSA: pausa y retoma desde donde quedó.\n• CUE: pausado, fija el punto; sonando, frena y vuelve a él.\n• HOT CUES 1 a 8: saltan a los locators de la sesión, en orden de tiempo.\n• PITCH: mueve el tempo sobre la base, con rango ±6, ±10, ±16 y WIDE igual que en la CDJ, e inversión si el fader queda al revés.\n• JOG sin tocar el plato: empuja o frena el tempo un instante.\n• JOG con la mano en el plato y VINYL prendido: la sesión se frena y avanza a la velocidad del plato; hacia atrás rebobina en silencio; al soltar sigue normal desde ahí.\n\nPara que suene a vinilo, los clips van con Warp en Re-Pitch. La música tiene que estar en Arrangement. El mapeo se aprende una vez y queda guardado.",
    descripcionEn:
      "Two devices that work together. The Monitor is the display: CUE and PLAY buttons, a platter that turns with the transport, the position, the BPM, the beat counter and a view of the set with its locators. It has a MIDI tab showing incoming messages, and the platter and buttons respond to the mouse, so you can test everything without the CDJ in front of you. The Control is the engine: learn-based mapping for play and pause, cue, jog touch and turn, pitch and eight hot cues, plus VINYL mode.\n\nWhat each control does:\n• PLAY / PAUSE: pauses and resumes from where it stopped.\n• CUE: when paused, sets the point; when playing, stops and returns to it.\n• HOT CUES 1 to 8: jump to the session's locators, in time order.\n• PITCH: moves the tempo around the base, with ±6, ±10, ±16 and WIDE ranges just like the CDJ, and inversion if the fader runs backwards.\n• JOG without touching the platter: nudges the tempo up or down for an instant.\n• JOG with your hand on the platter and VINYL on: the session slows and follows the platter's speed; backwards it rewinds silently; let go and it carries on from there.\n\nFor it to sound like vinyl, clips go with Warp set to Re-Pitch. The music has to be in Arrangement. The mapping is learned once and stays saved.",
    precioUSD: 45,
    imagenes: [
      "/images/products/rav-cdj-monitor.webp",
      "/images/products/rav-cdj-control.webp",
    ],
    specs: [
      { label: "Módulos", valor: "Control y Monitor, los dos incluidos" },
      { label: "Controla", valor: "Play y pausa, cue, jog, pitch y 8 hot cues" },
      { label: "Hot cues", valor: "Saltan a los locators de la sesión, en orden de tiempo" },
      { label: "Pitch", valor: "±6, ±10, ±16 y WIDE, con inversión si el fader va al revés" },
      { label: "Jog", valor: "Nudge, o VINYL con frenado y rebobinado" },
      { label: "Monitor", valor: "Plato, compás . tiempo . semicorchea, BPM, métrica y punto de cue" },
      { label: "Pestaña MIDI", valor: "Los mensajes que entran, para ver qué manda la CDJ" },
      { label: "Se prueba sin la CDJ", valor: "El plato y los botones andan con el mouse" },
      { label: "Mapeo", valor: "Click en la fila para aprender, option + click para borrar" },
      { label: "Jog fino", valor: "Sensibilidad ajustable" },
      { label: "Formato", valor: "Max for Live (.amxd)" },
    ],
    // TODO: versión real
    requisitos: [
      "Ableton Live Suite, o Live Standard con Max for Live",
      "Pioneer CDJ conectada por MIDI",
      "Clips con Warp en Re-Pitch y la música en Arrangement",
    ],
    descarga: "",
    docs: "/soporte/rav-cdj",
  },
  {
    slug: "rav-qc-preset",
    nombre: "RAV QC Preset",
    linea: "software",
    resumen:
      "Cambia setlist, preset y escena del Quad Cortex desde Ableton.",
    resumenEn: "Changes setlist, preset and scene on the Quad Cortex from Ableton.",
    descripcion:
      "Selector de setlist, preset y escena del Quad Cortex desde Ableton. Elegís el setlist, el preset y la escena, de la A a la H, y el device manda el MIDI correspondiente.\n\nLos tres son parámetros de Live: se automatizan en el Arrangement, así que el equipo cambia solo en cada tema sin que nadie toque nada, o se mapean a un pedal.\n\nTiene canal MIDI configurable, MIDI Thru, envío automático al cargar la sesión, un botón para reenviar el estado cuando el equipo se reinició, el tuner, y un retardo ajustable entre el cambio de preset y el de escena, para los casos en que el Quad necesita un respiro entre los dos mensajes.",
    descripcionEn:
      "A setlist, preset and scene selector for the Quad Cortex, from Ableton. You pick the setlist, the preset and the scene — A through H — and the device sends the matching MIDI.\n\nAll three are Live parameters: they automate in the Arrangement, so the rig changes by itself on every song without anyone touching it, or they map to a footswitch.\n\nIt has a configurable MIDI channel, MIDI Thru, automatic send when the session loads, a button to resend the state after the rig has been restarted, the tuner, and an adjustable delay between the preset and the scene change, for the cases where the Quad needs a moment between the two messages.",
    precioUSD: 19,
    imagenes: [
      "/images/products/rav-qc-preset.webp",
    ],
    specs: [
      { label: "Controla", valor: "Neural DSP Quad Cortex" },
      { label: "Elegís", valor: "Setlist, preset y escena, de la A a la H" },
      { label: "Automatización", valor: "Los tres son parámetros de Live" },
      { label: "MIDI", valor: "Canal configurable y Thru" },
      { label: "Al cargar", valor: "Manda el estado solo al abrir la sesión" },
      { label: "Retardo", valor: "Ajustable en milisegundos entre el preset y la escena" },
      { label: "Orden", valor: "Escena antes que preset, si el equipo lo necesita así" },
      { label: "Extras", valor: "Tuner y botón de reenvío" },
      { label: "Formato", valor: "Max for Live (.amxd)" },
    ],
    // TODO: versión real
    requisitos: [
      "Ableton Live Suite, o Live Standard con Max for Live",
      "Neural DSP Quad Cortex conectado por MIDI",
    ],
    descarga: "",
    docs: "/soporte/rav-qc-preset",
  },
  {
    slug: "rav-spd-kit",
    nombre: "RAV SPD Kit",
    linea: "software",
    resumen:
      "Cambia el kit de la Roland SPD-SX PRO desde Ableton.",
    resumenEn: "Changes the kit on the Roland SPD-SX PRO from Ableton.",
    descripcion:
      "Cambia el kit de la Roland SPD-SX PRO desde Ableton. Elegís el kit por número, con sus bancos MSB y LSB, o lo movés de a uno con los botones.\n\nEl número de kit es un parámetro de Live: se automatiza por tema, así que la SPD llega a cada tema con el kit puesto, sin que el baterista tenga que buscarlo. Arriba hay nueve pads con su nota, para ver de un vistazo qué está mandando cada uno.\n\nTiene canal MIDI configurable, nota del primer pad, MIDI Thru, envío automático al cargar la sesión y un botón de reenvío.",
    descripcionEn:
      "It changes the kit on the Roland SPD-SX PRO from Ableton. You pick the kit by number, with its MSB and LSB banks, or step through them one at a time with the buttons.\n\nThe kit number is a Live parameter: it automates per song, so the SPD reaches each song with the right kit already loaded and the drummer doesn't have to hunt for it. Along the top are nine pads with their notes, to see at a glance what each one is sending.\n\nIt has a configurable MIDI channel, the note of the first pad, MIDI Thru, automatic send when the session loads and a resend button. On the SPD, SYSTEM MIDI needs Program Change Rx set to ON and the same channel.",
    precioUSD: 19,
    imagenes: [
      "/images/products/rav-spd-kit.webp",
    ],
    specs: [
      { label: "Controla", valor: "Roland SPD-SX PRO" },
      { label: "Elegís", valor: "El kit por número, con sus bancos MSB y LSB" },
      { label: "A la vista", valor: "El Program Change y los bancos que está mandando" },
      { label: "Automatización", valor: "El número de kit es parámetro de Live" },
      { label: "Pads", valor: "Los nueve, con su nota a la vista" },
      { label: "MIDI", valor: "Canal configurable, nota del primer pad y Thru" },
      { label: "Al cargar", valor: "Manda el kit solo al abrir la sesión" },
      { label: "En la SPD", valor: "SYSTEM MIDI con Program Change Rx en ON y el mismo canal" },
      { label: "Formato", valor: "Max for Live (.amxd)" },
    ],
    // TODO: versión real
    requisitos: [
      "Ableton Live Suite, o Live Standard con Max for Live",
      "Roland SPD-SX PRO conectada por MIDI",
    ],
    descarga: "",
    docs: "/soporte/rav-spd-kit",
  },

  // ─── Hardware con stock ────────────────────────────────────────────────
  // Registro del documento de los plug-ins: declarativo y técnico. No afirmar
  // nada que Juan no haya confirmado; lo que falta queda marcado con TODO.
  {
    slug: "talkback-ltc-reader",
    nombre: "RAV Talkback.LTC Reader",
    linea: "stock",
    resumen: "Talkback de tres canales y lector de timecode en una sola unidad.",
    resumenEn: "Three-channel talkback and a timecode reader in one unit.",
    descripcion:
      "Reúne en un equipo las dos funciones que suelen ocupar dos cajas del rack. El display de ocho dígitos muestra el timecode LTC que entra por XLR: horas, minutos, segundos y cuadros. Debajo, tres switches iluminados abren y cierran un canal de talkback cada uno.\n\nNo depende de la computadora ni de ningún software. Gabinete metálico con frente texturado y serigrafía propia.\n\nSe arma en el taller. Admite otra cantidad de canales y otra serigrafía a pedido.",
    descripcionEn:
      "It brings together in one box the two functions that usually take up two rack spaces. The eight-digit display shows the LTC timecode coming in over XLR: hours, minutes, seconds and frames. Below it, three illuminated switches open and close one talkback channel each.\n\nIt needs no computer and no software. Metal enclosure with a textured front and its own silkscreen.\n\nBuilt in the workshop. Other channel counts and other silkscreens are possible on request.",
    precioARS: 550000,
    imagenes: ["/images/products/talkback-ltc-reader.webp"],
    specs: [
      { label: "Talkback", valor: "3 canales independientes, un switch iluminado por canal" },
      { label: "Timecode", valor: "LTC / SMPTE por XLR" },
      { label: "Display", valor: "8 dígitos, HH : MM : SS : FF" },
      { label: "Computadora", valor: "No requiere" },
      { label: "Armado", valor: "En el taller de RAV" },
    ],
  },
  {
    slug: "ltc-reader",
    nombre: "RAV LTC Reader",
    linea: "stock",
    resumen: "Lector de timecode SMPTE con display propio.",
    resumenEn: "SMPTE timecode reader with its own display.",
    descripcion:
      "Recibe el LTC por XLR hembra balanceada, lo decodifica y lo muestra en un display de ocho dígitos: horas, minutos, segundos y cuadros.\n\nEngancha con los framerates estándar —24, 25, 29.97 drop frame y 30— sin selección manual. Al no depender de la computadora, funciona igual en el escenario, en el rack de monitores o en el puesto de luces.\n\nSe arma en el taller.",
    descripcionEn:
      "It takes LTC on a balanced female XLR, decodes it and shows it on an eight-digit display: hours, minutes, seconds and frames.\n\nIt locks on to the standard framerates — 24, 25, 29.97 drop frame and 30 — with nothing to select. Since it needs no computer, it works just as well on stage, in the monitor rack or at the lighting desk.\n\nBuilt in the workshop.",
    precioARS: 200000,
    imagenes: ["/images/products/ltc-reader.webp"],
    specs: [
      { label: "Entrada", valor: "XLR hembra balanceada" },
      { label: "Lee", valor: "LTC / SMPTE" },
      { label: "Framerates", valor: "24, 25, 29.97 DF y 30" },
      { label: "Display", valor: "8 dígitos, HH : MM : SS : FF" },
      { label: "Computadora", valor: "No requiere" },
      { label: "Armado", valor: "En el taller de RAV" },
    ],
  },
  {
    slug: "foot-talkback-1ch",
    nombre: "RAV Foot.talkback 1ch",
    linea: "stock",
    resumen: "Pedal de talkback de un canal.",
    resumenEn: "One-channel talkback footswitch.",
    descripcion:
      "Pedal de piso para abrir y cerrar el talkback sin usar las manos. El micrófono entra por XLR y sale por XLR al destino; el switch da paso o corta la señal.\n\nChasis metálico y switch de pisar. Se arma en el taller.",
    descripcionEn:
      "A floor switch to open and close talkback without using your hands. The microphone comes in over XLR and goes out over XLR to its destination; the switch passes or cuts the signal.\n\nMetal chassis and a stomp switch. Built in the workshop.",
    precioARS: 80000,
    imagenes: ["/images/products/foot-talkback-1ch.webp"],
    specs: [
      { label: "Canales", valor: "1" },
      { label: "Operación", valor: "De pie" },
      { label: "Conexión", valor: "XLR de entrada, XLR de salida" },
      { label: "Armado", valor: "En el taller de RAV" },
    ],
  },
  {
    slug: "foot-talkback-2ch",
    nombre: "RAV Foot.talkback 2ch",
    linea: "stock",
    resumen: "Pedal de talkback de dos canales independientes.",
    resumenEn: "Two-channel talkback footswitch, channels independent.",
    descripcion:
      "La versión de dos canales del pedal. Un micrófono entra por XLR y sale por dos XLR distintos, cada uno con su switch: un pedal abre el camino a monitores y el otro a FOH, o a los destinos que corresponda.\n\nChasis metálico y switches de pisar. Se arma en el taller.",
    descripcionEn:
      "The two-channel version of the pedal. One microphone comes in over XLR and goes out over two separate XLRs, each with its own switch: one pedal opens the path to monitors and the other to FOH, or wherever you need.\n\nMetal chassis and stomp switches. Built in the workshop.",
    precioARS: 100000,
    imagenes: ["/images/products/foot-talkback-2ch.webp"],
    specs: [
      { label: "Canales", valor: "2, independientes" },
      { label: "Operación", valor: "De pie" },
      { label: "Conexión", valor: "1 XLR de entrada, 2 XLR de salida" },
      { label: "Armado", valor: "En el taller de RAV" },
    ],
  },
  {
    slug: "finger-talkback-1ch",
    nombre: "RAV Finger.talkback 1ch",
    linea: "stock",
    resumen: "Talkback de mano de un canal.",
    resumenEn: "One-channel handheld talkback.",
    descripcion:
      "La misma función del pedal, en formato de mano, para los puestos donde conviene tenerlo sobre la consola o en el rack. Un canal: el micrófono entra por XLR, sale por XLR y el switch da paso o corta.\n\nSe arma en el taller.",
    descripcionEn:
      "The same job as the pedal, in a handheld format, for positions where it is better to keep it on the desk or in the rack. One channel: the microphone comes in over XLR, goes out over XLR, and the switch passes or cuts.\n\nBuilt in the workshop.",
    precioARS: 100000,
    imagenes: ["/images/products/finger-talkback-1ch.webp"],
    specs: [
      { label: "Canales", valor: "1" },
      { label: "Operación", valor: "De mano" },
      { label: "Conexión", valor: "XLR de entrada, XLR de salida" },
      { label: "Armado", valor: "En el taller de RAV" },
    ],
  },
  {
    slug: "finger-talkback-2ch",
    nombre: "RAV Finger.talkback 2ch",
    linea: "stock",
    resumen: "Talkback de mano de dos canales independientes.",
    resumenEn: "Two-channel handheld talkback, channels independent.",
    descripcion:
      "La versión de mano de dos canales. Un micrófono entra por XLR y sale por dos XLR distintos, cada uno con su switch, para repartir el talkback entre dos destinos.\n\nSe arma en el taller.",
    descripcionEn:
      "The handheld two-channel version. One microphone comes in over XLR and goes out over two separate XLRs, each with its own switch, to split talkback between two destinations.\n\nBuilt in the workshop.",
    precioARS: 150000,
    imagenes: ["/images/products/finger-talkback-2ch.webp"],
    specs: [
      { label: "Canales", valor: "2, independientes" },
      { label: "Operación", valor: "De mano" },
      { label: "Conexión", valor: "1 XLR de entrada, 2 XLR de salida" },
      { label: "Armado", valor: "En el taller de RAV" },
    ],
  },
  {
    slug: "midi-controller-shuly-01",
    nombre: "RAV MIDI Controller SHULY.01",
    linea: "stock",
    // TODO: falta el texto de Juan. Hace falta saber cuántos controles tiene,
    // qué manda cada uno, cómo se conecta y si se puede remapear.
    resumen: "Controlador MIDI de RAV para el trabajo en vivo.",
    resumenEn: "RAV's own MIDI controller for live work.",
    descripcion:
      "Controlador MIDI armado en el taller para el trabajo en vivo con Ableton.\n\nSe arma a pedido: la cantidad de controles y lo que manda cada uno se definen antes de empezar.",
    descripcionEn:
      "A MIDI controller built in the workshop for live work with Ableton.\n\nMade to order: the number of controls and what each one sends are agreed before we start.",
    precioARS: 350000,
    imagenes: ["/images/products/midi-controller-shuly-01.webp"],
    specs: [
      { label: "Controles", valor: "Se definen antes de armarlo" },
      { label: "Armado", valor: "En el taller de RAV" },
    ],
  },
  {
    slug: "guitar-support-case",
    nombre: "RAV GuitarSupportCase",
    linea: "stock",
    // TODO: falta el texto de Juan. Hace falta saber si va dentro del case o
    // montado aparte, cuántas guitarras sostiene y de qué material es.
    resumen: "Soporte de guitarra para case.",
    resumenEn: "Guitar holder that mounts on the case.",
    descripcion:
      "Soporte de guitarra para montar sobre el case: la guitarra queda firme y a mano durante el show, y viaja en el mismo lugar donde se guarda.\n\nSe arma en el taller, a medida del case y del instrumento.",
    descripcionEn:
      "A guitar holder made for the case, not the floor: the guitar stays firm and within reach during the show, and travels in the same place it is stored.\n\nBuilt in the workshop, to the measurements of the case and the instrument.",
    precioARS: 80000,
    imagenes: ["/images/products/guitar-support-case.webp"],
    specs: [
      { label: "Montaje", valor: "Sobre el case" },
      { label: "A medida", valor: "Del case y del instrumento" },
      { label: "Armado", valor: "En el taller de RAV" },
    ],
  },

  // ─── A pedido ──────────────────────────────────────────────────────────
  {
    slug: "cables-a-medida",
    nombre: "Cables a medida",
    linea: "pedido",
    resumen: "Audio, potencia y datos, con el largo, la ficha y el color que pidas.",
    resumenEn: "Audio, power and data, in the length, connector and colour you need.",
    descripcion:
      "Cables armados en el taller. Se define el largo, el tipo de ficha y el color de la funda, que ordena el rack: con un esquema de colores propio cada cable se identifica sin leer la etiqueta.\n\nSe sueldan uno por uno, se prueban antes de salir y se entregan etiquetados en los dos extremos.\n\nSe cotiza sobre la lista completa.",
    descripcionEn:
      "Cables built in the workshop. You choose the length, the connector type and the colour of the sleeve, which is what keeps a rack in order: with your own colour scheme, each cable is identified without reading the label.\n\nThey are soldered one by one, tested before they leave, and labelled at both ends.\n\nQuoted on the full list.",
    imagenes: ["/images/dukicables.webp"],
    specs: [
      { label: "Tipos", valor: "XLR, TRS, TS, PowerCon, Ethernet" },
      { label: "Largo", valor: "A definir" },
      { label: "Funda", valor: "Color a elección" },
      { label: "Entrega", valor: "Probados uno por uno y etiquetados en ambas puntas" },
    ],
  },
  {
    slug: "piezas-3d",
    nombre: "Piezas impresas en 3D",
    linea: "pedido",
    resumen: "Orejas de rack, tapas y soportes para equipos que no los traen.",
    resumenEn: "Rack ears, blanks and brackets for gear that doesn't come with them.",
    descripcion:
      "Diseño e impresión de piezas para resolver lo que el fabricante no previó: orejas para rackear equipos que no son rackeables, tapas de unidades libres, soportes de fuentes, organizadores de fichas, porta-etiquetas y cunas para fijar equipos dentro de un case.\n\nCada pieza se diseña sobre el equipo real, con el equipo en el taller o con las medidas provistas, y se imprime en PLA o en PETG según el uso: el PETG tolera mejor la temperatura de un rack cerrado.\n\nSe cotiza a partir de una foto y las medidas.",
    descripcionEn:
      "Design and printing of parts to solve what the manufacturer did not plan for: ears to rack gear that isn't rackable, blanking panels, power-supply brackets, connector organisers, label holders and cradles to hold equipment inside a case.\n\nEach part is designed around the real unit, either with the unit here in the workshop or from the measurements you send, and printed in PLA or PETG depending on use: PETG copes better with the temperature inside a closed rack.\n\nQuoted from a photo and the measurements.",
    imagenes: ["/images/servicios/3d.webp"],
    specs: [
      { label: "Diseño", valor: "A medida sobre el equipo real" },
      { label: "Materiales", valor: "PLA o PETG según el uso" },
      { label: "Habitual", valor: "Orejas de rack, tapas, soportes, porta-etiquetas" },
      { label: "Se necesita", valor: "El equipo o sus medidas" },
    ],
  },
  {
    slug: "rack-a-medida",
    nombre: "Rack armado a medida",
    linea: "pedido",
    resumen: "El sistema de playback completo, cableado, probado y documentado.",
    resumenEn: "The whole playback system, wired, tested and documented.",
    descripcion:
      "Armado del rack completo: computadoras, interfaces, redundancia, red, distribución eléctrica, cableado interno y etiquetado. El esquema se define sobre la forma de trabajo de cada equipo, no sobre una plantilla.\n\nLa ventilación y el orden interno se resuelven para que una pieza pueda reemplazarse sin desarmar el resto, y las piezas impresas que hagan falta se diseñan junto con el rack.\n\nOpcionalmente se entrega con la sesión de Ableton configurada y los devices de RAV instalados.\n\nSe cotiza después de relevar el sistema.",
    descripcionEn:
      "The complete rack build: computers, interfaces, redundancy, network, power distribution, internal wiring and labelling. The layout is designed around how your crew actually works, not around a template.\n\nVentilation and internal order are solved so a part can be swapped without taking the rest apart, and any printed parts needed are designed along with the rack.\n\nOptionally it ships with the Ableton session configured and the RAV devices installed.\n\nQuoted after surveying the system.",
    imagenes: ["/images/rack-3.webp"],
    specs: [
      { label: "Incluye", valor: "Montaje, cableado, etiquetado y prueba" },
      { label: "Redundancia", valor: "Sistema A/B, si corresponde" },
      { label: "Opcional", valor: "Sesión de Ableton configurada y devices instalados" },
      { label: "Plazo", valor: "Se define al cotizar" },
    ],
  },
];

/** Un pack se entrega como los devices que trae adentro. */
export function expandir(slugs: string[]): Producto[] {
  const vistos = new Set<string>();
  const salida: Producto[] = [];
  for (const slug of slugs) {
    const p = porSlug(slug);
    if (!p) continue;
    for (const s of p.incluye ?? [slug]) {
      if (vistos.has(s)) continue;
      vistos.add(s);
      const d = porSlug(s);
      if (d) salida.push(d);
    }
  }
  return salida;
}

export const porSlug = (slug: string) => PRODUCTOS.find((p) => p.slug === slug);

export const porLinea = (linea: Linea) => PRODUCTOS.filter((p) => p.linea === linea);

/** Lo que efectivamente se cobra, siempre en pesos. */
export function precioPesos(p: Producto): number | undefined {
  if (p.precioARS) return p.precioARS;
  if (p.precioUSD) return Math.round((p.precioUSD * DOLAR) / 100) * 100;
  return undefined;
}

/** El precio de lista: dólares para el software, pesos para el hardware. */
export function precioTexto(p: Producto) {
  if (p.precioUSD) return `US$ ${p.precioUSD}`;
  if (p.precioARS) return `$ ${p.precioARS.toLocaleString("es-AR")}`;
  return "Consultar";
}

/** El equivalente en pesos, para mostrar debajo del precio en dólares. */
export function precioEquivalente(p: Producto) {
  if (!p.precioUSD) return null;
  return `≈ $ ${precioPesos(p)!.toLocaleString("es-AR")}`;
}
