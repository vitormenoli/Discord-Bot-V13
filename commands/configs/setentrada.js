const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'setentrada',
    aliases: ['se'],
    run: async (client, message, args) => {

        let canalboa = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setDescription(`Você nao tem permissão para utilizar este comando`)
                    .setColor('RANDOM')
                ]
            })

        } else

        if (!canalboa) {
            return message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setDescription(`\`!setentrada [#canal]\``)
                    .setColor('RANDOM')
                ]
            })

        } else {

        db.set(`boasvindachannel_${message.guild.id}`, canalboa.id)

        const embed = new Discord.MessageEmbed()
            .setDescription(`✅ | O canal ${canalboa} foi configurado no servidor com sucesso.`)
            .setColor('RANDOM')

        message.reply({ embeds: [embed] });

        }

    }

} 