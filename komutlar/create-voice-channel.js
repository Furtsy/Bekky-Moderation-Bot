const Discord = require('discord.js');

exports.run = (client, message, args) => {
     if(message.channel.type == "dm")  return;
    if(message.channel.type !== "text") return;
    let kanal = args.slice(0).join(' ');
    let guild = message.guild;
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You're not have enough authority.`);
    if (kanal.length < 1) return message.reply('Please, specify a word.');
  message.delete();
  guild.createChannel(kanal, 'voice');
  message.reply(`The voice channel \`${kanal}\`, has been created.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['create-voice-channel'],
  permLevel: 0,
  category: 'Moderation'
};

exports.help = {
  name: 'create-voice-channel',
  description: 'Creates an audio channel.',
  usage: 'b!create-voice-channel',
  category: 'selam'
}; 