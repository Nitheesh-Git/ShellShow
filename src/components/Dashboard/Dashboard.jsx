import { motion } from 'framer-motion';
import { Terminal, Sparkles, BookOpen, Wand2, Users, ArrowRight, Play, Folder, FileText, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FeatureCard = ({ icon: Icon, title, description, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="relative group"
  >
    <div className={`
      p-6 rounded-2xl bg-[#1e1e2e] border border-[#313244]
      hover:border-[${color}]/50 transition-all duration-300
      hover:shadow-lg hover:shadow-[${color}]/10
    `}>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-[${color}]/20 to-[${color}]/5
        flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6`} style={{ color }} />
      </div>
      <h3 className="text-lg font-semibold text-[#cdd6f4] mb-2">{title}</h3>
      <p className="text-sm text-[#a6adc8] leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const AnimatedTerminal = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="relative"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-[#cba6f7] via-[#f5c2e7] to-[#fab387] rounded-2xl blur-lg opacity-30" />
    <div className="relative bg-[#11111b] rounded-xl overflow-hidden border border-[#313244]">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#181825] border-b border-[#313244]">
        <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
        <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
        <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
        <span className="ml-2 text-xs text-[#6c7086] font-mono">mini-shell</span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm space-y-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2"
        >
          <span className="text-[#a6e3a1]">~</span>
          <span className="text-[#6c7086]">$</span>
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 'auto' }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-[#cdd6f4] overflow-hidden whitespace-nowrap"
          >
            mkdir projects
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex items-center gap-2"
        >
          <span className="text-[#a6e3a1]">~</span>
          <span className="text-[#6c7086]">$</span>
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 'auto' }}
            transition={{ delay: 2, duration: 0.3 }}
            className="text-[#cdd6f4] overflow-hidden whitespace-nowrap"
          >
            ls
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex items-center gap-3 pl-4"
        >
          <Folder className="w-4 h-4 text-[#f9e2af]" />
          <span className="text-[#89b4fa]">projects</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="flex items-center gap-2"
        >
          <span className="text-[#a6e3a1]">~</span>
          <span className="text-[#6c7086]">$</span>
          <motion.span
            className="w-2 h-4 bg-[#cdd6f4] cursor-blink"
          />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const FloatingShell = () => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute -top-16 -right-16 w-32 h-32 opacity-10"
  >
    <Terminal className="w-full h-full text-[#cba6f7]" />
  </motion.div>
);

export default function Dashboard() {
  const { actions } = useApp();

  const features = [
    {
      icon: BookOpen,
      title: 'Step-by-Step Lessons',
      description: 'Learn commands one at a time with guided tutorials designed for complete beginners.',
      color: '#a6e3a1',
    },
    {
      icon: Sparkles,
      title: 'Visual Animations',
      description: 'See exactly what each command does with beautiful, real-time visual feedback.',
      color: '#89b4fa',
    },
    {
      icon: Users,
      title: 'Friendly Assistant',
      description: 'A cute cartoon guide helps you every step of the way, just like a mentor!',
      color: '#f5c2e7',
    },
    {
      icon: Wand2,
      title: 'Safe Practice',
      description: 'Practice in a simulated environment - no risk of breaking anything real!',
      color: '#fab387',
    },
  ];

  return (
    <div className="min-h-screen bg-[#181825] pattern-bg overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <FloatingShell />

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#cba6f7]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#89b4fa]/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-20">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-16"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#cba6f7] to-[#f5c2e7] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-[#181825]" />
              </div>
              <span className="text-xl font-bold text-[#cdd6f4]">ShellShow</span>
            </div>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="text-sm text-[#a6adc8] hover:text-[#cdd6f4] transition-colors"
            >
              View on GitHub
            </motion.a>
          </motion.header>

          {/* Main Hero */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#cba6f7]/10 border border-[#cba6f7]/20 text-sm text-[#cba6f7] mb-6">
                  <Sparkles className="w-4 h-4" />
                  Interactive Learning Experience
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="text-[#cdd6f4]">Learn Linux Commands</span>
                <br />
                <span className="text-gradient">The Visual Way</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-[#a6adc8] max-w-lg leading-relaxed"
              >
                Master the command line with our interactive mini-shell.
                Watch commands come to life with animations, guided by your
                friendly assistant. No experience needed!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={actions.startLearning}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4
                    bg-gradient-to-r from-[#cba6f7] to-[#f5c2e7] rounded-xl
                    text-[#181825] font-semibold text-lg
                    shadow-lg shadow-[#cba6f7]/25 hover:shadow-xl hover:shadow-[#cba6f7]/30
                    transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4
                    border border-[#313244] rounded-xl text-[#cdd6f4]
                    hover:bg-[#313244]/50 transition-all duration-300"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - Animated Terminal */}
            <div className="relative lg:pl-8">
              <AnimatedTerminal />

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 -right-4 p-3 bg-[#1e1e2e] rounded-xl border border-[#313244] shadow-lg"
              >
                <Folder className="w-6 h-6 text-[#f9e2af]" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 p-3 bg-[#1e1e2e] rounded-xl border border-[#313244] shadow-lg"
              >
                <FileText className="w-6 h-6 text-[#89b4fa]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Different Section */}
      <section className="relative py-24 bg-[#1e1e2e]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#cdd6f4] mb-4">
              Why This Is Different
            </h2>
            <p className="text-lg text-[#a6adc8] max-w-2xl mx-auto">
              Traditional terminals are intimidating. We created something better.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={0.1 * index} />
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-24 bg-[#181825]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#cdd6f4] mb-4">
              What You'll Learn
            </h2>
            <p className="text-lg text-[#a6adc8]">
              Master essential Linux commands in minutes, not hours.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { cmd: 'pwd', desc: 'Find your location', color: '#a6e3a1' },
              { cmd: 'ls', desc: 'List contents', color: '#89b4fa' },
              { cmd: 'cd', desc: 'Navigate folders', color: '#f9e2af' },
              { cmd: 'mkdir', desc: 'Create folders', color: '#cba6f7' },
              { cmd: 'touch', desc: 'Create files', color: '#f5c2e7' },
              { cmd: 'cp', desc: 'Copy items', color: '#94e2d5' },
              { cmd: 'mv', desc: 'Move & rename', color: '#fab387' },
              { cmd: 'rm', desc: 'Remove items', color: '#f38ba8' },
            ].map((item, i) => (
              <motion.div
                key={item.cmd}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-[#1e1e2e] rounded-xl border border-[#313244]
                  hover:border-[#45475a] transition-all duration-200 cursor-default"
              >
                <code
                  className="text-xl font-mono font-bold"
                  style={{ color: item.color }}
                >
                  {item.cmd}
                </code>
                <p className="text-sm text-[#a6adc8] mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1e1e2e]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#cba6f7]/20 via-[#f5c2e7]/10 to-[#fab387]/20" />
            <div className="absolute inset-0 grid-pattern" />

            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#cdd6f4] mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-[#a6adc8] mb-8 max-w-lg mx-auto">
                Jump in and discover how fun the command line can be.
                No signup required - start instantly!
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={actions.startLearning}
                className="group inline-flex items-center justify-center gap-3 px-10 py-5
                  bg-gradient-to-r from-[#cba6f7] to-[#f5c2e7] rounded-xl
                  text-[#181825] font-bold text-xl
                  shadow-lg shadow-[#cba6f7]/25 hover:shadow-xl hover:shadow-[#cba6f7]/30
                  transition-all duration-300"
              >
                <Terminal className="w-6 h-6" />
                Launch ShellShow
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#313244]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#6c7086]">
              <Terminal className="w-4 h-4" />
              <span className="text-sm">ShellShow - Interactive Linux Learning</span>
            </div>
            <p className="text-sm text-[#6c7086]">
              Built with React, Framer Motion & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
