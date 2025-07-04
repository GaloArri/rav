"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, XCircle } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Dirección de correo electrónico inválida"),
  subject: z.string().min(5, "El asunto debe tener al menos 5 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const { toast } = useToast()
  
  // Debug effect
  useEffect(() => {
    console.log("Estado showSuccess cambió a:", showSuccess)
  }, [showSuccess])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log("Iniciando envío del formulario...")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      console.log("Respuesta recibida:", response.status, response.ok)

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje")
      }

      console.log("Mensaje enviado exitosamente, mostrando popup...")
      
      // Mostrar popup de éxito
      setShowSuccess(true)
      setSuccessMessage("¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.")
      console.log("Estado showSuccess actualizado a:", true)
      
      // También mostrar toast como respaldo
      toast({
        title: "¡Mensaje enviado exitosamente!",
        description: "Nos pondremos en contacto contigo lo antes posible.",
        duration: 5000,
      })
      
      form.reset()
      
      // Ocultar popup después de 5 segundos
      setTimeout(() => {
        console.log("Ocultando popup automáticamente...")
        setShowSuccess(false)
        setSuccessMessage("")
      }, 5000)
      
    } catch (error) {
      console.error("Error en el formulario:", error)
      toast({
        title: "Error al enviar el mensaje",
        description: "Algo salió mal. Por favor, intenta de nuevo.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="relative">
      {/* Notificación inline de éxito */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-[#f7f7f7] dark:bg-[#1a1a1a] border border-[#cccccc] dark:border-[#333333] rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-black dark:text-white mr-2" />
            <p className="text-black dark:text-white font-medium">{successMessage}</p>
          </div>
        </div>
      )}
      
      {/* Popup de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#f7f7f7] dark:bg-[#1a1a1a] rounded-lg p-8 max-w-md mx-4 shadow-2xl transform transition-all border border-[#cccccc] dark:border-[#333333]">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-black dark:text-white" />
            </div>
            <h3 className="text-xl font-semibold text-center text-black dark:text-white mb-2">
              ¡Mensaje Enviado!
            </h3>
            <p className="text-black dark:text-white text-center mb-6 opacity-80">
              {successMessage}
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowSuccess(false)}
                className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asunto</FormLabel>
                <FormControl>
                  <Input placeholder="¿De qué se trata?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tu mensaje..." className="h-36 resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Enviando...
              </div>
            ) : (
              "Enviar Mensaje"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}