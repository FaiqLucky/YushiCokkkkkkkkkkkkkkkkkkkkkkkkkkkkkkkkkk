const Discord =  require('discord.js');
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
  .setAuthor(`${message.guild.name}`, si)
  .setThumbnail(si)
  .setDescription(`**ID:** \`${message.guild.id}\`\n**Guild Owner:** ${message.guild.owner.user.tag}`)
  .addField("Guild Verification Levels:", `${verificationLevels[message.guild.verificationLevel]}`, true)
  .addField("Guild Region:", `${region[message.guild.region]}`, true)
  .addField(`Channels [ ${message.guild.channels.size} ]`, `${cate} Categories\n ${txt} Text\n ${vc} Voice`)
  
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
