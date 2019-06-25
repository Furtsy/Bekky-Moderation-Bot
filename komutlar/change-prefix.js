const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
  if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
  let p = await db.fetch(`prefix_${message.guild.id}`);
  let prefix;
  if (p == null) prefix = 'b!'
  else prefix = `${p}`
  
  let argprefix = args[0]
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You're not have enough authority!");
  if (!argprefix) return message.reply(`The current prefix is: \`${prefix}\``)
  if(argprefix) {
    db.set(`prefix_${message.guild.id}`, argprefix)
    return message.reply(`Changed the prefix to: \`${argprefix}\``)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  category: 'Adminstrator'
};

exports.help = {
  name: 'prefix',
  description: 'Change the prefix.',
  usage: 'prefix <new prefix>'
};
