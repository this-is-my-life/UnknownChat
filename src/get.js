const api = require('discord.js')
const bot = new api.Client
const { ipcRenderer } = require('electron')

document.getElementById('in-readMessageFromDM').checked = true
document.getElementById('in-readMessageFromServer').checked = true

document.getElementById('in-tokenBtn').addEventListener('click', () => {
  ipcRenderer.send('ipc-loginedFromGet', document.getElementById('in-tokenBox').value)
  bot.login(document.getElementById('in-tokenBox').value)
})

ipcRenderer.on('webContnent-logined', (event, args) => {
  document.getElementById('in-tokenBox').value = args
  bot.login(args)
})

bot.on('ready', () => {
  document.getElementById('in-MessageBox').value += '[로그인 완료... 메세지를 기다리는중...]\n\n'
})

bot.on('message', (message) => {
  if (message.author.id !== bot.user.id) {
    if (document.getElementById('in-readMessageFromDM').checked && !message.guild) {
      document.getElementById('in-MessageBox').value += (message.author.username + ' (' + message.author.id + ') \n' + message.content + '\n\n')
    }
    if (document.getElementById('in-readMessageFromServer').checked && message.guild) {
      document.getElementById('in-MessageBox').value += (message.author.username + ' (' + message.author.id + ') \n' + message.content + '\n\n')
    }
  }
})