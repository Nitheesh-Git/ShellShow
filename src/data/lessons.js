// Lesson data for the guided learning flow

export const lessons = [
  // ==================== FILE SYSTEM BASICS (1-14) ====================
  {
    id: 1,
    title: 'Welcome to the Terminal!',
    command: null,
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    category: 'basics',
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
    title: 'File System Mastered!',
    command: null,
    category: 'basics',
    assistantMessages: [
      {
        text: "🎉 Amazing! You've mastered the file system basics!",
        emotion: 'celebrate',
      },
      {
        text: "You've learned 7 essential commands: pwd, ls, cd, mkdir, touch, cp, and mv!",
        emotion: 'proud',
      },
      {
        text: "Now let's dive deeper into Operating System concepts. Ready for the next level?",
        emotion: 'idea',
      },
    ],
    expectedCommand: null,
    explanation: {
      title: 'Basics Complete!',
      text: "You've built a solid foundation. Now we'll explore how operating systems actually work - processes, memory, scheduling, and more!",
      realOS: "These file commands are used millions of times daily on servers, development machines, and even your smartphone (Android uses Linux!).",
    },
    hints: [],
  },

  // ==================== PROCESS MANAGEMENT (15-20) ====================
  {
    id: 15,
    title: 'Introduction to Processes',
    command: null,
    category: 'process',
    assistantMessages: [
      {
        text: "Now let's learn about PROCESSES - the heart of any operating system!",
        emotion: 'idea',
      },
      {
        text: "A process is simply a program that's running. Right now, your browser, this app - they're all processes!",
        emotion: 'explain',
      },
      {
        text: "Let's create a new process using 'fork'. Type: fork",
        emotion: 'point',
        highlight: 'fork',
      },
    ],
    expectedCommand: 'fork',
    explanation: {
      title: 'fork() - Creating Processes',
      text: "fork() creates an exact copy of the current process! The original is called the 'parent', and the copy is the 'child'. Both run independently after fork.",
      deeper: "In real OS, fork() returns different values: 0 to the child, and the child's PID to the parent. This is how they know who's who!",
      realOS: "fork() is used everywhere: when you open a new terminal tab, run a command, or start an app. It's fundamental to Unix/Linux!",
    },
    hints: [
      "Type: fork",
      "This creates a child process",
      "fork() duplicates the current process",
    ],
  },
  {
    id: 16,
    title: 'Process Identity',
    command: 'fork',
    category: 'process',
    assistantMessages: [
      {
        text: "Wow! You created a child process! Did you see the PIDs (Process IDs)?",
        emotion: 'celebrate',
      },
      {
        text: "Now you might wonder: why do we need multiple processes?",
        emotion: 'think',
      },
      {
        text: "Imagine if your browser crashed and took down your music player too! Separate processes keep things isolated.",
        emotion: 'explain',
      },
    ],
    expectedCommand: 'fork',
    explanation: {
      title: 'Why Processes Matter',
      text: "Each process has its own memory space and runs independently. If one crashes, others survive! This is called process isolation.",
      deeper: "Every process gets a unique PID. The first process (init/systemd with PID 1) is the ancestor of ALL other processes on your system!",
      realOS: "Try 'ps aux' in a real terminal to see all running processes. You'll find hundreds!",
    },
    hints: [
      "Type: fork",
      "Creates another child process",
    ],
  },
  {
    id: 17,
    title: 'Running New Programs',
    command: 'exec',
    category: 'process',
    assistantMessages: [
      {
        text: "Great! But what if we want a process to run a DIFFERENT program?",
        emotion: 'curious',
      },
      {
        text: "That's where 'exec' comes in! It REPLACES the current process with a new program.",
        emotion: 'explain',
      },
      {
        text: "Type: exec browser",
        emotion: 'point',
        highlight: 'exec browser',
      },
    ],
    expectedCommand: 'exec browser',
    explanation: {
      title: 'exec() - Running New Programs',
      text: "exec() transforms the current process into a completely different program. The old program is gone - replaced entirely by the new one!",
      deeper: "This is why fork() and exec() are often used together: fork() creates a child, then exec() in the child loads a new program. The parent continues running!",
      realOS: "When you type 'ls' in a terminal, the shell does: fork() → exec('ls') → wait(). That's the Unix way!",
    },
    hints: [
      "Type: exec browser",
      "exec replaces the process",
      "The process 'becomes' the new program",
    ],
  },
  {
    id: 18,
    title: 'Parent-Child Coordination',
    command: 'wait',
    category: 'process',
    assistantMessages: [
      {
        text: "The process is now running 'browser'! But here's a question...",
        emotion: 'happy',
      },
      {
        text: "How does a parent process know when its child is done?",
        emotion: 'think',
      },
      {
        text: "We use 'wait'! It pauses the parent until a child finishes. Type: wait",
        emotion: 'point',
        highlight: 'wait',
      },
    ],
    expectedCommand: 'wait',
    explanation: {
      title: 'wait() - Synchronization',
      text: "wait() blocks the parent process until one of its children terminates. This prevents 'zombie processes' - children that finished but weren't acknowledged!",
      deeper: "Without wait(), child processes become zombies - they're done but stuck in the process table. Too many zombies can crash your system!",
      realOS: "The shell uses wait() constantly. When you run a command without '&', the shell waits for it to finish before showing the prompt again.",
    },
    hints: [
      "Type: wait",
      "Parent waits for child",
      "This ensures proper cleanup",
    ],
  },
  {
    id: 19,
    title: 'The Process Lifecycle',
    command: 'fork',
    category: 'process',
    assistantMessages: [
      {
        text: "Perfect! The child terminated and the parent was notified.",
        emotion: 'celebrate',
      },
      {
        text: "Let's review the process lifecycle: Create (fork) → Run (exec) → Wait → Terminate",
        emotion: 'explain',
      },
      {
        text: "Let's create one more process to solidify this. Type: fork",
        emotion: 'point',
        highlight: 'fork',
      },
    ],
    expectedCommand: 'fork',
    explanation: {
      title: 'Process Lifecycle',
      text: "Processes follow a lifecycle: New → Ready → Running → (Waiting) → Terminated. The OS manages these transitions constantly!",
      deeper: "A process can also be in 'Waiting' state when it needs I/O (like reading a file). The CPU doesn't waste time - it runs other processes!",
      realOS: "Run 'top' or 'htop' to watch processes change states in real-time. It's like watching the OS breathe!",
    },
    hints: [
      "Type: fork",
      "Creates a new process",
    ],
  },
  {
    id: 20,
    title: 'Process Management Complete!',
    command: null,
    category: 'process',
    assistantMessages: [
      {
        text: "🎯 Excellent! You understand fork(), exec(), and wait()!",
        emotion: 'celebrate',
      },
      {
        text: "These three calls are the foundation of process management in ALL Unix-like systems!",
        emotion: 'proud',
      },
      {
        text: "Next up: How does the CPU decide WHICH process to run? Let's learn about scheduling!",
        emotion: 'idea',
      },
    ],
    expectedCommand: null,
    explanation: {
      title: 'Process Management Mastered!',
      text: "You've learned the core process system calls! fork() creates, exec() transforms, wait() synchronizes. This is how every program you use gets started!",
      realOS: "Chrome creates multiple processes (one per tab) using fork(). This is why one tab crashing doesn't take down the whole browser!",
    },
    hints: [],
  },

  // ==================== CPU SCHEDULING (21-26) ====================
  {
    id: 21,
    title: 'CPU Scheduling Introduction',
    command: null,
    category: 'scheduling',
    assistantMessages: [
      {
        text: "Now for something fascinating: CPU SCHEDULING! 🎮",
        emotion: 'idea',
      },
      {
        text: "Your computer might have 100+ processes but only 4-8 CPU cores. How does it decide who runs?",
        emotion: 'think',
      },
      {
        text: "The SCHEDULER decides! Let's try the simplest approach: First Come, First Served. Type: schedule fcfs",
        emotion: 'point',
        highlight: 'schedule fcfs',
      },
    ],
    expectedCommand: 'schedule fcfs',
    explanation: {
      title: 'FCFS - First Come, First Served',
      text: "FCFS is the simplest scheduling algorithm - processes run in the order they arrive. Like a queue at a store: first in, first served!",
      deeper: "FCFS is simple but has a problem: if a long job arrives first, short jobs must wait forever. This is called the 'convoy effect'.",
      realOS: "FCFS is rarely used alone in modern OS, but it's the foundation for understanding more complex schedulers.",
    },
    hints: [
      "Type: schedule fcfs",
      "FCFS = First Come First Served",
      "Processes run in arrival order",
    ],
  },
  {
    id: 22,
    title: 'Understanding the Gantt Chart',
    command: 'schedule fcfs',
    category: 'scheduling',
    assistantMessages: [
      {
        text: "Look at the Gantt chart! It shows which process runs at each time unit.",
        emotion: 'explain',
      },
      {
        text: "Notice how P1 runs completely before P2 starts, and P2 before P3. That's FCFS!",
        emotion: 'point',
      },
      {
        text: "But wait - what if P1 takes forever? Short jobs suffer! Let's try something smarter: Type: schedule sjf",
        emotion: 'think',
      },
    ],
    expectedCommand: 'schedule sjf',
    explanation: {
      title: 'SJF - Shortest Job First',
      text: "SJF runs the shortest job first! This minimizes average waiting time. The scheduler looks at all ready processes and picks the one with the smallest burst time.",
      deeper: "SJF is provably optimal for minimizing average waiting time. But there's a catch: how do we KNOW how long a job will take? We can only estimate!",
      realOS: "SJF inspired many real algorithms. Modern schedulers try to estimate process behavior based on history.",
    },
    hints: [
      "Type: schedule sjf",
      "SJF = Shortest Job First",
      "Short jobs run first",
    ],
  },
  {
    id: 23,
    title: 'Comparing Algorithms',
    command: 'schedule sjf',
    category: 'scheduling',
    assistantMessages: [
      {
        text: "See the difference? The short job P3 ran earlier now!",
        emotion: 'happy',
      },
      {
        text: "SJF gives better average wait times than FCFS. But it has a problem too...",
        emotion: 'think',
      },
      {
        text: "What if short jobs keep arriving? Long jobs might NEVER run! This is called 'starvation'.",
        emotion: 'explain',
      },
    ],
    expectedCommand: 'schedule sjf',
    explanation: {
      title: 'Starvation Problem',
      text: "In SJF, a long process might wait forever if short processes keep arriving. This is called 'starvation' - a serious fairness issue!",
      deeper: "Real OS use 'aging' to prevent starvation: the longer you wait, the higher your priority becomes. Eventually, you WILL run!",
      realOS: "Linux's CFS scheduler uses 'virtual runtime' - processes that used less CPU time get priority. It's self-balancing!",
    },
    hints: [
      "Type: schedule sjf again",
      "Compare with FCFS results",
    ],
  },
  {
    id: 24,
    title: 'Preemptive Scheduling',
    command: 'schedule srtf',
    category: 'scheduling',
    assistantMessages: [
      {
        text: "Here's a powerful idea: What if we could INTERRUPT a running process?",
        emotion: 'idea',
      },
      {
        text: "SRTF (Shortest Remaining Time First) is preemptive - if a shorter job arrives, it takes over immediately!",
        emotion: 'explain',
      },
      {
        text: "Type: schedule srtf",
        emotion: 'point',
        highlight: 'schedule srtf',
      },
    ],
    expectedCommand: 'schedule srtf',
    explanation: {
      title: 'SRTF - Preemptive Scheduling',
      text: "SRTF can 'preempt' (interrupt) a running process if a shorter one arrives. This gives the best average response time!",
      deeper: "Preemption requires a timer interrupt - the CPU is interrupted regularly to let the scheduler make decisions. This is called a 'context switch'.",
      realOS: "Modern schedulers preempt constantly - typically every 1-10 milliseconds. This makes multitasking feel smooth!",
    },
    hints: [
      "Type: schedule srtf",
      "SRTF = Shortest Remaining Time First",
      "Processes can be interrupted",
    ],
  },
  {
    id: 25,
    title: 'Context Switching',
    command: 'schedule srtf',
    category: 'scheduling',
    assistantMessages: [
      {
        text: "Look! The Gantt chart shows P1 being interrupted when new processes arrive!",
        emotion: 'explain',
      },
      {
        text: "These interruptions are called 'context switches'. The OS saves P1's state and loads the new process.",
        emotion: 'think',
      },
      {
        text: "Context switches have a cost though - switching takes time! Let's see SRTF again. Type: schedule srtf",
        emotion: 'point',
      },
    ],
    expectedCommand: 'schedule srtf',
    explanation: {
      title: 'The Cost of Context Switching',
      text: "Every context switch requires saving registers, updating page tables, and flushing caches. This overhead can be significant!",
      deeper: "A context switch can take 1-1000 microseconds depending on hardware. If we switch too often, we spend more time switching than working!",
      realOS: "This is why real schedulers use time 'quantums' - minimum time slices. Too small = too much switching. Too large = poor responsiveness.",
    },
    hints: [
      "Type: schedule srtf",
      "Watch for preemption in the chart",
    ],
  },
  {
    id: 26,
    title: 'Scheduling Complete!',
    command: null,
    category: 'scheduling',
    assistantMessages: [
      {
        text: "🎯 You've learned the three fundamental scheduling algorithms!",
        emotion: 'celebrate',
      },
      {
        text: "FCFS: Simple but can cause delays. SJF: Optimal but can starve. SRTF: Best response but costly switches.",
        emotion: 'explain',
      },
      {
        text: "Real OS combine these ideas with priorities, aging, and more. Now let's learn about MEMORY!",
        emotion: 'idea',
      },
    ],
    expectedCommand: null,
    explanation: {
      title: 'Scheduling Mastered!',
      text: "You understand non-preemptive (FCFS, SJF) and preemptive (SRTF) scheduling! Real schedulers use these ideas plus priorities, multiple queues, and feedback.",
      realOS: "Linux uses CFS (Completely Fair Scheduler) since 2007. It models an 'ideal multitasking CPU' where all processes run simultaneously!",
    },
    hints: [],
  },

  // ==================== MEMORY MANAGEMENT (27-30) ====================
  {
    id: 27,
    title: 'Memory Allocation',
    command: 'alloc',
    category: 'memory',
    assistantMessages: [
      {
        text: "Time for MEMORY MANAGEMENT! Every process needs memory to run.",
        emotion: 'idea',
      },
      {
        text: "When a process needs memory, it requests it from the OS. The OS finds a free block and allocates it.",
        emotion: 'explain',
      },
      {
        text: "Let's allocate 256MB for a process. Type: alloc 256",
        emotion: 'point',
        highlight: 'alloc 256',
      },
    ],
    expectedCommand: 'alloc 256',
    explanation: {
      title: 'Memory Allocation',
      text: "The OS maintains a list of free memory blocks. When you request memory, it finds a suitable block and marks it as 'in use'.",
      deeper: "There are different allocation strategies: First Fit (use first block that fits), Best Fit (smallest suitable block), Worst Fit (largest block).",
      realOS: "malloc() in C and 'new' in other languages ultimately ask the OS for memory. The program's heap grows as you allocate!",
    },
    hints: [
      "Type: alloc 256",
      "Request 256MB of memory",
      "OS finds a free block",
    ],
  },
  {
    id: 28,
    title: 'More Allocations',
    command: 'alloc',
    category: 'memory',
    assistantMessages: [
      {
        text: "Great! You allocated 256MB. See how the memory map changed?",
        emotion: 'happy',
      },
      {
        text: "Let's allocate more memory to see what happens. Type: alloc 128",
        emotion: 'explain',
      },
    ],
    expectedCommand: 'alloc 128',
    explanation: {
      title: 'Multiple Allocations',
      text: "Each allocation takes a chunk from free memory. The OS tracks what's allocated to whom so processes don't interfere with each other!",
      deeper: "If contiguous memory isn't available, the allocation fails! This can happen even with free memory scattered around - that's fragmentation.",
      realOS: "Use 'free -h' on Linux to see memory usage. You'll see used, free, and 'buff/cache' (temporary data the OS can reclaim if needed).",
    },
    hints: [
      "Type: alloc 128",
      "Allocate another block",
    ],
  },
  {
    id: 29,
    title: 'Freeing Memory',
    command: 'free',
    category: 'memory',
    assistantMessages: [
      {
        text: "Now here's the important part: FREEING memory!",
        emotion: 'idea',
      },
      {
        text: "If we don't free memory when done, we get a 'memory leak'. Eventually, the system runs out of memory!",
        emotion: 'explain',
      },
      {
        text: "Let's release some memory. Type: free",
        emotion: 'point',
        highlight: 'free',
      },
    ],
    expectedCommand: 'free',
    explanation: {
      title: 'Memory Deallocation',
      text: "Freeing memory marks blocks as available again. Good programs always free what they allocate! Memory leaks are a common bug.",
      deeper: "When adjacent free blocks exist, the OS can 'coalesce' them into one larger block. This helps reduce external fragmentation.",
      realOS: "Languages like Java, Python use 'garbage collection' - they automatically free memory that's no longer used. C/C++ require manual free()!",
    },
    hints: [
      "Type: free",
      "Releases allocated memory",
      "Prevents memory leaks",
    ],
  },
  {
    id: 30,
    title: 'Memory Management Complete!',
    command: null,
    category: 'memory',
    assistantMessages: [
      {
        text: "🎯 You understand memory allocation and deallocation!",
        emotion: 'celebrate',
      },
      {
        text: "Key concepts: allocate when needed, free when done, watch for fragmentation and leaks!",
        emotion: 'explain',
      },
      {
        text: "One last topic: What happens when multiple processes access the SAME memory? Let's learn about concurrency!",
        emotion: 'idea',
      },
    ],
    expectedCommand: null,
    explanation: {
      title: 'Memory Management Mastered!',
      text: "You've learned allocation strategies, fragmentation, and the importance of freeing memory. These concepts apply to every program you write!",
      realOS: "Modern OS use virtual memory - each process thinks it has all the memory! The OS maps 'virtual' addresses to physical RAM.",
    },
    hints: [],
  },

  // ==================== CONCURRENCY (31-34) ====================
  {
    id: 31,
    title: 'Race Conditions',
    command: 'race',
    category: 'concurrency',
    assistantMessages: [
      {
        text: "Welcome to CONCURRENCY - where things get tricky! 🎲",
        emotion: 'idea',
      },
      {
        text: "What happens when TWO processes change the same variable at the same time?",
        emotion: 'think',
      },
      {
        text: "Let's see a 'race condition' in action! Type: race demo",
        emotion: 'point',
        highlight: 'race demo',
      },
    ],
    expectedCommand: 'race demo',
    explanation: {
      title: 'Race Conditions',
      text: "A race condition occurs when the result depends on timing! Two processes reading/writing the same data can corrupt it if not careful.",
      deeper: "The classic example: both processes read value 0, both add 1, both write 1. We expected 2, got 1! One increment was lost.",
      realOS: "Race conditions cause some of the hardest bugs to find - they're random and hard to reproduce! They've caused real disasters.",
    },
    hints: [
      "Type: race demo",
      "Watch what happens",
      "Two processes, one variable",
    ],
  },
  {
    id: 32,
    title: 'The Problem Revealed',
    command: 'race',
    category: 'concurrency',
    assistantMessages: [
      {
        text: "See what happened?! We expected 2 but got 1!",
        emotion: 'curious',
      },
      {
        text: "Both processes read 0, both computed 0+1=1, and both wrote 1. One update was LOST!",
        emotion: 'explain',
      },
      {
        text: "This is a race condition. Let's see it again to understand. Type: race demo",
        emotion: 'point',
      },
    ],
    expectedCommand: 'race demo',
    explanation: {
      title: 'Lost Updates',
      text: "Without synchronization, race conditions can cause lost updates, torn reads, and data corruption. The order of operations matters, but we can't control it!",
      deeper: "Modern CPUs make this worse with caching and out-of-order execution. What you see in code isn't exactly what the hardware does!",
      realOS: "Bank accounts, inventory systems, flight bookings - all need careful synchronization. Data corruption could mean real money lost!",
    },
    hints: [
      "Type: race demo",
      "Observe the lost update",
    ],
  },
  {
    id: 33,
    title: 'The Solution: Locks',
    command: 'lock',
    category: 'concurrency',
    assistantMessages: [
      {
        text: "How do we fix this? We need SYNCHRONIZATION!",
        emotion: 'idea',
      },
      {
        text: "A 'lock' (or mutex) ensures only ONE process can access shared data at a time. Others wait!",
        emotion: 'explain',
      },
      {
        text: "Let's enable locking and see the difference. Type: lock enable",
        emotion: 'point',
        highlight: 'lock enable',
      },
    ],
    expectedCommand: 'lock enable',
    explanation: {
      title: 'Locks / Mutexes',
      text: "A lock (mutex = mutual exclusion) ensures only one process enters the 'critical section' at a time. Others wait until the lock is released.",
      deeper: "Lock → Read → Modify → Write → Unlock. This sequence is atomic - it can't be interrupted by other processes accessing the same data.",
      realOS: "Too many locks cause 'deadlock' - process A waits for B's lock while B waits for A's. Neither can proceed! Careful design is crucial.",
    },
    hints: [
      "Type: lock enable",
      "Enable synchronization",
      "One process at a time",
    ],
  },
  {
    id: 34,
    title: 'Concurrency Complete!',
    command: null,
    category: 'concurrency',
    assistantMessages: [
      {
        text: "With locking, we got 2! Correct! Each increment happened safely.",
        emotion: 'celebrate',
      },
      {
        text: "Concurrency is powerful but dangerous. Race conditions cause nasty bugs. Locks are the cure - but use them wisely!",
        emotion: 'explain',
      },
      {
        text: "You've learned about race conditions and mutual exclusion - concepts every professional programmer needs to know!",
        emotion: 'proud',
      },
    ],
    expectedCommand: null,
    explanation: {
      title: 'Concurrency Mastered!',
      text: "You understand race conditions and how locks prevent them! This is crucial for multi-threaded programming and modern applications.",
      realOS: "Databases use locking everywhere. That's how multiple users can access the same data simultaneously without corruption!",
    },
    hints: [],
  },

  // ==================== FINALE (35) ====================
  {
    id: 35,
    title: 'OS Concepts Complete!',
    command: null,
    category: 'complete',
    assistantMessages: [
      {
        text: "🎉🎉🎉 CONGRATULATIONS! You've completed the entire course!",
        emotion: 'celebrate',
      },
      {
        text: "You now understand: File Systems, Processes, CPU Scheduling, Memory Management, and Concurrency!",
        emotion: 'proud',
      },
      {
        text: "These are the foundations of every operating system. You're ready to explore more! Type 'help' to practice in free mode.",
        emotion: 'wave',
      },
    ],
    expectedCommand: null,
    explanation: {
      title: 'Course Complete!',
      text: "You've learned the core concepts that make computers work! From basic file operations to the complex dance of processes, memory, and synchronization.",
      deeper: "Next steps? Try reading about virtual memory, file systems (ext4, NTFS), networking, and security. The rabbit hole goes deep!",
      realOS: "These concepts apply to Linux, Windows, macOS, iOS, Android - every OS. You now understand the fundamentals they all share!",
    },
    hints: [],
    isComplete: true,
  },
];

