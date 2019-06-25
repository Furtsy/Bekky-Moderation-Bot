const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if(message.channel.type == "dm")  return;
    if(message.channel.type !== "text") return;
    let kanal = args.slice(0).join(' ');
    let guild = message.guild;
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You're not have enough authority.`);
    if (kanal.length < 1) return message.reply('Please, specify a word.');
  message.delete();
  guild.createChannel(kanal, 'text');
  message.reply(`The channel \`${kanal}\`, has been created. `);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['createchannel'],
  permLevel: 0,
  category: 'Moderation'
};

exports.help = {
  name: 'create-channel',
  description: 'Creates a writing channel.',
  usage: 'b!create-channel'
}; 