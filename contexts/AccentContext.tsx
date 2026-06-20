"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const ACCENTS = [
  { name: "Violeta", value: "#7c6fcf" },
  { name: "Azul", value: "#3b82f6" },
  { name: "Verde", value: "#22c55e" },
  { name: "Rosa", value: "#ec4899" },
  { name: "Laranja", value: "#f97316" },
];

const STORAGE_KEY = "site-accent-color";

type AccentContextType = {
  accent: string;
  setAccent: (value: string) => void;
};

const AccentContext = createContext<AccentContextType | null>(null);

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState(ACCENTS[0].value);

  // lê o que ficou salvo assim que carrega no navegador
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setAccentState(saved);
  }, []);

  // aplica no :root toda vez que mudar — isso é o que afeta o site inteiro
  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", accent);
  }, [accent]);

  const setAccent = (value: string) => {
    setAccentState(value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent precisa estar dentro de <AccentProvider>");
  return ctx;
}