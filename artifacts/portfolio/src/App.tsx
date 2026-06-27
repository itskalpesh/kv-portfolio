import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Terminal, ChevronDown, Copy, CheckCircle2, FileCode2, Database, Layout, Laptop, GraduationCap, MapPin, Phone, Instagram, Sun, Moon, ArrowUp, Menu, Code2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";

import portraitImg from "@/assets/Picsart_26-04-19_06-43-29-070_1776771771515.jpg";
import robotImg from "@/assets/Picsart_26-04-20_21-47-46-924_1776771781463.png";
import studyNotesImg from "./assets/study-notes-mockup.png";

// Premium easing
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const isLight = localStorage.getItem("theme") === "light";
    if (isLight) {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    
    // Simulate preloader
    const timer = setTimeout(() => setLoading(false), 1200);
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
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden relative">
      <Toaster position="bottom-right" />
      
      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="relative flex items-center justify-center w-16 h-16 mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
              />
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
            <div className="font-mono text-xs tracking-[0.3em] text-primary">INITIALIZING...</div>
          </motion.div>
        )}
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
        <div className="hidden md:flex gap-6 text-xs font-mono uppercase text-muted-foreground items-center">
          {["about", "education", "skills", "projects", "contact"].map((item) => (
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
                {["about", "education", "skills", "projects", "contact"].map((item) => (
                  <button 
                    key={item}
                    onClick={() => {
                      scrollTo(item);
                      // close sheet hack could go here, but shadcn handles it natively typically or we can force close
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
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex gap-4 pt-6">
              <MagneticButton>
                <button onClick={() => scrollTo("projects")} className="bg-foreground text-background px-8 py-4 font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-all rounded-lg flex items-center gap-2 cursor-hover-target shadow-lg">
                  View Output <ChevronDown size={16} />
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: loading ? 0 : 0.4 }}
            className="relative flex justify-center items-center h-[50vh] lg:h-[80vh] z-10"
          >
            <Tilt3D>
              <motion.img 
                src={robotImg} 
                alt="KV.CODER Robot Mascot" 
                className="relative z-10 w-full max-w-[400px] lg:max-w-[550px] drop-shadow-[0_0_40px_rgba(0,255,200,0.15)] filter brightness-105 contrast-[1.1]"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
            </Tilt3D>
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

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            
            {/* Portrait Card */}
            <motion.div variants={fadeUpVariant} className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Tilt3D>
                <div className="glass-panel p-2 rounded-2xl relative overflow-hidden aspect-[3/4] group cursor-hover-target">
                  <img 
                    src={portraitImg} 
                    alt="Kalpesh Kurbetti" 
                    className="w-full h-full object-cover rounded-xl saturate-110 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-white/10 bg-black/40 backdrop-blur-md">
                      <div>
                        <p className="font-mono text-[10px] tracking-widest text-primary mb-1">HANDLE</p>
                        <p className="font-bold tracking-wider text-white">@KV.CODER</p>
                      </div>
                      <Instagram className="text-white/80" />
                    </div>
                  </div>
                </div>
              </Tilt3D>
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
                    <p className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-xs font-bold rounded-full mb-4">2nd Year (Ongoing)</p>
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

      {/* Featured Project */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-xs font-mono text-primary mb-4 uppercase tracking-widest">// Featured Output</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tight">Projects.</h3>
            </div>
            
            {/* Filter Chips - visual only for now since there's 1 project */}
            <div className="flex gap-2">
              {["All", "Web", "In Progress"].map((chip, i) => (
                <button key={i} className={cn(
                  "px-4 py-2 rounded-full text-xs font-mono font-bold transition-colors cursor-hover-target",
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-background border border-border text-muted-foreground hover:text-foreground"
                )}>
                  {chip}
                </button>
              ))}
            </div>
          </div>
          
          <ProjectModal>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <Tilt3D>
                <div className="glass-panel p-4 md:p-6 rounded-[2.5rem] flex flex-col lg:flex-row gap-8 lg:gap-12 items-center group cursor-hover-target cursor-pointer">
                  <div className="w-full lg:w-3/5 relative rounded-[2rem] overflow-hidden aspect-[16/10] border border-border bg-muted">
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img 
                      src={studyNotesImg} 
                      alt="Study Notes Website Mockup" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23eee"/><text x="400" y="250" font-family="monospace" font-size="24" fill="%23aaa" text-anchor="middle">Study Notes UI Mockup</text></svg>';
                      }}
                    />
                  </div>
                  
                  <div className="w-full lg:w-2/5 space-y-6 px-4 pb-4 lg:px-4 lg:pb-0">
                    <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold uppercase tracking-widest">
                      Web Development
                    </div>
                    <h4 className="text-3xl lg:text-4xl font-black tracking-tight group-hover:text-primary transition-colors">Study Notes Website</h4>
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      Web-based platform for students to access, organize, and share study notes. Clean responsive UI with interactive features and categorization by subject and topic.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["HTML5", "CSS3", "JavaScript"].map(tag => (
                        <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-mono font-bold border border-border text-foreground bg-background">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          </ProjectModal>

          {/* Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-8 glass-panel p-10 rounded-[2.5rem] border border-dashed border-border flex items-center justify-center min-h-[200px]"
          >
            <div className="text-center space-y-4">
              <Terminal className="mx-auto text-muted-foreground/50" size={40} strokeWidth={1} />
              <p className="font-mono text-sm font-bold text-muted-foreground uppercase tracking-widest">More in development</p>
              <div className="flex gap-1 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-border animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-border animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-border animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
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
              
              <div className="flex justify-center gap-4 mt-16">
                <SocialLink href="tel:9743285441" icon={<Phone size={20} />} ariaLabel="Phone" />
                <SocialLink href="https://www.instagram.com/kv.coder/" icon={<Instagram size={20} />} ariaLabel="Instagram" />
                <SocialLink href="https://github.com/itskalpesh" icon={<Github size={20} />} ariaLabel="GitHub" />
                <SocialLink href="#" icon={<Linkedin size={20} />} ariaLabel="LinkedIn" />
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

function ProjectModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/80 backdrop-blur-xl border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-muted aspect-video md:aspect-auto relative">
            <img src={studyNotesImg} alt="Study Notes" className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <DialogHeader className="text-left mb-6">
              <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold uppercase tracking-widest w-fit mb-4">
                Web Development
              </div>
              <DialogTitle className="text-3xl font-black">Study Notes Website</DialogTitle>
              <DialogDescription className="text-base mt-4 text-foreground/70">
                A comprehensive platform designed for students to seamlessly access, organize, and share their academic materials. Built with performance and usability in mind.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-xs font-mono uppercase text-muted-foreground font-bold mb-3">Tech Stack</h5>
                <div className="flex flex-wrap gap-2">
                  {["HTML5", "CSS3", "JavaScript", "Responsive Design"].map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-mono font-bold border border-border text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors cursor-hover-target">
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
