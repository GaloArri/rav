// Documentación de cada device, para /soporte/[producto].
// Todo lo de acá sale del documento "Plug-ins RAV para Ableton Live" y de las
// capturas de las interfaces. No inventar comportamiento que no esté ahí.

export type Paso = { titulo: string; tituloEn?: string; texto: string; textoEn?: string };
export type Duda = { pregunta: string; preguntaEn?: string; respuesta: string; respuestaEn?: string };

export type Doc = {
  /** Una línea: para qué sirve, antes de cualquier instrucción. */
  para: string;
  paraEn?: string;
  /** Dónde va dentro del Set. */
  dondeVa: string;
  dondeVaEn?: string;
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
    tituloEn: "Download the file",
    texto:
      "Te llega por mail un link de descarga que vale siete días. Si se te venció, escribinos y te lo renovamos.",
    textoEn: "You get a download link by email, good for seven days. If yours has expired, write to us and we'll reissue it.",
  },
  {
    titulo: "Copialo a la User Library de Ableton",
    tituloEn: "Copy it into Ableton's User Library",
    texto:
      "En Mac está en Música / Ableton / User Library / Presets / Audio Effects / Max Audio Effect. Si el device vino en carpeta, mové la carpeta entera: los archivos que están al lado del .amxd son el motor y no pueden quedar en otro lado.",
    textoEn: "On a Mac that's Music / Ableton / User Library / Presets / Audio Effects / Max Audio Effect. If the device came in a folder, move the whole folder: the files next to the .amxd are the engine and can't be left behind.",
  },
  {
    titulo: "Refrescá el navegador de Live",
    tituloEn: "Refresh Live's browser",
    texto:
      "Si Ableton ya estaba abierto, apretá el botón de refrescar en el navegador de Live o cerrá y volvé a abrir el programa. Hasta que no lo hagas, el device no figura en la lista.",
    textoEn: "If Ableton was already open, hit refresh in Live's browser or quit and reopen it. Until you do, the device won't show up in the list.",
  },
  {
    titulo: "Arrastralo a una pista",
    tituloEn: "Drag it onto a track",
    texto:
      "Y listo, no hay nada que instalar aparte ni ninguna licencia que activar dentro de Ableton.",
    textoEn: "That's it. There's nothing else to install and no licence to activate inside Ableton.",
  },
];

/** Dudas que son iguales para los diez. */
export const DUDAS_COMUNES: Duda[] = [
  {
    pregunta: "No aparece en Ableton",
    preguntaEn: "It doesn't show up in Ableton",
    respuesta:
      "Casi siempre quedó fuera de la User Library. Fijate que esté adentro, y que en Preferences, pestaña Library, Live esté apuntando a esa carpeta.",
    respuestaEn: "Nearly always it ended up outside the User Library. Check that it's inside, and that under Preferences, Library tab, Live is pointing at that folder.",
  },
  {
    pregunta: "Está en inglés",
    preguntaEn: "It's in English",
    respuesta:
      "Todos arrancan en inglés. Abajo a la izquierda hay un chip EN / ES: tocalo y pasa a castellano. Cada device recuerda el suyo, así que si tenés varios cargados hay que cambiarlos uno por uno.",
    respuestaEn: "They all start in English. Bottom left there's an EN / ES chip: tap it and it switches to Spanish. Each device remembers its own setting, so if you have several loaded you change them one by one.",
  },
  {
    pregunta: "Lo moví de carpeta y dejó de andar",
    preguntaEn: "I moved it and it stopped working",
    respuesta:
      "Pasa con los que vienen en carpeta: el .amxd necesita los archivos que están al lado. Si lo mudás, mudá la carpeta entera.",
    respuestaEn: "This happens with the ones that ship in a folder: the .amxd needs the files sitting next to it. If you move it, move the whole folder.",
  },
];

