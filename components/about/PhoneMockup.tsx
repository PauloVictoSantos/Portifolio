"use client"

import React, { useEffect, useState } from "react"

interface PhoneMockupProps {
  children: React.ReactNode
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto w-93 h-185">
      <div className="absolute inset-0 rounded-[55px] border-12 border-black bg-black">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30" />
        <div className="absolute inset-0 rounded-[42px] overflow-hidden bg-neutral-950">
          <div className="absolute inset-0 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>

      <div className="absolute top-40 -right-0.5 h-16 w-0.75 bg-black rounded-l-md" />
      <div className="absolute top-28 -left-0.5 h-12 w-0.75 bg-black rounded-r-md" />
      <div className="absolute top-44 -left-0.5 h-16 w-0.75 bg-black rounded-r-md" />
    </div>
  )
}