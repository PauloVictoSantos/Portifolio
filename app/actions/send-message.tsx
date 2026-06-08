"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const DESTINATION_EMAIL = "paulovictorsantosvc@gmail.com"

export type ContactState = {
  status: "idle" | "success" | "error"
  message: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function sendMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = (formData.get("name") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const subject = (formData.get("subject") as string)?.trim()
  const message = (formData.get("message") as string)?.trim()

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Por favor, preencha nome, email e mensagem.",
    }
  }

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "Por favor, informe um email válido.",
    }
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: [DESTINATION_EMAIL],
      replyTo: email,
      subject: subject
        ? `[Portfólio] ${subject}`
        : `[Portfólio] Nova mensagem de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    })

    if (error) {
      console.log("[v0] Resend error:", error)
      return {
        status: "error",
        message: "Não foi possível enviar a mensagem. Tente novamente.",
      }
    }

    return {
      status: "success",
      message: "Mensagem enviada com sucesso! Retornarei em breve.",
    }
  } catch (err) {
    console.log("[v0] Send message exception:", err)
    return {
      status: "error",
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    }
  }
}
