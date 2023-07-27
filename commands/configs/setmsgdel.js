const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'setmsgdel',
    aliases: ['smd'],

    run: async (client, message, args) => {

        let canallogs = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!message.member.permissions.has('MANAGE_GUILD')) {

            message.reply({
                embeds: [new Discord.MessageEmbed()
                    .setDescription(`Você não tem permissão para utilizar este comando!`)
                    .setColor('RANDOM')]
            })
        } else

        if (!canallogs) {
            message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setDescription(`\`!setmsgdel [canal]\``)
                    .setColor('RANDOM')
                ]
            })
        } else {

        db.set(`channelLogs_${message.guild.id}`, canallogs.id);

        message.reply({ embeds: [
                new Discord.MessageEmbed()
                .setDescription(`✅ | O canal ${canallogs} foi configurado no servidor!`)
                .setColor('RANDOM')
            ]
        })

    }

    }
}