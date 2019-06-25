const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {

  if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You're not have enough authority.ss`)
  if (reason.length < 1) return message.reply('Please specify a reason.');
  if (!user) return message.reply('Please specify a ID.').catch(console.error);
  message.guild.unban(user);

  message.reply('The operation was successfully completed.');
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['unban'],
  permLevel: 0,
  category: 'Moderation'
};

exports.help = {
  name: 'unban',
  description: 'Removes the ban of the person you want.',
  usage: 'b!unban'
};
