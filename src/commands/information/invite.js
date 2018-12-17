const { RichEmbed} = require('discord.js');

exports.run = async (client, message, args) => {
let ic = client.user.avatarURL;
let inv = new RichEmbed()
.setThumbnail(ic)
.setAuthor(`${client.user.tag}Invite`, ic)
.setDescription("Invite me to your guild", `[Invite me](http://bit.ly/YusaInvite)`)
message.channel.send(inv)
}

exports.conf = {
  alises: ['inv'],
  cooldown: 5
  }
  
exports.help = {
name: 'invite',
description: 'Invite me to your server'
usage: 'invite/inv'
}
