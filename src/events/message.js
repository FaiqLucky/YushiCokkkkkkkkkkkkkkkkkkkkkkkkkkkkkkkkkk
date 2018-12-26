const PREFIX = require('../config.json').bot_prefix;
const db = require('quick.db');

module.exports = async (client, message) => {
    db.add(`globalMessage_${message.author.id}`, 1);
    db.add(`guildMessage_${message.guild.id}_${message.author.id}`, 1);
    
    if (message.author.bot || !message.guild) return;

    let prefix = PREFIX.toLowerCase();
    let msg = message.content.toLowerCase();
    
    if (msg.startsWith(prefix)) {
        try {
        require('../handle/command')(client, message);
        } catch(e) {
            console.error(e);
        }
    } 
    if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
        message.channel.send(`:wave: | Hai ${message.author}, My Prefix is \`${prefix}\``);
    }
}
