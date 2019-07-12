import {IpcRenderer, Remote} from 'electron';

declare global {
  interface Window {
    require: (module: 'electron') => {
      ipcRenderer: IpcRenderer
      remote: Remote,
    };
  }
}
