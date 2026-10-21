const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getUser: (userId) => {
    console.log("Requesting user with ID:", userId);
    return ipcRenderer.invoke("get-user", userId);
  },
  getUsers: () => {
    console.log("Requesting all users");
    return ipcRenderer.invoke("get-users");
  }
});
