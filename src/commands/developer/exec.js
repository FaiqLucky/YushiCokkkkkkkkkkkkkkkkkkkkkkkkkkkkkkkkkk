const { exec } = require('child_process');

exports.run = async(client, msg, args) => {
    if (msg.author.id !== '242969117479403520' && msg.author.id !== '242969117479403520') return msg.channel.send('Sorry, only my developers can use this')
    exec(`${args.join(' ')}`, (error, stdout) => {
      const response = (error || stdout);
      message.channel.send(`Ran: ${args.join(" ")}\n${response}`, {code: "asciidoc", split: "\n"}).catch(console.error);
    });
};
exports.conf = {
  aliases: ["ex"],
 cooldown: 0
}
exports.help = {
  name: "exec",
  description: "{Some super}",
  usage: "nga tau gw"
}
const { exec } = require('child_process');

exports.run = async(client, msg, args) => {
    if (msg.author.id !== '446941102315012097' && msg.author.id !== '242969117479403520') return msg.channel.send('Sorry, only my developers can use this')
    exec(args.join(' '), (error, output) => {
        if(!error){
            return msg.channel.send(output, { code: 'bash'});
        }
        return msg.channel.send(error, { code: 'bash'});
    });
}

exports.conf = {
    aliases: ['exe'],
  cooldown: 0
}

exports.help = {
  name: "exec",
  category: "UNDEFINED"
}
