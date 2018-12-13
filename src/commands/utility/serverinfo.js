const Discord =  require('discord.js');
const moment = require('moment');
const momentDurationFormat = require('moment-duration-format');
var verificationLevels = ['**None**', '**Low**', '**Medium**', '**(╯°□°）╯︵ ┻━┻** (High)', '**┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻** (Extreme)'];
var region = { 
    "brazi": "Brazil",
    "eu-central": "Central Europe",
    "singapore": "Singapore",
    "us-central": "U.S. Central",
    "sydney": "Sydney",
    "us-east": "U.S. East",
    "us-south": "U.S. South",
    "us-west": "U.S. West",
    "eu-west": "Western Europe",
    "singapore": "Singapore",
    "london": "London",
    "japan": "Japan",
    "russia": "Russia",
    "hongkong": "Hong Kong"
  }
 

exports.run = async (client, message, args) => {
  let cate = message.guild.channels.filter(x=>x.type ==='category').size;
  let txt = message.guild.channels.filter(x=>x.type ==='text').size;
  let vc = message.guild.channels.filter(x=>x.type ==='voice').size;
  let si = message.guild.iconURL;
  let se = new Discord.RichEmbed()
  let emoji = message.guild.emojis.map(e => e).join(' ');
  .setAuthor(`${message.guild.name}`, si)
  .setThumbnail(si)
  .setDescription(`**ID:** \`${message.guild.id}\`\n**Guild Owner:** ${message.guild.owner.user.tag}`)
  .addField(`Guild Verification Levels:`, `${verificationLevels[message.guild.verificationLevel]}`)
  .addField(`Guild Region:`, `${region[message.guild.region]}`)
  .addField(`Create At:`, `${moment(message.guild.createdAt).utcOffset('+0700').format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
  .addField(`Members [ ${message.guild.members.size} ]`, `${message.guild.members.filter(o => o.presence.status === 'online').size} Online\n${message.guild.members.filter(i => i.presence.status === 'idle').size} Idle\n${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size} Dnd\n${message.guild.members.filter(off => off.presence.status === 'offline').size} Offline\Invisible`)  
  .addField(`Channels [ ${message.guild.channels.size} ]`, `${cate} Categories\n ${txt} Text\n ${vc} Voice`)
  .addField(`Roles [ ${message.guild.roles.size} ]`, `To see list role use **yu!serverroles/yu!srl**`)
  .addField(`Emojis [ ${message.guild.emojis.size} ]`, `${emoji}`)
  
  message.channel.send(se);
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
