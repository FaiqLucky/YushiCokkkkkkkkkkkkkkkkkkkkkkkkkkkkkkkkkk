const { RichEmbed } = require('discord.js');
const snek = require('node-superfetch');
const { load } = require('cheerio');
const number = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣'];

exports.run = async (client, message, args, color) => {


	if(!args[0]) return message.channel.send('You must enter a name or song title to search for lyrics!');

	try{
		const embed = new RichEmbed()
		embed.setColor(color);
		const { body } = await snek.get('https://api.genius.com/search')
		.query({ q: args.slice(1).join('+') })
		.set('Authorization', `Bearer ${process.env.GEN}`);
		if(!body.response.hits.length) return message.channel.send(`No results found for ${args[0]}!`);
		const result = body.response.hits.splice(0, 5);
		const thisMess = await message.channel.send(embed.setDescription(result.map((x, i) => `${number[i]}[${x.result.full_title}](${x.result.url})`).join('\n')));
		for(let i = 0; i < result.length; i++){
			await thisMess.react(number[i]);
		}
		const filter = (rect, usr) => number.includes(rect.emoji.name) && usr.id === message.author.id
		const response = await thisMess.awaitReactions(filter, {
			max: 1,
			time: 15000
		});
    if (response.size){
       thisMess.delete();
    }
		if(!response.size){
			return thisMess.edit('**You take too long to reply to this menu will be closed in 6 seconds!**', {}).then(x => x.delete(6000));
		}
		const choice = number.indexOf(response.first().emoji.name);
		const { text } = await snek.get(result[choice].result.url);
	   const ouch = chunk(load(text)('.lyrics').text().trim(), 400)
     const pilGan = ['⏪', '⬅', '🔴', '➡', '⏩'];
    let index = 0;
    embed.setTitle(result[choice].result.full_title);
		embed.setURL(result[choice].result.url);
		embed.setThumbnail(result[choice].result.header_image_thumbnail_url);
		embed.setDescription(ouch[index])
    embed.setFooter(`Page ${index+1} Form ${ouch.length} | For ${message.author.tag}`, message.author.displayAvatarURL);
		const thisMes = await message.channel.send(embed)
    
    for(const pil of pilGan){
		await thisMes.react(pil);
	}
	paginate();
	async function paginate(){
		const filter = (rect, usr) => pilGan.includes(rect.emoji.name) && usr.id === message.author.id;		const response = await thisMes.awaitReactions(filter, {
			max: 1,
			time: 90000000,
		});
		if(!response.size) return undefined;
		const emoji = response.first().emoji.name;
		if(emoji === '🔴') return thisMes.delete();
		if(emoji === '⏪') index -= 3;
		if(emoji === '⬅') index--;
		if(emoji === '➡') index++;
		if(emoji === '⏩') index += 3;
		index = ((index % ouch.length) + ouch.length) % ouch.length;
		embed.setColor(color);
		embed.setDescription(ouch[index]);
		embed.setFooter(`Page ${index+1} Form ${ouch.length} | For ${message.author.tag}`, message.author.displayAvatarURL);
		thisMes.edit(embed);
		return paginate();
	}
    
    
	}catch(e){
		return message.channel.send(`Oh, ada kesalahan terjadi :( \`${e.message}\` coba lagi nanti!`);
	}

}

 function chunk (array, chunkSize){
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
  }

exports.conf = {
  aliases: ['lric'],
  cooldown: '5'
}

exports.help = {
  name: 'lyrics',
  description: 'Find song Lyrics',
  usage: 'lyrics <title>',
} 

