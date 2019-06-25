const Discord = ('discord.js')
const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, con) => {
    try {
      
  const embed = new RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bekky - Command list;`, bot.user.avatarURL)
  .addField(`Adminstration commands;`, `b!${bot.commands.filter(x => x.conf.category === "Adminstrator").map(x => "b!" + x.help.name).join(', ')}`)
  .addField(`Moderation commands;`, `${bot.commands.filter(x => x.conf.category === "Moderation").map(x => "b!" + x.help.name).join(', ')}`)
  .addField(`User commands;`, `b!${bot.commands.filter(x => x.conf.category === "User").map(x => "b!" + x.help.name).join(', ')}`)
  
        await message.author.send(embed)
        message.reply("The commands, has been sended.");
    } catch(e) {
        message.reply("Could not sended the commands.");
        console.log(e)
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['h'],
  permLevel: 0,
  category: 'User'
};

exports.help = {
  name: 'help',
  description: 'Send the all comands to your DM.',
  usage: 'help'
};
