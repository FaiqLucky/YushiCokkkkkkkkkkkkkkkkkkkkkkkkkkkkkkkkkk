const { RichEmbed } = require('discord.js');
const { owners_id, bot_prefix } = require('../../config.json')

exports.run = async (client, message, args, color) => {
  let prefix = bot_prefix;
  if (!args[0]) {
    let module = client.helps.array();
    if(!owners_id.includes(message.author.id)) module = client.helps.array().filter(x => !x.hide);
    const embed = new RichEmbed()
    .setColor(color)
      .setThumbnail(client.user.displayAvatarURL) 
    .setAuthor(client.user.username + ' Help')
    .setFooter(`To check the command usage, type ${prefix}help <commands> // Total: ${client.commands.size}`)
    for (const mod of module) {
      embed.addField(`${mod.name}`, mod.cmds.map(x => `\`${x}\``).join(', '));
    }
    return message.channel.send(embed);
  } else {
    let cmd = args[0];
    if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      let name = `${prefix}${command.help.name}`;
      let desc = command.help.description;
      let aliases = command.conf.aliases;
      let usage = `${prefix}${command.help.usage}`;

      let embed = new RichEmbed()
        .setThumbnail(client.user.displayAvatarURL) 
      .setAuthor(client.user.username + ' Help Description')
      .setTitle(aliases[0] ? `${name} ֍֎► ${prefix}${aliases.join(` ֍֎► ${prefix}`)}` : `${name}`)
      .setDescription(desc)
      .setColor(color)
      .addField('Usage', usage)
      return message.channel.send(embed);
    }
    if (!client.commands.has(cmd) || !client.commands.get(client.aliases.get(cmd))) {
      message.channel.send(`**${message.author.username}**, Sory i can't find command \`${cmd}\` what you mind.`);
    }
  }
}

exports.conf = {
    aliases: ['h'],
    cooldown: "2"
}

exports.help = {
    name: 'help',
    description: 'Show All Command Nao Tomori BOT',
    usage: 'help'
}
