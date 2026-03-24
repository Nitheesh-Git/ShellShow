// Operating System Simulator for educational purposes
// Simulates processes, memory, scheduling, and concurrency concepts

// Initial OS state
export const createInitialOSState = () => ({
  // Process management
  processes: [
    { pid: 1, name: 'init', state: 'running', parent: null, priority: 0 }
  ],
  nextPid: 2,
  currentPid: 1,

  // Memory management
  memory: {
    total: 1024, // MB
    blocks: [
      { id: 0, start: 0, size: 1024, allocated: false, process: null }
    ],
    nextBlockId: 1,
  },

  // CPU Scheduler
  scheduler: {
    algorithm: 'fcfs',
    readyQueue: [],
    runningProcess: null,
    completedProcesses: [],
    timeQuantum: 2,
    currentTime: 0,
  },

  // Concurrency
  concurrency: {
    sharedVariable: 0,
    lockEnabled: false,
    lockHolder: null,
    raceDetected: false,
    accessLog: [],
  },
});

// Clone OS state for immutable updates
export const cloneOSState = (state) => ({
  processes: state.processes.map(p => ({ ...p })),
  nextPid: state.nextPid,
  currentPid: state.currentPid,
  memory: {
    total: state.memory.total,
    blocks: state.memory.blocks.map(b => ({ ...b })),
    nextBlockId: state.memory.nextBlockId,
  },
  scheduler: {
    ...state.scheduler,
    readyQueue: [...state.scheduler.readyQueue],
    completedProcesses: [...state.scheduler.completedProcesses],
  },
  concurrency: {
    ...state.concurrency,
    accessLog: [...state.concurrency.accessLog],
  },
});

// Process Management
export const forkProcess = (osState, parentPid = null) => {
  const newOS = cloneOSState(osState);
  const parent = parentPid
    ? newOS.processes.find(p => p.pid === parentPid)
    : newOS.processes.find(p => p.pid === newOS.currentPid);

  if (!parent) {
    return { success: false, error: 'Parent process not found', osState };
  }

  const child = {
    pid: newOS.nextPid,
    name: `child_${newOS.nextPid}`,
    state: 'ready',
    parent: parent.pid,
    priority: parent.priority,
  };

  newOS.processes.push(child);
  newOS.nextPid++;

  return {
    success: true,
    osState: newOS,
    childPid: child.pid,
    parentPid: parent.pid,
    animation: {
      type: 'fork',
      parent: parent,
      child: child,
      processes: newOS.processes,
    },
  };
};

export const execProcess = (osState, programName) => {
  const newOS = cloneOSState(osState);
  const process = newOS.processes.find(p => p.pid === newOS.currentPid);

  if (!process) {
    return { success: false, error: 'Current process not found', osState };
  }

  const oldName = process.name;
  process.name = programName || 'new_program';
  process.state = 'running';

  return {
    success: true,
    osState: newOS,
    animation: {
      type: 'exec',
      pid: process.pid,
      oldName: oldName,
      newName: process.name,
      process: process,
    },
  };
};

export const waitProcess = (osState) => {
  const newOS = cloneOSState(osState);
  const parent = newOS.processes.find(p => p.pid === newOS.currentPid);

  if (!parent) {
    return { success: false, error: 'Parent process not found', osState };
  }

  const children = newOS.processes.filter(p => p.parent === parent.pid);

  if (children.length === 0) {
    return { success: false, error: 'No child processes to wait for', osState };
  }

  // Simulate waiting - mark parent as waiting, then child completes
  parent.state = 'waiting';

  // Find a ready/running child and mark as completed
  const child = children.find(c => c.state === 'ready' || c.state === 'running');
  if (child) {
    child.state = 'terminated';
    parent.state = 'running';
  }

  return {
    success: true,
    osState: newOS,
    animation: {
      type: 'wait',
      parent: parent,
      child: child,
      processes: newOS.processes,
    },
  };
};

