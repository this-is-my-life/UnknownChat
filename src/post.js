const api = require('discord.js')
const bot = new api.Client
const { ipcRenderer } = require('electron')

function resize(obj) {
  obj.style.height = "1px";
  obj.style.height = (12+obj.scrollHeight)+"px";
}

document.getElementById('in-deleteBtn').addEventListener('click', () => {
  document.getElementById('in-MessageBox').value = ''
})

document.getElementById('in-tokenBtn').addEventListener('click', () => {
  ipcRenderer.send('ipc-loginedFromPost', document.getElementById('in-tokenBox').value)
  bot.login(document.getElementById('in-tokenBox').value)
})

ipcRenderer.on('webContnent-logined', (event, args) => {
  document.getElementById('in-tokenBox').value = args
  bot.login(args)
})

bot.on('ready', () => {
  document.getElementById('in-sendBtn').addEventListener('click', () => {
    if (bot.channels.get(document.getElementById('in-channelBox').value)) {
      bot.channels.get(document.getElementById('in-channelBox').value).send(document.getElementById('in-MessageBox').value)
    } else if (bot.users.get(document.getElementById('in-channelBox').value)) {
      bot.users.get(document.getElementById('in-channelBox').value).send(document.getElementById('in-MessageBox').value)
    }
  })
})