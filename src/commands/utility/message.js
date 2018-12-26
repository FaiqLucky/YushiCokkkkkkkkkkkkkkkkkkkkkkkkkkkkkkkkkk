const { RichEmbed } = require('discord.js');
const db = require('quick.db');

exports.run = async (client, args, message) => {
   
  let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }

  
  let global = await db.fetch(`globalMessage_${user.id}`);
  let guild = await db.fetch(`guildMessage_${message.guild.id}_${user.id}`);
  
  let msg = new RichEmbed()
  .setDescription(`Global Message: ${global}\nGuildMessage: ${guild}`)
  message.channel.send(msg)
}

exports.conf = {
  aliases: ["msg"],
  cooldown: 5
}

exports.help = {
  name: "message",
  description: "See global message and Guild Message",
  usage: "message [mention]"
}
