import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    const formspreeUrl = process.env.FORMSPREE_URL
    if (!formspreeUrl) {
      console.error("FORMSPREE_URL no está configurada en las variables de entorno")
      return NextResponse.json(
        { error: "Configuración de email no encontrada" },
        { status: 500 }
      )
    }

    console.log("Enviando email a:", formspreeUrl)

    const emailData = {
      name,
      email,
      subject,
      message,
      _subject: `Nuevo mensaje de contacto: ${subject}`,
    }

    console.log("Datos del email:", emailData)

    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })

    console.log("Respuesta de Formspree:", response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error de Formspree:", errorText)
      throw new Error(`Error al enviar el email: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    console.log("Resultado exitoso:", result)

    return NextResponse.json({ message: "Mensaje enviado exitosamente" })
  } catch (error) {
    console.error("Error enviando email:", error)
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    )
  }
}

