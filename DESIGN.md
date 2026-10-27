# DESIGN.md — el lenguaje visual de rav.ar

Para que cualquiera que agregue una página o una sección la haga igual al
resto, sin tener que adivinar. Todo lo de acá ya está en el código: esto lo
escribe, no lo inventa.

## La idea

**La página se ve como los equipos.** RAV arma racks: paneles negros de 1U,
serigrafía en mayúsculas chiquitas, números en display, LEDs de estado. El
sitio toma eso prestado. Por eso lo que en otro sitio sería ornamento acá es
la identidad: las etiquetas en mono con tracking, las reglas finas que abren
cada sección, los puntos de estado.

El modo principal es el **oscuro**. El claro existe y funciona, pero el sitio
está pensado sobre negro.

## Color

Todo en HSL, en `app/globals.css`, consumido vía `tailwind.config.ts`. Nunca
un color literal en un componente.

**Oscuro (el principal)**

    --background   0 0% 2%      negro real, no gris
    --foreground   42 14% 93%   hueso
    --card         36 7% 5%
    --muted-fg     40 5% 58%
    --border       36 7% 14%
    --senal        42 30% 87%   el acento
    --alerta       4 100% 64%   rojo, sólo para estado

**Claro**

    --background   40 9% 97%    papel
    --foreground   0 0% 7%
    --senal        38 18% 24%

Los neutros son **cálidos** (tono 36–42), no azulados. Es lo que separa esta
versión de la anterior.

**El acento es hueso, no verde.** El rojo existe sólo como alerta, nunca como
decoración.

**El tema se resuelve con clases CSS, nunca en JavaScript.** Nada de
`tema === "dark" ? "a" : "b"`: va `"b dark:a"`. Si se decide en JS, una copia
estática del sitio queda con un solo tema.

## Tipografía

Dos cortes de la misma familia, **Chivo** y **Chivo Mono**, de Omnibus-Type,
que es argentina. Cargadas con `next/font/google`.

- **Chivo** para todo lo que se lee.
- **Chivo Mono** para los datos, las etiquetas y la navegación — la voz de la
  serigrafía.

Los títulos van en `.titulo-grande`: negra, mayúsculas, tracking `-0.03em`,
interlineado `0.96`. Apretados.

Los números siempre en mono y tabulares (`.dato`), para que una columna de
precios alinee.

## Radios

    --radius: 0.125rem

Dos píxeles. Los equipos no tienen esquinas redondas. Las únicas excepciones
son las fotos de los carruseles, que van en `rounded-2xl`.

## Las clases que son la identidad

Están en `@layer components` de `app/globals.css`. Usalas en vez de
reescribir los mismos utilitarios:

    .etiqueta       mono 11px, mayúsculas, tracking 0.2em, color apagado
    .regla-rack     la línea que abre una sección, como un panel de 1U
    .dato           mono + tabular-nums, para números y precios
    .led            punto de estado encendido, con su resplandor
    .led-apagado    el mismo, sin señal
    .led-alerta     el mismo, en rojo
    .titulo-grande  negra + mayúsculas + tracking apretado
    .objeto-3d      la sombra larga del logo cromado flotando sobre negro

Y dos que son utilidad, no estilo:

    .toque-24 / .toque-44   agrandan el área de toque sin agrandar el dibujo
    .saltar-al-contenido    el link de teclado, invisible hasta que tiene foco

## Composición

- Ancho máximo `max-w-screen-xl`, con `px-4` en celular y `md:px-8`.
- La barra del header mide **68 px** fijos, con su espaciador arriba.
- Las secciones se separan con una regla (`border-b`), no con sombras.
- Las superficies se distinguen por un escalón de tono, nunca por una sombra.
- El loop de portada va desenfocado al 32 % de opacidad y **sólo en oscuro**:
  el render está hecho sobre negro.

## Reglas que ya nos costaron caras

1. **Nada arranca invisible.** No usar `opacity-0` esperando que un
   IntersectionObserver lo revele: si el JS no corre, la sección se ve vacía.
   Pasó en Servicios.
2. **El layout raíz es server component.** No ponerle `"use client"`: arrastra
   todo el árbol al cliente.
3. **`next/image` siempre con `sizes`.** Sin eso Next sirve la versión más
   grande y en celular baja imágenes de 2000 px.
4. **`priority` sólo en la primera imagen visible de cada página.** Ponérselo
   a todo equivale a no ponérselo a nada.
5. **Un texto nuevo se agrega en los dos idiomas.** Ver `CLAUDE.md`.

## Qué no hacer

- Verde como acento. El acento es hueso.
- Sombras para separar superficies. Va un escalón de tono.
- Esquinas blandas de 8 o 12 px. Son 2.
- Una tercera tipografía.
- Decidir color o tema en JavaScript.
