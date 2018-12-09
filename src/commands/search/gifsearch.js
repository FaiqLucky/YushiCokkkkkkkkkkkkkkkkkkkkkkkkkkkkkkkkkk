const Discord = require("discord.js");
const gifSearch = require("gif-search");

exports.run = (bot, message, args) => {
  

    if (!args[0]) return message.channel.send("yu!gif <gname>`");

    gifSearch.random(args[0]).then(gifUrl => {

        let randomcolor = ((1 << 24) * Math.random() | 0).toString(16) 
        var embed = new Discord.RichEmbed()
            .setColor(`#${randomcolor}`)
            .setImage(gifUrl)
        message.channel.send(embed);
    });
  };

exports.conf = {
    aliases: ["gs"],
    cooldown: 10
}

exports.help = {
  name: "gifsearch",
  description: "To find gif image",
  usage: "gifsearch <gifname>"
}
