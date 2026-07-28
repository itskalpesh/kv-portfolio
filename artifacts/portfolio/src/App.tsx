import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useDragControls } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Terminal, ChevronDown, ChevronUp, Copy, CheckCircle2, FileCode2, Database, Layout, Laptop, GraduationCap, MapPin, Phone, Instagram, Sun, Moon, ArrowUp, ArrowDown, Menu, Code2, Lock, Unlock, Plus, Trash2, Edit3, ShieldCheck, KeyRound, X, Check, Bot, Sparkles, Send, MessageSquare, Wand2, Upload, Image, Mic, MicOff, Volume2, VolumeX, FolderGit2, GripHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";

import portraitImg from "@/assets/Picsart_26-04-19_06-43-29-070_1776771771515.jpg";
import robotImg from "@/assets/Picsart_26-04-20_21-47-46-924_1776771781463.png";
import studyNotesImg from "./assets/study-notes-mockup.png";
import mcpCertImg from "./assets/MCP.jpeg";
import aiCertImg from "./assets/Ai.jpg";
import pythonCertImg from "./assets/Python.jpg";
import aptechCertImg from "./assets/Aptech-Computer.jpg";

// Premium easing
const EASE = [0.22, 1, 0.36, 1] as const;

// Default Showcase Datasets
const defaultProjectsData: ProjectItem[] = [
  {
    id: "study-notes",
    title: "Study Notes Website",
    category: "Web Development",
    url: "itskalpesh.github.io/study-notes-site",
    image: studyNotesImg,
    description: "Comprehensive web platform built for students to access, organize, and share study notes. Features clean responsive UI, interactive navigation, and subject/topic categorization.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    liveLink: "https://itskalpesh.github.io/study-notes-site/"
  }
];

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  url: string;
  image: string;
  description: string;
  tags: string[];
  liveLink?: string;
  status?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  skills: string[];
  image?: string;
}

