const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const path = require('path');
const isDev = require('electron-is-dev');

// app.disableHardwareAcceleration();

let mainWindow;

function createWindow() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    transparent: true,
    width:width,
    frame:false,
    webPreferences:{
      nodeIntegration:true,
    }
  });
  mainWindow.loadURL(isDev ? `http://localhost:3000` : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // mainWindow.webContents.openDevTools();
  }

  mainWindow.show();
  mainWindow.setPosition(0, 0);
  mainWindow.setIgnoreMouseEvents(true, {forward:true});
  mainWindow.setAlwaysOnTop(true);
  mainWindow.isMenuBarVisible(false);
  mainWindow.on('closed', () => mainWindow = null );

}
app.on('ready', () => setTimeout(createWindow, 500));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


ipc.on('set-ignore-mouse-events', function (ev, args, args2) {
  ev.preventDefault();
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(args, {forward: true});
  }
})

ipc.on('onMouseEnter', function(ev) {
  ev.preventDefault();
  if (mainWindow) {
    mainWindow.setOpacity(1);
  }
})

ipc.on('onMouseLeave', function(ev) {
  ev.preventDefault();
  if (mainWindow) {
    mainWindow.setOpacity(0.4);
  }
})

