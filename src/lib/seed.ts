import { connectToDatabase } from './db';
import AdminUser from '@/models/AdminUser';
import SiteContent from '@/models/SiteContent';
import SiteSettings from '@/models/SiteSettings';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Skill from '@/models/Skill';
import Education from '@/models/Education';
import Achievement from '@/models/Achievement';
import Hackathon from '@/models/Hackathon';
import Certification from '@/models/Certification';
import SocialLink from '@/models/SocialLink';
import NavigationItem from '@/models/NavigationItem';
import { hashPassword } from './auth';

export async function seedDatabase() {
  await connectToDatabase();

  // 1. Admin User Bootstrap
  const adminCount = await AdminUser.countDocuments();
  if (adminCount === 0) {
    const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
    const defaultPassword = process.env.ADMIN_PASSWORD || 'krishna_admin_2026';
    const passwordHash = await hashPassword(defaultPassword);

    await AdminUser.create({
      username: defaultUsername,
      passwordHash,
      email: 'kgarg5448@gmail.com',
    });
    console.log(`[SEED] Created default admin user: ${defaultUsername}`);
  }

  // 2. SiteSettings Bootstrap
  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create({
      sectionVisibility: {
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
      },
      whatsappNumber: '+917982874404',
      whatsappMessage: 'Hi Krishna, I saw your portfolio and would love to connect!',
      profilePhoto: {
        url: '',
        publicId: '',
        altText: 'Krishna Garg Profile Photo',
      },
      resume: {
        fileUrl: '',
        label: 'Download Resume',
        updatedAt: new Date(),
      },
      seo: {
        siteTitle: 'Krishna Garg — Full Stack Developer & Data Analyst',
        metaDescription:
          'Official portfolio of Krishna Garg, B.Tech CSE student at GGSIPU (MSIT) with CGPA 9.4. Full Stack Web Developer and Data Analyst.',
        keywords: ['Krishna Garg', 'Full Stack Developer', 'React', 'Next.js', 'Data Analyst', 'GGSIPU', 'MSIT'],
        ogImage: '',
      },
    });
    console.log('[SEED] Created default SiteSettings');
  }

  // 3. SiteContent (Copy CMS) Bootstrap
  const defaultContents = [
    { key: 'navbar_logo', group: 'navbar', value: 'KG.' },
    { key: 'hero_eyebrow', group: 'hero', value: 'OPEN TO OPPORTUNITIES' },
    { key: 'hero_name', group: 'hero', value: 'Krishna Garg' },
    { key: 'hero_title', group: 'hero', value: 'Full Stack Developer & Data Analyst' },
    { key: 'hero_headline', group: 'hero', value: 'Computer Science Student & Full Stack Web Developer' },
    { key: 'hero_description', group: 'hero', value: 'B.Tech CSE student at GGSIPU (MSIT) with strong foundations in React, Next.js, Python, and Data Analysis. Active hackathon participant and incubation department leader.' },
    { key: 'hero_primary_cta_label', group: 'hero', value: 'See my work' },
    { key: 'hero_primary_cta_dest', group: 'hero', value: '#projects' },
    { key: 'hero_secondary_cta_label', group: 'hero', value: 'Download CV' },
    { key: 'hero_secondary_cta_dest', group: 'hero', value: '#contact' },
    
    { key: 'about_eyebrow', group: 'about', value: 'ABOUT ME' },
    { key: 'about_heading', group: 'about', value: 'Engineering responsive web applications & data systems' },
    { key: 'about_intro', group: 'about', value: "I'm a Computer Science student at MSIT (GGSIPU, New Delhi). I build full-stack web applications and analyze data to solve practical campus and business problems." },
    { key: 'about_description', group: 'about', value: "I focus on clean code, modern web performance, and functional UI design. As Deputy Head of Incubation at E-Cell MSIT, I also evaluate early-stage MVP architectures and mentor fellow student developers." },
    
    { key: 'projects_eyebrow', group: 'projects_sec', value: 'SELECTED WORK' },
    { key: 'projects_heading', group: 'projects_sec', value: 'Engineering Projects & Case Studies' },
    { key: 'projects_description', group: 'projects_sec', value: 'Selected full-stack web applications, hackathon prototypes, and technical projects.' },

    { key: 'exp_eyebrow', group: 'exp_sec', value: 'EXPERIENCE' },
    { key: 'exp_heading', group: 'exp_sec', value: 'Work & Leadership Experience' },
    { key: 'exp_description', group: 'exp_sec', value: 'Demonstrated experience in frontend web development, mentorship, and technical project leadership.' },

    { key: 'skills_eyebrow', group: 'skills_sec', value: 'TECHNICAL PROFICIENCY' },
    { key: 'skills_heading', group: 'skills_sec', value: 'Skills & Technologies' },
    { key: 'skills_description', group: 'skills_sec', value: 'Core engineering languages, frontend frameworks, data science toolkits, and developer workflow tools.' },

    { key: 'edu_eyebrow', group: 'edu_sec', value: 'ACADEMIC BACKGROUND' },
    { key: 'edu_heading', group: 'edu_sec', value: 'Education & Academic Details' },

    { key: 'ach_eyebrow', group: 'ach_sec', value: 'ACHIEVEMENTS' },
    { key: 'ach_heading', group: 'ach_sec', value: 'Recognition & Competition Honors' },

    { key: 'contact_eyebrow', group: 'contact', value: 'GET IN TOUCH' },
    { key: 'contact_heading', group: 'contact', value: "Let's connect" },
    { key: 'contact_description', group: 'contact', value: "I'm open to software engineering internships, full-stack web developer roles, and technical collaborations. Reach out via email or send a direct message!" },
    
    { key: 'footer_subtext', group: 'footer', value: 'Building applications, learning continuously.' },
    { key: 'footer_copy', group: 'footer', value: 'Designed & Built by Krishna Garg' },
    { key: 'footer_copyright', group: 'footer', value: '© 2026' },
  ];

  for (const item of defaultContents) {
    const exists = await SiteContent.findOne({ key: item.key });
    if (!exists) {
      await SiteContent.create(item);
    }
  }

  // 4. Projects Bootstrap
  const projectsCount = await Project.countDocuments();
  if (projectsCount === 0) {
    await Project.create([
      {
        name: 'Canteen OS',
        slug: 'canteen-os',
        category: 'Hackathon Project',
        shortDescription: 'Designed intuitive order management interface & achieved Top 40 Finalist status at Hackavensis.',
        fullDescription: `# Canteen OS — Smart Campus Order Management System\n\nCanteen OS is a web-based food ordering and cafeteria management system engineered for high-traffic educational institution canteens. Built during the Hackavensis hackathon, the platform eliminates long queues by providing real-time order state tracking, kitchen display system integration, and customer order management.`,
        problem: 'Traditional campus canteens suffer from severe congestion during peak break hours, resulting in lost orders and high waiting times.',
        solution: 'Digital menu catalog and queue tracking interface that allows students to pre-order and monitor status remotely.',
        role: 'Frontend Developer & UI/UX Designer',
        features: ['Real-time menu catalog', 'Interactive order cart', 'Kitchen queue updates', 'Responsive mobile interface'],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
        githubUrl: 'https://github.com/kgarg007/hackavensis-project',
        liveUrl: '',
        startDate: '2025',
        featured: true,
        published: true,
        displayOrder: 1,
      },
      {
        name: 'Voting System',
        slug: 'voting-system',
        category: 'Web App',
        shortDescription: 'Comprehensive web-based voting platform featuring voter authentication, candidate management, and real-time result analytics.',
        fullDescription: `# Online Voting System\n\nA secure web-based voting platform designed for institutional elections and poll management.`,
        problem: 'Manual paper voting in university clubs and organizations is prone to counting errors and lack of voter verification.',
        solution: 'A transparent digital voting portal with real-time tally calculation and restricted single-vote mechanics.',
        role: 'Full Stack Web Developer',
        features: ['Voter authentication interface', 'Admin election control panel', 'Instant result tallying', 'Responsive voter UI'],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'DOM Manipulation'],
        githubUrl: 'https://github.com/kgarg007/voting-system',
        liveUrl: '',
        startDate: '2025',
        featured: true,
        published: true,
        displayOrder: 2,
      },
      {
        name: 'Student Hub',
        slug: 'student-hub',
        category: 'Web3 / Platform',
        shortDescription: 'Decentralized campus student platform featuring a grievance portal, event dashboard, and community interactive feeds.',
        fullDescription: `# Mantle-Based Student Hub\n\nStudent Hub is a decentralized campus community application built on the Mantle blockchain ecosystem.`,
        problem: 'Lack of transparent student feedback channels and fragmented campus event announcements across multiple social platforms.',
        solution: 'Unified campus portal leveraging Web3 state transparency for grievances alongside traditional event dashboards.',
        role: 'Frontend & Smart Contract Integration Engineer',
        features: ['Grievance logging portal', 'Event registration dashboard', 'Interactive community feed', 'Web3 wallet connection UI'],
        techStack: ['React', 'JavaScript', 'Web3 / Mantle API', 'Tailwind CSS'],
        githubUrl: 'https://github.com/kgarg007/mantle-based-student-hub',
        liveUrl: '',
        startDate: '2025',
        featured: true,
        published: true,
        displayOrder: 3,
      },
      {
        name: 'InAmigos Foundation Website',
        slug: 'inamigos-foundation-website',
        category: 'Internship Project',
        shortDescription: 'Official website for InAmigos Foundation developed during web development internship following modern UI/UX principles.',
        fullDescription: `# InAmigos Foundation Official Website\n\nDuring my Web Development Internship at InAmigos Foundation, I was tasked with engineering the organization's official digital web presence.`,
        problem: 'InAmigos Foundation required a modern, professional web platform to present its social initiatives and connect with volunteers.',
        solution: 'A high-performance, responsive multi-page web architecture showcasing foundation programs and volunteer intake.',
        role: 'Web Development Intern',
        features: ['Production homepage & about layout', 'Volunteer contact interface', 'Cross-browser responsive styling', 'Clean UI navigation'],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX Best Practices'],
        githubUrl: '',
        liveUrl: '',
        startDate: '2025',
        featured: true,
        published: true,
        displayOrder: 4,
      },
    ]);
    console.log('[SEED] Created initial 4 projects');
  }

  // 5. Experience Bootstrap
  const expCount = await Experience.countDocuments();
  if (expCount === 0) {
    await Experience.create([
      {
        organization: 'InAmigos Foundation',
        role: 'Web Development Intern',
        location: 'Remote, India',
        startDate: '2025',
        endDate: '2025',
        isCurrent: false,
        description: [
          'Engineered real-world production web pages including homepage, about, and contact sections for the foundation.',
          'Developed responsive user interfaces and improved cross-device layout rendering using modern HTML5, CSS3, and JS.',
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
        published: true,
        displayOrder: 1,
      },
      {
        organization: 'E-Cell MSIT',
        role: 'Deputy Head — Incubation Department',
        location: 'MSIT, New Delhi',
        startDate: 'July 2025',
        endDate: 'Present',
        isCurrent: true,
        description: [
          'Leading incubation initiatives, startup acceleration programs, and department team coordination.',
          'Mentoring student founders on web development, UI/UX architecture, and Minimum Viable Product (MVP) creation.',
        ],
        technologies: ['Leadership', 'Technical Mentoring', 'MVP Architecture'],
        published: true,
        displayOrder: 2,
      },
    ]);
    console.log('[SEED] Created initial Experience entries');
  }

  // 6. Skills Bootstrap
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.create([
      { name: 'HTML5', category: 'Frontend', visible: true, displayOrder: 1 },
      { name: 'CSS3', category: 'Frontend', visible: true, displayOrder: 2 },
      { name: 'JavaScript (ES6+)', category: 'Frontend', visible: true, displayOrder: 3 },
      { name: 'React.js', category: 'Frontend', visible: true, displayOrder: 4 },
      { name: 'Tailwind CSS', category: 'Frontend', visible: true, displayOrder: 5 },
      { name: 'Python', category: 'Languages', visible: true, displayOrder: 1 },
      { name: 'Java', category: 'Languages', visible: true, displayOrder: 2 },
      { name: 'C++', category: 'Languages', visible: true, displayOrder: 3 },
      { name: 'SQL', category: 'Languages', visible: true, displayOrder: 4 },
      { name: 'Pandas', category: 'Data Analysis', visible: true, displayOrder: 1 },
      { name: 'NumPy', category: 'Data Analysis', visible: true, displayOrder: 2 },
    ]);
    console.log('[SEED] Created initial Skills');
  }

  // 7. Education Bootstrap
  const eduCount = await Education.countDocuments();
  if (eduCount === 0) {
    await Education.create([
      {
        institution: 'Guru Gobind Singh Indraprastha University (GGSIPU)',
        degree: 'B.Tech — Computer Science & Engineering',
        field: 'Computer Science & Engineering',
        startYear: '2024',
        endYear: '2028',
        isCurrent: true,
        grade: 'CGPA: 9.4 / 10',
        description: 'Currently in 4th Semester at Maharaja Surajmal Institute of Technology (MSIT), New Delhi.',
        courses: ['Web Technologies', 'Object Oriented Programming', 'DSA in Java', 'C Programming', 'C++', 'DBMS'],
        displayOrder: 1,
        visible: true,
      },
    ]);
    console.log('[SEED] Created initial Education entry');
  }

  // 8. Achievements Bootstrap
  const achCount = await Achievement.countDocuments();
  if (achCount === 0) {
    await Achievement.create([
      {
        title: '4th Rank & Special Mention',
        organization: 'IGDTUW',
        event: 'ProTex Hackathon',
        position: '4th Rank',
        date: '2025',
        description: 'Secured 4th Rank and Special Mention award at ProTex Hackathon hosted by IGDTUW.',
        featured: true,
        visible: true,
        displayOrder: 1,
      },
    ]);
    console.log('[SEED] Created initial Achievements');
  }

  // 9. Hackathons Bootstrap
  const hackCount = await Hackathon.countDocuments();
  if (hackCount === 0) {
    await Hackathon.create([
      {
        title: 'Hackavensis Hackathon',
        event: 'Hackavensis 2025',
        organization: 'Campus Hackathon',
        result: 'Top 40 Finalist',
        projectName: 'Canteen OS',
        description: 'Built a web-based smart canteen order management and queue tracking application.',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        githubUrl: 'https://github.com/kgarg007/hackavensis-project',
        featured: true,
        visible: true,
        displayOrder: 1,
      },
    ]);
    console.log('[SEED] Created initial Hackathons');
  }

  // 10. Certifications Bootstrap
  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.create([
      { name: 'Code Slayer 2k25 Certificate', issuer: 'Coding Event', issueDate: '2025', visible: true, displayOrder: 1 },
    ]);
    console.log('[SEED] Created initial Certifications');
  }

  // 11. Social Links Bootstrap (GitHub, LinkedIn, LeetCode, Email, Phone)
  const socialCount = await SocialLink.countDocuments();
  if (socialCount === 0) {
    await SocialLink.create([
      { platform: 'GitHub', label: 'GitHub', url: 'https://github.com/kgarg007', icon: 'Github', visible: true, displayOrder: 1 },
      { platform: 'LinkedIn', label: 'LinkedIn', url: 'https://linkedin.com/in/krishna-garg-56117a324', icon: 'Linkedin', visible: true, displayOrder: 2 },
      { platform: 'LeetCode', label: 'LeetCode', url: 'https://leetcode.com/u/kgarg5448/', icon: 'Code', visible: true, displayOrder: 3 },
      { platform: 'Email', label: 'Email', url: 'mailto:kgarg5448@gmail.com', icon: 'Mail', visible: true, displayOrder: 4 },
      { platform: 'Phone / WhatsApp', label: 'WhatsApp', url: 'https://wa.me/917982874404', icon: 'Phone', visible: true, displayOrder: 5 },
    ]);
    console.log('[SEED] Created initial Social Links including LeetCode');
  } else {
    // Ensure LeetCode exists if social links were previously created
    const leetcodeExists = await SocialLink.findOne({ platform: 'LeetCode' });
    if (!leetcodeExists) {
      await SocialLink.create({
        platform: 'LeetCode',
        label: 'LeetCode',
        url: 'https://leetcode.com/u/kgarg5448/',
        icon: 'Code',
        visible: true,
        displayOrder: 3,
      });
      console.log('[SEED] Added LeetCode to Social Links');
    }
  }

  // 12. Navigation Items Bootstrap
  const navCount = await NavigationItem.countDocuments();
  if (navCount === 0) {
    await NavigationItem.create([
      { label: 'About', url: '#about', visible: true, displayOrder: 1 },
      { label: 'Work', url: '#projects', visible: true, displayOrder: 2 },
      { label: 'Experience', url: '#experience', visible: true, displayOrder: 3 },
      { label: 'Skills', url: '#skills', visible: true, displayOrder: 4 },
      { label: 'Education', url: '#education', visible: true, displayOrder: 5 },
      { label: 'Achievements', url: '#achievements', visible: true, displayOrder: 6 },
      { label: 'Contact', url: '#contact', visible: true, displayOrder: 7 },
    ]);
    console.log('[SEED] Created initial Navigation Items');
  }
}
