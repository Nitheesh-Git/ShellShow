import { createContext, useContext, useReducer, useCallback } from 'react';
import { createInitialFileSystem, getPathString } from '../utils/fileSystem';
import { executeCommand } from '../utils/commandParser';
import { lessons, getLesson } from '../data/lessons';

const AppContext = createContext(null);

const initialState = {
  // App state
  screen: 'landing', // 'landing' | 'learning'

  // File system state
  fileSystem: createInitialFileSystem(),
  currentPath: [],

  // Terminal state
  terminalHistory: [],

  // Learning state
  currentLessonId: 1,
  lessonPhase: 'intro', // 'intro' | 'waiting' | 'success' | 'hint'
  messageIndex: 0,
  hintsShown: 0,
  freeMode: false,
  lessonsCompleted: 0,

  // Animation state
  currentAnimation: null,
  animationKey: 0,

  // Assistant state
  assistantEmotion: 'idle',
  isTyping: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'START_LEARNING':
      return {
        ...state,
        screen: 'learning',
        currentLessonId: 1,
        lessonPhase: 'intro',
        messageIndex: 0,
      };

    case 'NAVIGATE_TO_LANDING':
      return {
        ...state,
        screen: 'landing',
      };

    case 'EXECUTE_COMMAND': {
      const result = executeCommand(
        action.payload.command,
        state.fileSystem,
        state.currentPath
      );

      const newHistory = result.clearTerminal ? [] : [
        ...state.terminalHistory,
        {
          type: 'input',
          content: action.payload.command,
          path: getPathString(state.currentPath),
        },
      ];

      if (result.output) {
        newHistory.push({
          type: 'output',
          content: result.output,
          isError: false,
        });
      }

      if (result.error) {
        newHistory.push({
          type: 'output',
          content: result.error,
          isError: true,
        });
      }

      return {
        ...state,
        fileSystem: result.fileSystem,
        currentPath: result.currentPath,
        terminalHistory: newHistory,
        currentAnimation: result.animation,
        animationKey: state.animationKey + 1,
      };
    }

    case 'SET_ANIMATION':
      return {
        ...state,
        currentAnimation: action.payload,
        animationKey: state.animationKey + 1,
      };

    case 'CLEAR_ANIMATION':
      return {
        ...state,
        currentAnimation: null,
      };

    case 'ADVANCE_MESSAGE':
      const currentLesson = getLesson(state.currentLessonId);
      const newMessageIndex = state.messageIndex + 1;

      if (currentLesson && newMessageIndex >= currentLesson.assistantMessages.length) {
        if (currentLesson.isComplete) {
          return {
            ...state,
            lessonPhase: 'success',
            freeMode: true,
            lessonsCompleted: lessons.length,
          };
        }
        return {
          ...state,
          lessonPhase: 'waiting',
          messageIndex: newMessageIndex - 1,
        };
      }

      return {
        ...state,
        messageIndex: newMessageIndex,
        assistantEmotion: currentLesson?.assistantMessages[newMessageIndex]?.emotion || 'idle',
      };

    case 'SET_LESSON_PHASE':
      return {
        ...state,
        lessonPhase: action.payload,
      };

    case 'LESSON_SUCCESS':
      const nextLessonId = state.currentLessonId + 1;
      const nextLesson = getLesson(nextLessonId);

      if (!nextLesson) {
        return {
          ...state,
          lessonPhase: 'success',
          freeMode: true,
          lessonsCompleted: lessons.length,
        };
      }

      return {
        ...state,
        currentLessonId: nextLessonId,
        lessonPhase: 'intro',
        messageIndex: 0,
        hintsShown: 0,
        lessonsCompleted: state.currentLessonId,
        assistantEmotion: nextLesson.assistantMessages[0]?.emotion || 'idle',
      };

    case 'SHOW_HINT':
      return {
        ...state,
        hintsShown: state.hintsShown + 1,
        lessonPhase: 'hint',
      };

    case 'SET_ASSISTANT_EMOTION':
      return {
        ...state,
        assistantEmotion: action.payload,
      };

    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload,
      };

    case 'ENTER_FREE_MODE':
      return {
        ...state,
        freeMode: true,
      };

    case 'CLEAR_TERMINAL':
      return {
        ...state,
        terminalHistory: [],
      };

    case 'RESET_PROGRESS':
      return {
        ...initialState,
        screen: 'learning',
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const startLearning = useCallback(() => {
    dispatch({ type: 'START_LEARNING' });
  }, []);

  const navigateToLanding = useCallback(() => {
    dispatch({ type: 'NAVIGATE_TO_LANDING' });
  }, []);

  const executeCmd = useCallback((command) => {
    dispatch({ type: 'EXECUTE_COMMAND', payload: { command } });
  }, []);

  const setAnimation = useCallback((animation) => {
    dispatch({ type: 'SET_ANIMATION', payload: animation });
  }, []);

  const clearAnimation = useCallback(() => {
    dispatch({ type: 'CLEAR_ANIMATION' });
  }, []);

  const advanceMessage = useCallback(() => {
    dispatch({ type: 'ADVANCE_MESSAGE' });
  }, []);

  const setLessonPhase = useCallback((phase) => {
    dispatch({ type: 'SET_LESSON_PHASE', payload: phase });
  }, []);

  const lessonSuccess = useCallback(() => {
    dispatch({ type: 'LESSON_SUCCESS' });
  }, []);

  const showHint = useCallback(() => {
    dispatch({ type: 'SHOW_HINT' });
  }, []);

  const setAssistantEmotion = useCallback((emotion) => {
    dispatch({ type: 'SET_ASSISTANT_EMOTION', payload: emotion });
  }, []);

  const setTyping = useCallback((isTyping) => {
    dispatch({ type: 'SET_TYPING', payload: isTyping });
  }, []);

  const enterFreeMode = useCallback(() => {
    dispatch({ type: 'ENTER_FREE_MODE' });
  }, []);

  const clearTerminal = useCallback(() => {
    dispatch({ type: 'CLEAR_TERMINAL' });
  }, []);

  const resetProgress = useCallback(() => {
    dispatch({ type: 'RESET_PROGRESS' });
  }, []);

  const value = {
    state,
    actions: {
      startLearning,
      navigateToLanding,
      executeCmd,
      setAnimation,
      clearAnimation,
      advanceMessage,
      setLessonPhase,
      lessonSuccess,
      showHint,
      setAssistantEmotion,
      setTyping,
      enterFreeMode,
      clearTerminal,
      resetProgress,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
