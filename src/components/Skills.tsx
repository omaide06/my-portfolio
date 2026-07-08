import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Code, Server, Wrench, Trophy, BookOpen, Palette, Video } from 'lucide-react';

interface Skill {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'tools' | 'creative';
  level: string;
  yearStarted: string;
  progress: number;
  description: string;
  projectCount: string;
}

const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Knowledge' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools & Workflows' },
  { id: 'creative', label: 'Design & Video' }
];

const SKILLS_DATA: Skill[] = [
  // Languages
  {
    name: 'TypeScript',
    category: 'languages',
    level: 'Intermediate / Advanced',
    yearStarted: '2025',
    progress: 85,
    description: 'My primary tool for robust, type-safe development. I love building highly structured applications with typed state definitions and safe interface bindings.',
    projectCount: '12+ student projects'
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'languages',
    level: 'Advanced',
    yearStarted: '2024',
    progress: 92,
    description: 'The absolute core of my programmatic skill set. Deep familiarity with asynchronous flow, closures, scope dynamics, and modern functional methods.',
    projectCount: '25+ projects'
  },
  {
    name: 'Python',
    category: 'languages',
    level: 'Intermediate',
    yearStarted: '2024',
    progress: 75,
    description: 'Utilized for machine learning introductions, automated scripting tasks, API parsing, and generic computational logic classes.',
    projectCount: '8 projects'
  },
  {
    name: 'HTML5 & CSS3',
    category: 'languages',
    level: 'Advanced',
    yearStarted: '2023',
    progress: 95,
    description: 'Familiarity with visual standard structures, strict element relationships, structural grid patterns, and modern flex arrangements.',
    projectCount: 'Active always'
  },
  // Frontend
  {
    name: 'React.js',
    category: 'frontend',
    level: 'Advanced',
    yearStarted: '2024',
    progress: 88,
    description: 'Passionate about custom state hooks, responsive state propagations, optimal performance lifecycle bindings, and modular architectures.',
    projectCount: '15+ projects'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 'Advanced',
    yearStarted: '2024',
    progress: 95,
    description: 'My styling paradigm of choice. Employs descriptive utility compositions for sleek, responsive, lightweight layout declarations and custom micro-effects.',
    projectCount: 'All web visuals'
  },
  {
    name: 'Motion / Framer Motion',
    category: 'frontend',
    level: 'Intermediate',
    yearStarted: '2025',
    progress: 80,
    description: 'Animating components smoothly using layout transitions, spring physics structures, visual entering cues, and complex gesture interaction bindings.',
    projectCount: '6+ experiences'
  },
  {
    name: 'Vite',
    category: 'frontend',
    level: 'Advanced',
    yearStarted: '2024',
    progress: 90,
    description: 'Rapid bundling configuration for immediate hot re-renders. Configured with TypeScript compilation optimizations and precise plugin configurations.',
    projectCount: '14+ setups'
  },
  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    level: 'Intermediate',
    yearStarted: '2024',
    progress: 82,
    description: 'Empowers server execution runtimes, asynchronous process setups, customized automation modules, and local dev processes.',
    projectCount: '10+ projects'
  },
  {
    name: 'Express.js',
    category: 'backend',
    level: 'Intermediate',
    yearStarted: '2024',
    progress: 80,
    description: 'Constructing performant API routers, standard payload validation middleware patterns, and clean proxy request boundaries.',
    projectCount: '8 endpoints'
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    level: 'Intermediate',
    yearStarted: '2025',
    progress: 72,
    description: 'Designing normalized schema definitions, handling transactions safely, establishing foreign relationships, and running efficient SQL scripts.',
    projectCount: '4 relational projects'
  },
  {
    name: 'Firebase / Firestore',
    category: 'backend',
    level: 'Intermediate / Advanced',
    yearStarted: '2024',
    progress: 85,
    description: 'Leveraging direct document real-time database sync flows, defining precise security access structures, and executing advanced serverless operations.',
    projectCount: '10+ projects'
  },
  // Tools
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 'Advanced',
    yearStarted: '2023',
    progress: 90,
    description: 'Consistently managing file updates via decentralized repositories, branching systems, peer reviews, issues tracking, and basic action deployments.',
    projectCount: 'Daily workflows'
  },
  {
    name: 'VS Code',
    category: 'tools',
    level: 'Advanced',
    yearStarted: '2023',
    progress: 95,
    description: 'Fully configured personalized work environment. Enabled with custom style systems, keybinding efficiencies, and linter-compiler pipelines.',
    projectCount: 'Core workstation'
  },
  {
    name: 'Figma',
    category: 'tools',
    level: 'Intermediate',
    yearStarted: '2024',
    progress: 78,
    description: 'Drafting component outlines, page hierarchy flowsheets, responsive mockup ratios, and color/typography contrasts prior to development.',
    projectCount: 'Weekly planning'
  },
  // Creative
  {
    name: 'Video Editing (Premiere & AE)',
    category: 'creative',
    level: 'Advanced Student Master',
    yearStarted: '2023',
    progress: 92,
    description: 'Expertly crafting student showcases, dynamic audio cues, multi-cam alignments, and custom color grades using Adobe Premiere Pro and After Effects.',
    projectCount: '35+ videos & visual reels'
  },
  {
    name: 'Graphic Design (PS & AI)',
    category: 'creative',
    level: 'Advanced Student Specialist',
    yearStarted: '2023',
    progress: 88,
    description: 'Constructing brand identifiers, custom vector templates, high-contrast digital graphics, poster layouts, and typography patterns with Photoshop and Illustrator.',
    projectCount: '20+ branding works font designs'
  },
  {
    name: 'DaVinci Resolve (Color Grading)',
    category: 'creative',
    level: 'Intermediate Specialist',
    yearStarted: '2024',
    progress: 84,
    description: 'Applying secondary color corrections, curve adjustments, HDR wheel matching, node-based workflows, and cinematic style layouts to raw camera recordings.',
    projectCount: '15+ style lookup clips'
  },
  {
    name: 'Motion Graphics & Intros',
    category: 'creative',
    level: 'Advanced Student Master',
    yearStarted: '2024',
    progress: 90,
    description: 'Designing keyframed logo animations, title lower thirds, custom 2D particle dynamics, SVG vector morphs, and fast temporal ease-in sequences.',
    projectCount: '18+ openers & intro loops'
  },
  {
    name: 'Brand Identity & Layout Concept',
    category: 'creative',
    level: 'Advanced Specialist',
    yearStarted: '2023',
    progress: 89,
    description: 'Establishing typography pairings, moodboards, custom brand guidelines, poster hierarchies, and visual packaging structures for university client groups.',
    projectCount: '12+ complete brand decs'
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS_DATA[0]);

  const filteredSkills = SKILLS_DATA.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

  const getCategoryIcon = (category: string, name?: string) => {
    if (category === 'creative') {
      const lowerName = (name || '').toLowerCase();
      if (lowerName.includes('video') || lowerName.includes('davinci') || lowerName.includes('motion')) {
        return <Video className="w-4 h-4" />;
      }
      return <Palette className="w-4 h-4" />;
    }
    switch (category) {
      case 'languages':
        return <Code className="w-4 h-4" />;
      case 'frontend':
        return <BookOpen className="w-4 h-4" />;
      case 'backend':
        return <Server className="w-4 h-4" />;
      case 'tools':
        return <Wrench className="w-4 h-4" />;
      default:
        return <GraduationCap className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-matte-black text-white relative overflow-hidden border-t border-white/5">
      {/* Editorial Grid Backing Deco */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.02]">
        <div className="col-span-3 border-r border-white h-full" />
        <div className="col-span-3 border-r border-white h-full" />
        <div className="col-span-3 border-r border-white h-full" />
        <div className="col-span-3 h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Animated Syne top heading for section view labeling */}
        <div className="mb-14 border-b border-white/5 pb-6">
          <motion.h2
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase text-white flex items-center gap-4"
          >
            My skills
          </motion.h2>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs uppercase tracking-widest font-mono text-mustard">
              // Technical Capabilities
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight tracking-tight">
              My learning curriculum & growing skill set.
            </h2>
            <p className="text-sm font-sans font-light text-medium-gray leading-relaxed">
              As a dedicated student, I enjoy exploring fresh architectures, learning languages, and polishing developmental workflows. Click to view my personal growth summary for any competency.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 py-1.5 px-3.5 rounded-full border border-white/10 text-xs font-mono text-medium-gray">
            <span className="w-2 h-2 rounded-full bg-mustard animate-pulse" />
            <span>Currently expanding backend & cloud methodologies</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-white/10 pb-6">
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                // Set default selected skill of this category if exist
                if (category.id !== 'all') {
                  const firstOfCategory = SKILLS_DATA.find(s => s.category === category.id);
                  if (firstOfCategory) setSelectedSkill(firstOfCategory);
                } else {
                  setSelectedSkill(SKILLS_DATA[0]);
                }
              }}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wide cursor-pointer uppercase transition-all duration-300 border ${
                activeCategory === category.id
                  ? 'bg-mustard border-mustard text-black font-semibold shadow-md shadow-mustard/15'
                  : 'bg-transparent border-white/10 text-medium-gray hover:text-white hover:border-white/30'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Interactive Layout Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Active Skills Pill Container (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap gap-3.5">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkill.name === skill.name;
                  return (
                    <motion.button
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={skill.name}
                      onClick={() => setSelectedSkill(skill)}
                      className={`px-5 py-3 rounded-full text-sm font-sans tracking-wide cursor-pointer flex items-center gap-2.5 transition-all duration-300 border ${
                        isSelected
                          ? 'bg-[#1E1E1C] border-mustard text-white font-medium shadow-lg shadow-mustard/5'
                          : 'bg-[#121211] border-white/5 text-[#CCCCCC] hover:border-white/25 hover:bg-[#161614] hover:text-white'
                      }`}
                      whileHover={{ y: -3, scale: 1.025, boxShadow: '0 12px 24px -10px rgba(244,166,35,0.2)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={isSelected ? 'text-mustard' : 'text-medium-gray'}>
                        {getCategoryIcon(skill.category, skill.name)}
                      </span>
                      <span>{skill.name}</span>
                      {isSelected && (
                        <motion.span
                          layoutId="selected-bullet"
                          className="w-1.5 h-1.5 rounded-full bg-mustard"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Growth Detail Logger Card (5 Cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#121211] border border-white/10 rounded-2xl p-8 space-y-8 relative overflow-hidden"
              >
                {/* Visual Accent Layer */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-mustard/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                {/* Card Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-mustard flex items-center gap-1.5">
                      {getCategoryIcon(selectedSkill.category, selectedSkill.name)}
                      {selectedSkill.category}
                    </span>
                    <h3 className="text-3xl font-display font-extrabold text-white">
                      {selectedSkill.name}
                    </h3>
                  </div>
                  <div className="bg-white/5 py-1.5 px-3 rounded-lg border border-white/10 text-[10px] font-mono text-medium-gray uppercase tracking-widest text-right">
                    Since {selectedSkill.yearStarted}
                  </div>
                </div>

                {/* Narrative Growth Box */}
                <p className="text-sm font-sans font-light text-medium-gray leading-relaxed">
                  {selectedSkill.description}
                </p>

                {/* Metric Indicators */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  
                  {/* Progress Gauge */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-medium-gray uppercase tracking-wider">Growth Quotient</span>
                      <span className="text-mustard font-semibold">{selectedSkill.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-mustard rounded-full"
                      />
                    </div>
                  </div>

                  {/* Level & Project counts */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#181817] p-3.5 rounded-xl border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-medium-gray block">
                        Assessed Stage
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {selectedSkill.level}
                      </span>
                    </div>
                    <div className="bg-[#181817] p-3.5 rounded-xl border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-medium-gray block">
                        Student Practice
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {selectedSkill.projectCount}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Small motivational advice tagline based on student mindset */}
                <div className="flex items-center gap-2.5 text-xs text-medium-gray/80 italic font-mono">
                  <Trophy className="w-4 h-4 text-mustard" />
                  <span>Driven by curious project building & open-source iteration.</span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
