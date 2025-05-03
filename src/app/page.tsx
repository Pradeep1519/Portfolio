import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import SkillsSection from '@/components/sections/skills-section';
import ProjectsSection from '@/components/sections/projects-section';
import ExperienceSection from '@/components/sections/experience-section';
import EducationSection from '@/components/sections/education-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import ContactSection from '@/components/sections/contact-section';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Separator className="my-12 md:my-16" />
      <AboutSection />
      <Separator className="my-12 md:my-16" />
      <SkillsSection />
      <Separator className="my-12 md:my-16" />
      <ProjectsSection />
      <Separator className="my-12 md:my-16" />
      <ExperienceSection />
      <Separator className="my-12 md:my-16" />
      <EducationSection />
      <Separator className="my-12 md:my-16" />
      <TestimonialsSection />
      <Separator className="my-12 md:my-16" />
      <ContactSection />
    </>
  );
}
