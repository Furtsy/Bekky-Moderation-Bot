const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You're not have enough authority.`);

 let u = message.mentions.users.first() || message.author;

        if(u.bot === true) {
                message.channel.send(`Bots are dont warn.`)
                return
        }
 
    let bal = db.fetch(`uyarı_${u.id+message.guild.id}`)
let s = db.fetch(`uyarıs_${u.id+message.guild.id}`)
let c = db.fetch(`uyarıss_${u.id+message.guild.id}`)

    if (s === null) s = 0;
      if (c === null) c = 0;

    if (bal === null) bal = 'Warn is not available.';

        let embed = new Discord.RichEmbed()
    .setColor("RED")
    .setAuthor(`Bekky - Warning list!`, bot.user.avatarURL)
    .addField('User name;',u.username)
    .addField('Total warnings;', s)
    .addField('Current total warnings;',c)
    .addField('Warnings reasons;', bal)    

    message.channel.send(embed)
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Warnings', 'warns'],
  permLevel: 0
};

exports.help = {
  name: 'warnings', 
  description: "Confirms the bot added to the server.",
  usage: 'b!warns'
};