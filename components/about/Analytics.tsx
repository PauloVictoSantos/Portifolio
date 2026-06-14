"use client"

import { useEffect } from "react"
import { saveVisit } from "@/hooks/saveVisit"

export function Analytics() {
  useEffect(() => {
    saveVisit()
  }, [])

  return null
}