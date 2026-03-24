import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { findNode } from '../../utils/fileSystem';
import {
  Folder,
  FileText,
  FolderOpen,
  Copy,
  ArrowRight,
  Trash2,
  MapPin,
  List,
  HelpCircle,
  Sparkles,
  GitBranch,
  Play,
  Clock,
  Cpu,
  MemoryStick,
  AlertTriangle,
  Lock,
  Unlock,
  Zap,
} from 'lucide-react';

// File System Tree Visualization
const FileTreeItem = ({ item, depth = 0, isNew, isHighlighted }) => {
  const isFolder = item.type === 'folder';
  const Icon = isFolder ? Folder : FileText;

  return (
    <motion.div
      initial={isNew ? { opacity: 0, x: -20, scale: 0.8 } : false}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`
        flex items-center gap-2 py-1.5 px-2 rounded-lg
        ${isHighlighted ? 'bg-[#cba6f7]/20 ring-1 ring-[#cba6f7]/50' : 'hover:bg-[#313244]/50'}
        ${isNew ? 'ring-2 ring-[#a6e3a1]/50 bg-[#a6e3a1]/10' : ''}
      `}
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
    >
      <Icon
        className={`w-4 h-4 flex-shrink-0 ${
          isFolder ? 'text-[#f9e2af]' : 'text-[#89b4fa]'
        }`}
      />
      <span className={`text-sm ${isFolder ? 'text-[#f9e2af]' : 'text-[#89b4fa]'}`}>
        {item.name}
      </span>
      {isNew && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto text-xs text-[#a6e3a1] font-semibold"
        >
          NEW
        </motion.span>
      )}
    </motion.div>
  );
};

