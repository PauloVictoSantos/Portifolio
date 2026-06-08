"use client"

import { useEffect, useState, useRef } from "react"
import { database } from "@/lib/firebase"
import {
  ref,
  set,
  onDisconnect,
  onValue,
  remove,
} from "firebase/database"

// ID fixo por sessão — gerado uma vez e reutilizado
function getSessionId() {
  const key = "__session_uid__"
  let id = sessionStorage.getItem(key)
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem(key, id)
  }
  return id
}

export default function OnlineUsers() {
  const [count, setCount] = useState(0)
  const [animatedCount, setAnimatedCount] = useState(0)
  const userRefRef = useRef<ReturnType<typeof ref> | null>(null)

  useEffect(() => {
    const sessionId = getSessionId()
    const userRef = ref(database, `onlineUsers/${sessionId}`)
    userRefRef.current = userRef

    // Registra presença
    set(userRef, { online: true, ts: Date.now() })

    // Remove ao fechar aba/conexão
    onDisconnect(userRef).remove()

    // Escuta total de usuários
    const usersRef = ref(database, "onlineUsers")
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      setCount(data ? Object.keys(data).length : 0)
    })

    // Limpeza ao desmontar
    return () => {
      unsubscribe()
      remove(userRef)
    }
  }, []) // roda só uma vez

  // Animação suave do número
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCount((prev) => {
        if (prev < count) return prev + 1
        if (prev > count) return prev - 1
        return prev
      })
    }, 50)
    return () => clearInterval(interval)
  }, [count])

  return (
    <div className="fixed bottom-3 right-4 z-50">
      <div className="flex items-center justify-center bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg px-3 py-1.5 rounded-xl text-xs transition-all duration-300 hover:scale-105 gap-2">
        <span className="relative flex h-3 w-3 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <div className="text-sm font-medium tracking-wide">
          <span className="font-bold text-lg">{animatedCount}</span>{" "}
          {animatedCount === 1 ? "Pessoa online" : "Pessoas online"}
        </div>
      </div>
    </div>
  )
}