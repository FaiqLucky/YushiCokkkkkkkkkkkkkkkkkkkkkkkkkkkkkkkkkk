const Discord = require('discord.js'), 
      arraySort = require('array-sort'); 

this.run = async (client, message, args, color) => {

    let invites = await message.guild.fetchInvites().catch(error => { 
        return message.channel.send({embed: { color: 0xFF0000, description: 'Sorry, I don\'t have the proper permissions to view invites!' }});
    }) 

    invites = invites.array();

    arraySort(invites, 'uses', { reverse: true }); 

    let possibleinvites = [];
    let index = 0;
    invites.forEach(function(invites) {
        possibleinvites.push(`**${++index}**. 🔰 **${invites.inviter.tag}** 》 \`${invites.uses}\` **invites**`)
    })

    const embed = new Discord.RichEmbed()
        .setTitle(`🎖 INVITE LEADERBOARD 🎖`)
        .setColor(color)
        .setThumbnail(message.guild.iconURL)
        .setDescription(`${possibleinvites.join('\n')}`)
        .setTimestamp(`• Message For ${message.author.tag}`, message.author.displayAvatarURL);
    message.channel.send(embed);
    
}

this.conf = {
  aliases: ['invites'],
  cooldown: '5'
}

this.help = {
  name: 'leaderboard',
  description: 'Show leaderboard invite in server',
  example: 'leaderboard'
}