const defaultCertificatesData: CertificateItem[] = [
  {
    id: "nxtwave-mcp-cert",
    title: "MCP Workshop: Build AI Automations That Work For You",
    issuer: "NxtWave (NXT WAVE™)",
    year: "2026",
    description: "Successfully completed the hands-on project in the 'MCP Workshop: Build AI Automations That Work For You', conducted by MCP expert and an IIT Guwahati alumnus, Mr Revanth Konakanchi. Equipped with essential AI Era automation skills.",
    skills: ["MCP", "AI Automations", "Model Context Protocol", "AI Agents"],
    image: mcpCertImg
  },
  {
    id: "guvi-ai-india-cert",
    title: "AI For India 2.0",
    issuer: "GUVI / Skill India Digital / NSDC",
    year: "2023",
    description: "Successfully completed the online skilling course on AI For India 2.0 offered by GUVI through Skill India Digital and NSDC. Authorized by Founder & CEO M. Arunprakash.",
    skills: ["Artificial Intelligence", "AI 2.0", "Python for AI", "Machine Learning"],
    image: aiCertImg
  },
  {
    id: "guvi-python-cert",
    title: "Python Certification of Achievement",
    issuer: "GUVI (Google for Education Partner)",
    year: "2023",
    description: "Awarded the certificate of achievement for the successful completion of the Python programming course. Verified Certificate ID: z0H19fP2476w43l3b9.",
    skills: ["Python", "Core Python", "OOP", "Data Structures"],
    image: pythonCertImg
  },
  {
    id: "aptech-msoffice-cert",
    title: "M.S. Office & Internet",
    issuer: "Aptech Computer Education / Vidya",
    year: "2023",
    description: "Certificate of Participation for completing the M.S. Office & Internet course at Nipani centre. Credential Sr. No. 22321.",
    skills: ["MS Office", "MS Word & Excel", "PowerPoint", "Internet & Web Fundamentals"],
    image: aptechCertImg
  }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedCertImage, setSelectedCertImage] = useState<{ url: string; title: string } | null>(null);

  // Dynamic Persistent Datasets
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const validIds = new Set(defaultProjectsData.map(d => d.id));
    const saved = localStorage.getItem("kv_projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((p: ProjectItem) => validIds.has(p.id));
          if (filtered.length > 0) return filtered;
        }
      } catch (e) {}
    }
    return defaultProjectsData;
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    const validIds = new Set(defaultCertificatesData.map(d => d.id));
    const saved = localStorage.getItem("kv_certificates");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((c: CertificateItem) => validIds.has(c.id));
          const updated = filtered.map((c: CertificateItem) => {
            if (c.id === "nxtwave-mcp-cert") return { ...c, image: mcpCertImg };
            if (c.id === "guvi-ai-india-cert") return { ...c, image: aiCertImg };
            if (c.id === "guvi-python-cert") return { ...c, image: pythonCertImg };
            if (c.id === "aptech-msoffice-cert") return { ...c, image: aptechCertImg };
            return c;
          });
          const missing = defaultCertificatesData.filter(d => !updated.some((c: CertificateItem) => c.id === d.id));
          if (missing.length > 0) {
            return [...missing, ...updated];
          }
          return updated;
        }
      } catch (e) {}
    }
    return defaultCertificatesData;
  });

  const handleSaveProjects = (items: ProjectItem[]) => {
    setProjects(items);
    localStorage.setItem("kv_projects", JSON.stringify(items));
  };

  const handleSaveCertificates = (items: CertificateItem[]) => {
    setCertificates(items);
    localStorage.setItem("kv_certificates", JSON.stringify(items));
  };

  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 3D Parallax Scroll Transformations for Hero
  const heroRotateX = useTransform(scrollYProgress, [0, 0.2], [0, -14]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  useEffect(() => {
    const isLight = localStorage.getItem("theme") === "light";
    if (isLight) {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    
    // Simulate hacker preloader timing
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - (window.innerHeight / 2 - Math.min(rect.height, window.innerHeight) / 2);
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden relative">
      <Toaster position="bottom-right" />
      
      {/* Quantum 3D Holographic Preloader */}
      <AnimatePresence>
        {loading && <QuantumPreloader />}
      </AnimatePresence>

      {/* Subtle Grid + Noise */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] bg-blob-1 mix-blend-normal dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/5 blur-[120px] bg-blob-2 mix-blend-normal dark:mix-blend-screen" />
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent origin-left z-[100]"
        style={{ scaleX: springScroll }}
      />

      <Cursor />

      {/* Floating Pill Nav */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: loading ? 1 : 0 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center glass-panel rounded-full px-4 py-3 gap-8 w-[90%] md:w-auto max-w-4xl justify-between md:justify-start"
      >
        <div className="font-mono text-sm font-bold tracking-widest text-primary flex items-center gap-2 cursor-hover-target cursor-pointer" onClick={() => scrollTo("hero")}>
          <span>KV.CODER.</span>
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-5 text-xs font-mono uppercase text-muted-foreground items-center">
          {["about", "education", "skills", "projects", "certificates", "contact"].map((item) => (
            <MagneticButton key={item}>
              <button 
                onClick={() => scrollTo(item)}
                className={cn(
                  "transition-colors duration-300 cursor-hover-target relative",
                  activeSection === item ? "text-primary font-bold" : "hover:text-foreground"
                )}
              >
                {item}
                {activeSection === item && (
                  <motion.div layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </button>
            </MagneticButton>
          ))}
          <div className="w-[1px] h-4 bg-border" />
          <a 
            href="https://github.com/itskalpesh" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors cursor-hover-target text-muted-foreground" 
            title="Kalpesh's Official GitHub Account (@itskalpesh)"
          >
            <Github size={16} />
          </a>
          <button onClick={toggleTheme} className="hover:text-primary transition-colors cursor-hover-target">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="hidden md:block">
          <MagneticButton>
            <button onClick={() => scrollTo("contact")} className="bg-foreground text-background px-5 py-2 rounded-full font-mono text-xs font-bold uppercase hover:scale-105 transition-transform cursor-hover-target">
              Hire Me
            </button>
          </MagneticButton>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-foreground">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-foreground"><Menu size={24} /></button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col gap-8 glass-panel border-l-border">
              <div className="font-mono text-lg font-bold text-primary mt-8">KV.CODER.</div>
              <div className="flex flex-col gap-6 font-mono uppercase text-sm">
                {["about", "education", "skills", "projects", "certificates", "contact"].map((item) => (
                  <button 
                    key={item}
                    onClick={() => {
                      scrollTo(item);
                    }}
                    className={cn("text-left transition-colors", activeSection === item ? "text-primary" : "text-muted-foreground")}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button onClick={() => scrollTo("contact")} className="mt-auto bg-foreground text-background px-5 py-3 rounded-full font-mono text-sm font-bold uppercase w-full">
                Hire Me
              </button>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>

      {/* 3D Parallax Scroll Stage for Hero */}
      <motion.div 
        style={{ 
          rotateX: heroRotateX, 
          scale: heroScale, 
          y: heroY, 
          opacity: heroOpacity,
          transformStyle: "preserve-3d"
        }} 
        className="perspective-1200 transition-transform ease-out"
      >
        {/* Hero Section */}
        <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20 px-6 z-10">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
            <motion.div 
              initial="hidden"
              animate={loading ? "hidden" : "visible"}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="flex flex-col gap-6 relative z-20"
            >
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: EASE }}
                className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full w-fit border-primary/20 bg-background/50 cursor-hover-target"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span className="font-mono text-[10px] text-foreground uppercase tracking-widest font-bold">Available for Work - 2026</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1]">
                <TextReveal>KALPESH</TextReveal>
                <TextReveal>
                  <span className="text-gradient inline-block animate-gradient bg-[length:200%_auto]">KURBETTI</span>
                </TextReveal>
              </h1>
              
              <motion.h2 variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 1 }} className="text-xl md:text-2xl font-mono text-foreground/80">
                Aspiring Software Developer
              </motion.h2>
              
              <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 1, delay: 0.2 }} className="text-lg text-foreground/70 max-w-md mt-2 border-l-2 border-primary/30 pl-4 py-1 leading-relaxed">
                Motivated BCA student with a strong foundation in programming. Eager to build digital experiences that feel alive.
              </motion.p>
              
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-4 pt-6">
                {/* Primary Action Button */}
                <div className="flex flex-wrap gap-3">
                  <MagneticButton>
                    <button onClick={() => scrollTo("projects")} className="bg-primary text-primary-foreground px-7 py-3.5 font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-all rounded-xl flex items-center gap-2 cursor-hover-target shadow-lg">
                      View Output <ChevronDown size={16} />
                    </button>
                  </MagneticButton>
                </div>

                {/* Quick Direct Social Links Bar: Instagram, GitHub, LinkedIn, Resume, WhatsApp */}
                <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                  <a 
                    href="https://www.instagram.com/kv.coder/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-2xl glass-panel border border-primary/30 flex items-center justify-center text-primary hover:scale-110 hover:bg-primary/20 transition-all duration-300 shadow-md group cursor-hover-target"
                    title="Instagram (@kv.coder)"
                  >
                    <Instagram size={20} className="group-hover:rotate-12 transition-transform" />
                  </a>

                  <a 
                    href="https://github.com/itskalpesh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-2xl glass-panel border border-primary/30 flex items-center justify-center text-primary hover:scale-110 hover:bg-primary/20 transition-all duration-300 shadow-md group cursor-hover-target"
                    title="GitHub (@itskalpesh)"
                  >
                    <Github size={20} className="group-hover:rotate-12 transition-transform" />
                  </a>

                  <a 
                    href="https://itskv-portfolio.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-2xl glass-panel border border-primary/30 flex items-center justify-center text-primary hover:scale-110 hover:bg-primary/20 transition-all duration-300 shadow-md group cursor-hover-target"
                    title="LinkedIn Profile"
                  >
                    <Linkedin size={20} className="group-hover:rotate-12 transition-transform" />
                  </a>

                  <a 
                    href="https://wa.me/919743285441?text=Hi%20Kalpesh!%20I%20visited%20your%20portfolio%20website." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-2xl glass-panel border border-emerald-500/40 flex items-center justify-center text-emerald-400 hover:scale-110 hover:bg-emerald-500/20 transition-all duration-300 shadow-md group cursor-hover-target"
                    title="WhatsApp Direct (+91 9743285441)"
                  >
                    <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />
                  </a>

                  <button 
                    onClick={() => scrollTo("about")}
                    className="px-4 h-11 rounded-2xl glass-panel border border-accent/40 text-accent font-mono text-xs font-bold hover:scale-105 hover:bg-accent/20 transition-all duration-300 flex items-center gap-2 shadow-md cursor-hover-target"
                    title="View Kalpesh's Resume & Bio"
                  >
                    <FileCode2 size={16} /> Resume 📄
                  </button>
                </div>
              </motion.div>
            </motion.div>
            
            {/* 3D Robot Mascot Stage */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: loading ? 0 : 0.3 }}
              className="relative flex justify-center items-center h-[46vh] md:h-[54vh] lg:h-[64vh] max-h-[520px] my-auto z-10"
            >
              <Robot3D />
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/70">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-foreground/30 to-transparent" />
          </motion.div>
        </section>
      </motion.div>

      {/* About Section with 3D DP Photo Card */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            
            {/* 3D DP Portrait Photocard */}
            <motion.div variants={fadeUpVariant} className="lg:col-span-5 relative group">
              <Photo3D />
            </motion.div>
            
            {/* Text Content */}
            <motion.div variants={fadeUpVariant} className="lg:col-span-7 space-y-8 lg:pl-8">
              <div>
                <h2 className="text-xs font-mono text-primary mb-4 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} /> // Identity
                </h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                  <span className="text-foreground/60">I am</span> Kalpesh Kurbetti.
                </h3>
              </div>
              
              <SpotlightCard className="p-8 md:p-10 rounded-[2rem]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]" />
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed relative z-10 font-medium">
                  Motivated and enthusiastic BCA student with a strong foundation in programming and web technologies. 
                  Eager to apply technical skills and academic knowledge to contribute effectively in a dynamic software development environment.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-8 border-t border-border relative z-10">
                  <div className="flex items-center gap-4 text-sm text-foreground/70 font-medium">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary"><MapPin size={18} /></div>
                    <span>Nipani, Karnataka, India</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-foreground/70 font-medium">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary"><Mail size={18} /></div>
                    <span>kurbettikalpesh2003@gmail.com</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education & Soft Skills Section */}
      <section id="education" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Education */}
            <motion.div variants={fadeUpVariant}>
              <SpotlightCard className="p-8 md:p-12 rounded-[2rem] h-full">
                <h2 className="text-xs font-mono text-primary mb-10 uppercase tracking-widest flex items-center gap-2">
                  <GraduationCap size={14} /> // Academic Core
                </h2>
                <div className="relative pl-8 border-l-2 border-primary/20 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[43px] top-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Bachelor of Computer Applications</h4>
                    <p className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-xs font-bold rounded-full mb-4">Ongoing (Completing 2027)</p>
                    <p className="text-foreground/60 text-lg">VSM BCA College<br/>Nipani, Karnataka</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[43px] top-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Pre-University Course (Science)</h4>
                    <p className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-xs font-bold rounded-full mb-4">Completed</p>
                    <p className="text-foreground/60 text-lg">VSM PUC College<br/>Nipani, Karnataka</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Soft Skills & Languages */}
            <motion.div variants={fadeUpVariant} className="flex flex-col gap-8">
              <SpotlightCard className="p-8 md:p-10 rounded-[2rem] flex-1">
                <h2 className="text-xs font-mono text-accent mb-6 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={14} /> // Soft Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {["Problem Solving", "Team Collaboration", "Quick Learner", "Attention to Detail", "Communication"].map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors cursor-hover-target">
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
              
              <SpotlightCard className="p-8 md:p-10 rounded-[2rem]">
                <h2 className="text-xs font-mono text-primary mb-6 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} /> // Languages Known
                </h2>
                <div className="flex gap-6">
                  {["English", "Hindi"].map((lang, i) => (
                    <span key={i} className="text-foreground/70 font-mono font-bold tracking-wider">{lang}</span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full px-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-mono text-primary mb-4 uppercase tracking-widest">// Technical Arsenal</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight">Capabilities.</h3>
          </motion.div>
        </div>

        {/* Skills Marquee */}
        <div className="relative w-full overflow-hidden flex flex-col gap-4 py-8 bg-foreground/5 dark:bg-background/50 border-y border-border">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <motion.div 
            className="flex w-max gap-4 px-4"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {/* Duplicate array for seamless loop */}
            {[...skillsList, ...skillsList].map((skill, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3 glass-panel rounded-full cursor-hover-target hover:border-primary/50 transition-colors">
                <Code2 size={16} className="text-primary" />
                <span className="font-mono text-sm font-bold">{skill}</span>
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="max-w-6xl mx-auto w-full px-6 mt-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Languages", icon: <FileCode2 className="text-primary mb-6" size={32} strokeWidth={1.5} />, items: ["Python", "Java", "C", "C++", "PHP", "Shell Script"] },
              { title: "Web Tech", icon: <Layout className="text-accent mb-6" size={32} strokeWidth={1.5} />, items: ["HTML5", "CSS3", "JavaScript"] },
              { title: "Database", icon: <Database className="text-primary mb-6" size={32} strokeWidth={1.5} />, items: ["SQL", "MySQL"] },
              { title: "Tools", icon: <Laptop className="text-foreground/70 mb-6" size={32} strokeWidth={1.5} />, items: ["MS Word", "MS Excel", "MS PowerPoint", "Git & GitHub", "VS Code", "Photoshop"] }
            ].map((category, i) => (
              <motion.div key={i} variants={fadeUpVariant}>
                <SpotlightCard className="p-8 rounded-[2rem] h-full hover:-translate-y-2 transition-transform duration-300 group cursor-hover-target">
                  <div className="group-hover:scale-110 transition-transform duration-500 origin-left">
                    {category.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-6">{category.title}</h4>
                  <ul className="space-y-3">
                    {category.items.map((skill, j) => (
                      <li key={j} className="flex items-center gap-3 font-mono text-sm text-foreground/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" /> {skill}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects with 3D Mockups */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-xs font-mono text-primary mb-4 uppercase tracking-widest">// Featured 3D Showcase</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tight">Projects.</h3>
            </div>
            
            <p className="text-muted-foreground max-w-sm font-medium text-sm">
              Hover over mockups to experience real-time 3D tilt, specular glare, and layered Z-depth separation.
            </p>
          </div>
          
          {/* Projects Stack */}
          <div className="space-y-24">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EASE, delay: idx * 0.1 }}
              >
                <ProjectModal project={project}>
                  <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-border/80 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center group cursor-pointer hover:border-primary/50 transition-all duration-500 shadow-xl">
                    {/* Clean Browser Mockup Image Frame */}
                    <div className="w-full lg:w-3/5">
                      <MockupFrame 
                        image={project.image} 
                        title={project.title} 
                        url={project.url} 
                        category={project.category}
                        status={project.status}
                      />
                    </div>
                    
                    {/* Project Information */}
                    <div className="w-full lg:w-2/5 space-y-6">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-mono font-bold uppercase tracking-widest">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          {project.category}
                        </span>
                        {project.status && (
                          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-mono text-[10px] font-bold uppercase">
                            {project.status}
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-3xl lg:text-4xl font-black tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed font-medium text-base">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border border-border text-foreground bg-background/80 shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="pt-4 flex items-center gap-3 text-xs font-mono font-bold text-primary uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                        <span>View Project Details</span>
                        <ExternalLink size={16} />
                      </div>
                    </div>
                  </div>
                </ProjectModal>
              </motion.div>
            ))}
          </div>

          {/* Development Status Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-16 glass-panel p-8 rounded-[2.5rem] border border-dashed border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <Terminal size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h5 className="font-bold text-lg">More 3D Builds In Development</h5>
                <p className="text-xs text-muted-foreground font-mono">Building full-stack React & Python web applications...</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">Active Coding</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-xs font-mono text-primary mb-4 uppercase tracking-widest flex items-center gap-2">
                <GraduationCap size={14} /> // Verifiable Credentials
              </h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tight">Certifications.</h3>
            </div>
            <p className="text-muted-foreground max-w-sm font-medium text-sm">
              Academic &amp; technical certifications demonstrating proficiency in software, web, and database engineering.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {certificates.map((cert) => (
              <motion.div key={cert.id} variants={fadeUpVariant}>
                <SpotlightCard className="p-6 md:p-8 rounded-[2.5rem] h-full flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 border border-border/80 shadow-lg">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
                        {cert.year}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground font-bold uppercase truncate max-w-[180px]">
                        {cert.issuer}
                      </span>
                    </div>

                    {/* Certificate Image Badge Preview Frame */}
                    {cert.image ? (
                      <div 
                        onClick={() => setSelectedCertImage({ url: cert.image!, title: cert.title })}
                        className="relative mb-5 rounded-2xl overflow-hidden aspect-[16/10] border border-border/80 group-hover:border-primary/60 transition-all duration-300 shadow-inner bg-[#090d16] cursor-pointer group/img"
                        title="Click to view full high-res certificate"
                      >
                        <img 
                          src={cert.image} 
                          alt={cert.title} 
                          className="w-full h-full object-contain p-2 group-hover/img:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 pointer-events-none" />
                        
                        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono text-primary border border-primary/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1 font-bold shadow-lg">
                          <ExternalLink size={10} /> Click to View
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-primary bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-primary/20 pointer-events-none">
                          <span className="flex items-center gap-1.5 font-bold">
                            <CheckCircle2 size={12} className="text-emerald-400" /> VERIFIED BADGE
                          </span>
                          <span className="text-muted-foreground">{cert.year}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative mb-5 rounded-2xl aspect-[16/10] border border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center text-center p-4">
                        <GraduationCap size={32} className="text-primary mb-2 opacity-80" />
                        <span className="font-mono text-xs font-bold text-primary">VERIFIED CREDENTIAL</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{cert.issuer}</span>
                      </div>
                    )}

                    <h4 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                      {cert.title}
                    </h4>

                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-6 font-medium">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-border/60">
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-background/80 border border-border/60 text-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <SpotlightCard className="p-12 md:p-24 rounded-[3rem] relative overflow-hidden text-center flex flex-col items-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                Let's <span className="text-gradient">Connect</span>
              </h2>
              
              <p className="text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed text-lg">
                Looking for a motivated developer? Want to collaborate? My terminal is open.
              </p>
              
              <CopyEmail email="kurbettikalpesh2003@gmail.com" />
              
              <div className="flex justify-center gap-4 mt-16 flex-wrap">
                <SocialLink href="tel:9743285441" icon={<Phone size={20} />} ariaLabel="Phone" />
                <SocialLink href="https://www.instagram.com/kv.coder/" icon={<Instagram size={20} />} ariaLabel="Instagram" />
                <SocialLink href="https://github.com/itskalpesh" icon={<Github size={20} />} ariaLabel="GitHub" />
                <SocialLink href="https://itskv-portfolio.netlify.app/" icon={<Linkedin size={20} />} ariaLabel="LinkedIn" />
                <SocialLink href="https://wa.me/919743285441?text=Hi%20Kalpesh!" icon={<MessageSquare size={20} />} ariaLabel="WhatsApp" />
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border relative z-10 bg-background/50 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 font-mono text-sm font-bold">
            <span className="text-primary">KV.CODER.</span>
            <span className="text-muted-foreground">Copyright {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <LiveTime />
            <div className="w-[1px] h-4 bg-border" />
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <MapPin size={12} /> Nipani, Karnataka
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-foreground hover:text-primary transition-colors hover:scale-110 cursor-hover-target shadow-lg border border-border"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full-Screen Certificate Viewer Modal */}
      <Dialog open={!!selectedCertImage} onOpenChange={(open) => !open && setSelectedCertImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 backdrop-blur-2xl border-primary/50 text-foreground flex flex-col z-[9999]">
          <DialogHeader className="p-4 border-b border-border/60 bg-secondary/30 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/30">
                <GraduationCap size={18} />
              </div>
              <DialogTitle className="text-base font-mono font-bold text-foreground">
                {selectedCertImage?.title}
              </DialogTitle>
            </div>
            <button 
              onClick={() => setSelectedCertImage(null)}
              className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          </DialogHeader>

          <div className="p-4 md:p-8 flex items-center justify-center bg-black/60 max-h-[80vh] overflow-auto">
            {selectedCertImage && (
              <img 
                src={selectedCertImage.url} 
                alt={selectedCertImage.title} 
                className="max-w-full max-h-[72vh] object-contain rounded-xl border border-primary/30 shadow-[0_0_50px_rgba(0,255,200,0.25)]" 
              />
            )}
          </div>

          <div className="p-4 border-t border-border/60 bg-secondary/30 flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5 text-primary font-bold">
              <CheckCircle2 size={14} className="text-emerald-400" /> High-Resolution Verified Certificate
            </span>
            <span>KV.CODER CREDENTIAL ARCHIVE</span>
          </div>
        </DialogContent>
      </Dialog>

      {/* Autonomous Web AI Copilot Assistant */}
      <AICopilot scrollTo={scrollTo} projects={projects} certificates={certificates} />
    </div>
  );
}

// ---------------- Components ---------------- //

const skillsList = ["Python", "Java", "C", "C++", "PHP", "Shell Script", "HTML5", "CSS3", "JavaScript", "SQL", "MySQL", "React", "Tailwind", "Git", "VS Code"];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } }
};

function TextReveal({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden inline-block">
      <motion.div
        variants={{
          hidden: { y: "100%", rotate: 5 },
          visible: { y: "0%", rotate: 0 }
        }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function SpotlightCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={cn("glass-panel spotlight-hover border border-border", className)}
    >
      {children}
    </div>
  );
}

function Tilt3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Max rotation 4deg
    const rotateY = ((mouseX / width) - 0.5) * 8; 
    const rotateX = ((mouseY / height) - 0.5) * -8;
    
    setStyle({ rotateX, rotateY });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setStyle({ rotateX: 0, rotateY: 0 })}
      animate={{ rotateX: style.rotateX, rotateY: style.rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      className="perspective-[1000px] w-full h-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!", {
      description: email,
      icon: <CheckCircle2 className="text-primary" />
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MagneticButton>
      <button 
        onClick={handleCopy}
        className="group relative inline-flex items-center gap-6 bg-background border border-border px-8 py-5 rounded-full hover:border-primary/50 transition-colors cursor-hover-target shadow-sm"
      >
        <span className="font-mono text-sm md:text-base font-bold text-foreground">{email}</span>
        <div className="w-[1px] h-6 bg-border" />
        {copied ? <CheckCircle2 size={18} className="text-primary" /> : <Copy size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />}
      </button>
    </MagneticButton>
  );
}

function SocialLink({ href, icon, ariaLabel }: { href: string, icon: React.ReactNode, ariaLabel: string }) {
  return (
    <MagneticButton>
      <a 
        href={href} 
        className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all cursor-hover-target shadow-sm" 
        aria-label={ariaLabel}
      >
        {icon}
      </a>
    </MagneticButton>
  );
}

function LiveTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      IST {time}
    </div>
  );
}

function MockupFrame({ image, title, url, category, status }: { image: string; title: string; url?: string; category?: string; status?: string }) {
  return (
    <div className="w-full relative rounded-[2rem] overflow-hidden border border-border/80 bg-[#0c1017] shadow-2xl group/mockup">
      {/* Top Browser Bar (Study Notes Style) */}
      <div className="px-5 py-3 bg-[#131924] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="px-4 py-1 rounded-full bg-black/40 border border-white/10 font-mono text-[11px] text-muted-foreground flex items-center gap-2 max-w-[260px] truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="truncate">{url || "preview.kvcoder.dev"}</span>
        </div>
        <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary/80">
          {status || category || "PROJ"}
        </div>
      </div>

      {/* Main Image Frame */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover/mockup:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Ambient Glare Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status?: string; // "New / Active" or "Old / Legacy"
  url: string;
  image: string;
  description: string;
  tags: string[];
  liveLink: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "study-notes",
    title: "Study Notes Website",
    category: "Web Development",
    url: "itskalpesh.github.io/study-notes-site",
    image: studyNotesImg,
    description: "Comprehensive web platform built for students to access, organize, and share study notes. Features clean responsive UI, interactive navigation, and subject/topic categorization.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    liveLink: "https://itskalpesh.github.io/study-notes-site/"
  },
  {
    id: "devcraft-hub",
    title: "DevCraft Code Playground",
    category: "Frontend & UI Engineering",
    url: "devcraft.kvcoder.dev",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='800' height='500' fill='%230b0f19'/><rect x='40' y='40' width='720' height='420' rx='16' fill='%23141a29' stroke='%2300ffc8' stroke-opacity='0.3'/><circle cx='80' cy='75' r='6' fill='%23ff5f56'/><circle cx='100' cy='75' r='6' fill='%23ffbd2e'/><circle cx='120' cy='75' r='6' fill='%2327c93f'/><text x='400' y='220' font-family='monospace' font-size='28' font-weight='bold' fill='%2300ffc8' text-anchor='middle'>DevCraft Snippets Studio</text><text x='400' y='270' font-family='monospace' font-size='16' fill='%2394a3b8' text-anchor='middle'>Interactive UI Component &amp; Palette Generator</text><rect x='280' y='320' width='240' height='48' rx='24' fill='%2300ffc8' fill-opacity='0.15' stroke='%2300ffc8'/><text x='400' y='350' font-family='monospace' font-size='14' font-weight='bold' fill='%2300ffc8' text-anchor='middle'>⚡ Live Preview Active</text></svg>",
    description: "Interactive developer environment for building component previews, managing snippet collections, and experimenting with real-time CSS gradients and animations.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveLink: "https://itskv-portfolio.netlify.app/"
  },
  {
    id: "bca-portal",
    title: "BCA Academic Resource Hub",
    category: "Full Stack & Database",
    url: "bca-portal.kvcoder.dev",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='800' height='500' fill='%23090d16'/><rect x='40' y='40' width='720' height='420' rx='16' fill='%23111827' stroke='%23ec4899' stroke-opacity='0.3'/><circle cx='80' cy='75' r='6' fill='%23ff5f56'/><circle cx='100' cy='75' r='6' fill='%23ffbd2e'/><circle cx='120' cy='75' r='6' fill='%2327c93f'/><text x='400' y='220' font-family='monospace' font-size='28' font-weight='bold' fill='%23ec4899' text-anchor='middle'>BCA Academic Hub</text><text x='400' y='270' font-family='monospace' font-size='16' fill='%2394a3b8' text-anchor='middle'>Syllabus Tracking &amp; Practical Lab Repository</text><rect x='280' y='320' width='240' height='48' rx='24' fill='%23ec4899' fill-opacity='0.15' stroke='%23ec4899'/><text x='400' y='350' font-family='monospace' font-size='14' font-weight='bold' fill='%23ec4899' text-anchor='middle'>📚 Academic System</text></svg>",
    description: "Academic management portal designed to streamline practical lab programs, C/C++/Java assignments, and syllabus tracking for BCA computer science students.",
    tags: ["Python", "PHP", "MySQL", "Web API"],
    liveLink: "https://itskv-portfolio.netlify.app/"
  }
];

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  skills: string[];
}

const certificatesData: CertificateItem[] = [
  {
    id: "web-dev-cert",
    title: "Full-Stack Web Development Fundamentals",
    issuer: "Coursera / Meta Developer Network",
    year: "2025",
    description: "Certified proficiency in modern web development principles, covering HTML5, CSS3, JavaScript ES6+, responsive design patterns, and frontend architecture.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive UI"]
  },
  {
    id: "python-cert",
    title: "Python Programming & Problem Solving",
    issuer: "Infosys Springboard / HackerRank",
    year: "2025",
    description: "Demonstrated core expertise in Python object-oriented programming, data structures, algorithm logic, and script automation.",
    skills: ["Python", "OOP", "Data Structures", "Algorithms"]
  },
  {
    id: "db-sql-cert",
    title: "Database Management & SQL Systems",
    issuer: "NPTEL / Oracle Academy",
    year: "2024",
    description: "Practical certification in relational database management systems, complex SQL queries, database normalization, and MySQL transaction administration.",
    skills: ["SQL", "MySQL", "Relational DB", "Schema Design"]
  }
];

const orbitBadges = [
  { name: "BCA 2027", color: "border-primary/60 text-primary bg-background/95 shadow-primary/20" },
  { name: "kv.coder", color: "border-accent/60 text-accent bg-background/95 shadow-accent/20" },
  { name: "Python", color: "border-blue-500/60 text-blue-400 bg-background/95 shadow-blue-500/20" },
  { name: "HTML", color: "border-orange-500/60 text-orange-400 bg-background/95 shadow-orange-500/20" },
  { name: "CSS", color: "border-sky-500/60 text-sky-400 bg-background/95 shadow-sky-500/20" },
  { name: "JS", color: "border-yellow-500/60 text-yellow-400 bg-background/95 shadow-yellow-500/20" },
  { name: "C / C++", color: "border-emerald-500/60 text-emerald-400 bg-background/95 shadow-emerald-500/20" }
];

function Robot3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Max 3D tilt angles
    const rX = ((mouseY / height) - 0.5) * -24;
    const rY = ((mouseX / width) - 0.5) * 24;
    
    setRotX(rX);
    setRotY(rY);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1200 relative w-full h-full flex items-center justify-center cursor-hover-target select-none"
    >
      <motion.div
        animate={{ rotateX: rotX, rotateY: rotY }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="preserve-3d relative w-full max-w-[390px] md:max-w-[450px] lg:max-w-[480px] aspect-square flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Layer 0: 3D Ground Shadow & Neon Pedestal */}
        <div 
          className="absolute bottom-2 w-[75%] h-14 rounded-[100%] bg-primary/25 blur-2xl pointer-events-none transition-transform duration-300"
          style={{ transform: `translateZ(-40px) rotateX(75deg) scale(${1 + Math.abs(rotY)/30})` }}
        />
        <div 
          className="absolute bottom-6 w-[60%] h-8 rounded-[100%] border-2 border-primary/50 robo-3d-shadow pointer-events-none"
          style={{ transform: "translateZ(-20px) rotateX(75deg)" }}
        />

        {/* Layer 1: 3D Floating Orbital Rings */}
        <div className="absolute inset-0 rounded-full border border-primary/30 orbit-ring-1 pointer-events-none opacity-70" style={{ transform: "translateZ(-10px)" }} />
        <div className="absolute inset-6 rounded-full border border-accent/30 orbit-ring-2 pointer-events-none opacity-60" style={{ transform: "translateZ(10px)" }} />

        {/* Layer 2: Main Robot Mascot (Larger Size) */}
        <motion.img 
          src={robotImg} 
          alt="KV.CODER Robot Mascot" 
          className="translate-z-40 relative z-10 w-[82%] md:w-[86%] lg:w-[90%] max-h-[430px] object-contain drop-shadow-[0_20px_50px_rgba(0,255,200,0.25)] filter brightness-105 contrast-[1.1]"
          animate={{ y: [0, -16, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />

        {/* Layer 3: Continuous Auto-Rotating 3D Tech Orbit Badges */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none preserve-3d z-30"
          animate={{ rotateY: [0, 360] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {orbitBadges.map((badge, idx) => {
            const angle = idx * (360 / orbitBadges.length);
            const radius = 220; // 3D Orbit Radius surrounding mascot
            
            return (
              <div
                key={badge.name}
                className="absolute preserve-3d"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) rotateY(-${angle}deg)`
                }}
              >
                <motion.div 
                  className={cn(
                    "glass-panel px-3.5 py-1.5 rounded-xl border shadow-xl flex items-center gap-2 font-mono text-[11px] md:text-xs font-bold tracking-wider backdrop-blur-md whitespace-nowrap pointer-events-auto",
                    badge.color
                  )}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + (idx % 3), ease: "easeInOut", delay: idx * 0.3 }}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                  <span>{badge.name}</span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

function Photo3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY / height) - 0.5) * -20;
    const rY = ((mouseX / width) - 0.5) * 20;

    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 w-full relative group cursor-hover-target"
    >
      <motion.div
        animate={{ rotateX: rotX, rotateY: rotY }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="preserve-3d relative w-full max-w-[390px] md:max-w-[450px] lg:max-w-[480px] aspect-square mx-auto rounded-3xl p-3 glass-panel border border-border/80 photo-3d-card overflow-visible"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Layer 0: Holographic Ambient Glow */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-2xl opacity-30 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none -z-10" />

        {/* Layer 1: Photo Frame Container */}
        <div className="translate-z-20 relative w-full h-full rounded-2xl overflow-hidden bg-muted border border-white/20">
          <img 
            src={portraitImg} 
            alt="Kalpesh Kurbetti" 
            className="w-full h-full object-cover saturate-110 group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Glare Sheen Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.3), rgba(0, 255, 200, 0.08) 40%, transparent 80%)`
            }}
          />
        </div>

        {/* Layer 2: 3D Pop-out Handle Badge */}
        <div className="translate-z-50 absolute bottom-6 left-6 right-6 z-20">
          <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-white/20 bg-black/60 backdrop-blur-xl shadow-2xl">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-primary mb-0.5 font-bold">HANDLE</p>
              <p className="font-bold tracking-wider text-white text-base">@KV.CODER</p>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/20 text-primary border border-primary/30">
              <Instagram size={20} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectModal({ children, project }: { children: React.ReactNode; project?: ProjectItem }) {
  const currentProject = project || projectsData[0];
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/80 backdrop-blur-xl border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-muted aspect-video md:aspect-auto relative overflow-hidden">
            <img src={currentProject.image} alt={currentProject.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <DialogHeader className="text-left mb-6">
              <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold uppercase tracking-widest w-fit mb-4">
                {currentProject.category}
              </div>
              <DialogTitle className="text-3xl font-black">{currentProject.title}</DialogTitle>
              <DialogDescription className="text-base mt-4 text-foreground/70 leading-relaxed">
                {currentProject.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-xs font-mono uppercase text-muted-foreground font-bold mb-3">Tech Stack</h5>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-mono font-bold border border-border text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <a 
                  href={currentProject.liveLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors cursor-hover-target"
                >
                  View Live Site <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHovering(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.closest('.cursor-hover-target') !== null
      );
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-primary/50 rounded-full pointer-events-none z-[99] hidden md:flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(0, 255, 200, 0.05)" : "transparent",
          borderColor: isHovering ? "rgba(0, 255, 200, 0.8)" : "rgba(0, 255, 200, 0.3)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
      />
    </>
  );
}

// ---------------- Quantum Holographic Cyber Preloader Component ---------------- //
function QuantumPreloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="fixed inset-0 z-[9999] bg-[#070a11] text-foreground flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Ambient Neon Backlight */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/20 via-accent/20 to-primary/20 blur-[130px] animate-pulse" />

      {/* Holographic 3D Spinning Ring System */}
      <div className="relative flex items-center justify-center w-36 h-36 mb-10">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary border-r-primary/80 shadow-[0_0_30px_rgba(0,255,200,0.4)]"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="absolute inset-2 rounded-full border-2 border-accent/30 border-b-accent border-l-accent/80 shadow-[0_0_30px_rgba(236,72,153,0.4)]"
        />
        <motion.div 
          animate={{ scale: [0.85, 1.15, 0.85] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary via-emerald-400 to-accent shadow-[0_0_25px_rgba(0,255,200,0.8)] flex items-center justify-center"
        >
          <Sparkles className="text-background animate-spin" size={22} />
        </motion.div>
      </div>

      {/* Quantum Typography */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-center space-y-3 z-10 max-w-sm w-full"
      >
        <div className="text-base font-black tracking-[0.3em] text-primary uppercase flex items-center justify-center gap-2">
          <span>KV.CODER</span>
          <span className="text-accent">//</span>
          <span>MATRIX 3D</span>
        </div>
        
        <div className="text-xs text-muted-foreground tracking-widest uppercase animate-pulse">
          INITIALIZING QUANTUM EXPERIENCE...
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-1.5 pt-2">
          <div className="flex justify-between text-[11px] font-bold font-mono">
            <span className="text-primary">LOADING NEURAL REPOSITORY</span>
            <span className="text-accent">{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-secondary border border-primary/30 p-0.5 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary via-emerald-400 to-accent rounded-full shadow-[0_0_12px_rgba(0,255,200,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------- Morphing Section Navigation Component ---------------- //
const sectionList = ["hero", "about", "education", "skills", "projects", "certificates", "contact"];

function SectionMorphNav({ activeSection, scrollTo }: { activeSection: string; scrollTo: (id: string) => void }) {
  // Dynamically calculate current index based on activeSection or closest section element
  const getCurrentIndex = () => {
    let idx = sectionList.indexOf(activeSection);
    if (idx !== -1) return idx;

    const vCenter = window.innerHeight / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    sectionList.forEach((secId, i) => {
      const el = document.getElementById(secId);
      if (el) {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - vCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      }
    });
    return closestIdx;
  };

  const currentIndex = getCurrentIndex();

  const handleNext = () => {
    const nextIdx = Math.min(currentIndex + 1, sectionList.length - 1);
    scrollTo(sectionList[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(currentIndex - 1, 0);
    scrollTo(sectionList[prevIdx]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const cur = getCurrentIndex();
        if (cur < sectionList.length - 1) {
          scrollTo(sectionList[cur + 1]);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const cur = getCurrentIndex();
        if (cur > 0) {
          scrollTo(sectionList[cur - 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      {/* Up Arrow Liquid Morph Button */}
      <button
        onClick={handlePrev}
        disabled={currentIndex <= 0}
        className={cn(
          "w-10 h-10 md:w-11 md:h-11 rounded-full glass-panel border border-primary/40 flex items-center justify-center text-primary transition-all duration-300 shadow-lg cursor-hover-target",
          currentIndex <= 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110 hover:bg-primary/20 liquid-morph-btn"
        )}
        title="Previous Section (Arrow Up)"
      >
        <ChevronUp size={20} />
      </button>

      {/* Section Indicator Dots */}
      <div className="flex flex-col gap-2 py-2">
        {sectionList.map((sec) => (
          <button
            key={sec}
            onClick={() => scrollTo(sec)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 cursor-hover-target",
              activeSection === sec ? "h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(0,255,200,0.8)]" : "bg-muted-foreground/30 hover:bg-primary/50"
            )}
            title={sec.toUpperCase()}
          />
        ))}
      </div>

      {/* Down Arrow Liquid Morph Button */}
      <button
        onClick={handleNext}
        disabled={currentIndex >= sectionList.length - 1}
        className={cn(
          "w-10 h-10 md:w-11 md:h-11 rounded-full glass-panel border border-primary/40 flex items-center justify-center text-primary transition-all duration-300 shadow-lg cursor-hover-target",
          currentIndex >= sectionList.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-110 hover:bg-primary/20 liquid-morph-btn"
        )}
        title="Next Section (Arrow Down)"
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
}

// ---------------- Drag & Drop Image Uploader Component ---------------- //
function DragDropImageUploader({ 
  value, 
  onChange 
}: { 
  value?: string; 
  onChange: (val: string) => void; 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WEBP, SVG).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
        toast.success("Local image file loaded successfully!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-muted-foreground font-bold flex items-center gap-2">
        <Image size={14} className="text-primary" /> Drag &amp; Drop or Select Local Image:
      </label>
      
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 bg-background/50",
          isDragging ? "border-primary bg-primary/10 scale-[1.02]" : "border-border hover:border-primary/50 hover:bg-secondary/40"
        )}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          accept="image/*" 
          className="hidden" 
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />
        <div className="p-2.5 rounded-full bg-primary/10 text-primary border border-primary/20">
          <Upload size={18} />
        </div>
        <p className="font-mono text-xs font-bold text-foreground">
          Drag &amp; Drop image file here or <span className="text-primary underline">Browse Device</span>
        </p>
        <p className="text-[10px] font-mono text-muted-foreground">
          Supports PNG, JPG, WEBP, SVG
        </p>
      </div>

      {value && (
        <div className="relative rounded-xl overflow-hidden aspect-[16/6] border border-border bg-muted group mt-2">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button 
            type="button" 
            onClick={(e) => { e.stopPropagation(); onChange(""); }}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-white hover:bg-red-500 transition-colors"
            title="Remove Image"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------- Autonomous Web AI Copilot Assistant ---------------- //
interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  action?: () => void;
  actionLabel?: string;
}

// Web Audio Cyber Sound Synthesizer for Authentic AI Robo Effects
const playCyberBeep = (freq = 880, type: OscillatorType = "sine", duration = 0.1) => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
};

function AICopilot({ scrollTo, projects, certificates }: { scrollTo: (id: string) => void; projects: ProjectItem[]; certificates: CertificateItem[] }) {
  const panelDragControls = useDragControls();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showMicPermissionModal, setShowMicPermissionModal] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(() => localStorage.getItem("kv_mic_granted") === "true");
  const [userName, setUserName] = useState<string>(() => localStorage.getItem("kv_user_name") || "");
  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: localStorage.getItem("kv_user_name") 
        ? `⚡ Welcome back, ${localStorage.getItem("kv_user_name")}! I'm KV-AI. Speak or type your commands to navigate projects, credentials, or socials!`
        : "⚡ Hi! I'm KV-AI, Kalpesh Kurbetti's AI Voice Copilot. Speak or type your name or commands to explore Kalpesh's portfolio!"
    }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Voice Output Speech Synthesis (Smooth Sci-Fi Robo Voice)
  const speakText = (text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      playCyberBeep(920, "sawtooth", 0.08);

      const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Resolve saved voice preference
      const voices = window.speechSynthesis.getVoices();
      const savedVoiceURI = localStorage.getItem("kv_ai_voice_uri");
      const savedPitch = parseFloat(localStorage.getItem("kv_ai_pitch") || "0.88");
      const savedRate = parseFloat(localStorage.getItem("kv_ai_rate") || "1.04");

      let selectedVoice = voices.find(v => v.voiceURI === savedVoiceURI);
      if (!selectedVoice) {
        selectedVoice = voices.find(v => 
          (v.name.includes("Google") || v.name.includes("David") || v.name.includes("Natural") || v.name.includes("English")) && v.lang.startsWith("en")
        ) || voices[0];
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.pitch = savedPitch;
      utterance.rate = savedRate;
      utterance.volume = 1.0;
      
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech Synthesis Error:", e);
    }
  };

  // Start Voice Recognition Engine
  const startListeningEngine = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported on this browser.", {
        description: "You can type commands directly in the chat box!"
      });
      return;
    }

    try {
      playCyberBeep(1200, "square", 0.06);
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("🎙️ Listening... Speak your command now!", {
          description: "e.g. 'My name is Rahul' or 'Open Study Notes'"
        });
      };

      recognition.onresult = (event: any) => {
        const lastIndex = event.results.length - 1;
        const transcript = event.results[lastIndex][0].transcript;
        setIsListening(false);

        if (transcript && transcript.trim()) {
          playCyberBeep(1400, "triangle", 0.1);
          setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: "user", text: transcript }]);
          setTimeout(() => processQuery(transcript), 300);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        console.warn("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          toast.error("Microphone permission blocked.", {
            description: "Please allow microphone access in site settings."
          });
        } else if (event.error === "no-speech") {
          toast.error("No speech detected.", { description: "Please tap mic and speak clearly." });
        } else {
          toast.error(`Voice error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
      toast.error("Failed to start microphone listener.");
    }
  };

  // Toggle Mic Click (Opens Popup if permission not granted)
  const toggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    if (!hasMicPermission) {
      setShowMicPermissionModal(true);
    } else {
      startListeningEngine();
    }
  };

  // User Grants Mic Permission via Popup Modal
  const handleGrantMicPermission = async () => {
    setShowMicPermissionModal(false);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
      }
      setHasMicPermission(true);
      localStorage.setItem("kv_mic_granted", "true");
      toast.success("Microphone access granted! 🎙️");
      startListeningEngine();
    } catch (err) {
      toast.error("Microphone Access Blocked 🎤", {
        description: "Please allow microphone access in your browser address bar!"
      });
    }
  };

  const processQuery = (userText: string) => {
    const q = userText.toLowerCase().trim();
    let replyText = "";
    let actionFn: (() => void) | undefined = undefined;
    let actionLabelText: string | undefined = undefined;

    // Detect user's name (e.g. "My name is Rahul", "Hi I am Ananya", "Call me Alex")
    const nameMatch = userText.match(/(?:my name is|i am|i'm|call me|this is|name's)\s+([a-zA-Z]+)/i);
    const reservedWords = ["a", "the", "coder", "user", "admin", "asking", "developer", "student", "looking"];

    if (nameMatch && nameMatch[1] && !reservedWords.includes(nameMatch[1].toLowerCase())) {
      const detectedName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1).toLowerCase();
      setUserName(detectedName);
      localStorage.setItem("kv_user_name", detectedName);
      replyText = `Wonderful to meet you, ${detectedName}! 😊 I'm KV-AI, Kalpesh's intelligent copilot. Ask me about Kalpesh's BCA degree, Python/React projects, or command me to navigate anywhere!`;
    }
    // Greetings with Personalized Name Recognition
    else if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("namaste") || q.includes("greetings")) {
      const nameGreeting = userName ? `, ${userName}` : "";
      replyText = `Hello${nameGreeting}! 👋 Great to connect with you! I'm KV-AI. What can I show you today? Ask about Kalpesh's BCA degree, top projects like Study Notes, or speak commands aloud!`;
    }
    // Friendly & Intelligent Conversational Queries
    else if (q.includes("joke") || q.includes("funny")) {
      replyText = "Here's a developer joke for you: Why do programmers prefer dark mode? Because light attracts bugs! 🐛😄";
    } else if (q.includes("how are you") || q.includes("how r u")) {
      const nameGreeting = userName ? `, ${userName}` : "";
      replyText = `I'm feeling 100% operational and ready to assist you${nameGreeting}! 🚀 How are you doing today?`;
    } else if (q.includes("resume") || q.includes("cv") || q.includes("summary")) {
      replyText = "Kalpesh Kurbetti (@KV.CODER) is a BCA Student (2027) skilled in Python, React, C/C++, HTML/CSS, and MySQL. He builds full-stack web applications and 3D web experiences.";
      actionFn = () => scrollTo("about");
      actionLabelText = "Read Kalpesh's Resume 📄";
    }
    // Site Command Matching
    else if (q.includes("study note") || q.includes("study-notes")) {
      const nameGreeting = userName ? ` for you, ${userName}` : "";
      replyText = `Opening Kalpesh's Study Notes Website project on GitHub Pages${nameGreeting}...`;
      actionFn = () => window.open("https://itskalpesh.github.io/study-notes-site/", "_blank");
      actionLabelText = "Launch Study Notes Site 🚀";
      scrollTo("projects");
    } else if (q.includes("devcraft") || q.includes("snippets")) {
      replyText = "Navigating to DevCraft Code Playground project details...";
      actionFn = () => scrollTo("projects");
      actionLabelText = "View DevCraft Details 💻";
      scrollTo("projects");
    } else if (q.includes("bca portal") || q.includes("academic hub")) {
      replyText = "Locating the BCA Academic Resource Hub project...";
      actionFn = () => scrollTo("projects");
      actionLabelText = "View BCA Hub Details 📚";
      scrollTo("projects");
    } else if (q.includes("project") || q.includes("work") || q.includes("build")) {
      const nameGreeting = userName ? ` ${userName}` : "";
      replyText = `Kalpesh has built ${projects.length} featured applications including Study Notes Website, DevCraft Playground, and BCA Academic Hub. Navigating to Projects${nameGreeting}!`;
      actionFn = () => scrollTo("projects");
      actionLabelText = "Explore All Projects 🛠️";
      scrollTo("projects");
    } else if (q.includes("certif") || q.includes("course") || q.includes("degree")) {
      replyText = `Kalpesh holds ${certificates.length} verifiable certifications in Full-Stack Web Development, Python Programming, and Database Management. Navigating to Certifications!`;
      actionFn = () => scrollTo("certificates");
      actionLabelText = "View Certifications 📜";
      scrollTo("certificates");
    } else if (q.includes("bca") || q.includes("education") || q.includes("college") || q.includes("study")) {
      replyText = "Kalpesh is a BCA Student at VSM BCA College, Nipani (Karnataka), graduating in 2027 with core expertise in Web Development, Python, and C/C++.";
      actionFn = () => scrollTo("education");
      actionLabelText = "View Academic Core 🎓";
      scrollTo("education");
    } else if (q.includes("skill") || q.includes("language") || q.includes("stack") || q.includes("technolog")) {
      replyText = "Kalpesh specializes in Python, C/C++, HTML5, CSS3, JavaScript, SQL, MySQL, React.js, Tailwind CSS, and Git version control.";
      actionFn = () => scrollTo("skills");
      actionLabelText = "View Skills Radar ⚡";
      scrollTo("skills");
    } else if (q.includes("instagram") || q.includes("kv.coder")) {
      replyText = "Opening Kalpesh's official Instagram profile (@kv.coder)...";
      actionFn = () => window.open("https://www.instagram.com/kv.coder/", "_blank");
      actionLabelText = "Open Instagram @kv.coder 📸";
    } else if (q.includes("github") || q.includes("repo")) {
      replyText = "Opening Kalpesh's GitHub Developer Profile (@itskalpesh)...";
      actionFn = () => window.open("https://github.com/itskalpesh", "_blank");
      actionLabelText = "Open GitHub Profile 🐙";
    } else if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("phone")) {
      replyText = "You can reach Kalpesh directly via Email at kurbettikalpesh2003@gmail.com or Phone at +91 9743285441. Navigating to Contact!";
      actionFn = () => scrollTo("contact");
      actionLabelText = "Go to Contact Terminal 📧";
      scrollTo("contact");
    } else if (q.includes("who is kalpesh") || q.includes("about") || q.includes("who are you")) {
      replyText = "Kalpesh Virupaksh Kurbetti (@KV.CODER) is a full-stack web developer and BCA student based in Nipani, Karnataka, India. He builds high-performance web applications using React, Python, and modern 3D UI technologies.";
      actionFn = () => scrollTo("about");
      actionLabelText = "Read Kalpesh's Bio 👤";
      scrollTo("about");
    } else {
      const nameGreeting = userName ? ` ${userName}` : "";
      replyText = `I hear you${nameGreeting}! Kalpesh is a full-stack web developer & BCA 2027 student. Ask me to open projects, view certifications, or speak commands aloud!`;
    }

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: replyText,
      action: actionFn,
      actionLabel: actionLabelText
    };

    setMessages((prev) => [...prev, aiMsg]);
    speakText(replyText);

    if (actionFn) {
      setTimeout(() => actionFn!(), 600);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    setTimeout(() => {
      processQuery(currentInput);
    }, 400);
  };

  return (
    <>
      {/* Round Draggable Floating AI Orb Button (Drag Anywhere on Whole Website) */}
      <motion.div
        drag
        dragMomentum={false}
        className="fixed bottom-8 left-8 z-50 cursor-grab active:cursor-grabbing touch-none"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-emerald-400 to-accent text-background font-bold shadow-[0_0_35px_rgba(0,255,200,0.6)] hover:scale-110 transition-transform duration-300 flex items-center justify-center border-2 border-white/30 relative group"
          title="Drag anywhere • Open KV-AI Voice Assistant"
        >
          <Bot size={26} className="animate-pulse text-background" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-background animate-ping" />
        </button>
      </motion.div>

      {/* AI Chat & Voice Command Modal Window (Draggable Anywhere on Site) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragControls={panelDragControls}
            dragListener={false}
            dragMomentum={false}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 left-6 sm:left-8 z-50 w-[90vw] sm:w-[400px] max-h-[540px] rounded-3xl border border-primary/40 bg-[#090d16] text-foreground flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden touch-none"
          >
            {/* Header (Drag Handle to move chat box anywhere) */}
            <div 
              onPointerDown={(e) => panelDragControls.start(e)}
              className="p-4 border-b border-primary/30 flex items-center justify-between bg-[#111827] cursor-grab active:cursor-grabbing select-none"
              title="Hold & Drag to move AI Chat Panel anywhere on screen"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/20 text-primary border border-primary/30">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-mono font-bold text-sm text-primary flex items-center gap-2">
                    <span>KV-AI VOICE COPILOT</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase">VOICE OMNI</span>
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> ✋ Hold & Drag Panel Anywhere
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <GripHorizontal size={18} className="text-primary/60 animate-pulse mr-1" />
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className={cn("p-1.5 rounded-xl border transition-colors", isMuted ? "bg-muted text-muted-foreground border-border" : "bg-primary/20 text-primary border-primary/40")}
                  title={isMuted ? "Unmute AI Voice" : "Mute AI Voice"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="px-3.5 py-2.5 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar bg-[#0f172a] shrink-0">
              {[
                { label: "🚀 Study Notes Site", text: "Open Study Notes project" },
                { label: "📜 Certificates", text: "Show certificates" },
                { label: "🎓 BCA Details", text: "What are Kalpesh's BCA details?" },
                { label: "📸 Instagram", text: "Open Instagram @kv.coder" }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: "user", text: chip.text }]);
                    setTimeout(() => processQuery(chip.text), 300);
                  }}
                  className="px-3 py-1.5 rounded-full text-[11px] font-mono bg-[#1e293b] border border-primary/40 text-primary whitespace-nowrap hover:bg-primary/20 hover:border-primary transition-all shrink-0 inline-flex items-center justify-center leading-none"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs bg-[#090d16]">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex flex-col", msg.sender === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] px-4 py-3 rounded-2xl leading-relaxed shadow-sm font-medium",
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground font-mono rounded-br-none"
                        : "bg-[#111827] text-slate-100 border border-slate-800 rounded-bl-none font-mono"
                    )}
                  >
                    {msg.text}
                  </div>
                  {msg.action && msg.actionLabel && (
                    <button
                      onClick={msg.action}
                      className="mt-2 text-[11px] font-mono font-bold text-primary hover:underline flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/30"
                    >
                      <span>{msg.actionLabel}</span>
                      <ExternalLink size={12} />
                    </button>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form with Voice Mic */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-800 flex items-center gap-2 bg-[#111827]">
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={cn(
                  "p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center",
                  isListening ? "bg-red-500 text-white border-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                )}
                title={isListening ? "Listening... Speak now!" : "Click to speak voice command"}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening to your voice..." : "Type or speak commands..."}
                className="flex-1 bg-[#090d16] border border-slate-700 text-slate-100 placeholder:text-slate-500 px-3.5 py-2.5 rounded-xl text-xs outline-none focus:border-primary font-mono"
              />
              
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explicit Microphone Permission Popup Modal */}
      <Dialog open={showMicPermissionModal} onOpenChange={setShowMicPermissionModal}>
        <DialogContent className="max-w-md bg-background/95 backdrop-blur-2xl border-primary/40 rounded-3xl p-6 font-mono text-center z-[999]">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto mb-4 animate-pulse">
            <Mic size={32} />
          </div>

          <DialogTitle className="text-xl font-bold text-foreground">
            Microphone Access Request 🎙️
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground leading-relaxed my-4">
            KV-AI Voice Copilot requires microphone access to listen to your voice commands (e.g. <span className="text-primary font-bold">"Open Study Notes"</span> or <span className="text-primary font-bold">"Show Certificates"</span>).
            <span className="block my-2" />
            🔒 <span className="text-foreground font-bold">Privacy Guaranteed:</span> Voice audio is processed live on your device and is never saved or recorded.
          </DialogDescription>

          <div className="flex flex-col gap-3 mt-6">
            <button 
              onClick={handleGrantMicPermission}
              className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
            >
              <Mic size={18} /> Grant Microphone Access
            </button>

            <button 
              onClick={() => setShowMicPermissionModal(false)}
              className="w-full bg-muted text-muted-foreground font-bold py-2.5 rounded-xl uppercase tracking-wider hover:text-foreground transition-colors text-xs"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
