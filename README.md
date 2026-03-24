# ShellShow - Interactive Guided Mini Linux Shell

<p align="center">
  <img src="public/favicon.svg" alt="ShellShow Logo" width="120" height="120">
</p>

<p align="center">
  <strong>Learn Linux Commands & OS Concepts the Visual Way</strong>
</p>

<p align="center">
  <a href="https://shellshow.vercel.app/"><strong>Live Demo: shellshow.vercel.app</strong></a>
</p>

<p align="center">
  An interactive, beginner-friendly web application that teaches Linux commands and operating system concepts through guided tutorials, visual animations, and a friendly cartoon assistant.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61dafb" alt="React 18">
  <img src="https://img.shields.io/badge/TailwindCSS-4-38bdf8" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/Framer_Motion-11-ff69b4" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Lessons-35-a6e3a1" alt="35 Lessons">
</p>

---

## Overview

**ShellShow** is not your typical terminal emulator. It's a **beginner-focused teaching system** that combines:

- **35 step-by-step guided lessons** - Learn commands and OS concepts progressively
- **Real-time visual animations** - See exactly what each command does
- **Friendly cartoon assistant (Shellie)** - A mentor that guides you through every step
- **OS concept simulations** - Understand processes, scheduling, memory, and concurrency
- **Safe simulated environment** - Practice without any risk of breaking real systems

