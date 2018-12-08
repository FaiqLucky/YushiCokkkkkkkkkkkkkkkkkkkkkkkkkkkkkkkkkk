const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const stats = new Discord.RichEmbed()
  .setAuthor(`${client.user.tag} Status`)
  .setThumbnail(`${client.user.displayAvatarURL}`)
  message.channel.send(stats)
}

exports.conf = {
  aliases: ["st"],
  cooldown: 6
}

exports.help = {
  name: "stats",
  description: "Show bot status",
  usage: "status/st"
}
