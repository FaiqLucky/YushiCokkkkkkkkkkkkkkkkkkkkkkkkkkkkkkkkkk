const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")){ 
    let embed = new RichEmbed()
      .setColor("RANDOM")
      .setDescription("Sorry You Don't Have Permissions For Members Tires");
return message.channel.send(embed);
  }
  if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(`**${message.author.tag}** Sory, Nao Tomori Don't Have Permissions \`BAN_MEMBERS\` Please Give Nao Tomori Permissions For Ban Member :)`).then(msg=>msg.delete(5000))
  
  let toBan = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toBan) return message.channel.sendMessage("Cannot Find User! Priority User Mention");
  let reason = args.join(" ").slice(22);
  if (toBan.hasPermission("BAN_MEMBERS")) return message.channel.send("This User Cannot Be Banned :(").then(msg => msg.delete(5000));
  
  if (toBan.highestRole.position < message.guild.member(client.user).highestRole.position) {
   message.guild.member(toBan).ban(reason);
   try {
    if (!reason) {
      toBan.send(`**${toBan.user.tag}** You has been banned from **${message.guild.name}**`)
    } else {
      toBan.send(`**${toBan.user.tag}** You has been banned from  **${message.guild.name}**
Alasan: "${reason}"`);
    }
    let embedB = new RichEmbed()
    .setColor('RANDOM')
    .setTitle('User Has Been Baned From Server')
    .addField('username', toBan.user.username, true)
    .addField('ID', toBan.id, true)
    message.channel.send(embedB);
  } catch (e) {
    console.log(e.message)
  }
  } else {
 message.channel.send (`I Can't Ban ** $ {toBan.user.tag} ** Because His Role Is Better Than Me. `)
  }
}
 
exports.conf = {
  aliases: ['banthx'],
  cooldown: '5'
}

exports.help = {
  name: "ban",
  description: 'Ban somone from your server [PERMISSION BAN MEMBERS ONLY]',
  usage: 'ban [@mention someone] [Reason]'
}
