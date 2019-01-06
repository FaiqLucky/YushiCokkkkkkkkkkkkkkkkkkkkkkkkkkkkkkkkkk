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
  let ava = message.user.displayAvatarURL;

    const embed = new Discord.RichEmbed()
	.setColor('RANDOM')
	.setThumbnail(user.avatarURL)
	.setAuthor(`${message.author.tag}`, ava)
	.addField("ID:", `${user.id}`)
        .addField("AKA:", `${member.nickname !== null ? `${member.nickname}` : `NONE`}`)
	.addField("Created At:", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
	.addField("Joined Server:", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
	.addField("Status:", `${user.presence.status}`)
	.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`)
        .addField("Roles:", member.roles.map(roles => roles).join(', '))
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
