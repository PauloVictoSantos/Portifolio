import AboutSection from "@/components/about/about-section"
import  ContactSection  from "@/components/contact-section"
import {ExperienceSection} from "@/components/experincia"
import ProjectSection from "@/components/project-section"
import SkillsSection from "@/components/skills/skills-section"
import OnlineUsers from "@/components/OnlineUsers"
import { ShootingStars } from '@/components/ui/shooting-stars'
import { HeroSection } from "@/components/hero-section"
import { Cursor } from "@/components/Cursor";
import { DeviceBentoGrid } from "@/components/work/Devicebentogrid";
import { ScrollProgress } from "@/components/ScrollProgress"

export default function Home() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <ShootingStars />
      </div>
      <ScrollProgress />
      <Cursor />
      
      <main>
        <HeroSection />
        <AboutSection />
        <DeviceBentoGrid />
        <SkillsSection />
        <ProjectSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <div className="fixed top-0 left-0 right-0 z-50">
        <OnlineUsers />
      </div>
    </div>
  )
}