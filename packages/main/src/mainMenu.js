import { app, dialog } from 'electron';

const isMac = process.platform === 'darwin';

export const menuConfig = [
  { role: 'appMenu' },
  {
    label: 'File',
    submenu: [
      {
        label: 'Load Driver Map',
        click: async () => {
          let file = await dialog.showOpenDialog({
            defaultPath: app.getPath('home'),
          });

          if (!file.canceled) {
            let mapFile = JSON.parse(file.filePaths[0]);
            console.log(mapFile);
          }
        },
      },
      isMac ? { role: 'close' } : { role: 'quit' },
    ],
  },
  { role: 'viewMenu' },
  { role: 'windowMenu' },
];
