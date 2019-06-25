const Discord = require('discord.js')
const db = require('quick.db');

module.exports = async member => {
  let msj = await db.fetch(`memberSayac_${member.guild.id}`)
  let kanal = await  db.fetch(`sKanal_${member.guild.id}`)
  let i = await  db.fetch(`sayacSayi_${member.guild.id}`)
  if (!i) return
  if (!kanal) return
  

    if (msj == null) msj = `:inbox_tray: Yeni bir kişi katıldı! \`${i}\` olmaya \`${i - member.guild.memberCount}\` kişi kaldı!`    
    member.guild.channels.get(kanal).send(msj.replace('{sayac}', `\`${i}\``).replace('{toplam-kullanıcı}', `\`${i - member.guild.memberCount}\``)) 
    //msj.replace('{uye}', member).replace('{sunucu}', member.guild.name)
                  
    if (member.guild.members.size == i) {
    kanal.send(`:tada: Sunucu \`${i}\` kullanıcıya ulaştı. Sayaç sıfırlandı.`)
    db.delete(`sayacSayi_${member.guild.id}`)
  }                  
}