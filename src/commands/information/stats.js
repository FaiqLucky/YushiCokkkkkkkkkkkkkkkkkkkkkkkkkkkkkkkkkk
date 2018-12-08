const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  const uptime = parseDur(client.uptime);
  const stats = new Discord.RichEmbed()
  .setColor("RED")
  .setAuthor(`${client.user.tag} Status`)
  .setThumbnail(`${client.user.displayAvatarURL}`)
  .addField(`ID: ${client.user.id}`)
  .addField(`Uptime: ${uptime}`)
  message.channel.send(stats)
}

function parseDur (ms){
	let seconds = ms / 1000;
	let days = parseInt(seconds / 86400);
	seconds = seconds % 86400;
	let hours = parseInt(seconds / 3600);
	seconds = seconds % 3600;
	let minutes = parseInt(seconds / 60);
	seconds = parseInt(seconds % 60);
	let fin = [];
	if(days) fin.push(`${days}d`);
	if(hours) fin.push(`${hours}h`);
	if(minutes) fin.push(`${minutes}m`);
	fin.push(`${seconds}s`);
	return fin.join(' ');
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
