import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { getLesson, lessons } from '../../data/lessons';
import { Lightbulb, ArrowRight, RotateCcw, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

// SVG Cartoon Character - Shellie the Shell
const ShellieCharacter = ({ emotion = 'idle' }) => {
  const getEyeExpression = () => {
    switch (emotion) {
      case 'happy':
      case 'celebrate':
        return { leftEye: '^', rightEye: '^' };
      case 'think':
      case 'curious':
        return { leftEye: '•', rightEye: 'o' };
      case 'wave':
        return { leftEye: '◠', rightEye: '◠' };
      case 'point':
      case 'explain':
        return { leftEye: '◉', rightEye: '◉' };
      case 'idea':
        return { leftEye: '✦', rightEye: '✦' };
      case 'proud':
        return { leftEye: '★', rightEye: '★' };
      default:
        return { leftEye: '•', rightEye: '•' };
    }
  };

  const eyes = getEyeExpression();

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      animate={emotion === 'wave' ? { rotate: [-5, 5, -5] } : {}}
      transition={{ duration: 1, repeat: emotion === 'wave' ? Infinity : 0 }}
    >
      {/* Shell Body */}
      <motion.ellipse
        cx="100"
        cy="110"
        rx="70"
        ry="60"
        fill="url(#shellGradient)"
        stroke="#cba6f7"
        strokeWidth="3"
        animate={
          emotion === 'celebrate' ? { scale: [1, 1.05, 1] } :
          emotion === 'happy' ? { y: [0, -5, 0] } :
          {}
        }
        transition={{ duration: 0.5, repeat: emotion === 'celebrate' || emotion === 'happy' ? Infinity : 0 }}
      />

      {/* Shell Spiral Pattern */}
      <motion.path
        d="M 100 80 Q 130 90 120 120 Q 110 140 85 135 Q 65 130 70 110 Q 75 95 95 100"
        fill="none"
        stroke="#f5c2e7"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Face */}
      <g transform="translate(0, -10)">
        {/* Left Eye */}
        <motion.text
          x="75"
          y="120"
          fontSize="24"
          fontFamily="sans-serif"
          fill="#313244"
          textAnchor="middle"
          animate={emotion === 'think' ? { x: [75, 70, 75] } : {}}
          transition={{ duration: 2, repeat: emotion === 'think' ? Infinity : 0 }}
        >
          {eyes.leftEye}
        </motion.text>

        {/* Right Eye */}
        <motion.text
          x="125"
          y="120"
          fontSize="24"
          fontFamily="sans-serif"
          fill="#313244"
          textAnchor="middle"
          animate={emotion === 'think' ? { x: [125, 130, 125] } : {}}
          transition={{ duration: 2, repeat: emotion === 'think' ? Infinity : 0 }}
        >
          {eyes.rightEye}
        </motion.text>

        {/* Mouth */}
        <motion.path
          d={
            emotion === 'happy' || emotion === 'celebrate' || emotion === 'wave' || emotion === 'proud'
              ? "M 85 140 Q 100 155 115 140"
              : emotion === 'think' || emotion === 'curious'
              ? "M 95 145 Q 100 140 105 145"
              : "M 90 140 Q 100 148 110 140"
          }
          fill="none"
          stroke="#313244"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Antenna/Snorkel */}
      <motion.g
        animate={emotion === 'idea' ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.3, repeat: emotion === 'idea' ? 3 : 0 }}
        style={{ transformOrigin: '100px 50px' }}
      >
        <path
          d="M 100 60 Q 105 40 115 35"
          fill="none"
          stroke="#89b4fa"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="118" cy="32" r="6" fill="#89b4fa" />

        {/* Idea sparkle */}
        {emotion === 'idea' && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <text x="130" y="25" fontSize="16" fill="#f9e2af">✨</text>
          </motion.g>
        )}
      </motion.g>

      {/* Wave hand */}
      {emotion === 'wave' && (
        <motion.g
          animate={{ rotate: [0, 20, -20, 20, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ transformOrigin: '160px 100px' }}
        >
          <ellipse cx="165" cy="100" rx="12" ry="8" fill="#f5c2e7" />
          <path
            d="M 165 92 L 165 75 M 160 93 L 155 80 M 170 93 L 175 80"
            stroke="#f5c2e7"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.g>
      )}

      {/* Point hand */}
      {(emotion === 'point' || emotion === 'explain') && (
        <motion.g
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <ellipse cx="170" cy="120" rx="10" ry="8" fill="#f5c2e7" />
          <path
            d="M 175 120 L 195 100"
            stroke="#f5c2e7"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="198" cy="97" r="4" fill="#a6e3a1" />
        </motion.g>
      )}

      {/* Celebrate stars */}
      {emotion === 'celebrate' && (
        <>
          <motion.text
            x="40"
            y="60"
            fontSize="20"
            animate={{ y: [60, 50, 60], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ⭐
          </motion.text>
          <motion.text
            x="150"
            y="50"
            fontSize="16"
            animate={{ y: [50, 40, 50], opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
          >
            ✨
          </motion.text>
          <motion.text
            x="160"
            y="85"
            fontSize="18"
            animate={{ y: [85, 75, 85], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          >
            🎉
          </motion.text>
        </>
      )}

      {/* Gradients */}
      <defs>
        <linearGradient id="shellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cba6f7" />
          <stop offset="50%" stopColor="#f5c2e7" />
          <stop offset="100%" stopColor="#fab387" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

// Speech Bubble Component
const SpeechBubble = ({ message, highlight, onContinue, showContinue }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);

    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [message]);

  // Highlight command in message
  const renderText = () => {
    if (!highlight || !displayedText.includes(highlight)) {
      return displayedText;
    }

    const parts = displayedText.split(highlight);
    return (
      <>
        {parts[0]}
        <code className="px-2 py-1 bg-[#11111b] rounded text-[#a6e3a1] font-mono text-sm">
          {highlight}
        </code>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      className="speech-bubble"
    >
      <p className="text-[#cdd6f4] text-sm leading-relaxed min-h-[3rem]">
        {renderText()}
        {!isComplete && (
          <span className="inline-block w-1 h-4 bg-[#cba6f7] ml-1 cursor-blink" />
        )}
      </p>

      {showContinue && isComplete && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onContinue}
          className="mt-3 flex items-center gap-1 text-xs text-[#cba6f7] hover:text-[#f5c2e7] transition-colors"
        >
          Continue <ChevronRight className="w-3 h-3" />
        </motion.button>
      )}
    </motion.div>
  );
};

// Hint Box Component
const HintBox = ({ hints, currentHint }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="mt-4 p-3 bg-[#f9e2af]/10 border border-[#f9e2af]/30 rounded-lg"
  >
    <div className="flex items-start gap-2">
      <Lightbulb className="w-4 h-4 text-[#f9e2af] flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-[#f9e2af] mb-1">Hint</p>
        <p className="text-xs text-[#cdd6f4]">{hints[Math.min(currentHint, hints.length - 1)]}</p>
      </div>
    </div>
  </motion.div>
);

// Progress Tracker
const ProgressTracker = ({ current, total, completed }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-[#a6adc8]">Lesson Progress</span>
      <span className="text-xs text-[#cba6f7] font-mono">{completed}/{total}</span>
    </div>
    <div className="h-2 bg-[#11111b] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-[#cba6f7] to-[#f5c2e7] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(completed / total) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  </div>
);

// Main Assistant Component
export default function Assistant() {
  const { state, actions } = useApp();
  const { currentLessonId, lessonPhase, messageIndex, hintsShown, freeMode, lessonsCompleted } = state;

  const currentLesson = getLesson(currentLessonId);
  const totalLessons = lessons.length;

  const currentMessage = currentLesson?.assistantMessages[messageIndex];
  const isLastMessage = currentLesson && messageIndex >= currentLesson.assistantMessages.length - 1;

  const handleContinue = () => {
    if (isLastMessage && !currentLesson.isComplete) {
      actions.setLessonPhase('waiting');
    } else {
      actions.advanceMessage();
    }
  };

  const handleHint = () => {
    actions.showHint();
  };

  return (
    <div className="h-full flex flex-col p-4 bg-[#181825]">
      {/* Progress */}
      <ProgressTracker
        current={currentLessonId}
        total={totalLessons}
        completed={lessonsCompleted}
      />

      {/* Character */}
      <div className="flex-shrink-0 w-48 h-48 mx-auto mb-4">
        <ShellieCharacter emotion={currentMessage?.emotion || state.assistantEmotion || 'idle'} />
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentMessage && (
            <SpeechBubble
              key={`${currentLessonId}-${messageIndex}`}
              message={currentMessage.text}
              highlight={currentMessage.highlight}
              onContinue={handleContinue}
              showContinue={lessonPhase === 'intro' && !isLastMessage}
            />
          )}
        </AnimatePresence>

        {/* Waiting for input state */}
        {lessonPhase === 'waiting' && currentLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-[#89b4fa]/10 border border-[#89b4fa]/30 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="w-4 h-4 text-[#89b4fa]" />
              <span className="text-xs font-semibold text-[#89b4fa]">Your Turn!</span>
            </div>
            <p className="text-xs text-[#cdd6f4]">
              Type the command in the terminal:
            </p>
            <code className="block mt-2 px-3 py-2 bg-[#11111b] rounded text-[#a6e3a1] font-mono text-sm">
              {currentLesson.expectedCommand}
            </code>
          </motion.div>
        )}

        {/* Hint display */}
        {lessonPhase === 'hint' && currentLesson?.hints && (
          <HintBox hints={currentLesson.hints} currentHint={hintsShown - 1} />
        )}

        {/* Success state */}
        {lessonPhase === 'success' && currentLesson?.explanation && !freeMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-[#a6e3a1]/10 border border-[#a6e3a1]/30 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#a6e3a1]" />
              <span className="text-sm font-semibold text-[#a6e3a1]">
                {currentLesson.explanation.title}
              </span>
            </div>
            <p className="text-xs text-[#cdd6f4] leading-relaxed">
              {currentLesson.explanation.text}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={actions.lessonSuccess}
              className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-[#a6e3a1] to-[#94e2d5]
                rounded-lg text-[#181825] text-sm font-semibold flex items-center justify-center gap-2"
            >
              Next Lesson <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* Free mode indicator */}
        {freeMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-[#cba6f7]/10 border border-[#cba6f7]/30 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#cba6f7]" />
              <span className="text-sm font-semibold text-[#cba6f7]">Free Mode</span>
            </div>
            <p className="text-xs text-[#cdd6f4] leading-relaxed">
              You've completed the tutorial! Feel free to explore and practice.
              Type <code className="px-1 bg-[#11111b] rounded text-[#a6e3a1]">help</code> for available commands.
            </p>
          </motion.div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex-shrink-0 mt-4 space-y-2">
        {lessonPhase === 'waiting' && currentLesson?.hints && hintsShown < currentLesson.hints.length && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleHint}
            className="w-full px-4 py-2 bg-[#f9e2af]/10 border border-[#f9e2af]/30
              rounded-lg text-[#f9e2af] text-sm flex items-center justify-center gap-2
              hover:bg-[#f9e2af]/20 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Need a hint?
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={actions.resetProgress}
          className="w-full px-4 py-2 bg-[#313244] border border-[#45475a]
            rounded-lg text-[#a6adc8] text-xs flex items-center justify-center gap-2
            hover:bg-[#45475a] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Restart Tutorial
        </motion.button>
      </div>
    </div>
  );
}
