const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args, config) => {

  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You're not have enough authority.`);
  if (!user) return message.reply('Please, specify a user.')
  if (!reason) return message.reply('Please, specify a reason.')    
  message.reply(`${user}, has been warned.`)
    db.push(`uyarı_${user.id+message.guild.id}`, reason)
    db.add(`uyarıs_${user.id + message.guild.id}`,1)
    db.add(`uyarıss_${user.id+message.guild.id}`,1)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['warn'],
  permLevel: 0,
  category: 'Moderation'
};

exports.help = {
  name: 'warn',
  description: 'User is warned',
  usage: 'b!warn <@user>'
};