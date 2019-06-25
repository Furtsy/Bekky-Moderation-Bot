const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You're not have enough authority.`);
  
  let channel = message.mentions.channels.first()
  
  if(args[0] === "reset") {
    if(!args[0]) {
      message.reply(`You can't reset anything that is not set.`)
      return
    }
    
    db.delete(`modlogK_${message.guild.id}`)
    message.reply(`Log channel is, successfully reset.`)
    return
  }
  
    if (!channel) {
        return message.reply(`You must tag the channel you want to set as a log channel.`)
    }
  
    db.set(`modlogK_${message.guild.id}`, channel.name)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`The log channel is successfully set to ${channel}`)
    .setColor("RANDOM")
    message.channel.send(embed)
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["set-logchannel"],
    permLevel: 0,
    category: 'Adminstrator'
}

exports.help = {
    name: 'log-channel',
    description: 'Sets the log channel.',
    usage: 'log-channel'
}