// CPU Scheduling
export const scheduleProcesses = (osState, algorithm, jobList = null) => {
  const newOS = cloneOSState(osState);

  // Default job list if not provided
  const jobs = jobList || [
    { name: 'P1', arrivalTime: 0, burstTime: 4 },
    { name: 'P2', arrivalTime: 1, burstTime: 3 },
    { name: 'P3', arrivalTime: 2, burstTime: 1 },
  ];

  let schedule = [];
  let currentTime = 0;

  switch (algorithm.toLowerCase()) {
    case 'fcfs': {
      // First Come First Served
      const sortedJobs = [...jobs].sort((a, b) => a.arrivalTime - b.arrivalTime);
      for (const job of sortedJobs) {
        if (currentTime < job.arrivalTime) {
          currentTime = job.arrivalTime;
        }
        schedule.push({
          name: job.name,
          start: currentTime,
          end: currentTime + job.burstTime,
          burstTime: job.burstTime,
        });
        currentTime += job.burstTime;
      }
      break;
    }

    case 'sjf': {
      // Shortest Job First (non-preemptive)
      const remaining = [...jobs];
      while (remaining.length > 0) {
        const available = remaining.filter(j => j.arrivalTime <= currentTime);
        if (available.length === 0) {
          currentTime = Math.min(...remaining.map(j => j.arrivalTime));
          continue;
        }
        available.sort((a, b) => a.burstTime - b.burstTime);
        const job = available[0];
        schedule.push({
          name: job.name,
          start: currentTime,
          end: currentTime + job.burstTime,
          burstTime: job.burstTime,
        });
        currentTime += job.burstTime;
        remaining.splice(remaining.indexOf(job), 1);
      }
      break;
    }

    case 'srtf': {
      // Shortest Remaining Time First (preemptive)
      const remaining = jobs.map(j => ({ ...j, remaining: j.burstTime }));
      const maxTime = jobs.reduce((sum, j) => sum + j.burstTime, 0) + Math.max(...jobs.map(j => j.arrivalTime));

      let lastJob = null;
      let lastStart = 0;

      for (let t = 0; t <= maxTime && remaining.some(j => j.remaining > 0); t++) {
        const available = remaining.filter(j => j.arrivalTime <= t && j.remaining > 0);
        if (available.length === 0) continue;

        available.sort((a, b) => a.remaining - b.remaining);
        const job = available[0];

        if (lastJob && lastJob !== job.name) {
          // Context switch
          schedule.push({
            name: lastJob,
            start: lastStart,
            end: t,
            isPreempted: true,
          });
          lastStart = t;
        } else if (!lastJob) {
          lastStart = t;
        }

        lastJob = job.name;
        job.remaining--;

        if (job.remaining === 0) {
          schedule.push({
            name: job.name,
            start: lastStart,
            end: t + 1,
            isPreempted: false,
          });
          lastJob = null;
        }
      }
      break;
    }

    default:
      return { success: false, error: `Unknown algorithm: ${algorithm}`, osState };
  }

  newOS.scheduler.algorithm = algorithm;
  newOS.scheduler.completedProcesses = schedule;

  return {
    success: true,
    osState: newOS,
    animation: {
      type: 'schedule',
      algorithm: algorithm.toUpperCase(),
      jobs: jobs,
      schedule: schedule,
      ganttChart: schedule,
    },
  };
};

// Memory Management
export const allocMemory = (osState, size, processName = 'user') => {
  const newOS = cloneOSState(osState);
  const requestSize = parseInt(size) || 128;

  // Find first fit block
  const blockIndex = newOS.memory.blocks.findIndex(
    b => !b.allocated && b.size >= requestSize
  );

  if (blockIndex === -1) {
    return {
      success: false,
      error: `Cannot allocate ${requestSize}MB: Not enough contiguous memory`,
      osState,
      animation: {
        type: 'alloc_fail',
        requestedSize: requestSize,
        memory: newOS.memory,
      },
    };
  }

  const block = newOS.memory.blocks[blockIndex];

  if (block.size === requestSize) {
    // Perfect fit
    block.allocated = true;
    block.process = processName;
  } else {
    // Split the block
    const newBlock = {
      id: newOS.memory.nextBlockId++,
      start: block.start + requestSize,
      size: block.size - requestSize,
      allocated: false,
      process: null,
    };
    block.size = requestSize;
    block.allocated = true;
    block.process = processName;
    newOS.memory.blocks.splice(blockIndex + 1, 0, newBlock);
  }

  return {
    success: true,
    osState: newOS,
    blockId: block.id,
    animation: {
      type: 'alloc',
      block: block,
      size: requestSize,
      memory: newOS.memory,
    },
  };
};

