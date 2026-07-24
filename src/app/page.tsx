import { getPublicPortfolioData } from '@/lib/data';
import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import AboutSection from '@/components/public/AboutSection';
import ProjectsSection from '@/components/public/ProjectsSection';
import ExperienceSection from '@/components/public/ExperienceSection';
import SkillsSection from '@/components/public/SkillsSection';
import EducationSection from '@/components/public/EducationSection';
import AchievementsSection from '@/components/public/AchievementsSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';

export const revalidate = 60; // Revalidate dynamic content every 60s or on-demand via server action

export default async function HomePage() {
  const {
    content,
    settings,
    projects,
    experiences,
    skills,
    education,
    achievements,
    hackathons,
    certifications,
    socialLinks,
    navigationItems,
  } = await getPublicPortfolioData();

  const visibility = settings?.sectionVisibility || {
    hero: true,
    about: true,
    projects: true,
    experience: true,
    skills: true,
    achievements: true,
    hackathons: true,
    education: true,
    contact: true,
    whatsapp: true,
  };

  const logoText = content.navbar_logo || 'KG.';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar logoText={logoText} items={navigationItems} settings={settings} />

      <main>
        {visibility.hero && <HeroSection content={content} settings={settings} />}
        {visibility.about && <AboutSection content={content} settings={settings} />}
        {visibility.projects && <ProjectsSection content={content} projects={projects} />}
        {visibility.experience && <ExperienceSection content={content} experiences={experiences} />}
        {visibility.skills && <SkillsSection content={content} skills={skills} />}
        {visibility.education && <EducationSection content={content} education={education} />}
        {visibility.achievements && (
          <AchievementsSection
            content={content}
            achievements={achievements}
            hackathons={hackathons}
            certifications={certifications}
          />
        )}
        {visibility.contact && (
          <ContactSection content={content} settings={settings} socialLinks={socialLinks} />
        )}
      </main>

      <Footer content={content} socialLinks={socialLinks} />
    </div>
  );
}
