import { ipcMain, app } from 'electron';
import { loadDriverMap } from './utils';
import settings from 'electron-settings';

/**
 * Setup all handlers for ipc communication
 */
export const init = () => {
  ipcMain.handle('loadDriverMap', async () => {
    let setting = await settings.get('driver.map-file');
    let mapFileLocation =
      setting || app.getPath('downloads') + '/driver-map.csv';

    // let driverMap = loadDriverMap(app.getPath('downloads') + '/driver-map.csv');
    let driverMap = loadDriverMap(mapFileLocation);

    return driverMap;
  });
};
