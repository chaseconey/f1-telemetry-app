import { ipcMain } from 'electron';
import { loadDriverMap } from './utils';
import settings from 'electron-settings';

/**
 * Setup all handlers for ipc communication
 */
export const init = () => {
  ipcMain.handle('loadDriverMap', async () => {
    let mapFileLocation = await settings.get('driver.map-file');

    if (mapFileLocation) {
      return loadDriverMap(mapFileLocation);
    }
  });
};
