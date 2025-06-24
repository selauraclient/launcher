var { ipcRenderer } = require('electron');

minimizeBtn.addEventListener('click', () => {
	ipcRenderer.send("minimizeApp");
});

closeBtn.addEventListener('click', () => {
	ipcRenderer.send('closeApp');
});

maximizeBtn.addEventListener('click', () => {
	ipcRenderer.send('maximizeRestoreApp');
});