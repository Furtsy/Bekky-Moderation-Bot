const Discord = require('discord.js');
exports.run = (bot, message) => {
   if(message.channel.type == "dm")  return;
   if(message.channel.type !== "text") return;
  var args = message.content.split(' ').slice(1).join(' ');
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You're not have enough authority.`);
  if (!args) return message.reply("Please, specify a word.")
  
  if(args === 'reset') {
    message.channel.setTopic('')
  .then(newChannel => message.reply(`Channel description has been reset.`))
  } else {
  message.channel.setTopic(`${args}`)
  .then(newChannel => message.reply(`The new channel description is, \`${args}\`.`))
  
  .catch(console.error);
  }};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['channeldescription'],
  permLevel: 0,
  category: 'Moderation'
};
exports.help = {
  name: 'channel-description',
  description: 'Changes the subject of the description of the specified channel.',
  usage: 'b!channel-description'
};
