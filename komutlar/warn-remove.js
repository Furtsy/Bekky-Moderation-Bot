const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');

exports.run = (client, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You're not have enough authority.`);

  let user = message.mentions.users.first();
      let kullanıcı =  db.fetch(`uyarıss_${user.id+message.guild.id}`);

  if (message.mentions.users.size < 1) return message.reply('Please, specify a user.');
  
  if (db.has(`uyarı_${user.id+message.guild.id}`) === false) return message.reply("This user, has not have a warn.")
  
  db.delete(`uyarı_${user.id+message.guild.id}`)
      db.subtract(`uyarıss_${user.id +message.guild.id}`, kullanıcı)
  const embed = new Discord.RichEmbed()
  message.channel.send(`${user}'s warning, has been removed.`)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["warn-delete", "Warndelete"],
  permLevel: 1,
};

exports.help = {
  name: 'warn-remove',
  description: 'Users removed the warn',
  usage: 'b!warn-delete'
};