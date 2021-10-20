const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const keytar = require("keytar");
const { KeyboardTabSharp } = require("@mui/icons-material");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 927,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: isDev,
      preload : path.join(__dirname, "..", "preload.js")
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.setResizable(true);
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.focus();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("setToken", (event, token)=>{
  keytar.setPassword("peetsunbae", "koyongbeom@gmail.com", token).then(result =>{
    event.returnValue = result;
  })
})

ipcMain.on("getToken", (event)=>{
  keytar.getPassword("peetsunbae", "koyongbeom@gmail.com").then(result=>{
    event.returnValue = result;
  })
})