This project was inspired by [CSS Diner](https://flukeout.github.io/) - applying the same playful, gamified learning approach to the Linux command line and operating system fundamentals.

## Why This Is Different

| Traditional Terminal | ShellShow |
|---------------------|-----------|
| Intimidating blank screen | Welcoming, modern interface |
| Trial and error learning | Guided step-by-step lessons |
| Text-only feedback | Beautiful visual animations |
| No guidance | Friendly assistant with hints |
| Abstract OS concepts | Visual simulations |
| Risk of mistakes | Safe simulated environment |

## Features

### Learning Interface

The main learning interface is divided into three panels:

```
┌─────────────────┬─────────────────────┬─────────────────┐
│                 │                     │                 │
│    ASSISTANT    │      TERMINAL       │  VISUAL PANEL   │
│                 │                     │                 │
│  Shellie the    │  Type commands      │  Watch commands │
│  cartoon guide  │  here like a real   │  come to life   │
│  speaks to you  │  Linux terminal     │  with animations│
│                 │                     │                 │
└─────────────────┴─────────────────────┴─────────────────┘
```

### 35 Comprehensive Lessons

#### File System Basics (Lessons 1-14)

| Command | Description | Example |
|---------|-------------|---------|
| `pwd` | Print working directory | `pwd` |
| `ls` | List directory contents | `ls` |
| `cd` | Change directory | `cd projects` |
| `mkdir` | Create a new directory | `mkdir demo` |
| `touch` | Create a new file | `touch notes.txt` |
| `cp` | Copy files/folders | `cp file.txt backup.txt` |
| `mv` | Move or rename | `mv old.txt new.txt` |
| `rm` | Remove files/folders | `rm unwanted.txt` |
| `clear` | Clear terminal | `clear` |
| `help` | Show available commands | `help` |

#### Process Management (Lessons 15-20)

| Command | Description | Example |
|---------|-------------|---------|
| `fork` | Create a child process | `fork` |
| `exec` | Replace process with new program | `exec myprogram` |
| `wait` | Wait for child process | `wait` |

**Visual:** Animated process trees showing parent-child relationships, process states, and lifecycle.

#### CPU Scheduling (Lessons 21-26)

| Command | Description | Example |
|---------|-------------|---------|
| `schedule fcfs` | First Come First Served | `schedule fcfs` |
| `schedule sjf` | Shortest Job First | `schedule sjf` |
| `schedule srtf` | Shortest Remaining Time First | `schedule srtf` |

**Visual:** Interactive Gantt charts showing how different algorithms schedule processes over time.

#### Memory Management (Lessons 27-30)

| Command | Description | Example |
|---------|-------------|---------|
| `alloc` | Allocate memory block | `alloc 128` |
| `free` | Deallocate memory | `free` |

**Visual:** Memory bar visualization showing allocated and free blocks in real-time.

#### Concurrency (Lessons 31-34)

| Command | Description | Example |
|---------|-------------|---------|
| `race demo` | Demonstrate race condition | `race demo` |
| `lock enable` | Enable synchronization | `lock enable` |

**Visual:** Timeline showing concurrent process access, race conditions, and how locks prevent data corruption.

### Visual Animations

Every command triggers a unique animation:

**File System:**
- **mkdir** - Watch a new folder appear with a smooth entrance animation
- **touch** - See files materialize with sparkle effects
- **ls** - View contents displayed as interactive cards
- **cd** - Navigate visually into folders with transition effects
- **cp** - Witness duplication with a cloning animation
- **mv** - Watch items move/rename with slide animations
- **rm** - See items disappear with a satisfying deletion effect
- **pwd** - Location highlighted with a pin marker animation

**OS Concepts:**
- **fork** - Process splits with branching animation
- **exec** - Process transforms into new program
- **wait** - Parent process waits with clock animation
- **schedule** - Animated Gantt chart builds in real-time
- **alloc/free** - Memory bar fills and empties dynamically
- **race/lock** - Timeline shows concurrent access patterns

### The Assistant (Shellie)

Shellie is a friendly cartoon shell character that:

- Greets you and introduces concepts
- Provides step-by-step instructions
- Explains both simple concepts and deeper technical details
- Reacts to your actions with different emotions
- Offers hints when you're stuck
- Celebrates your achievements

**Emotions:** idle, happy, celebrate, think, curious, wave, point, explain, idea, proud

### Additional Features

- **Lesson Skip** - Jump to any lesson with the dropdown selector
- **Hint System** - Get progressive hints when stuck
- **Free Mode** - Practice freely after completing all lessons
- **Progress Tracking** - Visual progress bar showing completion
- **Auto-Advance** - Transition lessons automatically progress
- **OS State Reset** - Clean state when jumping between lessons

## Tech Stack

- **React 18** - UI framework with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## Project Structure

```
src/
├── components/
│   ├── Assistant/       # Shellie character + speech bubbles + lesson selector
│   ├── LandingPage/     # Welcome screen
│   ├── Layout/          # Main 3-panel learning layout
│   ├── Terminal/        # Simulated terminal UI
│   └── VisualPanel/     # Animation viewer + file tree + OS visualizations
├── context/
│   └── AppContext.jsx   # Global state management with lesson flow
├── data/
│   └── lessons.js       # All 35 lesson definitions
├── utils/
│   ├── fileSystem.js    # Virtual file system operations
│   ├── commandParser.js # Command parsing + execution
│   └── osSimulator.js   # OS concept simulations (processes, memory, etc.)
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles + Tailwind
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shellshow.git
cd shellshow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## How It Works

### Virtual File System

The application simulates a file system entirely in memory using a tree structure:

```javascript
{
  name: '~',
  type: 'folder',
  children: [
    {
      name: 'projects',
      type: 'folder',
      children: [
        { name: 'notes.txt', type: 'file', content: '' }
      ]
    }
  ]
}
```

### OS Simulator

Operating system concepts are simulated with dedicated state:

```javascript
{
  processes: [{ pid: 1, name: 'init', state: 'running', parent: null }],
  memory: { total: 1024, blocks: [...] },
  scheduler: { algorithm: 'fcfs', jobs: [...] }
}
```

### Learning Flow

1. **Intro Phase** - Assistant introduces the lesson concept
2. **Waiting Phase** - User types the expected command
3. **Validation** - Command is checked against expected input
4. **Success Phase** - Explanation is shown, animation plays
5. **Next Lesson** - Progress to the next teaching step
6. **Transition Lessons** - Auto-advance between topic sections

### State Management

The app uses React's `useReducer` for predictable state updates:

- Screen navigation (landing/learning)
- File system state
- OS simulation state
- Terminal history
- Lesson progress (35 lessons)
- Animation state
- Assistant emotion

## Design Philosophy

### Color Palette (Catppuccin Mocha)

| Color | Hex | Usage |
|-------|-----|-------|
| Base | `#1e1e2e` | Cards, panels |
| Mantle | `#181825` | Main background |
| Crust | `#11111b` | Terminal background |
| Mauve | `#cba6f7` | Primary accent |
| Pink | `#f5c2e7` | Secondary accent |
| Green | `#a6e3a1` | Success, prompts |
| Yellow | `#f9e2af` | Folders, warnings |
| Blue | `#89b4fa` | Files, links |
| Text | `#cdd6f4` | Primary text |
| Overlay | `#6c7086` | Muted text |

### Typography

- **Headers:** Inter (sans-serif)
- **Code/Terminal:** Fira Code (monospace)

## Future Enhancements

- [ ] More file commands (cat, echo, grep, find)
- [ ] Advanced lessons (pipes, redirects, permissions)
- [ ] Achievement badges
- [ ] Sound effects
- [ ] Mobile responsive design
- [ ] Keyboard shortcuts reference
- [ ] Command history persistence
- [ ] Export progress
- [x] ~~OS concept lessons~~ ✓ Added!
- [x] ~~Process management~~ ✓ Added!
- [x] ~~CPU scheduling visualization~~ ✓ Added!
- [x] ~~Memory management~~ ✓ Added!
- [x] ~~Concurrency demonstrations~~ ✓ Added!
- [x] ~~Lesson skip feature~~ ✓ Added!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [CSS Diner](https://flukeout.github.io/) - Inspiration for the gamified learning approach
- [Catppuccin](https://github.com/catppuccin) - Color palette
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library

---

<p align="center">
  Made with love for everyone learning Linux and OS concepts
</p>

<p align="center">
  <a href="https://shellshow.vercel.app/">Try ShellShow Now</a>
</p>
