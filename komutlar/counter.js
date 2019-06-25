
const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

  if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
      let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You're not have enough authority.");
  
  const sayaçsayi = await db.fetch(`sayac_${message.guild.id}`);
  const sayackanal = message.mentions.channels.first() || message.channel
  
  if(!args[0]) return message.reply('Please specify a number.');
  if(!sayackanal) return message.reply('Please specify a channel.');
  if(isNaN(args[0])) return message.reply(`Please, specify a number.`)
  if(args[0] <= message.guild.member.size) return message.channel.send("Please specify a number higher than the number of users.");
  
  db.set(`sayacSayi_${message.guild.id}`, args[0])   
  db.set(`sKanal_${message.guild.id}`, message.mentions.channels.first().id) 
  
  message.channel.send(`Counter set to, \`${args[0]}\`, counter channel is set to, ${sayackanal}.`);  

};
 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
}
 
exports.help = {
  name: 'counter',
  description: 'Sets the counter.',
  usage: 'counter'
}
