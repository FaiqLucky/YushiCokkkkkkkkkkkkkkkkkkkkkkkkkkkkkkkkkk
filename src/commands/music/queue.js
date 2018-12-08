const Discord = require("discord.js")
const queue = new Discord.Collection();
  
module.exports.run = async (bot, msg, args) => {
  
  
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = bot.queue.get(msg.guild.id);
  
  /* var song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`,
    //loop:false,
    durationh: video.duration.hours,
		durationm: video.duration.minutes,
    durations: video.duration.seconds,
    duration: video.duration,   mamang: msg.member.voiceChannel.name, 
    meminta: msg.author,
	};*/

    
    if (!serverQueue) return msg.channel.send({ embed: { description: 'There is nothing playing.'}});
    let index = 0;
var queueembed = new Discord.RichEmbed() 

.setColor('RANDOM') 
.setTitle('Song queue') 
.setDescription(`${serverQueue.songs.map(song => `**${++index}.** ${song.title}`).join('\n')}`) 


return msg.channel.send(queueembed)
  }

exports.conf = {
   aliases: ['q'],
  cooldown: '5'
}

exports.help = {
  name: "queue",
  description: "Show queue list",
  usage: "queue"
}
