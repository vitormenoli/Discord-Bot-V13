const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {

    name: 'setcategoriavip',
    aliases: ['scv'],

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`**Você não pode usar esse comando pois ele so para administradores .**`)


        if (!args[0]) return message.reply(`**Você precisa enviar o id da categoria!**`);

        db.set(`CategoriaVip_${message.guild.id}`, args[0])


        const embed = new Discord.MessageEmbed()
            .setColor([255, 182, 193])
            .setAuthor(`Sistema de Vip`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Categoria vip setada com sucesso!`)
            .setFooter(`Comando utilizado por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        message.reply({ embeds: [embed] })
    },
};
