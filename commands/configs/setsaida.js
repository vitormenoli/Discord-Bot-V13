const Discord = require('discord.js')
const db = require('quick.db');

module.exports = {
    name: 'setsaida',
    aliases: ['setsaída'],
    run: async (client, message, args) => {

        if (!message.member.permissions.has("MANAGE_GUILD")) {

            let embed = new Discord.MessageEmbed()
                .setDescription(`Você não tem permissão para utilizar este comando.`)
                .setColor('RANDOM');

            message.reply({ embeds: [embed] })

        } else {

            let canaltchau = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

            if (!canaltchau) {

                let embed_2 = new Discord.MessageEmbed()
                    .setDescription(`\`!setsaída [#canal]\``)
                    .setColor('RANDOM');

                message.reply({ embeds: [embed_2] });

            } else if (canaltchau) {

                db.set(`channeladeus_${message.guild.id}`, canaltchau.id)

                let embed_3 = new Discord.MessageEmbed()
                    .setDescription(`✅ | O canal ${canaltchau} foi configurado no servidor com sucesso.`)
                    .setColor('RANDOM');

                message.reply({ embeds: [embed_3] })

            }
        }

    }
}