// Recursive file tree renderer
const FileTree = ({ node, depth = 0, newItems = [], highlightedItems = [] }) => {
  if (!node) return null;

  const isNew = newItems.includes(node.name);
  const isHighlighted = highlightedItems.includes(node.name);

  return (
    <div>
      <FileTreeItem
        item={node}
        depth={depth}
        isNew={isNew}
        isHighlighted={isHighlighted}
      />
      {node.type === 'folder' && node.children && (
        <AnimatePresence>
          {node.children.map((child) => (
            <FileTree
              key={child.name}
              node={child}
              depth={depth + 1}
              newItems={newItems}
              highlightedItems={highlightedItems}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

// ==================== FILE SYSTEM ANIMATIONS ====================

const MkdirAnimation = ({ name }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="flex flex-col items-center gap-4"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 0.5, repeat: 2 }}
      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#f9e2af] to-[#fab387]
        flex items-center justify-center shadow-lg shadow-[#f9e2af]/25"
    >
      <Folder className="w-12 h-12 text-[#181825]" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-center"
    >
      <p className="text-lg font-semibold text-[#f9e2af]">{name}</p>
      <p className="text-sm text-[#a6adc8] mt-1">New folder created!</p>
    </motion.div>
  </motion.div>
);

const TouchAnimation = ({ name, updated }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="flex flex-col items-center gap-4"
  >
    <motion.div
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 0.5 }}
      className="w-20 h-24 rounded-xl bg-gradient-to-br from-[#89b4fa] to-[#cba6f7]
        flex items-center justify-center shadow-lg shadow-[#89b4fa]/25 relative"
    >
      <FileText className="w-10 h-10 text-[#181825]" />
      {!updated && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ delay: 0.2 }}
          className="absolute -top-2 -right-2"
        >
          <Sparkles className="w-6 h-6 text-[#a6e3a1]" />
        </motion.div>
      )}
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-center"
    >
      <p className="text-lg font-semibold text-[#89b4fa]">{name}</p>
      <p className="text-sm text-[#a6adc8] mt-1">
        {updated ? 'File timestamp updated!' : 'New file created!'}
      </p>
    </motion.div>
  </motion.div>
);

const LsAnimation = ({ items, path }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full"
  >
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 mb-4 text-sm text-[#a6adc8]"
    >
      <List className="w-4 h-4" />
      <span>Contents of <code className="text-[#a6e3a1]">{path}</code></span>
    </motion.div>

    {items.length === 0 ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-[#6c7086]"
      >
        <FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>This directory is empty</p>
      </motion.div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              p-3 rounded-xl border
              ${item.type === 'folder'
                ? 'bg-[#f9e2af]/5 border-[#f9e2af]/20'
                : 'bg-[#89b4fa]/5 border-[#89b4fa]/20'
              }
            `}
          >
            {item.type === 'folder' ? (
              <Folder className="w-8 h-8 text-[#f9e2af] mb-2" />
            ) : (
              <FileText className="w-8 h-8 text-[#89b4fa] mb-2" />
            )}
            <p className={`text-sm font-medium truncate ${
              item.type === 'folder' ? 'text-[#f9e2af]' : 'text-[#89b4fa]'
            }`}>
              {item.name}
            </p>
          </motion.div>
        ))}
      </div>
    )}
  </motion.div>
);

const CdAnimation = ({ from, to, folderName }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center gap-6"
  >
    <div className="flex items-center gap-4">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.5, scale: 0.9 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-xl bg-[#313244] flex items-center justify-center">
          <Folder className="w-8 h-8 text-[#6c7086]" />
        </div>
        <span className="text-xs text-[#6c7086] mt-2 max-w-[80px] truncate">{from}</span>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          <ArrowRight className="w-8 h-8 text-[#cba6f7]" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#f9e2af] to-[#fab387]
          flex items-center justify-center shadow-lg shadow-[#f9e2af]/25"
        >
          <FolderOpen className="w-10 h-10 text-[#181825]" />
        </div>
        <span className="text-sm font-semibold text-[#f9e2af] mt-2">{to}</span>
      </motion.div>
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="text-sm text-[#a6adc8] text-center"
    >
      Moved into <span className="text-[#f9e2af] font-semibold">{folderName || to}</span>
    </motion.p>
  </motion.div>
);

const CpAnimation = ({ source, dest, sourceType }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center gap-6"
  >
    <div className="flex items-center gap-6">
      <motion.div className="flex flex-col items-center">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
          sourceType === 'folder'
            ? 'bg-gradient-to-br from-[#f9e2af] to-[#fab387]'
            : 'bg-gradient-to-br from-[#89b4fa] to-[#cba6f7]'
        }`}>
          {sourceType === 'folder' ? (
            <Folder className="w-8 h-8 text-[#181825]" />
          ) : (
            <FileText className="w-8 h-8 text-[#181825]" />
          )}
        </div>
        <span className="text-xs text-[#a6adc8] mt-2">{source}</span>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Copy className="w-8 h-8 text-[#cba6f7]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="flex flex-col items-center"
      >
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center
          ring-2 ring-[#a6e3a1]/50 ${
          sourceType === 'folder'
            ? 'bg-gradient-to-br from-[#f9e2af] to-[#fab387]'
            : 'bg-gradient-to-br from-[#89b4fa] to-[#cba6f7]'
        }`}>
          {sourceType === 'folder' ? (
            <Folder className="w-8 h-8 text-[#181825]" />
          ) : (
            <FileText className="w-8 h-8 text-[#181825]" />
          )}
        </div>
        <span className="text-xs text-[#a6e3a1] mt-2 font-semibold">{dest}</span>
      </motion.div>
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="text-sm text-[#a6adc8] text-center"
    >
      Copied <span className="text-[#89b4fa]">{source}</span> to{' '}
      <span className="text-[#a6e3a1]">{dest}</span>
    </motion.p>
  </motion.div>
);

const MvAnimation = ({ source, dest, sourceType, isRename }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center gap-6"
  >
    <div className="flex items-center gap-6">
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 0.3, x: -20 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-[#313244]">
          {sourceType === 'folder' ? (
            <Folder className="w-8 h-8 text-[#6c7086]" />
          ) : (
            <FileText className="w-8 h-8 text-[#6c7086]" />
          )}
        </div>
        <span className="text-xs text-[#6c7086] mt-2 line-through">{source}</span>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ArrowRight className="w-8 h-8 text-[#cba6f7]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="flex flex-col items-center"
      >
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
          sourceType === 'folder'
            ? 'bg-gradient-to-br from-[#f9e2af] to-[#fab387]'
            : 'bg-gradient-to-br from-[#89b4fa] to-[#cba6f7]'
        }`}>
          {sourceType === 'folder' ? (
            <Folder className="w-8 h-8 text-[#181825]" />
          ) : (
            <FileText className="w-8 h-8 text-[#181825]" />
          )}
        </div>
        <span className={`text-xs mt-2 font-semibold ${
          sourceType === 'folder' ? 'text-[#f9e2af]' : 'text-[#89b4fa]'
        }`}>{dest}</span>
      </motion.div>
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="text-sm text-[#a6adc8] text-center"
    >
      {isRename ? 'Renamed' : 'Moved'}{' '}
      <span className="text-[#6c7086]">{source}</span> to{' '}
      <span className={sourceType === 'folder' ? 'text-[#f9e2af]' : 'text-[#89b4fa]'}>{dest}</span>
    </motion.p>
  </motion.div>
);

const RmAnimation = ({ name, itemType }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center gap-6"
  >
    <motion.div
      initial={{ scale: 1, rotate: 0 }}
      animate={{ scale: 0, rotate: 180, opacity: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className={`w-20 h-20 rounded-xl flex items-center justify-center ${
        itemType === 'folder'
          ? 'bg-gradient-to-br from-[#f9e2af] to-[#fab387]'
          : 'bg-gradient-to-br from-[#89b4fa] to-[#cba6f7]'
      }`}
    >
      {itemType === 'folder' ? (
        <Folder className="w-10 h-10 text-[#181825]" />
      ) : (
        <FileText className="w-10 h-10 text-[#181825]" />
      )}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
    >
      <Trash2 className="w-12 h-12 text-[#f38ba8]" />
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="text-sm text-[#a6adc8] text-center"
    >
      Deleted <span className="text-[#f38ba8]">{name}</span>
    </motion.p>
  </motion.div>
);

const PwdAnimation = ({ path }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center gap-4"
  >
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.5 }}
      className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a6e3a1] to-[#94e2d5]
        flex items-center justify-center shadow-lg shadow-[#a6e3a1]/25"
    >
      <MapPin className="w-10 h-10 text-[#181825]" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-center"
    >
      <p className="text-sm text-[#a6adc8]">You are here:</p>
      <p className="text-xl font-mono font-bold text-[#a6e3a1] mt-1">{path}</p>
    </motion.div>
  </motion.div>
);

const HelpAnimation = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center"
  >
    <motion.div
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 0.5 }}
      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#cba6f7] to-[#f5c2e7]
        flex items-center justify-center mx-auto mb-4"
    >
      <HelpCircle className="w-8 h-8 text-[#181825]" />
    </motion.div>
    <p className="text-[#a6adc8]">Command help displayed in terminal</p>
  </motion.div>
);

// ==================== OS CONCEPT ANIMATIONS ====================

// Process Box Component
const ProcessBox = ({ process, isNew = false, isActive = false }) => (
  <motion.div
    initial={isNew ? { scale: 0, opacity: 0 } : false}
    animate={{ scale: 1, opacity: 1 }}
    className={`
      p-3 rounded-xl border-2 min-w-[80px] text-center
      ${isActive ? 'border-[#a6e3a1] bg-[#a6e3a1]/10' : 'border-[#cba6f7] bg-[#cba6f7]/10'}
      ${isNew ? 'ring-2 ring-[#f9e2af]' : ''}
    `}
  >
    <div className="text-xs text-[#6c7086]">PID {process.pid}</div>
    <div className={`text-sm font-semibold ${isActive ? 'text-[#a6e3a1]' : 'text-[#cba6f7]'}`}>
      {process.name}
    </div>
    <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
      process.state === 'running' ? 'bg-[#a6e3a1]/20 text-[#a6e3a1]' :
      process.state === 'ready' ? 'bg-[#f9e2af]/20 text-[#f9e2af]' :
      process.state === 'waiting' ? 'bg-[#89b4fa]/20 text-[#89b4fa]' :
      'bg-[#f38ba8]/20 text-[#f38ba8]'
    }`}>
      {process.state}
    </div>
  </motion.div>
);

// Fork Animation
const ForkAnimation = ({ parent, child, processes }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center gap-6"
  >
    <div className="flex items-center gap-2 text-sm text-[#cba6f7]">
      <GitBranch className="w-4 h-4" />
      <span>Process Fork</span>
    </div>

    <div className="flex items-center gap-8">
      <ProcessBox process={parent} isActive />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.5 }}
        >
          <GitBranch className="w-8 h-8 text-[#f9e2af]" />
        </motion.div>
        <span className="text-xs text-[#6c7086]">fork()</span>
      </motion.div>

      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <ProcessBox process={child} isNew />
      </motion.div>
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="text-sm text-[#a6adc8] text-center"
    >
      Child process <span className="text-[#f9e2af]">PID {child.pid}</span> created from parent{' '}
      <span className="text-[#cba6f7]">PID {parent.pid}</span>
    </motion.p>
  </motion.div>
);

// Exec Animation
const ExecAnimation = ({ pid, oldName, newName, process }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center gap-6"
  >
    <div className="flex items-center gap-2 text-sm text-[#89b4fa]">
      <Play className="w-4 h-4" />
      <span>Program Execution</span>
    </div>

    <div className="flex items-center gap-6">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.3, scale: 0.9 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl border-2 border-[#6c7086] bg-[#313244]"
      >
        <div className="text-xs text-[#6c7086]">PID {pid}</div>
        <div className="text-sm text-[#6c7086] line-through">{oldName}</div>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 0.5, repeat: 2 }}>
          <ArrowRight className="w-8 h-8 text-[#89b4fa]" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        className="p-4 rounded-xl border-2 border-[#89b4fa] bg-[#89b4fa]/10"
      >
        <div className="text-xs text-[#89b4fa]">PID {pid}</div>
        <div className="text-sm font-semibold text-[#89b4fa]">{newName}</div>
        <Zap className="w-4 h-4 text-[#f9e2af] mx-auto mt-1" />
      </motion.div>
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="text-sm text-[#a6adc8] text-center"
    >
      Process replaced with <span className="text-[#89b4fa] font-semibold">{newName}</span>
    </motion.p>
  </motion.div>
);

// Wait Animation
const WaitAnimation = ({ parent, child }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center gap-6"
  >
    <div className="flex items-center gap-2 text-sm text-[#94e2d5]">
      <Clock className="w-4 h-4" />
      <span>Process Synchronization</span>
    </div>

    <div className="flex items-center gap-8">
      <motion.div
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: 2 }}
      >
        <ProcessBox process={{ ...parent, state: 'waiting' }} />
      </motion.div>

      <motion.div className="flex flex-col items-center gap-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Clock className="w-8 h-8 text-[#94e2d5]" />
        </motion.div>
        <span className="text-xs text-[#6c7086]">wait()</span>
      </motion.div>

      {child && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <ProcessBox process={{ ...child, state: 'terminated' }} />
        </motion.div>
      )}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="text-sm text-[#a6adc8] text-center"
    >
      {child ? (
        <>Parent waiting for child <span className="text-[#f38ba8]">PID {child.pid}</span> to terminate</>
      ) : (
        <>Parent process waiting...</>
      )}
    </motion.p>
  </motion.div>
);

// Schedule Animation (Gantt Chart)
const ScheduleAnimation = ({ algorithm, schedule, jobs }) => {
  const colors = ['#cba6f7', '#89b4fa', '#a6e3a1', '#f9e2af', '#f38ba8'];
  const maxTime = Math.max(...schedule.map(s => s.end));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <div className="flex items-center gap-2 mb-4 text-sm text-[#f9e2af]">
        <Cpu className="w-4 h-4" />
        <span>{algorithm} Scheduling</span>
      </div>

      {/* Gantt Chart */}
      <div className="bg-[#11111b] rounded-xl p-4 mb-4">
        <div className="relative h-12">
          {schedule.map((slot, index) => {
            const colorIndex = jobs.findIndex(j => j.name === slot.name) % colors.length;
            const width = ((slot.end - slot.start) / maxTime) * 100;
            const left = (slot.start / maxTime) * 100;

            return (
              <motion.div
                key={`${slot.name}-${slot.start}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.3 }}
                className="absolute h-10 rounded-lg flex items-center justify-center text-xs font-semibold"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  backgroundColor: `${colors[colorIndex]}20`,
                  borderColor: colors[colorIndex],
                  borderWidth: 2,
                  color: colors[colorIndex],
                  transformOrigin: 'left',
                }}
              >
                {slot.name}
                {slot.isPreempted && <span className="ml-1 text-[8px]">⚡</span>}
              </motion.div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="flex justify-between mt-2 text-xs text-[#6c7086]">
          {Array.from({ length: maxTime + 1 }, (_, i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center">
        {jobs.map((job, index) => (
          <div key={job.name} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-[#a6adc8]">{job.name} (burst: {job.burstTime})</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Memory Allocation Animation
const AllocAnimation = ({ block, size, memory }) => {
  const totalSize = memory.total;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <div className="flex items-center gap-2 mb-4 text-sm text-[#a6e3a1]">
        <MemoryStick className="w-4 h-4" />
        <span>Memory Allocation</span>
      </div>

      {/* Memory Bar */}
      <div className="bg-[#11111b] rounded-xl p-4 mb-4">
        <div className="h-16 rounded-lg overflow-hidden flex">
          {memory.blocks.map((b, index) => (
            <motion.div
              key={b.id}
              initial={b.id === block.id ? { scale: 0 } : false}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className={`
                h-full flex items-center justify-center text-xs font-semibold
                border-r border-[#313244] last:border-r-0
                ${b.allocated
                  ? b.id === block.id
                    ? 'bg-[#a6e3a1]/30 text-[#a6e3a1]'
                    : 'bg-[#cba6f7]/30 text-[#cba6f7]'
                  : 'bg-[#313244] text-[#6c7086]'
                }
              `}
              style={{ width: `${(b.size / totalSize) * 100}%` }}
            >
              {b.allocated ? b.process : 'Free'}
              <br />
              <span className="text-[10px] opacity-75">{b.size}MB</span>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between mt-2 text-xs text-[#6c7086]">
          <span>0</span>
          <span>{totalSize}MB</span>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-[#a6adc8] text-center"
      >
        Allocated <span className="text-[#a6e3a1] font-semibold">{size}MB</span> of memory
      </motion.p>
    </motion.div>
  );
};

// Memory Free Animation
const FreeAnimation = ({ freedProcess, freedSize, memory }) => {
  const totalSize = memory.total;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <div className="flex items-center gap-2 mb-4 text-sm text-[#f38ba8]">
        <MemoryStick className="w-4 h-4" />
        <span>Memory Deallocation</span>
      </div>

      {/* Memory Bar */}
      <div className="bg-[#11111b] rounded-xl p-4 mb-4">
        <div className="h-16 rounded-lg overflow-hidden flex">
          {memory.blocks.map((b) => (
            <motion.div
              key={b.id}
              className={`
                h-full flex items-center justify-center text-xs font-semibold
                border-r border-[#313244] last:border-r-0
                ${b.allocated
                  ? 'bg-[#cba6f7]/30 text-[#cba6f7]'
                  : 'bg-[#313244] text-[#6c7086]'
                }
              `}
              style={{ width: `${(b.size / totalSize) * 100}%` }}
            >
              {b.allocated ? b.process : 'Free'}
              <br />
              <span className="text-[10px] opacity-75">{b.size}MB</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-[#a6adc8] text-center"
      >
        Freed <span className="text-[#f38ba8] font-semibold">{freedSize}MB</span> from {freedProcess}
      </motion.p>
    </motion.div>
  );
};

// Race Condition Animation
const RaceAnimation = ({ initialValue, expectedValue, actualValue, accessLog }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full"
  >
    <div className="flex items-center gap-2 mb-4 text-sm text-[#f38ba8]">
      <AlertTriangle className="w-4 h-4" />
      <span>Race Condition Detected!</span>
    </div>

    <div className="bg-[#11111b] rounded-xl p-4 mb-4">
      {/* Access Log */}
      <div className="space-y-2 mb-4">
        {accessLog.map((log, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className={`
              flex items-center gap-3 text-xs p-2 rounded
              ${log.process === 'P1' ? 'bg-[#cba6f7]/10' : 'bg-[#89b4fa]/10'}
            `}
          >
            <span className={`font-semibold ${log.process === 'P1' ? 'text-[#cba6f7]' : 'text-[#89b4fa]'}`}>
              {log.process}
            </span>
            <span className="text-[#6c7086]">T={log.time}</span>
            <span className="text-[#a6adc8]">{log.action}</span>
            {log.value !== undefined && (
              <span className="text-[#f9e2af]">value={log.value}</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Result */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center gap-8 text-center"
      >
        <div>
          <div className="text-xs text-[#6c7086]">Expected</div>
          <div className="text-2xl font-bold text-[#a6e3a1]">{expectedValue}</div>
        </div>
        <div>
          <div className="text-xs text-[#6c7086]">Actual</div>
          <div className="text-2xl font-bold text-[#f38ba8]">{actualValue}</div>
        </div>
      </motion.div>
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="text-sm text-[#f38ba8] text-center"
    >
      One update was lost due to race condition!
    </motion.p>
  </motion.div>
);

// Lock Animation
const LockAnimation = ({ initialValue, finalValue, accessLog, lockEnabled }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full"
  >
    <div className="flex items-center gap-2 mb-4 text-sm text-[#a6e3a1]">
      <Lock className="w-4 h-4" />
      <span>Synchronized Access</span>
    </div>

    <div className="bg-[#11111b] rounded-xl p-4 mb-4">
      {/* Access Log with Lock indicators */}
      <div className="space-y-2 mb-4">
        {accessLog.map((log, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.15 }}
            className={`
              flex items-center gap-3 text-xs p-2 rounded
              ${log.process === 'P1' ? 'bg-[#cba6f7]/10' : 'bg-[#89b4fa]/10'}
              ${log.action.includes('lock') ? 'border border-[#a6e3a1]/30' : ''}
            `}
          >
            <span className={`font-semibold ${log.process === 'P1' ? 'text-[#cba6f7]' : 'text-[#89b4fa]'}`}>
              {log.process}
            </span>
            <span className="text-[#6c7086]">T={log.time}</span>
            {log.action === 'acquire_lock' && <Lock className="w-3 h-3 text-[#a6e3a1]" />}
            {log.action === 'release_lock' && <Unlock className="w-3 h-3 text-[#f9e2af]" />}
            <span className="text-[#a6adc8]">{log.action.replace('_', ' ')}</span>
            {log.value !== undefined && (
              <span className="text-[#f9e2af]">value={log.value}</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Result */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
        className="flex justify-center gap-8 text-center"
      >
        <div>
          <div className="text-xs text-[#6c7086]">Initial</div>
          <div className="text-2xl font-bold text-[#6c7086]">{initialValue}</div>
        </div>
        <div>
          <div className="text-xs text-[#6c7086]">Final</div>
          <div className="text-2xl font-bold text-[#a6e3a1]">{finalValue}</div>
        </div>
      </motion.div>
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="text-sm text-[#a6e3a1] text-center"
    >
      Both updates succeeded with proper synchronization!
    </motion.p>
  </motion.div>
);

// ==================== MAIN COMPONENT ====================

export default function VisualPanel() {
  const { state } = useApp();
  const { fileSystem, currentPath, currentAnimation, animationKey } = state;

  const [newItems, setNewItems] = useState([]);

  // Track new items for highlighting
  useEffect(() => {
    if (currentAnimation?.type === 'mkdir') {
      setNewItems([currentAnimation.name]);
      const timer = setTimeout(() => setNewItems([]), 2000);
      return () => clearTimeout(timer);
    }
    if (currentAnimation?.type === 'touch' && !currentAnimation.updated) {
      setNewItems([currentAnimation.name]);
      const timer = setTimeout(() => setNewItems([]), 2000);
      return () => clearTimeout(timer);
    }
    if (currentAnimation?.type === 'cp') {
      setNewItems([currentAnimation.dest]);
      const timer = setTimeout(() => setNewItems([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentAnimation, animationKey]);

  // Get current directory for tree view
  const currentDir = findNode(fileSystem, currentPath) || fileSystem;

  // Check if animation is OS-related
  const isOSAnimation = currentAnimation && [
    'fork', 'exec', 'wait', 'schedule', 'alloc', 'free', 'race', 'lock', 'alloc_fail'
  ].includes(currentAnimation.type);

  // Render animation based on type
  const renderAnimation = () => {
    if (!currentAnimation) return null;

    switch (currentAnimation.type) {
      // File system animations
      case 'mkdir':
        return <MkdirAnimation name={currentAnimation.name} />;
      case 'touch':
        return <TouchAnimation name={currentAnimation.name} updated={currentAnimation.updated} />;
      case 'ls':
        return <LsAnimation items={currentAnimation.items} path={currentAnimation.path} />;
      case 'cd':
        return <CdAnimation {...currentAnimation} />;
      case 'cp':
        return <CpAnimation {...currentAnimation} />;
      case 'mv':
        return <MvAnimation {...currentAnimation} />;
      case 'rm':
        return <RmAnimation {...currentAnimation} />;
      case 'pwd':
        return <PwdAnimation path={currentAnimation.path} />;
      case 'help':
        return <HelpAnimation />;

      // OS animations
      case 'fork':
        return <ForkAnimation {...currentAnimation} />;
      case 'exec':
        return <ExecAnimation {...currentAnimation} />;
      case 'wait':
        return <WaitAnimation {...currentAnimation} />;
      case 'schedule':
        return <ScheduleAnimation {...currentAnimation} />;
      case 'alloc':
        return <AllocAnimation {...currentAnimation} />;
      case 'alloc_fail':
        return <AllocAnimation {...currentAnimation} />;
      case 'free':
        return <FreeAnimation {...currentAnimation} />;
      case 'race':
        return <RaceAnimation {...currentAnimation} />;
      case 'lock':
        return <LockAnimation {...currentAnimation} />;

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#181825] rounded-xl border border-[#313244] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e2e] border-b border-[#313244]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#cba6f7]" />
          <span className="text-sm font-semibold text-[#cdd6f4]">Visual Feedback</span>
        </div>
        <span className="text-xs text-[#6c7086] font-mono">
          {currentPath.length > 0 ? `~/${currentPath.join('/')}` : '~'}
        </span>
      </div>

      {/* Animation Area */}
      <div className="flex-1 flex items-center justify-center p-6 min-h-[200px] overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={animationKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            {currentAnimation ? (
              renderAnimation()
            ) : (
              <div className="text-center text-[#6c7086]">
                <FolderOpen className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Enter a command to see it visualized</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* File Tree - Only show for file system operations */}
      {!isOSAnimation && (
        <div className="border-t border-[#313244]">
          <div className="px-4 py-2 bg-[#1e1e2e]">
            <span className="text-xs text-[#6c7086]">File System</span>
          </div>
          <div className="p-2 max-h-[200px] overflow-y-auto">
            <FileTree node={currentDir} newItems={newItems} />
          </div>
        </div>
      )}
    </div>
  );
}
