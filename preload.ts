import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld(
  'electronApi',
  {
    ping: () => ipcRenderer.invoke('ping')
  }
);

contextBridge.exposeInMainWorld(
  'nfcApi',
  {
    read: () => ipcRenderer.invoke('nfc-read'),
    write: (data: string) => ipcRenderer.invoke('nfc-write', data),
  }
);
