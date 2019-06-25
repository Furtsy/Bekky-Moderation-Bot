const Discord = require('discord.js');

exports.run = async function(client, message, args) {
    message.delete()

 if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You're not have enough authority.`);
  
  var u = message.mentions.users.first()
  var x = args[1]
  if (!u) return message.reply("Please specify a user.")
  
  if (!x) return message.reply("You must write down the number of messages you want to clear!")
  
  if (isNaN(x)) return message.reply("You must write down the number of messages you want to clear!")
  
  if (x < 1) return message.reply("I can't delete less than **1** message!")
  if (x > 100) return message.reply("I can't delete more than **100** messages")
  
 var fetched = await message.channel.fetchMessages({limit: x})
  
  if (u) {
    var fetched = fetched.filter(m => m.author.id === u.id)
    .array()
    .slice(0, x)
    }
    
  message.channel.bulkDelete(fetched)
  .catch(error => message.channel.send("I can't delete posts before `14` days"))
    
        
  message.channel.send(`**${u.tag}** has successfully deleted **${x}** messages!`)
  
    
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["clean-user", "Cleanuser", "Clean-user"],
  permLevel: 1,
  category: 'Moderation'
};

exports.help = {
  name: 'cleanuser',
  description: 'Deletes the specified amount of messages from the specified contact.',
  usage: 'b!cleanuser <@user> <quantity>'
};