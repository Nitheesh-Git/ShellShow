// Lesson data for the guided learning flow

export const lessons = [
  {
    id: 1,
    title: 'Welcome to the Terminal!',
    command: null,
    assistantMessages: [
      {
        text: "Hey there! I'm Shellie, your friendly terminal guide! 🐚",
        emotion: 'wave',
      },
      {
        text: "Today, I'll teach you the basics of the Linux command line. Don't worry - it's going to be fun!",
        emotion: 'happy',
      },
      {
        text: "Let's start by learning what directory you're in. Type: pwd",
        emotion: 'point',
        highlight: 'pwd',
      },
    ],
    expectedCommand: 'pwd',
    explanation: {
      title: 'pwd - Print Working Directory',
      text: "The 'pwd' command shows you where you are in the file system. Think of it like asking 'Where am I?' The ~ symbol means your home directory - your personal space!",
    },
    hints: [
      "Type exactly: pwd",
      "pwd stands for 'Print Working Directory'",
      "Just type the three letters: p-w-d",
    ],
  },
  {
    id: 2,
    title: 'Looking Around',
    command: 'ls',
    assistantMessages: [
      {
        text: "Great job! You found out you're in your home directory (~)!",
        emotion: 'celebrate',
      },
      {
        text: "Now let's see what's inside this directory. It might be empty, but let's check!",
        emotion: 'think',
      },
      {
        text: "Type: ls",
        emotion: 'point',
        highlight: 'ls',
      },
    ],
    expectedCommand: 'ls',
    explanation: {
      title: 'ls - List Contents',
      text: "The 'ls' command lists all files and folders in your current directory. It's like opening a folder to see what's inside. Right now it's empty - we'll fix that soon!",
    },
    hints: [
      "Type exactly: ls",
      "ls stands for 'list'",
      "It shows you files and folders",
    ],
  },
  {
    id: 3,
    title: 'Creating Your First Folder',
    command: 'mkdir',
    assistantMessages: [
      {
        text: "The directory is empty! Let's create something.",
        emotion: 'idea',
      },
      {
        text: "We'll make a new folder called 'projects'. Folders help us organize our files!",
        emotion: 'explain',
      },
      {
        text: "Type: mkdir projects",
        emotion: 'point',
        highlight: 'mkdir projects',
      },
    ],
    expectedCommand: 'mkdir projects',
    explanation: {
      title: 'mkdir - Make Directory',
      text: "'mkdir' creates a new folder. We just made a folder called 'projects'. Think of it like creating a new drawer in a filing cabinet!",
    },
    hints: [
      "Type: mkdir projects",
      "mkdir means 'make directory'",
      "Make sure to include a space between mkdir and projects",
    ],
  },
  {
    id: 4,
    title: 'Verify Your Work',
    command: 'ls',
    assistantMessages: [
      {
        text: "Awesome! You created your first folder! 🎉",
        emotion: 'celebrate',
      },
      {
        text: "But how do we know it worked? Let's check with ls!",
        emotion: 'think',
      },
      {
        text: "Type: ls",
        emotion: 'point',
        highlight: 'ls',
      },
    ],
    expectedCommand: 'ls',
    explanation: {
      title: 'Checking Your Work',
      text: "Always verify your commands worked! You should now see 'projects' listed. Real programmers frequently use 'ls' to check their work!",
    },
    hints: [
      "Type: ls",
      "You should see 'projects' appear",
    ],
  },
  {
    id: 5,
    title: 'Entering a Folder',
    command: 'cd',
    assistantMessages: [
      {
        text: "There it is - 'projects'! Your very first folder!",
        emotion: 'happy',
      },
      {
        text: "Now let's go inside it. We use 'cd' to change directory - like walking into a room!",
        emotion: 'explain',
      },
      {
        text: "Type: cd projects",
        emotion: 'point',
        highlight: 'cd projects',
      },
    ],
    expectedCommand: 'cd projects',
    explanation: {
      title: 'cd - Change Directory',
      text: "'cd' lets you move between folders. You're now INSIDE the 'projects' folder. Notice how the prompt changed to show your new location!",
    },
    hints: [
      "Type: cd projects",
      "cd stands for 'change directory'",
      "You're entering the projects folder",
    ],
  },
  {
    id: 6,
    title: 'Check Your Location',
    command: 'pwd',
    assistantMessages: [
      {
        text: "You're inside! But let's double-check where we are.",
        emotion: 'think',
      },
      {
        text: "Remember pwd? It shows our current location!",
        emotion: 'explain',
      },
      {
        text: "Type: pwd",
        emotion: 'point',
        highlight: 'pwd',
      },
    ],
    expectedCommand: 'pwd',
    explanation: {
      title: 'Confirming Your Location',
      text: "See? You're now at ~/projects. The path shows you're inside the projects folder that's inside your home directory (~). You're navigating like a pro!",
    },
    hints: [
      "Type: pwd",
      "You should see ~/projects",
    ],
  },
  {
    id: 7,
    title: 'Creating a File',
    command: 'touch',
    assistantMessages: [
      {
        text: "Perfect! Now let's create a file inside this folder.",
        emotion: 'idea',
      },
      {
        text: "We use 'touch' to create empty files. Let's make a notes file!",
        emotion: 'explain',
      },
      {
        text: "Type: touch notes.txt",
        emotion: 'point',
        highlight: 'touch notes.txt',
      },
    ],
    expectedCommand: 'touch notes.txt',
    explanation: {
      title: 'touch - Create Files',
      text: "'touch' creates new empty files. We just created 'notes.txt'. The '.txt' extension tells us it's a text file. Files store your actual data!",
    },
    hints: [
      "Type: touch notes.txt",
      "Include the .txt extension",
      "touch creates empty files",
    ],
  },
  {
    id: 8,
    title: 'See Your File',
    command: 'ls',
    assistantMessages: [
      {
        text: "You created a file! Let's see it!",
        emotion: 'happy',
      },
      {
        text: "Use ls to list the contents of our projects folder.",
        emotion: 'explain',
      },
      {
        text: "Type: ls",
        emotion: 'point',
        highlight: 'ls',
      },
    ],
    expectedCommand: 'ls',
    explanation: {
      title: 'Listing Files',
      text: "There's your file! Notice how files and folders are shown differently in the visual panel. Folders have a folder icon, files have a document icon!",
    },
    hints: [
      "Type: ls",
      "You should see notes.txt",
    ],
  },
  {
    id: 9,
    title: 'Copying Files',
    command: 'cp',
    assistantMessages: [
      {
        text: "What if you want to make a backup of your file?",
        emotion: 'think',
      },
      {
        text: "We can copy it using 'cp'. Let's create a backup!",
        emotion: 'explain',
      },
      {
        text: "Type: cp notes.txt backup.txt",
        emotion: 'point',
        highlight: 'cp notes.txt backup.txt',
      },
    ],
    expectedCommand: 'cp notes.txt backup.txt',
    explanation: {
      title: 'cp - Copy Files',
      text: "'cp' copies files. We copied notes.txt to backup.txt. Now we have TWO files with the same content! Backups are important in programming!",
    },
    hints: [
      "Type: cp notes.txt backup.txt",
      "cp source destination",
      "First the file to copy, then the new name",
    ],
  },
  {
    id: 10,
    title: 'Verify the Copy',
    command: 'ls',
    assistantMessages: [
      {
        text: "Did the copy work? Let's check!",
        emotion: 'curious',
      },
      {
        text: "Type: ls",
        emotion: 'point',
        highlight: 'ls',
      },
    ],
    expectedCommand: 'ls',
    explanation: {
      title: 'Verifying Operations',
      text: "You should see both notes.txt and backup.txt now! Always verify your file operations worked. This is a great habit!",
    },
    hints: [
      "Type: ls",
      "You should see both files now",
    ],
  },
  {
    id: 11,
    title: 'Renaming Files',
    command: 'mv',
    assistantMessages: [
      {
        text: "Hmm, 'backup.txt' isn't a great name. Let's rename it!",
        emotion: 'think',
      },
      {
        text: "We use 'mv' (move) to rename files. It's like moving a file to a new name!",
        emotion: 'explain',
      },
      {
        text: "Type: mv backup.txt important.txt",
        emotion: 'point',
        highlight: 'mv backup.txt important.txt',
      },
    ],
    expectedCommand: 'mv backup.txt important.txt',
    explanation: {
      title: 'mv - Move/Rename',
      text: "'mv' can move files OR rename them. When the destination is in the same folder, it renames! backup.txt is now important.txt.",
    },
    hints: [
      "Type: mv backup.txt important.txt",
      "mv can rename files",
      "First the old name, then the new name",
    ],
  },
  {
    id: 12,
    title: 'Final Check',
    command: 'ls',
    assistantMessages: [
      {
        text: "Let's do a final check of our work!",
        emotion: 'happy',
      },
      {
        text: "Type: ls",
        emotion: 'point',
        highlight: 'ls',
      },
    ],
    expectedCommand: 'ls',
    explanation: {
      title: 'Progress Check!',
      text: "Beautiful! You have notes.txt and important.txt. You've learned pwd, ls, mkdir, cd, touch, cp, and mv! That's amazing progress!",
    },
    hints: [
      "Type: ls",
    ],
  },
  {
    id: 13,
    title: 'Going Back',
    command: 'cd',
    assistantMessages: [
      {
        text: "Excellent work! Now let's go back to the home directory.",
        emotion: 'celebrate',
      },
      {
        text: "We can use 'cd ..' to go to the parent folder, or just 'cd' or 'cd ~' to go home!",
        emotion: 'explain',
      },
      {
        text: "Type: cd ..",
        emotion: 'point',
        highlight: 'cd ..',
      },
    ],
    expectedCommand: 'cd ..',
    explanation: {
      title: 'Navigating Up',
      text: "'..' means 'parent directory'. You're back in your home folder! You can always use 'cd' alone to go straight home from anywhere.",
    },
    hints: [
      "Type: cd ..",
      ".. means parent directory",
      "You're going back one level",
    ],
  },
  {
    id: 14,
    title: 'Congratulations!',
    command: null,
    assistantMessages: [
      {
        text: "🎉 CONGRATULATIONS! You completed the tutorial!",
        emotion: 'celebrate',
      },
      {
        text: "You've learned 7 essential Linux commands: pwd, ls, cd, mkdir, touch, cp, and mv!",
        emotion: 'proud',
      },
      {
        text: "Feel free to practice in free mode now. Type 'help' to see all available commands! Keep exploring!",
        emotion: 'wave',
      },
    ],
    expectedCommand: null,
    explanation: {
      title: 'Tutorial Complete!',
      text: "You're now ready to explore on your own! Try creating more folders, files, and organizing them. The terminal is your playground!",
    },
    hints: [],
    isComplete: true,
  },
];

