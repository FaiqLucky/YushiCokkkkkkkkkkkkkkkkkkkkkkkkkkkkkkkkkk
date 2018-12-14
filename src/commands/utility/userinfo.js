const Discord = require('discord.js');
const moment = require("moment");

exports.run = async (client, message, args) => {

    
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    const member = message.guild.member(user);
  

    const embed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setThumbnail(user.avatarURL)
		.setTitle(`${user.username}#${user.discriminator}`)
		.addField("ID:", `${user.id}`, true)
    .addField("AKA:", `${member.nickname !== null ? `${member.nickname}` : `NONE`}`, true)
		.addField("Created At:", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
		.addField("Joined Server:", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
		.addField("Status:", `${status[user.presence.status]}`, true)
		.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
    .addField("Roles:", member.roles.map(roles => roles).join(', '), true)
	
    
    message.channel.send(embed)
    }

exports.conf = {
  aliases: ["uinfo", "ui"],
  cooldown: "3"
}
module.exports.help = {
  name: "userinfo",
  description: "To see user status",
  usage: "userinfo/ui/uinfo [mention/tag]"
}
