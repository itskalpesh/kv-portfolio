import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Github, Twitter, Mail, ExternalLink, Terminal, ChevronDown, Copy, CheckCircle2, FileCode2, Database, Layout, Laptop, GraduationCap, MapPin, Phone, Instagram } from "lucide-react";

import portraitImg from "@assets/Picsart_26-04-19_06-43-29-070_1776771771515.jpg";
import robotImg from "@assets/Picsart_26-04-20_21-47-46-924_1776771781463.png";
import studyNotesImg from "./assets/study-notes-mockup.png";

// Premium easing
const EASE = [0.22, 1, 0.36, 1];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans overflow-x-hidden relative">
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] bg-blob-1 mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/10 blur-[120px] bg-blob-2 mix-blend-screen" />
        <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-blue-500/5 blur-[100px] animate-pulse mix-blend-screen" />
      </div>

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left z-[100]"
        style={{ scaleX: springScroll }}
      />

      <Cursor />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center mix-blend-difference">
        <div className="font-mono text-sm font-bold tracking-widest text-primary uppercase flex items-center gap-2">
          <span>KV.CODER</span>
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
        <div className="flex gap-6 text-xs font-mono uppercase text-muted-foreground hidden md:flex">
          {["about", "education", "skills", "projects", "contact"].map((item) => (
            <a key={item} href={`#${item}`} className="hover:text-primary transition-colors hover:scale-105 active:scale-95 duration-200">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 px-6 z-10">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="flex flex-col gap-6 relative z-20"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
              className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full w-fit border-primary/20"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary uppercase tracking-wider">System Online // BCA Student</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              KALPESH<br />
              <span className="text-gradient">KURBETTI</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-mono text-muted-foreground">
              Aspiring Software Developer
            </h2>
            
            <p className="text-lg text-white/70 max-w-md mt-2 border-l-2 border-primary/30 pl-4 py-1 leading-relaxed">
              Motivated BCA student with a strong foundation in programming. Eager to build digital experiences that feel alive.
            </p>
            
            <div className="flex gap-4 pt-6">
              <a href="#projects" className="glass-button text-primary px-8 py-4 font-mono font-bold uppercase tracking-wider hover:bg-primary/10 transition-all hover:scale-105 active:scale-95 rounded-lg flex items-center gap-2">
                View Output <ChevronDown size={16} />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="relative flex justify-center items-center h-[50vh] lg:h-[80vh] z-10"
          >
            <HeroParallax>
              <motion.img 
                src={robotImg} 
                alt="KV.CODER Robot Mascot" 
                className="relative z-10 w-full max-w-[400px] lg:max-w-[550px] drop-shadow-[0_0_40px_rgba(0,255,200,0.2)] filter brightness-110 contrast-[1.15]"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              />
            </HeroParallax>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Portrait Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-5 relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="glass-panel p-2 rounded-2xl relative overflow-hidden aspect-[3/4] group">
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10" />
                <img 
                  src={portraitImg} 
                  alt="Kalpesh Kurbetti" 
                  className="w-full h-full object-cover rounded-xl filter grayscale-[0.8] contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-white/10">
                    <div>
                      <p className="font-mono text-xs text-primary mb-1">HANDLE</p>
                      <p className="font-bold tracking-wider">@KV.CODER</p>
                    </div>
                    <Instagram className="text-white/50" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="lg:col-span-7 space-y-8 lg:pl-12"
            >
              <div>
                <h2 className="text-sm font-mono text-primary mb-3 uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} /> // Identity
                </h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-white/50">I am</span> Kalpesh.
                </h3>
              </div>
              
              <div className="glass-panel p-8 rounded-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]" />
                <p className="text-lg text-white/80 leading-relaxed relative z-10">
                  Motivated and enthusiastic BCA student with a strong foundation in programming and web technologies. 
                  Eager to apply technical skills and academic knowledge to contribute effectively in a dynamic software development environment.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5 relative z-10">
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <div className="p-2 rounded-lg bg-white/5"><MapPin size={16} className="text-primary" /></div>
                    <span>Nipani, Karnataka, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <div className="p-2 rounded-lg bg-white/5"><Mail size={16} className="text-primary" /></div>
                    <span>kurbettikalpesh2003@gmail.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education & Soft Skills Section */}
      <section id="education" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="glass-panel p-8 md:p-10 rounded-3xl"
          >
            <h2 className="text-sm font-mono text-primary mb-8 uppercase tracking-widest flex items-center gap-2">
              <GraduationCap size={14} /> // Academic Core
            </h2>
            <div className="relative pl-8 border-l border-white/10 space-y-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <h4 className="text-2xl font-bold mb-2">Bachelor of Computer Applications</h4>
                <p className="text-primary font-mono text-sm mb-4">2nd Year (Ongoing)</p>
                <p className="text-white/60">VSM BCA College<br/>Nipani, Karnataka</p>
              </div>
            </div>
          </motion.div>

          {/* Soft Skills & Languages */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-sm font-mono text-accent mb-8 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 size={14} /> // Soft Skills
              </h2>
              <div className="flex flex-wrap gap-2 mb-10">
                {["Problem Solving", "Team Collaboration", "Quick Learner", "Attention to Detail", "Communication"].map((skill, i) => (
                  <span key={i} className="px-4 py-2 rounded-full glass-panel text-sm text-white/80 border-white/5">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest flex items-center gap-2">
                <Terminal size={14} /> // Languages Known
              </h2>
              <div className="flex gap-4">
                {["Kannada", "English", "Hindi"].map((lang, i) => (
                  <span key={i} className="text-white/60 font-mono text-sm">{lang}</span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-16">
            <h2 className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">// Technical Arsenal</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Capabilities.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Languages", icon: <FileCode2 className="text-primary mb-6" size={32} strokeWidth={1.5} />, skills: ["Python", "Java", "C", "C++"] },
              { title: "Web Tech", icon: <Layout className="text-accent mb-6" size={32} strokeWidth={1.5} />, skills: ["HTML5", "CSS3", "JavaScript"] },
              { title: "Database", icon: <Database className="text-primary mb-6" size={32} strokeWidth={1.5} />, skills: ["SQL", "MySQL"] },
              { title: "Tools", icon: <Laptop className="text-white/50 mb-6" size={32} strokeWidth={1.5} />, skills: ["MS Word", "MS Excel", "MS PowerPoint"] }
            ].map((category, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="group-hover:scale-110 transition-transform duration-500 origin-left">
                  {category.icon}
                </div>
                <h4 className="text-xl font-bold mb-6 text-white">{category.title}</h4>
                <ul className="space-y-3">
                  {category.skills.map((skill, j) => (
                    <li key={j} className="flex items-center gap-3 font-mono text-sm text-white/60">
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-primary transition-colors" /> {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-16">
            <h2 className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">// Featured Output</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Project.</h3>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="glass-panel p-4 md:p-8 rounded-[2rem] flex flex-col lg:flex-row gap-8 lg:gap-16 items-center group"
          >
            <div className="w-full lg:w-3/5 relative rounded-2xl overflow-hidden aspect-video border border-white/5">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Fallback to a styled div if image fails to load during dev */}
              <img 
                src={studyNotesImg} 
                alt="Study Notes Website Mockup" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out bg-black"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%23111"/><text x="400" y="225" font-family="monospace" font-size="24" fill="%2300FFC8" text-anchor="middle">Study Notes UI Mockup</text></svg>';
                }}
              />
            </div>
            
            <div className="w-full lg:w-2/5 space-y-6 px-4 pb-4 lg:px-0 lg:pb-0">
              <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-widest">
                Featured
              </div>
              <h4 className="text-3xl lg:text-4xl font-bold tracking-tight">Study Notes Website</h4>
              <p className="text-white/60 leading-relaxed">
                Web-based platform for students to access, organize, and share study notes. Clean responsive UI with interactive features and categorization by subject and topic.
              </p>
              <div className="flex flex-wrap gap-2">
                {["HTML5", "CSS3", "JavaScript"].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[11px] font-mono border border-white/10 text-white/70 bg-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Placeholder for future projects */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-8 glass-panel p-8 rounded-3xl border border-dashed border-white/10 flex items-center justify-center min-h-[200px]"
          >
            <div className="text-center space-y-3">
              <Terminal className="mx-auto text-white/30" size={32} />
              <p className="font-mono text-sm text-white/40 uppercase tracking-widest">More coming soon</p>
              <p className="text-white/30 text-xs">The grind never stops.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="glass-panel p-12 md:p-20 rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Initiate<br/><span className="text-gradient">Connection</span>
            </h2>
            
            <p className="text-white/60 mb-12 max-w-md mx-auto leading-relaxed">
              Looking for a motivated developer? Want to collaborate? My terminal is open.
            </p>
            
            <CopyEmail email="kurbettikalpesh2003@gmail.com" />
            
            <div className="flex justify-center gap-4 mt-12">
              <a href="tel:9743285441" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all text-white/70 hover:text-white" aria-label="Phone">
                <Phone size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all text-white/70 hover:text-primary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all text-white/70 hover:text-white" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 relative z-10 mix-blend-difference">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-primary font-bold">KALPESH KURBETTI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>SYSTEM_ONLINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Copy Email Component
function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="group relative inline-flex items-center gap-4 glass-panel px-6 py-4 md:px-8 md:py-5 rounded-2xl hover:bg-white/5 transition-colors border border-white/10 hover:border-primary/30"
    >
      <span className="font-mono text-sm md:text-base text-white/90 group-hover:text-white transition-colors">{email}</span>
      <div className="w-[1px] h-6 bg-white/10" />
      {copied ? <CheckCircle2 size={18} className="text-primary" /> : <Copy size={18} className="text-white/50 group-hover:text-primary transition-colors" />}
    </button>
  );
}

// Hero Parallax Wrapper
function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="w-full h-full flex items-center justify-center perspective-[1000px]"
    >
      {children}
    </motion.div>
  );
}

// Custom Cursor
function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      setIsHovering(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button'
      );
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[100] mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-primary/50 rounded-full pointer-events-none z-[99] hidden md:block flex items-center justify-center backdrop-blur-[2px]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(0, 255, 200, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
      />
    </>
  );
}