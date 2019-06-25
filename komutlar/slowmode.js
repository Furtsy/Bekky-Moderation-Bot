const Discord = require('discord.js');

exports.run = async(client, message, args) => {
if(message.channel.type == "dm")  return;
if(message.channel.type !== "text") return;
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You're not have enough authority.`);
if (message.channel.type !== "text") return;
const limit = args[0] ? args[0] : 0;
  if(!limit) {
            message.reply('Please, specify a number.')
            return
          }
if (limit > 10) {
    return message.reply("The limit, can be a maximum of 10.");
}
    message.reply(`The limit, was succesfuly set to **${limit}** second.`);
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})};
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode"],
  permLevel: 0,
};

exports.help = {
  name: 'slowmode',
  description: 'Enables or disables the write limit.',
  usage: 'b!slowmode',
};
