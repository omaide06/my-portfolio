import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Award, Zap } from 'lucide-react';

interface TimelineEvent {
  role: string;
  subtitle: string;
  date: string;
  bullets: string[];
  isHighlighted?: boolean;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    role: "Esports Athlete & Competitive Play",
    subtitle: "Tournament Competitions & Team Coordination",
    date: "2022",
    bullets: [
      "Participating in high-level e-sports events, honing quick situational reflexes and strategy coordination under pressure.",
      "Collaborating actively with team squads to deliver real-time strategies and tactical adjustments.",
      "Deeply interested in evaluating performance mechanics and strategic forecasting."
    ]
  },
  {
    role: "Full-Stack, AI & Software Developer",
    subtitle: "Personal & Open-Source Projects",
    date: "2023",
    isHighlighted: true,
    bullets: [
      "Built a real-time messaging app using the MERN stack with scalable configurations.",
      "Developed an interactive book reading web app using React & Node.js.",
      "Created an AI Study Buddy mobile app (with future plans for direct web ecosystem extension).",
      "Developed highly robust deepfake detection models leveraging EfficientNet, MobileNetV3, and LSTM for voice deepfake detection."
    ]
  },
  {
    role: "Team Member | Hackathon",
    subtitle: "Dark Mode Devs",
    date: "2024",
    bullets: [
      "Contributed as an active core member in a cross-college hackathon team.",
      "Collaborated seamlessly on modular development workflows and rapid task execution.",
      "Assisted in swift boilerplate setup and final competitive project presentations."
    ]
  },
  {
    role: "B.Tech in Computer Science & Engineering (Ongoing)",
    subtitle: "Sagar Institute of Research & Technology Excellence (SIRT-E), Bhopal",
    date: "NOW",
    bullets: [
      "Currently pursuing my B.Tech in CSE from SIRT-E, Bhopal (2024 - 2028).",
      "Densely focused on AI, machine learning and structured software development cycles.",
      "Passionate about training neural systems and formulating innovative digital solutions."
    ]
  }
];

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <section
      id="experience" 
      className="py-32 bg-[#080808] text-white relative overflow-hidden border-t border-white/5"
    >
      {/* Background Graphic Accents - aligned with mustard theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-mustard/5 filter blur-[150px] select-none pointer-events-none z-0" />
      <div className="absolute right-10 bottom-10 w-80 h-80 rounded-full bg-white/5 filter blur-[120px] select-none pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Animated Syne top heading for section view labeling */}
        <div className="mb-14 border-b border-white/5 pb-6">
          <motion.h2
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase text-white flex items-center gap-4 text-left font-bold"
          >
            My journey
          </motion.h2>
        </div>

        {/* Section Header styled exactly like the Skills section (My learning curriculum & growing skill set) */}
        <motion.div 
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
        >
          <div className="space-y-4 max-w-xl text-left">
            <span className="text-xs uppercase tracking-widest font-mono text-mustard">
              // Professional Path &amp; Milestones
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight tracking-tight text-white">
              My career &amp; experience.
            </h2>
            <p className="text-sm font-sans font-light text-neutral-400 leading-relaxed">
              Discover the milestones of my academic and practical journey. I build full-stack architectures, compete in tournaments, and collaborate in hackathons.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 py-1.5 px-3.5 rounded-full border border-white/10 text-xs font-mono text-neutral-400 self-start md:self-end">
            <span className="w-2 h-2 rounded-full bg-mustard animate-pulse" />
            <span>Currently expanding AI algorithms &amp; esports strategic analysis</span>
          </div>
        </motion.div>

        {/* Customized Full-Width Timeline Grid */}
        <div className="relative">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="space-y-16 md:space-y-24 relative"
          >
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div
                key={event.role}
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 group relative items-start border-b border-white/5 pb-10 md:pb-16 last:border-0 last:pb-0"
              >
                
                {/* 1. Left Column: Role & Subtitle metadata (cols 1 to 5) */}
                <div className="md:col-span-5 space-y-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-mustard/70 block">
                    // 0{index + 1} milestone
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white group-hover:text-mustard transition-colors duration-300 leading-tight tracking-tight">
                    {event.role}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 tracking-wider uppercase leading-relaxed">
                    {event.subtitle}
                  </p>
                </div>

                {/* 2. Right Column: Details & Date (cols 6 to 12) styled with a vertical left accent border */}
                <div className="md:col-span-7 pl-0 md:pl-10 md:border-l border-white/10 relative space-y-6">
                  
                  {/* Subtle mustard dot indicator on the column divider line on desktop */}
                  <div className="absolute left-[-5.5px] top-3.5 w-2.5 h-2.5 rounded-full bg-mustard border-2 border-[#080808] ring-4 ring-mustard/20 transition-transform duration-300 group-hover:scale-125 hidden md:block" />

                  {/* Date & Highlighting Badge */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-display font-black text-mustard tracking-tight">
                      {event.date}
                    </span>
                    {event.isHighlighted && (
                      <span className="bg-mustard/10 text-mustard text-[9px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded border border-mustard/20 animate-pulse">
                        Featured Highlight
                      </span>
                    )}
                  </div>

                  {/* Bullet descriptive details */}
                  <ul className="space-y-3.5 font-sans text-sm font-light text-neutral-400 leading-relaxed list-none">
                    {event.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-3.5 items-start group/li transition-all duration-200 hover:text-neutral-200">
                        <span className="text-mustard mt-1 cursor-default shrink-0 select-none text-[10px]">✦</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            ))}

          </motion.div>
        </div>

      </div>
    </section>
  );
}
