// Virtual File System for the Shell Simulator

export const createInitialFileSystem = () => ({
  name: '~',
  type: 'folder',
  children: [],
});

// Find a node by path
export const findNode = (root, pathParts) => {
  if (pathParts.length === 0 || (pathParts.length === 1 && pathParts[0] === '')) {
    return root;
  }

  let current = root;
  for (const part of pathParts) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      // Go to parent - handled by caller
      return null;
    }
    if (current.type !== 'folder') return null;
    const child = current.children.find(c => c.name === part);
    if (!child) return null;
    current = child;
  }
  return current;
};

// Get parent path parts
export const getParentPath = (pathParts) => {
  if (pathParts.length <= 1) return [];
  return pathParts.slice(0, -1);
};

// Parse path into parts
export const parsePath = (path, currentPath) => {
  if (path.startsWith('~') || path.startsWith('/')) {
    // Absolute path
    return path.replace(/^[~\/]+/, '').split('/').filter(Boolean);
  }
  // Relative path
  const parts = [...currentPath];
  const segments = path.split('/');

  for (const segment of segments) {
    if (segment === '' || segment === '.') continue;
    if (segment === '..') {
      if (parts.length > 0) parts.pop();
    } else {
      parts.push(segment);
    }
  }
  return parts;
};

// Create a deep copy of the file system
export const cloneFileSystem = (node) => {
  if (node.type === 'file') {
    return { ...node };
  }
  return {
    ...node,
    children: node.children.map(child => cloneFileSystem(child)),
  };
};

// Add a child to a folder
export const addChild = (parent, child) => {
  if (parent.type !== 'folder') {
    return { success: false, error: 'Not a directory' };
  }
  if (parent.children.some(c => c.name === child.name)) {
    return { success: false, error: `'${child.name}' already exists` };
  }
  parent.children.push(child);
  parent.children.sort((a, b) => {
    // Folders first, then alphabetically
    if (a.type !== b.type) {
      return a.type === 'folder' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
  return { success: true };
};

// Remove a child from a folder
export const removeChild = (parent, childName) => {
  if (parent.type !== 'folder') {
    return { success: false, error: 'Not a directory' };
  }
  const index = parent.children.findIndex(c => c.name === childName);
  if (index === -1) {
    return { success: false, error: `'${childName}' not found` };
  }
  const removed = parent.children.splice(index, 1)[0];
  return { success: true, removed };
};

// Get the current path as a string
export const getPathString = (pathParts) => {
  if (pathParts.length === 0) return '~';
  return '~/' + pathParts.join('/');
};

// Validate filename
export const isValidName = (name) => {
  if (!name || name.length === 0) return false;
  if (name === '.' || name === '..') return false;
  if (name.includes('/')) return false;
  if (name.length > 255) return false;
  return true;
};
