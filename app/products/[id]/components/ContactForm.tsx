"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface ContactFormProps {
  product: {
    name: string
    price: number
    colors: string[]
  }
}

export default function ContactForm({ product }: ContactFormProps) {
  const [selectedColor, setSelectedColor] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          product: {
            name: product.name,
            price: product.price,
            color: selectedColor,
          },
        }),
      })
      if (response.ok) {
        toast({
          title: "Mensaje enviado!",
          description: "Te contactaremos lo antes posible.",
        })
        e.currentTarget.reset()
      } else {
        throw new Error()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Select value={selectedColor} onValueChange={setSelectedColor}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona color" />
          </SelectTrigger>
          <SelectContent>
            {product.colors.map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Input name="name" placeholder="Nombre" required />
      <Input name="email" type="email" placeholder="Email" required />
      {/* Textarea con altura fija no modificable */}
      <Textarea 
        name="message" 
        placeholder="Consulta" 
        className="h-24 resize-none" 
      />
      <Button type="submit" className="w-full">
        Consultanos sobre este producto
      </Button>
    </form>
  )
}