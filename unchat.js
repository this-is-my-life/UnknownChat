const electron = require('electron')
const app = electron.app
const path = require('path')
let mainWindow

app.on('ready', () => {
  openBoardWindow()
})

app.on('activate', () => {
  if (!mainWindow) {
    openBoardWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function openBoardWindow () {
  let mainWindow = new electron.BrowserWindow({
    height: 600,
    width: 577,
    maxWidth: 577,
    minWidth: 400,
    minHeight: 400
  })
  mainWindow.setMenu(null)
  mainWindow.loadFile(path.join(__dirname, './src/main.html'))
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
