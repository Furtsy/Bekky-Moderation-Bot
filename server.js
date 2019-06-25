const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment');
require('./util/eventLoader')(client);
const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(`The bot is, starting.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 210000);


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} commands will be loaded.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(aliases => {
      client.aliases.set(aliases, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



client.on('messageUpdate', async (oldMessage, newMessage) => {
  let p = await db.fetch(`prefix_${newMessage.guild.id}`);
  let prefix;
  if (p == null) prefix = 'b!'
  else prefix = `${p}`
  
  let cmd;
  const dsa = prefix
  let asd = newMessage.content.split(' ')[0].slice(dsa.length);
  let params = newMessage.content.split(' ').slice(1);
  let perms = client.elevation(newMessage);
  if (client.commands.has(asd)) {
    cmd = client.commands.get(asd);
  } else if (client.aliases.has(asd)) {
    cmd = client.commands.get(client.aliases.get(asd));
  }

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, newMessage, params, perms);
  }

});
///////////////////////////////////
client.on('message', async message => {  
let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if (message.content === '<@591594237066346508>') {
message.reply(`The current prefix is: \`${prefix}\``)
}
});
//////////////////////////////////
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
//////////////////////////////////



    

client.on("messageDelete", async message => {
  
  if (message.author.bot) return;
  
  var user = message.author;
  
  var kanal = await db.fetch(`modlogK_${message.guild.id}`)
  if (!kanal) return;
var kanal2 = message.guild.channels.find('name', kanal)  

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`A message deleted;`, message.author.avatarURL)
  .addField("User tag;", message.author.tag, true)
  .addField("Deleted message;", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
  kanal2.send(embed);
  
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  
  if (oldMsg.author.bot) return;
  
  var user = oldMsg.author;
  
  var kanal = await db.fetch(`modlogK_${oldMsg.guild.id}`)
  if (!kanal) return;
var kanal2 = oldMsg.guild.channels.find('name', kanal) 
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`A message updated;`, oldMsg.author.avatarURL)
  .addField("User tag;", oldMsg.author.tag, true)
  .addField("Old message;", "```" + oldMsg.content + "```")
  .addField("New message;", "```" + newMsg.content + "```")
  .setThumbnail(oldMsg.author.avatarURL)
  kanal2.send(embed);
  
});

client.on("roleCreate", async role => {
  
  var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal)  

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Created a role;`, role.guild.iconURL)
  .addField("Role name;", `\`${role.name}\``, true)
  .addField("Role color code;", `${role.hexColor}`, true)
  kanal2.send(embed);
  
});

client.on("roleDelete", async role => {
  
  var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal)    

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Deleted a role;`, role.guild.iconURL)
  .addField("Role name;", `\`${role.name}\``, true)
  .addField("Role color code;", `${role.hexColor}`, true)
  kanal2.send(embed);
  
});

client.on("roleUpdate", async role => {
  
  if (!log[role.guild.id]) return;
  
 var kanal = await db.fetch(`modlogK_${role.guild.id}`)
  if (!kanal) return;
var kanal2 = role.guild.channels.find('name', kanal) 
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Updated a role;`, role.guild.iconURL)
  .addField("Role name;", `\`${role.name}\``, true)
  .addField("Role color code;", `${role.hexColor}`, true)
  kanal2.send(embed);
  
});

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  
  
  
  var kanal = await db.fetch(`modlogK_${oldMember.guild.id}`)
  if (!kanal) return;
var kanal2 = oldMember.guild.channels.find('name', kanal) 
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`**${newMember.user.tag}** has logged in to the channel \`${newUserChannel.name}\`.`)
    kanal2.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(`**${newMember.user.tag}** has logged out from a voice channel.`)
    kanal2.send(embed);
    
  }
  
client.on('channelCreate', async channel => {
  let modlogs = db.get(`modlogK_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({embed: {
      color: 3447003,
      fields: [{
          name: `A channel created. \nThe name of the created channel;`,
          value: `\`\`\` ${channel.name} \`\`\``
        },
        {
          name: `Type of created channel;`,
          value: `\`\`\` Text channel! \`\`\``
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `Bekky - Log system!`
      }
     }});
    } else {
      if (channel.type === "voice") {
       modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `A channel created. \nThe name of the created channel;`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Type of created channel;`,
        value: `\`\`\` Voice channel! \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `Bekky - Log system!`
    }
  }
}); 
      }
    }
  }
});

client.on('channelDelete', async channel => {
  let modlogs = db.get(`modlogK_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({embed: {
      color: 3447003,
    fields: [{
        name: `A channel deleted. \nThe name of the deleted channel;`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Type of deleted channel;`,
        value: `\`\`\` Voice channel \`\`\``
      }
      ],
      timestamp: new Date(),
      footer: {
        text: `Bekky - Log system!`
      }
     }});
    } else {
      if (channel.type === "voice") {
       modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `A channel deleted. \nThe name of the deleted channel;`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Type of deleted channel;`,
        value: `\`\`\` Voice channel! \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `Bekky - Log system!`
    }
  }
}); 
      }
    }
  }
});
  
});


////////////////////////////////////
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
