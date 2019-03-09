const electron = require('electron')
const app = electron.app
const ipcMain = electron.ipcMain
const path = require('path')
let postWindow

app.on('ready', () => {
  openBoardWindow()
})

app.on('activate', () => {
  if (!postWindow) {
    openBoardWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function openBoardWindow () {
  let postWindow = new electron.BrowserWindow({
    height: 650,
    width: 577,
    maxWidth: 577,
    minWidth: 400,
    minHeight: 400
  })
  postWindow.setPosition(400, 200)
  postWindow.setMenu(null)
  postWindow.loadFile(path.join(__dirname, './src/post.html'))
  postWindow.on('closed', () => {
    postWindow = null
  })
  let getWindow = new electron.BrowserWindow({
    height: 650,
    width: 577,
    maxWidth: 577,
    minWidth: 400,
    minHeight: 400
  })
  getWindow.setPosition(1000, 200)
  getWindow.setMenu(null)
  getWindow.loadFile(path.join(__dirname, './src/get.html'))
  getWindow.on('closed', () => {
    getWindow = null
  })
  ipcMain.on('ipc-loginedFromGet', (event, args) => {
    postWindow.webContents.send('webContnent-logined', args)
  })

  ipcMain.on('ipc-loginedFromPost', (event, args) => {
    getWindow.webContents.send('webContnent-logined', args)
  })
}
