# ShellShow - Interactive Guided Mini Linux Shell

<p align="center">
  <img src="public/favicon.svg" alt="ShellShow Logo" width="120" height="120">
</p>

<p align="center">
  <strong>Learn Linux Commands the Visual Way</strong>
</p>

<p align="center">
  An interactive, beginner-friendly web application that teaches Linux command line basics through guided tutorials, visual animations, and a friendly cartoon assistant.
</p>

---

## Overview

**ShellShow** is not your typical terminal emulator. It's a **beginner-focused teaching system** that combines:

- **Step-by-step guided lessons** - Learn one command at a time
- **Real-time visual animations** - See exactly what each command does
- **Friendly cartoon assistant (Shellie)** - A mentor that guides you through every step
- **Safe simulated environment** - Practice without any risk of breaking real systems

This project was inspired by [CSS Diner](https://flukeout.github.io/) - applying the same playful, gamified learning approach to the Linux command line.

## Why This Is Different

| Traditional Terminal | ShellShow |
|---------------------|-----------|
| Intimidating blank screen | Welcoming, modern interface |
| Trial and error learning | Guided step-by-step lessons |
| Text-only feedback | Beautiful visual animations |
| No guidance | Friendly assistant with hints |
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

### Supported Commands

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

### Visual Animations

Every command triggers a unique animation:

- **mkdir** - Watch a new folder appear with a smooth entrance animation
- **touch** - See files materialize with sparkle effects
- **ls** - View contents displayed as interactive cards
- **cd** - Navigate visually into folders with transition effects
- **cp** - Witness duplication with a cloning animation
- **mv** - Watch items move/rename with slide animations
- **rm** - See items disappear with a satisfying deletion effect
- **pwd** - Location highlighted with a pin marker animation

### The Assistant (Shellie)

Shellie is a friendly cartoon shell character that:

- Greets you and introduces concepts
- Provides step-by-step instructions
- Reacts to your actions with different emotions
- Offers hints when you're stuck
- Celebrates your achievements

**Emotions:** idle, happy, celebrate, think, curious, wave, point, explain, idea, proud

### Progress Tracking

- Visual progress bar showing lesson completion
- 14 progressive lessons from basics to advanced
- Free mode unlocked after completing the tutorial

## Tech Stack

- **React 19** - UI framework with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## Project Structure

```
src/
├── components/
│   ├── Assistant/       # Shellie cartoon character + speech bubbles
│   ├── Dashboard/       # Landing page
│   ├── Layout/          # Main learning layout
│   ├── Terminal/        # Simulated terminal UI
│   ├── VisualPanel/     # Animation viewer + file tree
│   └── UI/              # Shared UI components
├── context/
│   └── AppContext.jsx   # Global state management
├── data/
│   └── lessons.js       # Lesson definitions + command descriptions
├── utils/
│   ├── fileSystem.js    # Virtual file system operations
│   └── commandParser.js # Command parsing + execution
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

No actual file system operations are performed - everything is safely contained in React state.

### Learning Flow

1. **Intro Phase** - Assistant introduces the lesson concept
2. **Waiting Phase** - User types the expected command
3. **Validation** - Command is checked against expected input
4. **Success Phase** - Explanation is shown, animation plays
5. **Next Lesson** - Progress to the next teaching step

### State Management

The app uses React's `useReducer` for predictable state updates:

- Screen navigation (landing/learning)
- File system state
- Terminal history
- Lesson progress
- Animation state
- Assistant emotion

## Design Philosophy

### Color Palette (Catppuccin Mocha inspired)

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#181825` | Main background |
| Surface | `#1e1e2e` | Cards, panels |
| Terminal | `#11111b` | Terminal background |
| Purple | `#cba6f7` | Primary accent |
| Pink | `#f5c2e7` | Secondary accent |
| Green | `#a6e3a1` | Success, prompts |
| Yellow | `#f9e2af` | Folders, warnings |
| Blue | `#89b4fa` | Files, links |
| Text | `#cdd6f4` | Primary text |
| Muted | `#6c7086` | Disabled, hints |

### Typography

- **Headers:** Inter (sans-serif)
- **Code/Terminal:** Fira Code (monospace)

## Future Enhancements

- [ ] More commands (cat, echo, grep, find)
- [ ] Advanced lessons (pipes, redirects, permissions)
- [ ] Achievement badges
- [ ] Sound effects
- [ ] Dark/light theme toggle
- [ ] Mobile responsive design
- [ ] Keyboard shortcuts reference
- [ ] Command history persistence
- [ ] Export progress
- [ ] Multiple difficulty levels

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
- [Catppuccin](https://github.com/catppuccin) - Color palette inspiration
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library

---

<p align="center">
  Made with ❤️ for everyone learning Linux
</p>
