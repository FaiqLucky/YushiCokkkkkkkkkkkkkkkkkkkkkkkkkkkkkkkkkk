const Discord = require("discord.js"); 

module.exports.run = async (client, message, args) => { 
const m = await message.channel.send("Ping?");

let E = new Discord.RichEmbed() 
.setTitle("Pong! ⏱") 
.addField("Latency", `${m.createdTimestamp - message.createdTimestamp}ms`) 
.addField("API Latency", `${Math.round(client.ping)}ms`) 

return message.channel.send("***Please wait...***").then(async msg => {
                        setTimeout(() => {
                            msg.edit(E);
                        }, 1000); 
        });

  } 

  exports.conf = {
    aliases: ["peng", "pung"],
    cooldown: "0"
  }
exports.help = {
    name: 'ping',
    description: 'See Ping Bot',
usage: "ping"
}