export const commandDescriptions = {
  pwd: {
    name: 'pwd',
    fullName: 'Print Working Directory',
    description: 'Shows your current location in the file system',
    syntax: 'pwd',
    example: 'pwd',
  },
  ls: {
    name: 'ls',
    fullName: 'List',
    description: 'Lists files and folders in the current directory',
    syntax: 'ls [path]',
    example: 'ls',
  },
  cd: {
    name: 'cd',
    fullName: 'Change Directory',
    description: 'Navigate to a different folder',
    syntax: 'cd [folder]',
    example: 'cd projects',
  },
  mkdir: {
    name: 'mkdir',
    fullName: 'Make Directory',
    description: 'Creates a new folder',
    syntax: 'mkdir <name>',
    example: 'mkdir myfolder',
  },
  touch: {
    name: 'touch',
    fullName: 'Touch',
    description: 'Creates a new empty file',
    syntax: 'touch <filename>',
    example: 'touch notes.txt',
  },
  cp: {
    name: 'cp',
    fullName: 'Copy',
    description: 'Copies a file or folder',
    syntax: 'cp <source> <destination>',
    example: 'cp file.txt copy.txt',
  },
  mv: {
    name: 'mv',
    fullName: 'Move',
    description: 'Moves or renames a file or folder',
    syntax: 'mv <source> <destination>',
    example: 'mv old.txt new.txt',
  },
  rm: {
    name: 'rm',
    fullName: 'Remove',
    description: 'Deletes a file (use -r for folders)',
    syntax: 'rm <filename>',
    example: 'rm unwanted.txt',
  },
  clear: {
    name: 'clear',
    fullName: 'Clear',
    description: 'Clears the terminal screen',
    syntax: 'clear',
    example: 'clear',
  },
  help: {
    name: 'help',
    fullName: 'Help',
    description: 'Shows available commands',
    syntax: 'help',
    example: 'help',
  },
};

export const getLesson = (id) => lessons.find(l => l.id === id);

export const getTotalLessons = () => lessons.length;

export const isLastLesson = (id) => id >= lessons.length;
