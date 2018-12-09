const Discord = require('discord.js')


exports.run = (client, message, args, tools) => {

var images = ["http://gifimage.net/wp-content/uploads/2017/09/anime-pat-gif-8.gif", "https://i.imgur.com/4ssddEQ.gif", "https://tenor.com/view/kanna-dragonmaid-dragon-maid-misskobayashi-gif-8053566"];
var rand = Math.floor(Math.random() * images.length);
var randomImage = images[rand];

const patEmb = new Discord.RichEmbed()
.setColor("RANDOM")
.setImage(randomImage)

const sadEmb = new Discord.RichEmbed()
.setColor("RANDOM")
.setImage('https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif')

if(!args[0]) {
  message.channel.send(`<@${message.author.id}> pat <@${message.author.id}>.. Oh wait! You can't pat yourself!`, {embed: sadEmb});
  return;
}

if (!message.mentions.users.first()) return message.channel.send(`Please mention someone!`).then(msg => {
    msg.delete(3000)
  });
message.channel.send(`**${message.author.username}** pat ${args[0]}`, {embed: patEmb});


}
exports.conf = {
  aliases: [],
  cooldown: "10"
}
module.exports.help = {
  name: "pat",
  description: "Give pat to people",
  usage: "pat"
}
