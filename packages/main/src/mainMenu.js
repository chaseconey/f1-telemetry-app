const isMac = process.platform === 'darwin';

export const menuConfig = [
  { role: 'appMenu' },
  {
    label: 'File',
    submenu: [
      { label: 'Load Driver Map' },
      isMac ? { role: 'close' } : { role: 'quit' },
    ],
  },
  { role: 'viewMenu' },
  { role: 'windowMenu' },
];
