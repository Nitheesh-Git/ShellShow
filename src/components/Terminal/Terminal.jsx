import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { getPathString } from '../../utils/fileSystem';
import { getLesson } from '../../data/lessons';

const TerminalLine = ({ type, content, path, isError }) => {
  if (type === 'input') {
    return (
      <div className="flex items-start gap-2 group">
        <span className="text-[#a6e3a1] select-none">{path}</span>
        <span className="text-[#6c7086] select-none">$</span>
        <span className="text-[#cdd6f4]">{content}</span>
      </div>
    );
  }

  if (type === 'output') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`pl-2 whitespace-pre-wrap ${isError ? 'text-[#f38ba8]' : 'text-[#a6adc8]'}`}
      >
        {content}
      </motion.div>
    );
  }

  return null;
};

export default function Terminal() {
  const { state, actions } = useApp();
  const { terminalHistory, currentPath, currentLessonId, lessonPhase, freeMode } = state;

  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const currentLesson = getLesson(currentLessonId);
  const currentPathString = getPathString(currentPath);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Focus input on click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Handle command submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedInput]);
    setHistoryIndex(-1);

    // Execute command
    actions.executeCmd(trimmedInput);

    // Check if command matches expected command in lesson
    if (!freeMode && currentLesson && (lessonPhase === 'waiting' || lessonPhase === 'hint')) {
      const expected = currentLesson.expectedCommand;
      const normalizedInput = trimmedInput.toLowerCase().replace(/\s+/g, ' ');
      const normalizedExpected = expected?.toLowerCase().replace(/\s+/g, ' ');

      if (normalizedInput === normalizedExpected) {
        // Success! Move to explanation phase
        setTimeout(() => {
          actions.setLessonPhase('success');
          actions.setAssistantEmotion('celebrate');
        }, 500);
      } else if (expected) {
        // Wrong command - show hint but allow retry
        actions.setAssistantEmotion('think');
        actions.showHint();
      }
    }

    setInput('');
  };

  // Handle key navigation through history
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion - just add a space if there's something to complete
      // In a real implementation, this would do autocomplete
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#11111b] rounded-xl overflow-hidden border border-[#313244]">
      {/* Terminal Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#181825] border-b border-[#313244]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f38ba8] hover:opacity-80 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-[#f9e2af] hover:opacity-80 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-[#a6e3a1] hover:opacity-80 transition-opacity" />
        </div>
        <span className="text-xs text-[#6c7086] font-mono flex-1 text-center">
          mini-shell — ~
        </span>
        <div className="w-12" /> {/* Spacer for symmetry */}
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        onClick={focusInput}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm cursor-text"
      >
        {/* Welcome message */}
        {terminalHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#6c7086] mb-4"
          >
            <p>Welcome to ShellShow Mini-Shell!</p>
            <p>Type <span className="text-[#a6e3a1]">help</span> for available commands.</p>
            <br />
          </motion.div>
        )}

        {/* Command History */}
        <div className="space-y-1">
          <AnimatePresence>
            {terminalHistory.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
              >
                <TerminalLine {...line} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
          <span className="text-[#a6e3a1] select-none">{currentPathString}</span>
          <span className="text-[#6c7086] select-none">$</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-[#cdd6f4] outline-none font-mono caret-[#cba6f7]"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
            {/* Blinking cursor when empty */}
            {input === '' && (
              <span className="absolute left-0 top-0 w-2 h-5 bg-[#cdd6f4] cursor-blink opacity-70" />
            )}
          </div>
        </form>
      </div>

      {/* Terminal Footer - Command hints */}
      {!freeMode && currentLesson && currentLesson.expectedCommand && (lessonPhase === 'waiting' || lessonPhase === 'hint') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 bg-[#181825] border-t border-[#313244]"
        >
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6c7086]">Expected:</span>
            <code className="px-2 py-0.5 bg-[#313244] rounded text-[#a6e3a1]">
              {currentLesson.expectedCommand}
            </code>
          </div>
        </motion.div>
      )}
    </div>
  );
}
