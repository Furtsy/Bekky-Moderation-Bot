const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
  let guild = message.guild
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`:fire: You're not have enough authority.`);
  if(!tomute) return message.reply("Correct usage: b!mute <@person> <time>");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, this person is a staff or bot.");
let muterole = message.guild.roles.find(r => r.name === "Has been muted!");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Has been muted!",
        color: "0x808080",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Correct usage: b!mute <@person> <time>");

  await(tomute.addRole(muterole.id));
  message.reply(`The person, has been muted.`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}>'s silence, has been ended.`);
  }, ms(mutetime));



}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['temporary-mute'],
  permLevel: 0,
  category: 'Moderation'
};

exports.help = {
  name: 'mute',
  description: 'Silences the specified contact.',
  usage: 'b!temporary-mute <@user>'
};
