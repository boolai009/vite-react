import React, { useState } from 'react';
import { 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink, 
  Award, 
  Users, 
  Zap, 
  Database, 
  Building, 
  GraduationCap, 
  Calendar, 
  ChevronRight, 
  Menu, 
  X,
  LucideIcon 
} from 'lucide-react';
import './App.css';

// Type definitions
interface Achievement {
  icon: LucideIcon;
  text: string;
  desc: string;
}

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  highlights: string[];
}

interface SkillsData {
  [category: string]: string[];
}

type Section = 'about' | 'skills' | 'experience' | 'contact';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavClick = (section: string): void => {
    setActiveSection(section.toLowerCase() as Section);
    setMobileMenuOpen(false);
  };

  const skills: SkillsData = {
    "Programming Languages": ["C#", "JavaScript", "PHP", "SQL"],
    "Frameworks & Tools": ["Unity Game Engine", "Firebase", "ROS", "Ionic", ".NET", "Unreal Engine", "RESTful APIs"],
    "Development Practices": ["Agile Methodologies", "DevOps", "Algorithm Optimization", "Software Testing"],
    "Databases": ["PostgreSQL", "Firestore", "NoSQL"],
    "Other": ["UI/UX Design", "Project Management", "Team Leadership", "Client Communication"]
  };

  const experience: ExperienceItem[] = [
    {
      company: "AIBLOCKCHAIN",
      position: "Senior Software Architect & Interface Designer",
      period: "Mar 2022 - Present",
      highlights: [
        "Architected comprehensive LIMS using Unity UI Toolkit and Firebase",
        "Boosted user engagement and productivity by 25%",
        "Designed sophisticated multi-level navigation system",
        "Managed data synchronization between Firestore and PostgreSQL"
      ]
    },
    {
      company: "Setton Farms",
      position: "Software Engineer",
      period: "Nov 2020 - Mar 2022",
      highlights: [
        "Developed applications in robotics, VR, and AI domains",
        "Reduced bug rates by 30% through advanced testing methodologies",
        "Cut processing time by 40% with AI-based systems",
        "Led VR training and ML-powered automation projects"
      ]
    },
    {
      company: "Boogie Down Games",
      position: "Lead Programmer/Owner",
      period: "May 2015 - Present",
      highlights: [
        "Directed agile teams developing high-quality Unity games",
        "Optimized algorithms and data structures for peak performance",
        "Built robust testing environments for comprehensive QA",
        "Delivered multiple successful games with positive reviews"
      ]
    },
    {
      company: "Mount Sinai Hospital",
      position: "Lead Programmer & Contract Programmer",
      period: "May 2014 - 2019",
      highlights: [
        "Managed critical healthcare applications",
        "Generated $30 million in revenue through deployed solutions",
        "Optimized performance reducing load times significantly",
        "Applied agile methodologies for on-time delivery"
      ]
    }
  ];

  const achievements: Achievement[] = [
    { icon: Award, text: "10+ Years Experience", desc: "Delivering scalable software solutions" },
    { icon: Users, text: "Cross-functional Leadership", desc: "Leading agile teams to success" },
    { icon: Zap, text: "25% Productivity Boost", desc: "Through innovative LIMS architecture" },
    { icon: Database, text: "$30M Revenue Generated", desc: "From deployed healthcare solutions" }
  ];

  const navigationItems: string[] = ['About', 'Skills', 'Experience', 'Contact'];

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="nav-logo">
              <Code className="lucide" />
            </div>
            <span className="nav-title">Misael Aponte</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links">
            {navigationItems.map((item: string) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="lucide" /> : <Menu className="lucide" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navigationItems.map((item: string) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-avatar">
            MA
          </div>
          <h1 className="hero-title">
            Mobile Architect &
            <span className="hero-subtitle">
              Unity Developer
            </span>
          </h1>
          <p className="hero-description">
            10+ years of experience delivering scalable, business-critical software. 
            Specializing in Unity development, system architecture, and leading cross-functional agile teams.
          </p>
          <div className="hero-tags">
            <div className="hero-tag">
              <MapPin className="hero-tag-icon" />
              <span>Hanford, CA</span>
            </div>
            <div className="hero-tag">
              <Phone className="hero-tag-icon" />
              <span>559-212-3651</span>
            </div>
            <div className="hero-tag">
              <Mail className="hero-tag-icon" />
              <span>maponteprof@gmail.com</span>
            </div>
          </div>
          <div className="hero-buttons">
            <button className="btn-primary" type="button">
              <Download className="lucide" />
              <span>Download Resume</span>
            </button>
            <button className="btn-secondary" type="button">
              <ExternalLink className="lucide" />
              <span>View Projects</span>
            </button>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements">
        <div className="achievements-grid">
          {achievements.map((achievement: Achievement, index: number) => (
            <div key={index} className="achievement-card">
              <achievement.icon className="achievement-icon" />
              <h3 className="achievement-title">{achievement.text}</h3>
              <p className="achievement-desc">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section" id="skills">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, skillList]: [string, string[]]) => (
            <div key={category} className="skill-category">
              <h3 className="skill-category-title">{category}</h3>
              <div className="skill-tags">
                {skillList.map((skill: string, index: number) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section" id="experience">
        <h2 className="section-title">Professional Experience</h2>
        <div className="experience-list">
          {experience.map((job: ExperienceItem, index: number) => (
            <div key={index} className="experience-card">
              <div className="experience-header">
                <div>
                  <h3 className="experience-company">{job.company}</h3>
                  <h4 className="experience-position">{job.position}</h4>
                </div>
                <div className="experience-period">
                  <Calendar className="lucide" />
                  <span>{job.period}</span>
                </div>
              </div>
              <ul className="experience-highlights">
                {job.highlights.map((highlight: string, hIndex: number) => (
                  <li key={hIndex} className="experience-highlight">
                    <ChevronRight className="experience-highlight-icon" />
                    <span className="experience-highlight-text">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Military */}
      <section className="education-section">
        <h2 className="section-title">Education & Service</h2>
        <div className="education-grid">
          <div className="education-card">
            <div className="education-header">
              <GraduationCap className="education-icon" />
              <h3 className="education-header-title">Education</h3>
            </div>
            <div className="education-item">
              <h4 className="education-degree">Master of Science, Computer Science</h4>
              <p className="education-school">Northcentral University, San Diego</p>
              <p className="education-date">October 2020</p>
            </div>
            <div className="education-item">
              <h4 className="education-degree">Bachelor of Science, Computer Science</h4>
              <p className="education-school">California State University, Fresno</p>
              <p className="education-date">May 2013</p>
            </div>
          </div>
          <div className="education-card">
            <div className="education-header">
              <Building className="education-icon" />
              <h3 className="education-header-title">Military Service</h3>
            </div>
            <div className="education-item">
              <h4 className="education-degree">Aviation Administration</h4>
              <p className="education-school">United States Navy</p>
              <p className="education-date">July 2004 - November 2009</p>
              <p className="education-description">
                Managed administrative duties and maintenance planning for F-18 jet fighter operations, 
                developing leadership and technical project management skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <h2 className="section-title">Let's Work Together</h2>
        <p className="contact-description">
          Ready to bring your next project to life? Let's discuss how my expertise can help drive your success.
        </p>
        <div className="contact-buttons">
          <a href="mailto:maponteprof@gmail.com" className="btn-primary">
            <Mail className="lucide" />
            <span>Email Me</span>
          </a>
          <a href="tel:559-212-3651" className="btn-secondary">
            <Phone className="lucide" />
            <span>Call Me</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          &copy; 2025 Misael Aponte. Crafting innovative software solutions with passion and precision.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;