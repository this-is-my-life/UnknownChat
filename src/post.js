const api = require('discord.js')
const bot = new api.Client

function resize(obj) {
  obj.style.height = "1px";
  obj.style.height = (12+obj.scrollHeight)+"px";
}

document.getElementById('in-deleteBtn').addEventListener('click', () => {
  document.getElementById('in-MessageBox').value = ''
})

document.getElementById('in-tokenBtn').addEventListener('click', () => {
  bot.login(document.getElementById('in-tokenBox').value)
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