import { contextBridge, ipcRenderer } from 'electron'

// Found here: https://stackoverflow.com/questions/57807459/how-to-use-preload-js-properly-in-electron
contextBridge.exposeInMainWorld( 'api', {
    // send: ( channel, data ) => ipcRenderer.invoke( channel, data ),
    // @ts-ignore
    handle: ( channel, callable, event, data ) => ipcRenderer.on( channel, callable( event, data ) )
} )
