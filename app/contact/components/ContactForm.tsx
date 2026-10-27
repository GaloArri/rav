"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";
import { useIdioma } from "@/lib/idioma";

export default function ContactForm() {
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const { toast } = useToast();
  const { t, idioma } = useIdioma();

  // El esquema se rearma al cambiar de idioma para que los mensajes de
  // validación también queden traducidos.
  const esquema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("valNombre")),
        email: z.string().email(t("valMail")),
        subject: z.string().min(5, t("valAsunto")),
        message: z.string().min(10, t("valMensaje")),
      }),
    [idioma] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const form = useForm<z.infer<typeof esquema>>({
    resolver: zodResolver(esquema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof esquema>) {
    setEnviando(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error(t("errorEnviar"));

      setExito(true);
      toast({ title: t("mensajeEnviado"), description: t("mensajeEnviadoTexto"), duration: 5000 });
      form.reset();
      setTimeout(() => setExito(false), 5000);
    } catch {
      toast({
        title: t("errorEnviar"),
        description: t("errorEnviarTexto"),
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="relative">
      {exito && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-black/50 dark:bg-black/70">
          <div
            role="status"
            aria-live="polite"
            className="mx-4 max-w-md rounded-lg border bg-card p-8 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-center">
              <CheckCircle className="h-16 w-16" />
            </div>
            <h3 className="mb-2 text-center text-xl font-semibold">
              {t("mensajeEnviado")}
            </h3>
            <p className="mb-6 text-center text-muted-foreground">
              {t("mensajeEnviadoTexto")}
            </p>
            <div className="flex justify-center">
              <Button onClick={() => setExito(false)}>{t("cerrar")}</Button>
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
                <FormLabel>{t("campoNombre")}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="name"
                    placeholder={t("phNombre")}
                    {...field}
                  />
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
                <FormLabel>{t("mail")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="nombre@mail.com"
                    {...field}
                  />
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
                <FormLabel>{t("campoAsunto")}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder={t("phAsunto")}
                    {...field}
                  />
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
                <FormLabel>{t("campoMensaje")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("phMensaje")}
                    className="h-36 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={enviando}>
            {enviando ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
                {t("enviando")}
              </span>
            ) : (
              t("enviarMensaje")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
