const db = require('quick.db');
const ms = require('milliseconds');
const Discord = require('discord.js');

module.exports = {
    name: 'tempocall',
    aliases: ['tp', 'tpc', 'tempcall'],

    run: async(client, message, args) => {
     
      let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
    let tempo = db.get(`tempocall_${usuario.id}`)
        if (tempo === null) {
        } else {
          tempo = tempo.toString().replace("-", "")
        }
        
        if (tempo === 0 || tempo === null) {
          tempo = "Você não possui nenhum tempo salvo!"
        } else {

          let totalSeconds = (ms.seconds(tempo) / 1000);
          let hours = Math.floor(totalSeconds / 3600);
          totalSeconds %= 86400;
          totalSeconds %= 3600;
           minutes = Math.floor(totalSeconds / 60);
          let seconds = Math.floor(totalSeconds % 60);
    
          tempo = hours + ' hora(s), ' + minutes + ' minuto(s) e ' + seconds + ' segundos.';
         }

         let avatar = usuario.user.avatarURL({ dynamic: true, size: 1024 })
         let nick = usuario.user.username

         let embed = new Discord.MessageEmbed()
         .setAuthor({ name: 'Tempo em Call', iconURL: avatar})
         .setTitle('Tempo Call | ' + nick)
         .addField('Tempo Salvo', `**${tempo}**`)
         .setFooter({ text: `ID : ${usuario.id}`})
         .setColor("RANDOM")
         .setThumbnail(message.guild.iconURL({ dynamic: true }))
         
         let infos1 = db.get(`contando_${usuario.id}`)
         if (infos1 === false) {

         } else {
               if (usuario.voice.channel) {
             let infos = JSON.parse(infos1)
             const tempo_acumulado =  db.get(`call_${usuario.id}`)
             const start_acumulado = new Date().getTime();
       
             const diff_acumulado = Math.abs(tempo_acumulado - start_acumulado);
             const tempo2_acumulado = Math.ceil(diff_acumulado / 1000)

             let tempo_acumulado_total = (ms.seconds(tempo2_acumulado) / 1000);

             tempo_acumulado_total %= 86400;
             let hours2 = Math.floor(tempo_acumulado_total / 3600);
             tempo_acumulado_total %= 86400;
             tempo_acumulado_total %= 3600;
             let minutes2 = Math.floor(tempo_acumulado_total / 60);
             let seconds2 = Math.floor(tempo_acumulado_total % 60);
             tempo_acumulado_total = hours2 + ' hora(s), ' + minutes2 + ' minuto(s) e ' + seconds2 + ' segundos.';

             embed.addField('Tempo Acumulado', "**" + tempo_acumulado_total + "**", false)
             embed.addField('Ativo no Canal', "<#" + usuario.voice.channel.id + ">", false)
             embed.setFooter({ text: 'Ao sair da call, seu tempo acumulado será adicionado ao tempo total!'})
            }
           }
         message.reply({ embeds: [embed] })
  },
};