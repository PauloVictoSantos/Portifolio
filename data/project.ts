import type { IconType } from "react-icons/lib";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiVercel,
  SiPostgresql,
  SiFramer,
  SiSupabase,
  SiGooglemaps,
  SiGithub,
  SiMysql,
  SiPostman,
  SiGoogle,
} from "react-icons/si";

export type Project = {
  title: string;
  description: string;
  images: string[];
  code: string;
  site: string;
  tech: TechKey[];
  createdAt: string;
};

export type SkillsKey =
  | "react"
  | "nextjs"
  | "typescript"
  | "framer"
  | "tailwind"
  | "vercel"
  | "supabase"
  | "github"
  | "nodejs"
  | "mysql"
  | "postman"
  | "PostgreSQL"
  | "google";

export const skills: Record<
  SkillsKey,
  { name: string; color: string; darkColor?: string; icon: IconType }
> = {
  react: { name: "React", color: "#61DAFB", icon: SiReact },
  nextjs:     { name: "Next.js",       color: "#171717",  darkColor: "#ffffff", icon: SiNextdotjs },
  vercel:     { name: "Vercel",       color: "#171717",  darkColor: "#ffffff", icon: SiVercel },
  typescript: { name: "TypeScript", color: "#3178C6", icon: SiTypescript },
  framer: { name: "Framer Motion", color: "#BB4B96", icon: SiFramer },
  tailwind: { name: "Tailwind CSS", color: "#06B6D4", icon: SiTailwindcss },
  supabase: { name: "Supabase", color: "#3ECF8E", icon: SiSupabase },
  github: {
    name: "GitHub",
    color: "#171717",
    darkColor: "#e6edf3",
    icon: SiGithub,
  },
  nodejs: { name: "Node.js", color: "#5FA04E", icon: SiNodedotjs },
  mysql: { name: "MySQL", color: "#4479A1", icon: SiMysql },
  postman: { name: "Postman", color: "#FF6C37", icon: SiPostman },
  google: { name: "Google", color: "#4285F4", icon: SiGoogle },
  PostgreSQL: { name: "PostgreSQL", color: "#4285F4", icon: SiPostgresql },
};

export const techMap = {
  react: {
    icon: SiReact,
    color: "linear-gradient(135deg, #61DAFB, #00D8FF)",
    name: "React",
  },

  next: {
    icon: SiNextdotjs,
    color: "linear-gradient(135deg, #000000, #434343)",
    name: "Next.js",
  },

  typescript: {
    icon: SiTypescript,
    color: "linear-gradient(135deg, #3178C6, #235A97)",
    name: "TypeScript",
  },

  tailwind: {
    icon: SiTailwindcss,
    color: "linear-gradient(135deg, #06B6D4, #38BDF8)",
    name: "Tailwind CSS",
  },

  node: {
    icon: SiNodedotjs,
    color: "linear-gradient(135deg, #339933, #68A063)",
    name: "Node.js",
  },

  vercel: {
    icon: SiVercel,
    color: "linear-gradient(135deg, #000000, #444444)",
    name: "Vercel",
  },

  postgres: {
    icon: SiPostgresql,
    color: "linear-gradient(135deg, #336791, #4F8DB3)",
    name: "PostgreSQL",
  },

  framer: {
    icon: SiFramer,
    color: "linear-gradient(135deg, #0055FF, #8B5CF6)",
    name: "Framer Motion",
  },

  supabase: {
    icon: SiSupabase,
    color: "linear-gradient(135deg, #3ECF8E, #2BB673)",
    name: "Supabase",
  },

  googlemaps: {
    icon: SiGooglemaps,
    color: "linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)",
    name: "Google Maps",
  },
};

export type TechKey = keyof typeof techMap;

export const projects: Project[] = [
  {
    title: "Tributos - Plataforma de Perfis",
    description:
      "A plataforma Tributos é uma aplicação web completa desenvolvida com Next.js e React para criação e visualização de perfis personalizados. O sistema permite que usuários organizem informações importantes, compartilhem links e construam uma identidade digital moderna. O site foi estruturado com foco em performance, escalabilidade e experiência do usuário, aplicando boas práticas de componentização e organização de código.",
    images: ["", ""],
    code: "#",
    site: "#",
    tech: [
      "next",
      "react",
      "typescript",
      "tailwind",
      "framer",
      "vercel",
      "googlemaps",
    ],
    createdAt: "2025-11-12",
  },
  {
    title: "Aura",
    description:
      "Aura é um site focado na construção de uma interface moderna e futurista utilizando Next.js, React e Framer Motion. A proposta foi desenvolver uma experiência visual imersiva, explorando animações suaves, transições elegantes e microinterações detalhadas. O layout foi cuidadosamente estruturado para ser responsivo, performático e visualmente impactante, destacando habilidades avançadas em UI e design interativo.",
    images: ["", ""],
    site: "#",
    code: "#",
    tech: ["next", "react", "typescript", "tailwind", "framer", "vercel"],
    createdAt: "2025-11-12",
  },
  {
    title: "EcoRoots",
    description:
      "GameGift é um sistema completo de ranking desenvolvido com Next.js no frontend e Node.js no backend, utilizando PostgreSQL para persistência de dados. A aplicação permite gerenciamento de usuários, atualização dinâmica de pontuações e organização de classificações em tempo real. O foco principal foi consolidar conhecimentos em integração entre frontend e backend, modelagem de banco de dados e estruturação de APIs.",
    images: ["", ""],
    site: "#",
    code: "#",
    tech: [
      "next",
      "react",
      "typescript",
      "tailwind",
      "framer",
      "postgres",
      "supabase",
    ],
    createdAt: "2026-01-20",
  },
];