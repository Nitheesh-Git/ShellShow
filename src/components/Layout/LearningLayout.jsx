import { motion } from 'framer-motion';
import { ChevronLeft, Terminal as TerminalIcon, HelpCircle, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Assistant from '../Assistant';
import Terminal from '../Terminal';
import VisualPanel from '../VisualPanel';

export default function LearningLayout() {
  const { actions } = useApp();

  return (
    <div className="min-h-screen bg-[#181825] flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-4 py-3 bg-[#1e1e2e] border-b border-[#313244]"
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={actions.navigateToLanding}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg
              text-[#a6adc8] hover:text-[#cdd6f4] hover:bg-[#313244]
              transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </motion.button>

          <div className="h-6 w-px bg-[#313244]" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#cba6f7] to-[#f5c2e7]
              flex items-center justify-center">
              <TerminalIcon className="w-4 h-4 text-[#181825]" />
            </div>
            <span className="font-semibold text-[#cdd6f4]">ShellShow</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-[#6c7086] hover:text-[#cdd6f4]
              hover:bg-[#313244] transition-colors"
            title="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-[#6c7086] hover:text-[#cdd6f4]
              hover:bg-[#313244] transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content - Three Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Assistant */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-80 flex-shrink-0 border-r border-[#313244] overflow-hidden"
        >
          <Assistant />
        </motion.div>

        {/* Center Panel - Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 p-4 overflow-hidden"
        >
          <Terminal />
        </motion.div>

        {/* Right Panel - Visual Feedback */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-96 flex-shrink-0 p-4 border-l border-[#313244] overflow-hidden"
        >
          <VisualPanel />
        </motion.div>
      </div>
    </div>
  );
}
