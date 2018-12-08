exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**${message.author.username}**, Sory You Can't Use This Command!`).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}**, Sory I Don't Have permission \`MANAGE_ROLES\` For Doit!`).then(msg=>msg.delete(5000));

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(`**${message.author.username}**, Sory I Can't Find The Membed You Mean!`).then(msg=>msg.delete(5000));
    
    let muterole = message.guild.roles.find(x => x.name === 'Yushi-Muted');
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: 'Yushi-Muted',
                color: '#000000',
                permission: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                
                });
            });
        } catch(e) {
            console.log(e.message);
        }
    };

    if (member.roles.has(muterole.id)) return message.channel.send(`**${message.author.username}**, Successfully Muted.`).then(msg=>msg.delete(5000));
    await (member.addRole(muterole.id));
    message.channel.send(`**${message.author.username}**, <:centang:513291593416048651> You muted <@${member.id}>.`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "mute",
    description: "Mute seseorang yang kamu sukai",
    usage: "mute [@mention]"
}
