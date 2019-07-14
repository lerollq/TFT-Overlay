import {IpcRenderer, Remote, App, Shell} from 'electron';

declare global {
  interface Window {
    require: (module: 'electron') => {
      ipcRenderer: IpcRenderer
      remote: Remote,
      app:App,
      shell: Shell
    };
  }
}
