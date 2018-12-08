exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**${message.author.username}**, Sory You Can't Use This Command!`).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}**, Sory I Don't Have permission \`MANAGE_ROLES\` for doit!`).then(msg=>msg.delete(5000));

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(`**${message.author.username}**, Sory I Can't Find The Membed You Mean!`).then(msg=>msg.delete(5000));
    
    let muterole = message.guild.roles.find(x => x.name === 'Yushi-Muted');
    if (!member.roles.has(muterole.id)) return message.channel.send(`**${message.author.username}**, he hasn't muted yet trying to mute him first :)`).then(msg=>msg.delete(5000));
    await (member.removeRole(muterole.id));
    message.channel.send(`<@${member.id}> :tada: congratulations you are unmute.`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "unmute",
    description: "Unmute someone",
    usage: "unmute [@mention]"
}
