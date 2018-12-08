const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const Discord = require('discord.js')
//const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('../config.json'); // 
const youtube = new YouTube(process.env.API);
const queue = new Discord.Collection();
  
exports.run = async (bot, msg, args) => {
  //args = args.slice(0)
  const searchString = args.join(' ');
	const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = bot.queue.get(msg.guild.id);
  
  	const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		if(msg.member.voiceChannel.id !== serverQueue.voiceChannel.id) return msg.channel.send(`You must go to **${serverQueue.voiceChannel.name}** to play a song`);
    }
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); 
				await handleVideo(video2, msg, voiceChannel, true); 
			}
			return 
    let embed = new Discord.RichEmbed()
		     .setColor("RANDOM")
         .setTitle(`✅ **${playlist.title}** has been added to queue`)
         .setFooter(`Music Added by : ${msg.author.tag}`);
      msg.channel.send(embed);
      
    } else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          var selectembed = new Discord.RichEmbed()
 .setColor('RANDOM') 
 .setTitle('Song selection')
 .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`) 
 .setFooter('Please provide a value to select one of the search results ranging from 1-10') 
 
					msg.channel.send(selectembed)
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11 && msg2.author.id === msg.author.id, {
							maxMatches: 1,
							time: 30000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
  async function handleVideo(video, message, voiceChannel, playlist = false) {
	var serverQueue = bot.queue.get(message.guild.id);
	console.log(video);
	var song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`,
    //loop:false,
    durationh: video.duration.hours,
		durationm: video.duration.minutes,
		durations: video.duration.seconds,
    duration: video.duration,   mamang: msg.member.voiceChannel.name, 
    meminta: msg.author,
	};
	if (!serverQueue) {
		var queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 50,
			playing: true,
      loop: false
		};
		bot.queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			bot.queue.delete(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		
   const embed = new Discord.RichEmbed()
           .setColor("RANDOM")
           .setTitle(`✅ ${song.title} has been added to queue`)
           .setFooter(`Song Added By : ${message.author.tag}`);
    return msg.channel.send(embed)

	}
	return undefined;
}
  function play(guild, song) {
	var serverQueue = bot.queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		bot.queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.'); //var endedembed = new Discord.RichEmbed()
      /*.setAuthor("Song Ended")
      .setColor("RANDOM")
      .addField("In :", `🎀 Server : \n${serverQueue.guild.name} \n(${serverQueue.guild.id})`)
      bot.channel.get("498411304139096064").send(endedembed);*/
			else console.log(reason);
      		const shiffed = serverQueue.songs.shift();
		if(serverQueue.loop) serverQueue.songs.push(shiffed);
		return play(guild, serverQueue.songs[0]);
		})
			/*serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})*/
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

var pleyembed = new Discord.RichEmbed() 

  .setColor('RED')
  .setAuthor(`Start Playing`, `https://images-ext-1.discordapp.net/external/YwuJ9J-4k1AUUv7bj8OMqVQNz1XrJncu4j8q-o7Cw5M/http/icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField(':page_facing_up: Title', `__[${song.title}](${song.url})__`, true)
  .addField(':musical_note: Channel', `${video.channel.title}`, true)
  .addField(':credit_card: Video ID', `${song.id}`, true)
  .addField(":speaker: Volume", `${serverQueue.volume}%`, true)
  .addField("<a:load:513517698735407107>Duration", `${song.durationh}hrs ${song.durationm}mins ${song.durations}secs`, true)
  .addField('🎧 Voice Channel', `**${song.mamang}**`)
  .addField('<:verified:513517685011644436> Requested by', `${song.meminta}`)
  .setFooter("If you can't hear the music, please reconnect. If you still can't hear maybe the bot is restarting!")

	serverQueue.textChannel.send(pleyembed);
  
}
}

exports.conf = {
  aliases: ['p'],
  cooldown: '6'
}
  
exports.help = {
    name: "play",
    description: "Play your song.",
  usage: "play <title or url from youtube>"
}
