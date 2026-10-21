const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const db = require("./database/database");

ipcMain.handle("app:get-message", () => {
  return "Message from the main process";
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "RestoDash POS",
    icon: path.join(__dirname, "..", "build", "restodash.png"),
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, "..", "renderer", "dist", "index.html"));
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  // Receive data from renderer
  ipcMain.handle("get-user", async (event, userId) => {
    console.log("User ID received:", userId);

    // Imagine this came from a database
    return {
      id: userId,
      name: "Theekshana",
      role: "Admin"
    };
  });

  ipcMain.handle("get-users", async (event) => {
    const stmt = db.prepare("SELECT * FROM users");
    const users = stmt.all();
    return users;
  })
});



app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});