import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Twitter, Mail, ExternalLink, Terminal, ChevronDown, Code2, Database, Cpu, Layout, Layers, TerminalSquare } from "lucide-react";

import portraitImg from "@assets/Picsart_26-04-19_06-43-29-070_1776771771515.jpg";
import robotImg from "@assets/Picsart_26-04-20_21-47-46-924_1776771781463.png";

import project1 from "@/assets/project1.png";
import project2 from "@/assets/project2.png";
import project3 from "@/assets/project3.png";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans overflow-x-hidden">
      {/* Background grain & scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      <div className="fixed inset-0 pointer-events-none z-40 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20"></div>

      {/* Custom Cursor */}
      <Cursor />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center mix-blend-difference">
        <div className="font-mono text-sm font-bold tracking-widest text-primary uppercase">
          KV.CODER<span className="animate-pulse">_</span>
        </div>
        <div className="flex gap-6 text-xs font-mono uppercase text-muted-foreground hidden md:flex">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 px-6">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary uppercase tracking-wider">Day 404 of The Grind</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
              BUILD<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">BREAK</span><br />
              REPEAT.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-mono max-w-md border-l-2 border-primary/50 pl-4 py-1">
              Late nights. Endless terminal windows. Documenting the journey from zero to mastery.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#projects" className="bg-primary text-primary-foreground px-8 py-3 font-mono font-bold uppercase tracking-wider hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                Init_Sequence <ChevronDown size={16} />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center items-center h-[50vh] lg:h-[80vh]"
          >
            {/* Glowing orb behind robot */}
            <div className="absolute w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute w-[200px] h-[200px] bg-accent/10 blur-[80px] rounded-full mix-blend-screen" />
            
            <motion.img 
              src={robotImg} 
              alt="KV.CODER Robot Mascot" 
              className="relative z-10 w-full max-w-[400px] lg:max-w-[500px] drop-shadow-[0_0_30px_rgba(0,255,200,0.3)] filter brightness-110 contrast-125"
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative border-t border-white/5">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="col-span-1 md:col-span-2 relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-black/50">
                <div className="absolute inset-0 bg-primary/10 mix-blend-color z-10" />
                <img 
                  src={portraitImg} 
                  alt="KV.CODER Portrait" 
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 border border-primary/20 z-20 m-2" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-30">
                  <p className="font-mono text-xs text-primary">STATUS: ONLINE</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="col-span-1 md:col-span-3 space-y-8"
            >
              <div>
                <h2 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">// Identity</h2>
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">System.out.<br/>println("Who am I?");</h3>
              </div>
              
              <div className="space-y-4 text-muted-foreground font-mono leading-relaxed">
                <p>
                  I'm <span className="text-white">KV.CODER</span>. Not a prodigy, not a 10x rockstar. Just a developer who fell in love with the grind. 
                </p>
                <p>
                  My journey started in a dark room with a blinking cursor and a lot of error messages. Now, I build digital experiences that feel alive. I document my path on Instagram to show the real side of development — the bugs, the breakthroughs, and the late-night coffee runs.
                </p>
                <p>
                  I specialize in crafting high-performance frontends and robust backends. I don't just write code; I engineer aesthetics.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 font-mono text-sm pt-4 border-t border-white/5">
                <div>
                  <span className="text-primary block mb-1">LOCATION</span>
                  <span className="text-white">THE MATRIX</span>
                </div>
                <div>
                  <span className="text-primary block mb-1">CURRENT FOCUS</span>
                  <span className="text-white">FULL-STACK MASTERY</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative bg-white/[0.02]">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">// Arsenal</h2>
            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Tech Stack</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Frontend", icon: <Layout className="text-primary mb-4" size={32} />, skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"] },
              { title: "Backend", icon: <Database className="text-primary mb-4" size={32} />, skills: ["Node.js", "Express", "PostgreSQL", "Python", "REST APIs"] },
              { title: "Tools", icon: <TerminalSquare className="text-primary mb-4" size={32} />, skills: ["Git", "Docker", "Linux", "Vite", "Figma"] }
            ].map((category, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/40 border border-white/5 p-8 hover:border-primary/50 transition-colors group"
              >
                {category.icon}
                <h4 className="text-xl font-bold mb-6 font-mono text-white group-hover:text-primary transition-colors">{category.title}</h4>
                <ul className="space-y-3">
                  {category.skills.map((skill, j) => (
                    <li key={j} className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                      <span className="text-primary">›</span> {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-16">
            <h2 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">// Output</h2>
            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Deployed Executables</h3>
          </div>
          
          <div className="space-y-24">
            {[
              {
                title: "NEXUS_UI",
                desc: "A premium, dark-mode component library for rapid prototyping. Built with React, Tailwind, and Framer Motion.",
                img: project1,
                tags: ["React", "Tailwind", "NPM"],
                link: "#"
              },
              {
                title: "DATA_CORE",
                desc: "Real-time analytics dashboard with WebSockets and D3.js. High-performance data visualization for crypto markets.",
                img: project2,
                tags: ["TypeScript", "Sockets", "D3.js"],
                link: "#"
              },
              {
                title: "VOID_PROTOCOL",
                desc: "An experimental 3D web experience exploring the intersection of generative art and interactive storytelling.",
                img: project3,
                tags: ["Three.js", "WebGL", "GSAP"],
                link: "#"
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
              >
                <div className="w-full md:w-3/5 group relative">
                  <div className="absolute -inset-1 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative aspect-video overflow-hidden border border-white/10 bg-black/50">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
                
                <div className="w-full md:w-2/5 space-y-6">
                  <div className="font-mono text-xs text-primary">PROJECT_0{i+1}</div>
                  <h4 className="text-3xl font-bold uppercase tracking-tight">{project.title}</h4>
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-[10px] font-mono uppercase border border-white/10 text-white/70 bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div>
                    <a href={project.link} className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-white transition-colors group">
                      VIEW_SOURCE <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" className="py-32 px-6 relative border-t border-white/5 overflow-hidden">
        {/* Massive background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02] select-none">
          <span className="text-[15vw] font-black leading-none whitespace-nowrap">KV.CODER</span>
        </div>
        
        <div className="max-w-3xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
          <motion.img 
            src={robotImg} 
            alt="Robot" 
            className="w-24 h-24 mb-8 filter grayscale hover:grayscale-0 transition-all"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
          
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6">
            Initiate<br/><span className="text-primary">Connection</span>
          </h2>
          
          <p className="text-muted-foreground font-mono mb-12 max-w-md mx-auto">
            Looking for a developer? Want to collab? Or just want to talk about the code grind? My terminal is always open.
          </p>
          
          <a href="mailto:hello@kvcoder.dev" className="inline-block border border-primary text-primary hover:bg-primary hover:text-black px-8 py-4 font-mono font-bold uppercase tracking-widest transition-all mb-16">
            HELLO@KVCODER.DEV
          </a>
          
          <div className="flex gap-6">
            <a href="#" className="p-3 bg-white/5 hover:bg-primary/20 text-white hover:text-primary transition-colors rounded-full">
              <Github size={20} />
            </a>
            <a href="#" className="p-3 bg-white/5 hover:bg-primary/20 text-white hover:text-primary transition-colors rounded-full">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-3 bg-white/5 hover:bg-primary/20 text-white hover:text-primary transition-colors rounded-full">
              <Terminal size={20} />
            </a>
          </div>
          
          <div className="mt-24 pt-8 border-t border-white/10 w-full flex justify-between items-center text-xs font-mono text-muted-foreground">
            <span>© {new Date().getFullYear()} KV.CODER</span>
            <span>SYSTEM_ONLINE</span>
          </div>
        </div>
      </section>
    </div>
  );
}

// Simple custom cursor component
function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[100] mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-primary/50 rounded-full pointer-events-none z-[99] hidden md:block"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 1 }}
      />
    </>
  );
}