export const DOCS: Record<string, Doc> = {
  "rav-timer": {
    para: "Es la base del sistema: lee el Set y levanta la página que mira todo el equipo.",
    paraEn: "The base of the system: it reads the Set and serves the page the whole crew watches.",
    dondeVa: "Una pista MIDI cualquiera del Set.",
    dondeVaEn: "Any MIDI track in the Set.",
    enCarpeta: true,
    uso: [
      {
        titulo: "Escaneá el show",
        tituloEn: "Scan the show",
        texto:
          "MAKE arma el show leyendo los clips del track de playback. Si después cambiás el Set, SCAN lo vuelve a leer. Mientras no escanees, los relojes no tienen de dónde sacar los tiempos.",
        textoEn: "MAKE builds the show by reading the clips on the playback track. If you change the Set later, SCAN reads it again. Until you scan, the clocks have nowhere to get their times from.",
      },
      {
        titulo: "Pasale la dirección al equipo",
        tituloEn: "Give the crew the address",
        texto:
          "Abajo del device están LOCAL y PUBLIC. LOCAL es la dirección en la red del show, en el puerto 8097: cualquiera en la misma WiFi la abre en el celular. PUBLIC es un link para quien no está en esa red.",
        textoEn: "At the bottom of the device are LOCAL and PUBLIC. LOCAL is the address on the show's network, on port 8097: anyone on the same WiFi can open it on their phone. PUBLIC is a link for anyone who isn't on that network.",
      },
      {
        titulo: "Cada uno entra con su rol",
        tituloEn: "Everyone signs in with a role",
        texto:
          "Al abrir la página se elige el rol. El transporte lo ve solamente quien entra como PLAYBACK; el resto ve los mismos tiempos pero no puede tocar nada.",
        textoEn: "You pick a role when the page opens. Only whoever signs in as PLAYBACK sees the transport; everyone else sees the same times but can't touch anything.",
      },
      {
        titulo: "Las notas son de cada uno",
        tituloEn: "Notes belong to each person",
        texto:
          "Cada persona deja sus notas por tema sin pisar las de los demás, y el setlist con las notas se exporta a PDF desde la misma página.",
        textoEn: "Each person leaves their own notes per song without overwriting anyone else's, and the setlist with the notes exports to PDF from that same page.",
      },
      {
        titulo: "Las ventanas aparte",
        tituloEn: "The separate windows",
        texto:
          "POP UP abre el reloj grande, para mandarlo a un segundo monitor o a una pantalla de escenario. SETLIST abre la lista completa en su propia ventana.",
        textoEn: "POP UP opens the big clock, to send to a second monitor or a stage screen. SETLIST opens the full list in its own window.",
      },
    ],
    dudas: [
      {
        pregunta: "El celular no abre la página",
        preguntaEn: "The phone won't open the page",
        respuesta:
          "Tiene que estar en la misma red que la computadora de playback. Si la red del lugar separa los dispositivos entre sí —muchas WiFi de hotel y de venue lo hacen— usá el link público.",
        respuestaEn: "It has to be on the same network as the playback computer. If the venue's network keeps devices apart from each other — plenty of hotel and venue WiFi does — use the public link.",
      },
      {
        pregunta: "Los tiempos no coinciden con el Set",
        preguntaEn: "The times don't match the Set",
        respuesta:
          "Volvé a escanear con SCAN. El device no se entera solo de que moviste clips o marcadores.",
        respuestaEn: "Scan again with SCAN. The device has no way of knowing on its own that you moved clips or locators.",
      },
      {
        pregunta: "No veo el timecode",
        preguntaEn: "I can't see the timecode",
        respuesta:
          "El timecode lo publica el RAV LTC. Si ese device no está cargado en el Set, el Timer no tiene de dónde leerlo.",
        respuestaEn: "The timecode is published by RAV LTC. If that device isn't loaded in the Set, the Timer has nowhere to read it from.",
      },
    ],
  },

  "rav-full-setlist": {
    para: "Arma la lista real de temas del show, en vez de los puntos de disparo.",
    paraEn: "Builds the real list of songs in the show, rather than the trigger points.",
    dondeVa: "Una pista MIDI. Necesita el RAV Timer cargado en el mismo Set.",
    dondeVaEn: "A MIDI track. It needs RAV Timer loaded in the same Set.",
    uso: [
      {
        titulo: "Leé el show",
        tituloEn: "Read the show",
        texto:
          "READ THE SHOW trae todo lo que hay en el Set. A la izquierda ves eso; a la derecha, lo que va a salir publicado.",
        textoEn: "READ THE SHOW pulls in everything that's in the Set. On the left you see that; on the right, what will actually be published.",
      },
      {
        titulo: "Sacá lo que no es un tema",
        tituloEn: "Take out what isn't a song",
        texto:
          "Lo que sacás queda en gris: sigue estando en el show, simplemente no se publica. Los marcadores suelen estar donde hay que disparar algo, no donde empieza cada tema.",
        textoEn: "Whatever you take out goes grey: it's still in the show, it just isn't published. Locators tend to sit where something has to be fired, not where each song starts.",
      },
      {
        titulo: "Agregá los temas de los medleys",
        tituloEn: "Add the songs inside medleys",
        texto:
          "Los que viven adentro de un medley no tienen marcador propio. Poné el cursor de Live donde empieza el tema y agregalo a mano.",
        textoEn: "Songs that live inside a medley have no locator of their own. Put Live's cursor where the song starts and add it by hand.",
      },
      {
        titulo: "Mandala a la web",
        tituloEn: "Send it to the web",
        texto:
          "SEND TO THE WEB publica la lista. Hasta que no la mandes, el estado dice NOT SENT y el equipo sigue viendo la lista vieja.",
        textoEn: "SEND TO THE WEB publishes the list. Until you send it, the status reads NOT SENT and the crew is still looking at the old one.",
      },
    ],
    dudas: [
      {
        pregunta: "El equipo ve otra lista",
        preguntaEn: "The crew is seeing a different list",
        respuesta:
          "Fijate el estado: si dice NOT SENT, armaste la lista pero no la publicaste. Apretá SEND TO THE WEB.",
        respuestaEn: "Check the status: if it reads NOT SENT, you built the list but never published it. Hit SEND TO THE WEB.",
      },
      {
        pregunta: "Falta un tema",
        preguntaEn: "A song is missing",
        respuesta:
          "Si corre derecho dentro de un medley, no tiene marcador. Hay que agregarlo a mano poniendo el cursor de Live donde empieza.",
        respuestaEn: "If it runs straight through inside a medley, it has no locator. Add it by hand with Live's cursor at the point where it starts.",
      },
    ],
  },

  "rav-remote": {
    para: "Convierte la página del Timer en un control remoto.",
    paraEn: "Turns the Timer's page into a remote control.",
    dondeVa: "Una pista MIDI. Necesita el RAV Timer cargado en el mismo Set.",
    dondeVaEn: "A MIDI track. It needs RAV Timer loaded in the same Set.",
    uso: [
      {
        titulo: "No hay nada que configurar",
        tituloEn: "There's nothing to set up",
        texto:
          "Se arrastra y listo. Avisa cada dos segundos que está presente, y con eso el Timer sabe que puede mostrar los controles en la página.",
        textoEn: "Drag it in and you're done. It announces itself every two seconds, and that's how the Timer knows it can show the controls on the page.",
      },
      {
        titulo: "Desde la web",
        tituloEn: "From the web page",
        texto:
          "Aparecen PLAY y PAUSE, y tocando un tema de la lista se salta a él.",
        textoEn: "PLAY and PAUSE appear, and tapping a song in the list jumps to it.",
      },
      {
        titulo: "Desde el device",
        tituloEn: "From the device",
        texto:
          "El panel muestra el tema que suena y el que sigue, y tiene PLAY y PAUSE para manejarlo también desde la computadora.",
        textoEn: "The panel shows the song that's playing and the one coming up, with PLAY and PAUSE so you can drive it from the computer too.",
      },
    ],
    dudas: [
      {
        pregunta: "No veo PLAY ni PAUSE en el celular",
        preguntaEn: "I don't see PLAY or PAUSE on my phone",
        respuesta:
          "Dos motivos posibles: el módulo no está cargado en el Set, o entraste con un rol que no es PLAYBACK. El transporte lo ve solo ese rol.",
        respuestaEn: "Two possible reasons: the module isn't loaded in the Set, or you signed in with a role other than PLAYBACK. Only that role sees the transport.",
      },
    ],
  },

  "rav-tune": {
    para: "Lleva la pantalla del Auto-Tune al celular o al iPad.",
    paraEn: "Puts the Auto-Tune screen on a phone or an iPad.",
    dondeVa: "Una pista MIDI. Necesita el RAV Timer y el RAV Bridge en el mismo Set.",
    dondeVaEn: "A MIDI track. It needs RAV Timer and RAV Bridge in the same Set.",
    uso: [
      {
        titulo: "Se arrastra y no se toca más",
        tituloEn: "Drag it in and leave it alone",
        texto:
          "El device solo muestra las direcciones. Todo lo demás pasa en la página del Timer.",
        textoEn: "The device only shows the addresses. Everything else happens on the Timer's page.",
      },
      {
        titulo: "La pantalla",
        tituloEn: "The screen",
        texto:
          "Aparecen las cuatro perillas —Retune, Flex, Humanize y Vibrato— más la tonalidad y la escala. El botón de pantalla completa la deja en grande, para tener el tablet al lado de la consola.",
        textoEn: "The four knobs show up — Retune, Flex, Humanize and Vibrato — plus key and scale. The full-screen button blows it up, so the tablet can sit next to the desk.",
      },
    ],
    dudas: [
      {
        pregunta: "Veo la pantalla pero las perillas están en cero y no mueven nada",
        preguntaEn: "I see the screen but the knobs read zero and move nothing",
        respuesta:
          "Falta el RAV Bridge. Este módulo abre la pantalla; el que habla con el Auto-Tune es el Bridge. Sin él no hay valores que mostrar ni nada que mover.",
        respuestaEn: "RAV Bridge is missing. This module opens the screen; the one that talks to Auto-Tune is the Bridge. Without it there are no values to show and nothing to move.",
      },
    ],
  },

  "rav-bridge": {
    para: "Maneja el Antares Auto-Tune de la UAD Console desde Ableton.",
    paraEn: "Drives the Antares Auto-Tune in UAD Console from Ableton.",
    dondeVa: "Una pista MIDI.",
    dondeVaEn: "A MIDI track.",
    enCarpeta: true,
    uso: [
      {
        titulo: "Elegí el canal MIDI",
        tituloEn: "Pick the MIDI channel",
        texto:
          "Arriba a la derecha está MIDI CH. Tiene que coincidir con el que escucha el Auto-Tune en la Console.",
        textoEn: "Top right is MIDI CH. It has to match the one Auto-Tune is listening on in Console.",
      },
      {
        titulo: "Las perillas son parámetros de Live",
        tituloEn: "The knobs are Live parameters",
        texto:
          "Retune Speed, Flex Tune, Humanize, Tracking y Natural Vibrato se automatizan en la línea de tiempo y se mapean a un controlador, como cualquier parámetro de Ableton.",
        textoEn: "Retune Speed, Flex Tune, Humanize, Tracking and Natural Vibrato automate on the timeline and map to a controller, like any other Ableton parameter.",
      },
      {
        titulo: "El Retune Speed es el de verdad",
        tituloEn: "The Retune Speed is the real one",
        texto:
          "No es un rango lineal: está armado sobre la curva real medida del plug-in. El número que ves en Live es el que ves en el Auto-Tune.",
        textoEn: "It isn't a linear range: it's built on the plug-in's actual measured curve. The number you read in Live is the number you read in Auto-Tune.",
      },
      {
        titulo: "Tonalidad, escala y presets",
        tituloEn: "Key, scale and presets",
        texto:
          "La tonalidad y la escala tienen su propio CC asignable, y se pueden usar escalas propias. Los presets se guardan con nombre y se llaman por número.",
        textoEn: "Key and scale each have their own assignable CC, and you can use your own scales. Presets save with a name and are recalled by number.",
      },
    ],
    dudas: [
      {
        pregunta: "Muevo las perillas y el Auto-Tune no responde",
        preguntaEn: "I move the knobs and Auto-Tune doesn't respond",
        respuesta:
          "Revisá que el canal MIDI del device sea el mismo que el del Auto-Tune en la Console, y que la Console esté corriendo con el plug-in insertado.",
        respuestaEn: "Check that the device's MIDI channel is the same as Auto-Tune's in Console, and that Console is running with the plug-in inserted.",
      },
      {
        pregunta: "Los valores llegan tarde",
        preguntaEn: "The values arrive late",
        respuesta:
          "El device muestra la latencia que reporta la Console. Si ese número es alto, el retraso viene de ahí y no del device.",
        respuestaEn: "The device shows the latency Console reports. If that number is high, the delay is coming from there and not from the device.",
      },
    ],
  },

  "rav-bypass": {
    para: "Prende y apaga el bypass del Auto-Tune. Nada más.",
    paraEn: "Switches the Auto-Tune bypass on and off. Nothing else.",
    dondeVa: "Una pista MIDI.",
    dondeVaEn: "A MIDI track.",
    enCarpeta: true,
    uso: [
      {
        titulo: "Automatizalo por tema",
        tituloEn: "Automate it song by song",
        texto:
          "Es un parámetro de Live: lo dibujás en el Arrangement y el tune se apaga solo donde el cantante habla.",
        textoEn: "It's a Live parameter: draw it in the Arrangement and the tune switches itself off wherever the singer talks.",
      },
      {
        titulo: "O mapealo",
        tituloEn: "Or map it",
        texto:
          "Se mapea a una tecla o a un pedal, para apagarlo a mano sin ir a tocar la Console.",
        textoEn: "Map it to a key or a footswitch, to kill it by hand without going to Console.",
      },
    ],
    dudas: [
      {
        pregunta: "No pasa nada al apretarlo",
        preguntaEn: "Nothing happens when I press it",
        respuesta:
          "Igual que el Bridge: el canal MIDI del device tiene que coincidir con el del Auto-Tune en la Console.",
        respuestaEn: "Same as the Bridge: the device's MIDI channel has to match Auto-Tune's in Console.",
      },
    ],
  },

  "rav-ltc": {
    para: "Lee el timecode SMPTE que entra por audio y lo muestra en grande.",
    paraEn: "Reads the SMPTE timecode coming in over audio and shows it big.",
    dondeVa:
      "Es el único que va en una pista de AUDIO: la que trae el LTC. Es un efecto de audio, no un instrumento.",
    dondeVaEn: "The only one that goes on an AUDIO track: the one carrying the LTC. It's an audio effect, not an instrument.",
    uso: [
      {
        titulo: "Cuidá el nivel",
        tituloEn: "Mind the level",
        texto:
          "Entre −18 y −3 dBFS, sin filtros fuertes en el camino. Es lo único que hay que mirar para que lea limpio.",
        textoEn: "Between −18 and −3 dBFS, with no heavy filtering in the path. That's the only thing to watch for a clean read.",
      },
      {
        titulo: "Engancha solo",
        tituloEn: "It locks on by itself",
        texto:
          "No hay que elegir formato: lo detecta y lo muestra. El audio pasa sin tocarse, así que podés dejarlo puesto sin miedo.",
        textoEn: "There's no format to choose: it detects it and displays it. The audio passes through untouched, so you can leave it in place without worrying.",
      },
      {
        titulo: "Mirá el fondo",
        tituloEn: "Watch the background",
        texto:
          "Verde mientras está leyendo, rojo cuando el código se frena. Se ve de lejos y de reojo, que es para lo que está.",
        textoEn: "Green while it's reading, red when the code stops. You can read it from across the room out of the corner of your eye, which is the point.",
      },
      {
        titulo: "La ventana aparte",
        tituloEn: "The separate window",
        texto: "POP UP la saca a su propia ventana, para dejarla en otro monitor.",
        textoEn: "POP UP puts it in its own window, to park on another monitor.",
      },
    ],
    dudas: [
      {
        pregunta: "Está en rojo",
        preguntaEn: "It's showing red",
        respuesta:
          "El código se frenó o no está llegando. Revisá que la pista de audio sea la del LTC, que esté sonando, y el nivel de entrada.",
        respuestaEn: "The code has stopped or isn't arriving. Check that the audio track is the LTC one, that it's playing, and the input level.",
      },
      {
        pregunta: "Los números saltan",
        preguntaEn: "The numbers jump around",
        respuesta:
          "Suele ser nivel: muy bajo o muy saturado. Llevalo a la franja de −18 a −3 dBFS y sacá cualquier filtro que esté en el camino.",
        respuestaEn: "Usually it's level: too low or clipping. Bring it into the −18 to −3 dBFS band and take out any filter in the path.",
      },
      {
        pregunta: "El equipo no ve el timecode en el celular",
        preguntaEn: "The crew can't see the timecode on their phones",
        respuesta:
          "El Timer lo publica, pero necesita que este device esté cargado en el Set.",
        respuestaEn: "The Timer publishes it, but it needs this device loaded in the Set.",
      },
    ],
  },

  "rav-cdj": {
    para: "Maneja el transporte de Ableton desde una CDJ.",
    paraEn: "Drives Ableton's transport from a CDJ.",
    dondeVa: "Los dos devices, Control y Monitor, en pistas MIDI.",
    dondeVaEn: "Both devices, Control and Monitor, on MIDI tracks.",
    uso: [
      {
        titulo: "Preparate el Set",
        tituloEn: "Get the Set ready",
        texto:
          "Los clips van con Warp en Re-Pitch y la música tiene que estar en Arrangement. Sin eso el plato no suena a vinilo.",
        textoEn: "Clips go with Warp set to Re-Pitch and the music has to be in Arrangement. Without that the platter won't sound like vinyl.",
      },
      {
        titulo: "Aprendé el mapeo",
        tituloEn: "Teach it the mapping",
        texto:
          "En el Control, click en una fila y movés el control de la CDJ: lo aprende. Option + click borra. Se hace una vez y queda guardado.",
        textoEn: "In Control, click a row and move the control on the CDJ: it learns it. Option + click clears it. You do it once and it's saved.",
      },
      {
        titulo: "Los hot cues",
        tituloEn: "The hot cues",
        texto:
          "Los ocho saltan a los locators de la sesión, en orden de tiempo. No se asignan a mano: salen de los locators que ya tenés.",
        textoEn: "All eight jump to the session's locators, in time order. You don't assign them by hand: they come from the locators you already have.",
      },
      {
        titulo: "El pitch y el jog",
        tituloEn: "Pitch and jog",
        texto:
          "El pitch mueve el tempo sobre la base, con los rangos de la CDJ: ±6, ±10, ±16 y WIDE, con inversión si el fader queda al revés. El jog sin tocar el plato empuja o frena el tempo un instante; con la mano en el plato y VINYL prendido la sesión se frena y avanza a la velocidad del plato, y hacia atrás rebobina en silencio.",
        textoEn: "Pitch shifts the tempo around the base value, with the CDJ's own ranges: ±6, ±10, ±16 and WIDE, with an invert option if the fader ends up backwards. Nudging the jog without touching the platter pushes or drags the tempo for a moment; with a hand on the platter and VINYL on, the session stops and moves at the platter's speed, and backwards it rewinds in silence.",
      },
      {
        titulo: "Probalo sin la CDJ",
        tituloEn: "Try it without the CDJ",
        texto:
          "El plato y los botones del Monitor andan con el mouse, así que podés dejar todo listo en tu casa.",
        textoEn: "The platter and the buttons in Monitor work with the mouse, so you can get everything ready at home.",
      },
    ],
    dudas: [
      {
        pregunta: "El plato no suena a vinilo",
        preguntaEn: "The platter doesn't sound like vinyl",
        respuesta:
          "Los clips tienen que estar con Warp en Re-Pitch. Con otro modo de warp, Ableton corrige el tono y se pierde el efecto.",
        respuestaEn: "The clips have to be warped in Re-Pitch. With any other warp mode Ableton corrects the pitch and the effect is lost.",
      },
      {
        pregunta: "No responde nada",
        preguntaEn: "Nothing responds",
        respuesta:
          "Mirá la pestaña MIDI del Monitor: ahí ves los mensajes que entran. Si no entra nada, el problema está antes del device.",
        respuestaEn: "Look at Monitor's MIDI tab: that's where you see incoming messages. If nothing comes in, the problem is upstream of the device.",
      },
      {
        pregunta: "El pitch va al revés",
        preguntaEn: "The pitch runs backwards",
        respuesta: "Prendé la inversión en el Control.",
        respuestaEn: "Turn on invert in Control.",
      },
    ],
  },

  "rav-qc-preset": {
    para: "Cambia setlist, preset y escena del Quad Cortex desde Ableton.",
    paraEn: "Changes the Quad Cortex's setlist, preset and scene from Ableton.",
    dondeVa: "Una pista MIDI, con el Quad Cortex conectado.",
    dondeVaEn: "A MIDI track, with the Quad Cortex connected.",
    uso: [
      {
        titulo: "Canal MIDI",
        tituloEn: "MIDI channel",
        texto: "El del device tiene que ser el mismo que el del Quad Cortex.",
        textoEn: "The device's has to be the same as the Quad Cortex's.",
      },
      {
        titulo: "Automatizá por tema",
        tituloEn: "Automate song by song",
        texto:
          "Setlist, preset y escena son parámetros de Live. Los dibujás en el Arrangement y el equipo llega a cada tema con lo que corresponde, sin que nadie toque nada.",
        textoEn: "Setlist, preset and scene are Live parameters. Draw them in the Arrangement and the unit arrives at each song set correctly, with nobody touching anything.",
      },
      {
        titulo: "El retardo entre preset y escena",
        tituloEn: "The delay between preset and scene",
        texto:
          "Hay un retardo ajustable en milisegundos entre los dos mensajes, porque a veces el Quad necesita un respiro. Si el cambio de escena se pierde, subilo.",
        textoEn: "There's an adjustable delay in milliseconds between the two messages, because the Quad sometimes needs a breath. If the scene change gets lost, raise it.",
      },
      {
        titulo: "Si el equipo se reinició",
        tituloEn: "If the unit restarted",
        texto:
          "RESEND vuelve a mandar el estado. Y con la opción de envío al cargar, la sesión arranca mandando todo sola.",
        textoEn: "RESEND pushes the state again. And with send-on-load turned on, the session starts by sending everything on its own.",
      },
    ],
    dudas: [
      {
        pregunta: "Cambia el preset pero no la escena",
        preguntaEn: "The preset changes but the scene doesn't",
        respuesta:
          "Subí el retardo entre los dos mensajes. El Quad se come el segundo si llega demasiado pegado al primero.",
        respuestaEn: "Raise the delay between the two messages. The Quad swallows the second one if it arrives too close behind the first.",
      },
      {
        pregunta: "No cambia nada",
        preguntaEn: "Nothing changes",
        respuesta:
          "Revisá el canal MIDI y que el Quad esté conectado. El punto de MIDI del device se prende cuando hay comunicación.",
        respuestaEn: "Check the MIDI channel and that the Quad is connected. The device's MIDI dot lights up when there's communication.",
      },
    ],
  },

  "rav-spd-kit": {
    para: "Cambia el kit de la Roland SPD-SX PRO desde Ableton.",
    paraEn: "Changes the kit on a Roland SPD-SX PRO from Ableton.",
    dondeVa: "Una pista MIDI, con la SPD-SX PRO conectada.",
    dondeVaEn: "A MIDI track, with the SPD-SX PRO connected.",
    uso: [
      {
        titulo: "Preparate la SPD",
        tituloEn: "Get the SPD ready",
        texto:
          "En SYSTEM MIDI tiene que estar Program Change Rx en ON, y el canal igual al del device. Sin eso la SPD ignora el mensaje.",
        textoEn: "Under SYSTEM MIDI, Program Change Rx has to be ON and the channel the same as the device's. Without that the SPD ignores the message.",
      },
      {
        titulo: "Elegí el kit",
        tituloEn: "Pick the kit",
        texto:
          "Por número, con sus bancos MSB y LSB, o moviéndolo de a uno con los botones. El device muestra el Program Change y los bancos que está mandando.",
        textoEn: "By number, with its MSB and LSB banks, or stepping through one at a time with the buttons. The device shows the Program Change and the banks it's sending.",
      },
      {
        titulo: "Automatizá por tema",
        tituloEn: "Automate song by song",
        texto:
          "El número de kit es un parámetro de Live: la SPD llega a cada tema con el kit puesto y el baterista no tiene que buscarlo.",
        textoEn: "The kit number is a Live parameter: the SPD arrives at each song with the kit already loaded and the drummer doesn't have to go looking for it.",
      },
      {
        titulo: "Los pads",
        tituloEn: "The pads",
        texto:
          "Arriba están los nueve con su nota, para ver de un vistazo qué manda cada uno. La nota del primero se configura y el resto sale en orden.",
        textoEn: "Across the top are all nine with their notes, so you can see at a glance what each one sends. You set the first one's note and the rest follow in order.",
      },
    ],
    dudas: [
      {
        pregunta: "No cambia de kit",
        preguntaEn: "It won't change kit",
        respuesta:
          "Es casi siempre la SPD: Program Change Rx tiene que estar en ON en SYSTEM MIDI, y el canal tiene que coincidir.",
        respuestaEn: "It's almost always the SPD: Program Change Rx has to be ON under SYSTEM MIDI, and the channel has to match.",
      },
      {
        pregunta: "Cambia al kit equivocado",
        preguntaEn: "It changes to the wrong kit",
        respuesta:
          "Mirá los bancos. El device muestra el PC, el MSB y el LSB que manda; si los bancos no son los que la SPD espera, cae en otro kit.",
        respuestaEn: "Look at the banks. The device shows the PC, MSB and LSB it sends; if the banks aren't what the SPD expects, it lands on a different kit.",
      },
    ],
  },
};

export const porDoc = (slug: string): Doc | undefined => DOCS[slug];
