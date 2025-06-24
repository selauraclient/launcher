const { app, BrowserWindow, ipcMain } = require('electron');
const remoteMain = require('@electron/remote/main');
const RPC = require('discord-rpc-electron');
const path = require('path');
const ipc = ipcMain;

remoteMain.initialize();

const discordClientID = "1307731582420910193";
const rpc = new RPC.Client({ transport: 'ipc' });

if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	let mainWindow;

	mainWindow = new BrowserWindow({
		width: 1000,
		height: 650,
		title: "Selaura Launcher",
		autoHideMenuBar: true,
		frame: false,
		titleBarStyle: 'customButtonsOnHover',
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
			devTools: true,
		}
	});

	remoteMain.enable(mainWindow.webContents);

	mainWindow.loadFile(path.join(__dirname, "index.html"));

	ipc.on('closeApp', () => {
		mainWindow.close()
	})

	ipc.on('minimizeApp', () => {
		mainWindow.minimize()
	})

	ipc.on('maximizeRestoreApp', () => {
		if (mainWindow.isMaximized()) {
			mainWindow.restore()
		} else {
			mainWindow.maximize()
		}
	})

};

function setActivity() {
	if (!rpc) return;
  
	rpc.setActivity({
	  details: 'Playing Selaura Client',
	  state: 'In the Launcher',
	  startTimestamp: new Date(),
	  largeImageKey: 'app_large_icon',
	  largeImageText: 'Playing Selaura Client',
	  instance: false,
	});
  }

  
app.on('ready', () => {
	setActivity();
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

rpc.login({ clientId: discordClientID }).catch(console.error);
