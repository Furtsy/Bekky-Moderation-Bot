
const Discord = require('discord.js');


exports.run = function(client, message, args) {
  if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
  return message.reply(`You're not have enough authority.`)
  }
  let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));        
    return message.channel.send('Chat, has been cleared.').then(msg => msg.delete(5000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear'],
  permLevel: 0,
  category: 'Moderation'
};

exports.help = {
  name: 'clear-chat',
  description: 'Clears the chat.',
  usage: 'b!clear-chat'
};
