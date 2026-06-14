"use client";
import React from "react";
import { Label } from "@/components/skills/ui/label";
import { Input } from "@/components/skills/ui/input";
import { cn } from "@/lib/utils";

export default function ContactForm() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="relative mx-auto w-full max-w-md rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
      <div className="relative z-10">

        <h2 className="text-2xl font-bold">
          Fale conosco
        </h2>

        <p className="mt-2 text-sm text-foreground">
          Responderemos o mais rápido possível.
        </p>

        <form className="my-8 space-y-5" onSubmit={handleSubmit}>

          <LabelInputContainer>
            <Label htmlFor="firstname">Nome</Label>
            <Input id="firstname" placeholder="Seu nome" type="text" />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="seuemail@email.com" type="email" />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="conteudo">Mensagem</Label>
            <textarea
              id="conteudo"
              placeholder="Digite sua mensagem..."
              className="min-h-30 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </LabelInputContainer>

          <button
            className="h-11 w-full rounded-md bg-linear-to-r from-sky-500 to-indigo-600 font-medium text-white transition hover:scale-[1.02]"
            type="submit"
          >
            Enviar mensagem
          </button>

        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};