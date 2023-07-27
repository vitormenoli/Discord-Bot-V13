const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'setcanal',
    aliases: ['stc'],

    run: async(client, message, args) => {
      
      let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
      
      let setado = await db.get(`config.${message.guild.id}.tempocall`);

      let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`\`!setcanal [#canal]\``);
      
      if (!canal) {
        return message.reply({ embeds: [embed] })
      } else {
        await db.set(`config.${message.guild.id}.tempocall`, canal.id);
        return message.reply(`✅ ${message.author} O canal ${canal} foi configurado com suceeso.`)
      }
  },
};