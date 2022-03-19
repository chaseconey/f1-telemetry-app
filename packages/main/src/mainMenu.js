import { app, dialog } from 'electron';
import settings from 'electron-settings';

const isMac = process.platform === 'darwin';

export const menuConfig = [
  { role: 'appMenu' },
  {
    label: 'File',
    submenu: [
      {
        label: 'Load Driver Map',
        click: async () => {
          let setting = await settings.get('driver.map-file');

          let file = await dialog.showOpenDialog({
            defaultPath: setting || app.getPath('home'),
          });

          if (!file.canceled) {
            settings.setSync('driver.map-file', file.filePaths[0]);
          }
        },
      },
      isMac ? { role: 'close' } : { role: 'quit' },
    ],
  },
  { role: 'viewMenu' },
  { role: 'windowMenu' },
];