export const freeMemory = (osState, blockIdOrProcess = null) => {
  const newOS = cloneOSState(osState);

  // Find block to free
  let blockIndex = -1;
  if (blockIdOrProcess === null) {
    // Free the most recently allocated block
    blockIndex = newOS.memory.blocks.findLastIndex(b => b.allocated);
  } else if (typeof blockIdOrProcess === 'number') {
    blockIndex = newOS.memory.blocks.findIndex(b => b.id === blockIdOrProcess);
  } else {
    blockIndex = newOS.memory.blocks.findIndex(b => b.process === blockIdOrProcess);
  }

  if (blockIndex === -1) {
    return {
      success: false,
      error: 'No allocated memory block found to free',
      osState,
    };
  }

  const block = newOS.memory.blocks[blockIndex];
  if (!block.allocated) {
    return {
      success: false,
      error: 'Block is already free',
      osState,
    };
  }

  const freedProcess = block.process;
  const freedSize = block.size;
  block.allocated = false;
  block.process = null;

  // Coalesce adjacent free blocks
  const mergedBlocks = [];
  let i = 0;
  while (i < newOS.memory.blocks.length) {
    const current = newOS.memory.blocks[i];
    if (!current.allocated && i + 1 < newOS.memory.blocks.length && !newOS.memory.blocks[i + 1].allocated) {
      // Merge with next block
      current.size += newOS.memory.blocks[i + 1].size;
      newOS.memory.blocks.splice(i + 1, 1);
    } else {
      i++;
    }
  }

  return {
    success: true,
    osState: newOS,
    animation: {
      type: 'free',
      freedProcess: freedProcess,
      freedSize: freedSize,
      memory: newOS.memory,
    },
  };
};

// Concurrency
export const simulateRaceCondition = (osState) => {
  const newOS = cloneOSState(osState);

  // Simulate two processes trying to increment shared variable
  const initialValue = newOS.concurrency.sharedVariable;
  const process1Read = initialValue;
  const process2Read = initialValue;
  const process1Write = process1Read + 1;
  const process2Write = process2Read + 1;

  // Without locking, last write wins (race condition!)
  newOS.concurrency.sharedVariable = process2Write;
  newOS.concurrency.raceDetected = true;
  newOS.concurrency.accessLog = [
    { process: 'P1', action: 'read', value: process1Read, time: 1 },
    { process: 'P2', action: 'read', value: process2Read, time: 2 },
    { process: 'P1', action: 'write', value: process1Write, time: 3 },
    { process: 'P2', action: 'write', value: process2Write, time: 4 },
  ];

  return {
    success: true,
    osState: newOS,
    animation: {
      type: 'race',
      initialValue: initialValue,
      expectedValue: initialValue + 2,
      actualValue: newOS.concurrency.sharedVariable,
      accessLog: newOS.concurrency.accessLog,
      raceDetected: true,
    },
  };
};

export const enableLock = (osState) => {
  const newOS = cloneOSState(osState);

  newOS.concurrency.lockEnabled = true;
  newOS.concurrency.sharedVariable = 0; // Reset

  // Simulate proper synchronization with lock
  const initialValue = 0;
  newOS.concurrency.accessLog = [
    { process: 'P1', action: 'acquire_lock', time: 1 },
    { process: 'P1', action: 'read', value: 0, time: 2 },
    { process: 'P1', action: 'write', value: 1, time: 3 },
    { process: 'P1', action: 'release_lock', time: 4 },
    { process: 'P2', action: 'acquire_lock', time: 5 },
    { process: 'P2', action: 'read', value: 1, time: 6 },
    { process: 'P2', action: 'write', value: 2, time: 7 },
    { process: 'P2', action: 'release_lock', time: 8 },
  ];
  newOS.concurrency.sharedVariable = 2;
  newOS.concurrency.raceDetected = false;

  return {
    success: true,
    osState: newOS,
    animation: {
      type: 'lock',
      initialValue: initialValue,
      finalValue: newOS.concurrency.sharedVariable,
      accessLog: newOS.concurrency.accessLog,
      lockEnabled: true,
    },
  };
};

// Get process tree for visualization
export const getProcessTree = (processes) => {
  const root = processes.find(p => p.parent === null);
  if (!root) return null;

  const buildTree = (process) => ({
    ...process,
    children: processes
      .filter(p => p.parent === process.pid)
      .map(buildTree),
  });

  return buildTree(root);
};
