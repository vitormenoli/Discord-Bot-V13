const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'setvip',
    aliases: ['vipset'],

    run: async (client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`**Você não pode usar esse comando pois ele e so para administradores.**`)

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user) return message.channel.send(`**Você precisa mencionar alguém!**`)

        const vip = db.get(`Vip_${message.guild.id}_${user.id}`)

        if (vip) return message.channel.send(`**Esse usuario já é um usuario Vip!**`)

        db.set(`Vip_${message.guild.id}_${user.id}`, true)

        const embed = new Discord.MessageEmbed()
            .setColor([255, 182, 193])
            .setAuthor(`Sistema de Vip`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`O usuário ${user} foi adicionado na lista de Vips com sucesso!`)
            .setFooter(`Comando utilizado por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        message.reply({ embeds: [embed] })

    },
};