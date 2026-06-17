"use client"

import { useEffect, useRef, useState } from "react"
import NextImage from "next/image"

type Side = "left" | "right"

interface Sender {
  side: Side
  avatar: string
}

interface Message {
  from: Sender
  text: string
}

const ME: Sender = {
  side: "right",
  avatar: "/Paulo.jpeg",
}

const CL: Sender = {
  side: "left",
  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Client&backgroundColor=ffd5dc",
}

const MESSAGES: Message[] = [
  { from: CL, text: "Oi! Vi seu portfólio e gostei muito do seu trabalho." },
  { from: ME, text: "Obrigado! Fico feliz que tenha gostado 😊" },
  {
    from: CL,
    text: "Preciso de um site com landing page, painel admin e pagamento. Você faz?",
  },
  {
    from: ME,
    text: "Com certeza! Tenho experiência com Next.js, Stripe e Mercado Pago.",
  },
]

function Avatar({ src }: { src: string }) {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border">
      <NextImage
        src={src}
        alt="avatar"
        width={32}
        height={32}
        className="w-full h-full object-cover"
        unoptimized
      />
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 mb-3.5">
      <Avatar src={CL.avatar} />
      <div className="bg-muted border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "1s" }}
          />
        ))}
      </div>
    </div>
  )
}

function Bubble({ message, visible }: { message: Message; visible: boolean }) {
  const isRight = message.from.side === "right"

  return (
    <div
      className={`flex items-end gap-2.5 mb-3 transition-all duration-300 ease-out
        ${isRight ? "flex-row-reverse" : ""}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
      `}
    >
      <Avatar src={message.from.avatar} />
      <div
        className={`max-w-[72%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl
          ${isRight
            ? "bg-background text-foreground rounded-br-sm"
            : "bg-muted border border-border text-foreground rounded-bl-sm"
          }
        `}
      >
        {message.text}
      </div>
    </div>
  )
}

export default function ChatServiceRequest() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping]     = useState(false)
  const [done, setDone]                 = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    let cancelled = false

    function next() {
      if (cancelled) return
      const idx = indexRef.current
      if (idx >= MESSAGES.length) { setDone(true); return }

      const msg      = MESSAGES[idx]
      const isClient = msg.from.side === "left"

      if (isClient) {
        setShowTyping(true)
        setTimeout(() => {
          if (cancelled) return
          setShowTyping(false)
          setTimeout(() => {
            if (cancelled) return
            indexRef.current = idx + 1
            setVisibleCount(idx + 1)
            setTimeout(next, 500)
          }, 200)
        }, 900)
      } else {
        setTimeout(() => {
          if (cancelled) return
          indexRef.current = idx + 1
          setVisibleCount(idx + 1)
          setTimeout(next, 400)
        }, 500)
      }
    }

    const start = setTimeout(next, 600)
    return () => { cancelled = true; clearTimeout(start) }
  }, [])

  return (
    <div className="w-full h-full flex flex-col pointer-events-none select-none">

      <div className="flex-1 flex flex-col justify-end">
        {MESSAGES.slice(0, visibleCount).map((msg, i) => (
          <Bubble key={i} message={msg} visible={i < visibleCount} />
        ))}
        {showTyping && <TypingIndicator />}
      </div>
    </div>
  )
}