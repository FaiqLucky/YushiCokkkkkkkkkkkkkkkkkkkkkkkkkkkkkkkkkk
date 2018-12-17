const { RichEmbed} = require('discord.js');

exports.run = async (client, message, args) => {
let ic = client.user.avatarURL;
let inv = new RichEmbed()
.setThumbnail(ic)
.setAuthor(`${client.user.tag}Invite`, ic)
.addField('Invite me to your server:', `[Click here](http://bit.ly/YusaInvite)\n`)
message.channel.send(inv)
}

exports.conf = {
  aliases: ['inv'],
  cooldown: 5
  }
  
exports.help = {
name: 'invite',
description: 'Invite me to your server',
usage: 'invite/inv'
}
