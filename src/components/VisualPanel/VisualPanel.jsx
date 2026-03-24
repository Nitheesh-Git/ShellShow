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

// Animation Components for different commands

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
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="h-1 bg-gradient-to-r from-transparent via-[#a6e3a1] to-transparent rounded-full max-w-[200px]"
    />
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
      <motion.div
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
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-[#313244]`}>
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

// Main Visual Panel Component
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

  // Render animation based on type
  const renderAnimation = () => {
    if (!currentAnimation) return null;

    switch (currentAnimation.type) {
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
      <div className="flex-1 flex items-center justify-center p-6 min-h-[200px]">
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

      {/* File Tree */}
      <div className="border-t border-[#313244]">
        <div className="px-4 py-2 bg-[#1e1e2e]">
          <span className="text-xs text-[#6c7086]">File System</span>
        </div>
        <div className="p-2 max-h-[200px] overflow-y-auto">
          <FileTree node={currentDir} newItems={newItems} />
        </div>
      </div>
    </div>
  );
}
