const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('./store.js');
let mainWindow;



// const store = new Store({
//   configName: 'user-preferences',
//   defaults: {
//     focusOpacity:0.1,
//     bluropacity:0.3,
//     windowBounds: { width: 800, height: 600 }
//   }
// });

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'userpreferences',
  defaults: {
    blurOpacity:0.4,
    focusOpacity:0.6,
    autoHide:true,
  }
});

// store.set('background', "#f54489");
// store.set('bluropacity', 0.2)

function createWindow() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    transparent: true,
    width:width/2,
    alwaysOnTop:true,
    frame:false,
    webPreferences:{
      nodeIntegration:true,
    }
  });
  if (isDev) {
    // mainWindow.webContents.openDevTools();
  }
  mainWindow.setOpacity(store.get("blurOpacity"))
  mainWindow.setPosition(0, 20);
  mainWindow.setIgnoreMouseEvents(true, {forward:true});
  mainWindow.isMenuBarVisible(false);
  mainWindow.loadURL(isDev ? `http://localhost:3000` : `file://${path.join(__dirname, '../build/index.html')}`);
  
  mainWindow.on('closed', () => mainWindow = null );
}


app.on('ready', createWindow);

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


ipcMain.on('set-ignore-mouse-events', function (ev, args, args2) {
  ev.preventDefault();
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(args, {forward: true});
  }
})

ipcMain.on('onMouseEnter', function(ev) {
  ev.preventDefault();
  if (mainWindow) {
    mainWindow.setOpacity(store.get("focusOpacity"));
  }
})

ipcMain.on('onMouseLeave', function(ev) {
  ev.preventDefault();
  if (mainWindow) {
    mainWindow.setOpacity(store.get("blurOpacity"));
    // mainWindow.setFocusable(false)
  }
})

ipcMain.on('setFocusOpacity', function(ev, arg) {
  if (mainWindow) {
    store.set("focusOpacity", Number(arg));
    mainWindow.setOpacity(Number(arg));
  }
})

ipcMain.on('getFocusOpacity', function(ev) {
  ev.returnValue = store.get("focusOpacity");
})

ipcMain.on("setAutoHide", function(ev, arg) {
  store.set("autoHide", arg);  
})

ipcMain.on('getAutoHide', function(ev) {
  ev.returnValue = store.get("autoHide");
})
