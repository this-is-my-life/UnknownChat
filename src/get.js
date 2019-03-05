const api = require('discord.js')
const bot = new api.Client

document.getElementById('in-tokenBtn').addEventListener('click', () => {
  bot.login(document.getElementById('in-tokenBox').value)
})

bot.on('ready', () => {
  document.getElementById('in-MessageBox').value += '[로그인 완료... 메세지를 기다리는중...]\n\n'
})

bot.on('message', (message) => {
  if (message.author.id !== bot.user.id) {
    document.getElementById('in-MessageBox').value += (message.author.username + ' (' + message.author.id + ') \n' + message.content + '\n\n')
  }
})