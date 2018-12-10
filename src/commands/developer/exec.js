const { exec } = require('child_process');

exports.run = async(client, msg, args) => {
    if (msg.author.id !== '242969117479403520' && msg.author.id !== '242969117479403520') return msg.channel.send('Sorry, only my developers can use this')
    exec(args.join(' '), (error, output) => {
        if(!error.length){
            return msg.channel.send(output, { code: 'bash'});
        }
        return msg.channel.send(error, { code: 'bash'});
    });
}
exports.conf = {
  aliases: ["ex"],
 cooldown: 0
}
exports.help = {
  name: "exec",
  description: "{Some super}",
  usage: "nga tau gw"
}
