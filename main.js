const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const waitOn = require('wait-on');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // ضروري مع بعض إصدارات React
    },
  });

  if (isDev) {
    // إذا كنا في وضع التطوير، ننتظر حتى يعمل React
    const devURL = 'http://localhost:3000';

    waitOn({ resources: [devURL] }, (err) => {
      if (err) {
        console.error('❌ فشل في الوصول إلى React:', err);
        return;
      }
      mainWindow.loadURL(devURL);
      mainWindow.webContents.openDevTools(); // تفتح أدوات المطور تلقائيًا
    });
  } else {
    // في حالة الإنتاج - فتح ملفات React المجمعة
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
