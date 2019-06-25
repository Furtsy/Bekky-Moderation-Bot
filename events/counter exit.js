const Discord = require('discord.js')
const db = require('quick.db');

module.exports = async member => { 
  let kanal = await db.fetch(`sKanal_${member.guild.id}`)
  let msj = await db.fetch(`memberSayacCikis_${member.guild.id}`)
  let i = await db.fetch(`sayacSayi_${member.guild.id}`) 
 
   if (!i) return
   if (!kanal) return
    if (msj == null) msj = `:outbox_tray: Bir kişi kaybettik :frowning: \`${i}\` olmaya \`${i - member.guild.memberCount}\` kişi kaldı!`    
    member.guild.channels.get(kanal).send(msj.replace('{sayac}', `\`${i}\``).replace('{toplam-kullanıcı}', `\`${i - member.guild.memberCount}\``)) 
  } 

