const Discord = require('discord.js');
exports.run = (bot, message) => {
  if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
  var args = message.content.split(' ').slice(1).join(' ');
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You're not have enough authority.`);
  if (!args) return message.reply("Please, specify a word.")
  
  message.channel.setName(`${args}`)
  .then(newChannel => message.reply(`The new channel name is, \`${args}\`.`))
  
  .catch(console.error);
  };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['channelname'],
  permLevel: 0,
  category: 'Moderation'
};
exports.help = {
  name: 'channel-name',
  description: 'Changes the name of the specified channel.',
  usage: 'b!channel-name'
};
