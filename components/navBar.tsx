"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import { useState } from "react";
import { ModeToggle } from "./ModeToggle";

export function NavbarDemo() {
  const navItems = [
    { name: "Inicio", link: "#home" },
    { name: "Sobre mim", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Projetos", link: "#projetos" },
    { name: "Experiencia", link: "#experiencia" },
    { name: "Contato", link: "#contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />

          <div className="hidden md:flex gap-6">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.link)}
                className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <button
                key={`mobile-link-${idx}`}
                onClick={() => {
                  scrollToSection(item.link);
                  setIsMobileMenuOpen(false);
                }}
                className="relative text-neutral-600 dark:text-neutral-300 text-left py-2"
              >
                <span className="block">{item.name}</span>
              </button>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}