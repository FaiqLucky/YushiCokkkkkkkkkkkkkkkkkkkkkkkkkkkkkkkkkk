const Discord =  require('discord.js');

exports.run = async (client, messsage, args) => {
  let si = message.guild.iconURL;
  let se = new Discord.RichEmbed()
  .setAuthor(`${message.guild.name}`, si)
  .setThumbnail(si)
  messsage.channel.send(se);
};

exports.conf = {
  aliases: ["si"],
  cooldown: 10
 }
 
 exports.help = {
   name: "serverinfo",
   description: "Show guild status",
   usage: "serverinfo/si"
  }
