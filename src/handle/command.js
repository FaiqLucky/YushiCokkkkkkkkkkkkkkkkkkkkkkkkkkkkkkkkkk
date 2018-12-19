const { bot_prefix, embed_color } = require('../config.json');
const { Collection } = require('discord.js');
const { RichEmbed } = require('discord.js');
const cooldowns = new Collection();

module.exports = async (client, message) => {
    let prefix = bot_prefix;
    let color = embed_color;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    // cooldowns command
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!commandFile) return;
    if (!cooldowns.has(commandFile.help.name)) {
        cooldowns.set(commandFile.help.name, new Collection());
    }
    const member = message.member;
    const now = Date.now();
    const timestamps = cooldowns.get(commandFile.help.name);
    const cooldownAmount = (commandFile.conf.cooldown || 5) * 1000;

    if (!timestamps.has(member.id)) {
        timestamps.set(member.id, now);
    } else {
        const expirationTime = timestamps.get(member.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`**${member.user.username}**, please wait **${timeLeft.toFixed(1)}** cooldown time.`).then(msg=>msg.delete(3000));
        }

        timestamps.set(member.id, now);
        setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    }

    // command handler
  try {
  let commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  commands.run(client, message, args, color);
  if (!commands) return;
  } catch (e) {
      console.error(e)
  } finally {
      let cmd = new RichEmbed()
.setDescription(`\`\`\`
User :: ${message.author.tag}
User ID :: ${message.author.id}
Using Command :: ${message.content.split(" ")[0].replace(prefix," ")}
In Guild :: ${message.guild.name}
In Channel :: #${message.channel.name}
Guild ID :: ${message.guild.id}
Guild Member Count :: ${message.guild.members.size}
Guild Owner :: ${message.guild.owner.user.tag}
Guild Owner ID :: ${message.guild.owner.id}
\`\`\``)
client.channels.get("523875249280778250").send(cmd)
  console.info(`${message.author.tag}[${message.author.id}] is using ${message.content.split(" ")[0].replace(prefix, '')} command on ${message.guild.name}[${message.guild.id}]`);
  }
}
