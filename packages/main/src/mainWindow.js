import { BrowserWindow } from 'electron';
import { join } from 'path';
import { URL } from 'url';
import { F1TelemetryClient, constants } from '@racehub-io/f1-telemetry-client';
import { mergeData } from './utils';
import { app } from 'electron';
import fs from 'fs';

const { PACKETS } = constants;

let session = {};
let lapData = {};
let drivers = {};
let lapHistory = [];
let events = [];
let fastestLap;
/*
 *   'port' is optional, defaults to 20777
 *   'bigintEnabled' is optional, setting it to false makes the parser skip bigint values,
 *                   defaults to true
 *   'forwardAddresses' is optional, it's an array of Address objects to forward unparsed telemetry to. each address object is comprised of a port and an optional ip address
 *                   defaults to undefined
 *   'skipParsing' is optional, setting it to true will make the client not parse and emit content. You can consume telemetry data using forwardAddresses instead.
 *                   defaults to false
 */
// TODO: use app settings here
const client = new F1TelemetryClient({ port: 20777 });
client.on(PACKETS.event, (data) => {
  events.push(data);
  if (data.m_eventStringCode === 'FTLP') {
    // TODO: This event doesn't seem to be firing from our client (bug?)
    console.log(data);
    fastestLap = data.m_eventDetails.lapTime;
  }
});
// client.on(PACKETS.motion, console.log);
// client.on(PACKETS.carSetups, console.log);
client.on(PACKETS.lapData, (data) => (lapData = data));
client.on(PACKETS.session, (data) => (session = data));
client.on(PACKETS.participants, (data) => (drivers = data));
// client.on(PACKETS.carTelemetry, console.log);
// client.on(PACKETS.carStatus, console.log);
client.on(PACKETS.finalClassification, (data) =>
  handleFinalClassification(data),
);
// client.on(PACKETS.lobbyInfo, console.log);
// client.on(PACKETS.carDamage, console.log);
client.on(PACKETS.sessionHistory, (data) => {
  lapHistory[data.m_carIdx] = data;
});

function handleFinalClassification(data) {
  console.log('writing final data');
  const driverData = mergeData(
    lapData.m_lapData,
    drivers.m_participants,
    lapHistory,
    data.m_classificationData,
  );

  const raceData = {
    driverData,
    session,
  };

  const downloadPath = app.getPath('downloads');
  // TODO: use session id in name
  const fileLocation = `${downloadPath}/race.json`;

  BigInt.prototype['toJSON'] = function () {
    return this.toString();
  };
  fs.writeFileSync(fileLocation, JSON.stringify(raceData));

  console.log(`Race data written to ${fileLocation}`);
}

async function createWindow() {
  const browserWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();

    client.start();

    setInterval(() => {
      browserWindow?.webContents.send('session', session);
    }, 10000);

    setInterval(() => {
      // Merge drivers and other data together by driver
      let merged = mergeData(
        lapData.m_lapData,
        drivers.m_participants,
        lapHistory,
      );
      browserWindow?.webContents.send('drivers', merged);
      browserWindow?.webContents.send('fastestLap', fastestLap);
    }, 2000);

    // if (import.meta.env.DEV) {
    //   browserWindow?.webContents.openDevTools();
    // }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL(
          '../renderer/dist/index.html',
          'file://' + __dirname,
        ).toString();

  await browserWindow.loadURL(pageUrl);

  return browserWindow;
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