// Command descriptions for all commands
export const commandDescriptions = {
  // File system commands
  pwd: {
    name: 'pwd',
    fullName: 'Print Working Directory',
    description: 'Shows your current location in the file system',
    syntax: 'pwd',
    example: 'pwd',
    category: 'filesystem',
  },
  ls: {
    name: 'ls',
    fullName: 'List',
    description: 'Lists files and folders in the current directory',
    syntax: 'ls [path]',
    example: 'ls',
    category: 'filesystem',
  },
  cd: {
    name: 'cd',
    fullName: 'Change Directory',
    description: 'Navigate to a different folder',
    syntax: 'cd [folder]',
    example: 'cd projects',
    category: 'filesystem',
  },
  mkdir: {
    name: 'mkdir',
    fullName: 'Make Directory',
    description: 'Creates a new folder',
    syntax: 'mkdir <name>',
    example: 'mkdir myfolder',
    category: 'filesystem',
  },
  touch: {
    name: 'touch',
    fullName: 'Touch',
    description: 'Creates a new empty file',
    syntax: 'touch <filename>',
    example: 'touch notes.txt',
    category: 'filesystem',
  },
  cp: {
    name: 'cp',
    fullName: 'Copy',
    description: 'Copies a file or folder',
    syntax: 'cp <source> <destination>',
    example: 'cp file.txt copy.txt',
    category: 'filesystem',
  },
  mv: {
    name: 'mv',
    fullName: 'Move',
    description: 'Moves or renames a file or folder',
    syntax: 'mv <source> <destination>',
    example: 'mv old.txt new.txt',
    category: 'filesystem',
  },
  rm: {
    name: 'rm',
    fullName: 'Remove',
    description: 'Deletes a file (use -r for folders)',
    syntax: 'rm <filename>',
    example: 'rm unwanted.txt',
    category: 'filesystem',
  },

  // Process commands
  fork: {
    name: 'fork',
    fullName: 'Fork Process',
    description: 'Creates a child process (copy of current process)',
    syntax: 'fork',
    example: 'fork',
    category: 'process',
  },
  exec: {
    name: 'exec',
    fullName: 'Execute Program',
    description: 'Replaces current process with a new program',
    syntax: 'exec <program>',
    example: 'exec browser',
    category: 'process',
  },
  wait: {
    name: 'wait',
    fullName: 'Wait for Child',
    description: 'Waits for a child process to terminate',
    syntax: 'wait',
    example: 'wait',
    category: 'process',
  },

  // Scheduling commands
  schedule: {
    name: 'schedule',
    fullName: 'CPU Scheduler',
    description: 'Run CPU scheduling simulation',
    syntax: 'schedule <algorithm>',
    example: 'schedule fcfs',
    category: 'scheduling',
    algorithms: ['fcfs', 'sjf', 'srtf'],
  },

  // Memory commands
  alloc: {
    name: 'alloc',
    fullName: 'Allocate Memory',
    description: 'Allocate memory blocks (in MB)',
    syntax: 'alloc <size>',
    example: 'alloc 256',
    category: 'memory',
  },
  free: {
    name: 'free',
    fullName: 'Free Memory',
    description: 'Free allocated memory',
    syntax: 'free',
    example: 'free',
    category: 'memory',
  },

  // Concurrency commands
  race: {
    name: 'race',
    fullName: 'Race Condition Demo',
    description: 'Demonstrate race condition',
    syntax: 'race demo',
    example: 'race demo',
    category: 'concurrency',
  },
  lock: {
    name: 'lock',
    fullName: 'Enable Lock',
    description: 'Enable synchronization lock',
    syntax: 'lock enable',
    example: 'lock enable',
    category: 'concurrency',
  },

  // Other commands
  clear: {
    name: 'clear',
    fullName: 'Clear',
    description: 'Clears the terminal screen',
    syntax: 'clear',
    example: 'clear',
    category: 'other',
  },
  help: {
    name: 'help',
    fullName: 'Help',
    description: 'Shows available commands',
    syntax: 'help',
    example: 'help',
    category: 'other',
  },
};

export const getLesson = (id) => lessons.find(l => l.id === id);

export const getTotalLessons = () => lessons.length;

export const isLastLesson = (id) => id >= lessons.length;

export const getLessonsByCategory = (category) => lessons.filter(l => l.category === category);

export const getCategories = () => [...new Set(lessons.map(l => l.category))];
