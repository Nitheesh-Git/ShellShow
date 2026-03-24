// Command Parser for the Shell Simulator

import {
  findNode,
  parsePath,
  addChild,
  removeChild,
  cloneFileSystem,
  isValidName,
  getPathString,
  getParentPath,
} from './fileSystem';

import {
  createInitialOSState,
  cloneOSState,
  forkProcess,
  execProcess,
  waitProcess,
  scheduleProcesses,
  allocMemory,
  freeMemory,
  simulateRaceCondition,
  enableLock,
} from './osSimulator';

// Global OS state (managed separately from file system)
let osState = createInitialOSState();

// Reset OS state
export const resetOSState = () => {
  osState = createInitialOSState();
};

// Get current OS state
export const getOSState = () => osState;

// Parse command string into command and arguments
export const parseCommand = (input) => {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  return { command, args, raw: trimmed };
};

// Execute a command and return the result
export const executeCommand = (input, fileSystem, currentPath) => {
  const parsed = parseCommand(input);
  if (!parsed) {
    return {
      success: false,
      output: '',
      error: 'No command entered',
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const { command, args } = parsed;
  const newFS = cloneFileSystem(fileSystem);

  // Find current directory in the new file system
  const currentDir = findNode(newFS, currentPath);
  if (!currentDir) {
    return {
      success: false,
      output: '',
      error: 'Current directory not found',
      fileSystem: newFS,
      currentPath: [],
      animation: null,
    };
  }

  switch (command) {
    // File system commands
    case 'pwd':
      return handlePwd(newFS, currentPath);

    case 'ls':
      return handleLs(newFS, currentPath, args);

    case 'mkdir':
      return handleMkdir(newFS, currentPath, args);

    case 'touch':
      return handleTouch(newFS, currentPath, args);

    case 'cd':
      return handleCd(newFS, currentPath, args);

    case 'cp':
      return handleCp(newFS, currentPath, args);

    case 'mv':
      return handleMv(newFS, currentPath, args);

    case 'rm':
      return handleRm(newFS, currentPath, args);

    case 'clear':
      return {
        success: true,
        output: '',
        error: null,
        fileSystem: newFS,
        currentPath,
        animation: { type: 'clear' },
        clearTerminal: true,
      };

    case 'help':
      return handleHelp(newFS, currentPath);

    // OS Process commands
    case 'fork':
      return handleFork(newFS, currentPath);

    case 'exec':
      return handleExec(newFS, currentPath, args);

    case 'wait':
      return handleWait(newFS, currentPath);

    // CPU Scheduling commands
    case 'schedule':
      return handleSchedule(newFS, currentPath, args);

    // Memory commands
    case 'alloc':
      return handleAlloc(newFS, currentPath, args);

    case 'free':
      return handleFree(newFS, currentPath, args);

    // Concurrency commands
    case 'race':
      return handleRace(newFS, currentPath, args);

    case 'lock':
      return handleLock(newFS, currentPath, args);

    default:
      return {
        success: false,
        output: '',
        error: `Command not found: ${command}. Type 'help' for available commands.`,
        fileSystem: newFS,
        currentPath,
        animation: null,
      };
  }
};

// PWD - Print Working Directory
const handlePwd = (fileSystem, currentPath) => {
  const pathStr = getPathString(currentPath);
  return {
    success: true,
    output: pathStr,
    error: null,
    fileSystem,
    currentPath,
    animation: {
      type: 'pwd',
      path: pathStr,
    },
  };
};

// LS - List directory contents
const handleLs = (fileSystem, currentPath, args) => {
  let targetPath = currentPath;

  if (args.length > 0 && !args[0].startsWith('-')) {
    targetPath = parsePath(args[0], currentPath);
  }

  const targetDir = findNode(fileSystem, targetPath);

  if (!targetDir) {
    return {
      success: false,
      output: '',
      error: `ls: cannot access '${args[0]}': No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  if (targetDir.type === 'file') {
    return {
      success: true,
      output: targetDir.name,
      error: null,
      fileSystem,
      currentPath,
      animation: {
        type: 'ls',
        items: [targetDir],
        path: getPathString(targetPath),
      },
    };
  }

  const items = targetDir.children;
  const output = items.map(item => item.name).join('  ') || '';

  return {
    success: true,
    output,
    error: null,
    fileSystem,
    currentPath,
    animation: {
      type: 'ls',
      items: items,
      path: getPathString(targetPath),
    },
  };
};

// MKDIR - Make directory
const handleMkdir = (fileSystem, currentPath, args) => {
  if (args.length === 0) {
    return {
      success: false,
      output: '',
      error: 'mkdir: missing operand',
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const dirName = args[0];
  const targetPath = parsePath(dirName, currentPath);
  const parentPath = getParentPath(targetPath);
  const newDirName = targetPath[targetPath.length - 1];

  if (!isValidName(newDirName)) {
    return {
      success: false,
      output: '',
      error: `mkdir: cannot create directory '${dirName}': Invalid name`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const parentDir = findNode(fileSystem, parentPath);

  if (!parentDir) {
    return {
      success: false,
      output: '',
      error: `mkdir: cannot create directory '${dirName}': No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const newFolder = {
    name: newDirName,
    type: 'folder',
    children: [],
  };

  const result = addChild(parentDir, newFolder);

  if (!result.success) {
    return {
      success: false,
      output: '',
      error: `mkdir: cannot create directory '${dirName}': ${result.error}`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  return {
    success: true,
    output: '',
    error: null,
    fileSystem,
    currentPath,
    animation: {
      type: 'mkdir',
      name: newDirName,
      path: getPathString(parentPath),
    },
  };
};

// TOUCH - Create file
const handleTouch = (fileSystem, currentPath, args) => {
  if (args.length === 0) {
    return {
      success: false,
      output: '',
      error: 'touch: missing file operand',
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const fileName = args[0];
  const targetPath = parsePath(fileName, currentPath);
  const parentPath = getParentPath(targetPath);
  const newFileName = targetPath[targetPath.length - 1];

  if (!isValidName(newFileName)) {
    return {
      success: false,
      output: '',
      error: `touch: cannot create file '${fileName}': Invalid name`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const parentDir = findNode(fileSystem, parentPath);

  if (!parentDir) {
    return {
      success: false,
      output: '',
      error: `touch: cannot create file '${fileName}': No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const existing = parentDir.children.find(c => c.name === newFileName);
  if (existing) {
    return {
      success: true,
      output: '',
      error: null,
      fileSystem,
      currentPath,
      animation: {
        type: 'touch',
        name: newFileName,
        path: getPathString(parentPath),
        updated: true,
      },
    };
  }

  const newFile = {
    name: newFileName,
    type: 'file',
    content: '',
  };

  const result = addChild(parentDir, newFile);

  if (!result.success) {
    return {
      success: false,
      output: '',
      error: `touch: cannot create file '${fileName}': ${result.error}`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  return {
    success: true,
    output: '',
    error: null,
    fileSystem,
    currentPath,
    animation: {
      type: 'touch',
      name: newFileName,
      path: getPathString(parentPath),
    },
  };
};

// CD - Change directory
const handleCd = (fileSystem, currentPath, args) => {
  if (args.length === 0 || args[0] === '~') {
    return {
      success: true,
      output: '',
      error: null,
      fileSystem,
      currentPath: [],
      animation: {
        type: 'cd',
        from: getPathString(currentPath),
        to: '~',
      },
    };
  }

  const targetPath = parsePath(args[0], currentPath);
  const targetDir = findNode(fileSystem, targetPath);

  if (!targetDir) {
    return {
      success: false,
      output: '',
      error: `cd: ${args[0]}: No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  if (targetDir.type !== 'folder') {
    return {
      success: false,
      output: '',
      error: `cd: ${args[0]}: Not a directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  return {
    success: true,
    output: '',
    error: null,
    fileSystem,
    currentPath: targetPath,
    animation: {
      type: 'cd',
      from: getPathString(currentPath),
      to: getPathString(targetPath),
      folderName: targetPath.length > 0 ? targetPath[targetPath.length - 1] : '~',
    },
  };
};

// CP - Copy file/folder
const handleCp = (fileSystem, currentPath, args) => {
  if (args.length < 2) {
    return {
      success: false,
      output: '',
      error: 'cp: missing file operand',
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const sourcePath = parsePath(args[0], currentPath);
  const sourceParent = findNode(fileSystem, getParentPath(sourcePath));
  const sourceName = sourcePath[sourcePath.length - 1];
  const sourceNode = sourceParent?.children?.find(c => c.name === sourceName);

  if (!sourceNode) {
    return {
      success: false,
      output: '',
      error: `cp: cannot stat '${args[0]}': No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const destPath = parsePath(args[1], currentPath);
  let destParent = findNode(fileSystem, destPath);
  let destName = sourceName;

  if (destParent && destParent.type === 'folder') {
    // Copying into a folder
  } else {
    destParent = findNode(fileSystem, getParentPath(destPath));
    destName = destPath[destPath.length - 1];
  }

  if (!destParent) {
    return {
      success: false,
      output: '',
      error: `cp: cannot create '${args[1]}': No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  if (!isValidName(destName)) {
    return {
      success: false,
      output: '',
      error: `cp: cannot create '${destName}': Invalid name`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const copy = cloneFileSystem(sourceNode);
  copy.name = destName;

  const result = addChild(destParent, copy);

  if (!result.success) {
    return {
      success: false,
      output: '',
      error: `cp: cannot create '${destName}': ${result.error}`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  return {
    success: true,
    output: '',
    error: null,
    fileSystem,
    currentPath,
    animation: {
      type: 'cp',
      source: sourceName,
      dest: destName,
      sourceType: sourceNode.type,
    },
  };
};

// MV - Move/rename file/folder
const handleMv = (fileSystem, currentPath, args) => {
  if (args.length < 2) {
    return {
      success: false,
      output: '',
      error: 'mv: missing file operand',
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const sourcePath = parsePath(args[0], currentPath);
  const sourceParentPath = getParentPath(sourcePath);
  const sourceParent = findNode(fileSystem, sourceParentPath);
  const sourceName = sourcePath[sourcePath.length - 1];

  if (!sourceParent) {
    return {
      success: false,
      output: '',
      error: `mv: cannot stat '${args[0]}': No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const sourceIndex = sourceParent.children.findIndex(c => c.name === sourceName);
  if (sourceIndex === -1) {
    return {
      success: false,
      output: '',
      error: `mv: cannot stat '${args[0]}': No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const sourceNode = sourceParent.children[sourceIndex];

  const destPath = parsePath(args[1], currentPath);
  let destParent = findNode(fileSystem, destPath);
  let destName = sourceName;

  if (destParent && destParent.type === 'folder') {
    // Moving into a folder
  } else {
    destParent = findNode(fileSystem, getParentPath(destPath));
    destName = destPath[destPath.length - 1];
  }

  if (!destParent) {
    return {
      success: false,
      output: '',
      error: `mv: cannot move '${args[0]}' to '${args[1]}': No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  if (!isValidName(destName)) {
    return {
      success: false,
      output: '',
      error: `mv: cannot create '${destName}': Invalid name`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  if (destParent.children.some(c => c.name === destName)) {
    return {
      success: false,
      output: '',
      error: `mv: cannot move '${args[0]}' to '${args[1]}': File exists`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  sourceParent.children.splice(sourceIndex, 1);
  sourceNode.name = destName;
  addChild(destParent, sourceNode);

  const isRename = sourceParentPath.join('/') === getParentPath(destPath).join('/');

  return {
    success: true,
    output: '',
    error: null,
    fileSystem,
    currentPath,
    animation: {
      type: 'mv',
      source: sourceName,
      dest: destName,
      sourceType: sourceNode.type,
      isRename,
    },
  };
};

// RM - Remove file/folder
const handleRm = (fileSystem, currentPath, args) => {
  if (args.length === 0) {
    return {
      success: false,
      output: '',
      error: 'rm: missing operand',
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const targetPath = parsePath(args[0], currentPath);
  const parentPath = getParentPath(targetPath);
  const targetName = targetPath[targetPath.length - 1];
  const parentDir = findNode(fileSystem, parentPath);

  if (!parentDir) {
    return {
      success: false,
      output: '',
      error: `rm: cannot remove '${args[0]}': No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const target = parentDir.children.find(c => c.name === targetName);

  if (!target) {
    return {
      success: false,
      output: '',
      error: `rm: cannot remove '${args[0]}': No such file or directory`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  if (target.type === 'folder' && target.children.length > 0 && !args.includes('-r') && !args.includes('-rf')) {
    return {
      success: false,
      output: '',
      error: `rm: cannot remove '${args[0]}': Is a directory (use -r to remove)`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const result = removeChild(parentDir, targetName);

  if (!result.success) {
    return {
      success: false,
      output: '',
      error: `rm: cannot remove '${args[0]}': ${result.error}`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  return {
    success: true,
    output: '',
    error: null,
    fileSystem,
    currentPath,
    animation: {
      type: 'rm',
      name: targetName,
      itemType: target.type,
    },
  };
};

// FORK - Create a new process
const handleFork = (fileSystem, currentPath) => {
  const result = forkProcess(osState);

  if (!result.success) {
    return {
      success: false,
      output: '',
      error: result.error,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  osState = result.osState;

  return {
    success: true,
    output: `Forked! Parent PID: ${result.parentPid}, Child PID: ${result.childPid}`,
    error: null,
    fileSystem,
    currentPath,
    animation: result.animation,
  };
};

// EXEC - Replace process with new program
const handleExec = (fileSystem, currentPath, args) => {
  const programName = args[0] || 'new_program';
  const result = execProcess(osState, programName);

  if (!result.success) {
    return {
      success: false,
      output: '',
      error: result.error,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  osState = result.osState;

  return {
    success: true,
    output: `Process ${result.animation.pid} now running: ${result.animation.newName}`,
    error: null,
    fileSystem,
    currentPath,
    animation: result.animation,
  };
};

// WAIT - Wait for child process
const handleWait = (fileSystem, currentPath) => {
  const result = waitProcess(osState);

  if (!result.success) {
    return {
      success: false,
      output: '',
      error: result.error,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  osState = result.osState;

  const childInfo = result.animation.child
    ? `Child ${result.animation.child.pid} terminated`
    : 'Waiting complete';

  return {
    success: true,
    output: childInfo,
    error: null,
    fileSystem,
    currentPath,
    animation: result.animation,
  };
};

// SCHEDULE - Run CPU scheduling simulation
const handleSchedule = (fileSystem, currentPath, args) => {
  const algorithm = args[0] || 'fcfs';
  const validAlgorithms = ['fcfs', 'sjf', 'srtf'];

  if (!validAlgorithms.includes(algorithm.toLowerCase())) {
    return {
      success: false,
      output: '',
      error: `Unknown scheduling algorithm: ${algorithm}. Use: fcfs, sjf, or srtf`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const result = scheduleProcesses(osState, algorithm);

  if (!result.success) {
    return {
      success: false,
      output: '',
      error: result.error,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  osState = result.osState;

  const scheduleOutput = result.animation.schedule
    .map(s => `${s.name}: ${s.start}-${s.end}`)
    .join(', ');

  return {
    success: true,
    output: `${algorithm.toUpperCase()} Schedule: ${scheduleOutput}`,
    error: null,
    fileSystem,
    currentPath,
    animation: result.animation,
  };
};

// ALLOC - Allocate memory
const handleAlloc = (fileSystem, currentPath, args) => {
  const size = parseInt(args[0]) || 128;
  const processName = args[1] || 'user';

  const result = allocMemory(osState, size, processName);

  if (!result.success) {
    return {
      success: false,
      output: '',
      error: result.error,
      fileSystem,
      currentPath,
      animation: result.animation || null,
    };
  }

  osState = result.osState;

  return {
    success: true,
    output: `Allocated ${size}MB for ${processName}`,
    error: null,
    fileSystem,
    currentPath,
    animation: result.animation,
  };
};

// FREE - Free memory
const handleFree = (fileSystem, currentPath, args) => {
  const result = freeMemory(osState);

  if (!result.success) {
    return {
      success: false,
      output: '',
      error: result.error,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  osState = result.osState;

  return {
    success: true,
    output: `Freed ${result.animation.freedSize}MB from ${result.animation.freedProcess}`,
    error: null,
    fileSystem,
    currentPath,
    animation: result.animation,
  };
};

// RACE - Demonstrate race condition
const handleRace = (fileSystem, currentPath, args) => {
  const action = args[0] || 'demo';

  if (action !== 'demo') {
    return {
      success: false,
      output: '',
      error: `Usage: race demo`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const result = simulateRaceCondition(osState);
  osState = result.osState;

  return {
    success: true,
    output: `Race condition! Expected: ${result.animation.expectedValue}, Got: ${result.animation.actualValue}`,
    error: null,
    fileSystem,
    currentPath,
    animation: result.animation,
  };
};

// LOCK - Enable synchronization
const handleLock = (fileSystem, currentPath, args) => {
  const action = args[0] || 'enable';

  if (action !== 'enable') {
    return {
      success: false,
      output: '',
      error: `Usage: lock enable`,
      fileSystem,
      currentPath,
      animation: null,
    };
  }

  const result = enableLock(osState);
  osState = result.osState;

  return {
    success: true,
    output: `Lock enabled! Final value: ${result.animation.finalValue} (correct!)`,
    error: null,
    fileSystem,
    currentPath,
    animation: result.animation,
  };
};

// HELP - Show available commands
const handleHelp = (fileSystem, currentPath) => {
  const helpText = `Available commands:

FILE SYSTEM:
  pwd             Print working directory
  ls [path]       List directory contents
  cd [path]       Change directory
  mkdir <name>    Create a new directory
  touch <name>    Create a new file
  cp <src> <dest> Copy file or folder
  mv <src> <dest> Move or rename file/folder
  rm <name>       Remove file (use -r for folders)

PROCESS MANAGEMENT:
  fork            Create a child process
  exec <program>  Replace process with program
  wait            Wait for child process

CPU SCHEDULING:
  schedule fcfs   First Come First Served
  schedule sjf    Shortest Job First
  schedule srtf   Shortest Remaining Time First

MEMORY MANAGEMENT:
  alloc <size>    Allocate memory (in MB)
  free            Free allocated memory

CONCURRENCY:
  race demo       Demonstrate race condition
  lock enable     Enable synchronization

OTHER:
  clear           Clear the terminal
  help            Show this help message`;

  return {
    success: true,
    output: helpText,
    error: null,
    fileSystem,
    currentPath,
    animation: {
      type: 'help',
    },
  };
};
