const electron = require('electron')
const app = electron.app
const path = require('path')
let postWindow
let getWindow

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
    height: 600,
    width: 577,
    maxWidth: 577,
    minWidth: 400,
    minHeight: 400
  })
  postWindow.setMenu(null)
  postWindow.loadFile(path.join(__dirname, './src/post.html'))
  postWindow.on('closed', () => {
    postWindow = null
  })
  let getWindow = new electron.BrowserWindow({
    height: 600,
    width: 577,
    maxWidth: 577,
    minWidth: 400,
    minHeight: 400
  })
  getWindow.setMenu(null)
  getWindow.loadFile(path.join(__dirname, './src/get.html'))
  getWindow.on('closed', () => {
    getWindow = null
  })
}
