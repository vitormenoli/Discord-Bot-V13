const Discord = require('discord.js');
const db = require('quick.db');
var ms = require('milliseconds');

module.exports = {
    name: 'rankcall',
    aliases: ['rk', 'top', 'leaderboard'],

    run: async (client, message, args) => {

        async function rankTempocall(pagina, per_pagina) {

            const resp = await db.all().filter(data => data.ID.startsWith('tempocall_')).sort((a, b) => b.data - a.data);

            var pagina = pagina || 1,
                per_pagina = per_pagina || 5,
                offset = (pagina - 1) * per_pagina,

                paginatedItems = resp.slice(offset).slice(0, per_pagina),
                total_pagina = Math.ceil(resp.length / per_pagina);

            let id = resp.slice('tempocall_')

            var rankMensagem = ""
            for (var i in paginatedItems) {

                if (paginatedItems[i].data == undefined || paginatedItems[i].data == "") {

                } else {
                    let tempo = paginatedItems[i].data
                    let totalSeconds = (ms.seconds(tempo) / 1000);
                    let hours = Math.floor(totalSeconds / 3600);
                    totalSeconds %= 86400;
                    totalSeconds %= 3600;
                    let minutes = Math.floor(totalSeconds / 60);
                    let seconds = Math.floor(totalSeconds % 60);

                    tempo = "**" + hours + '** hora(s), **' + minutes + '** minuto(s) e **' + seconds + '** segundos';

                    let nick = paginatedItems[i].ID.replace("tempocall_", "")
                    if (message.guild.members.cache.get(nick)) {
                        nick = message.guild.members.cache.get(nick)
                        rankMensagem += `**${nick.user.tag}**\n${tempo}\n\n`;
                    } else {
                    }
                }
            }

            let final = {
                pagina: pagina,
                per_pagina: per_pagina,
                pre_pagina: pagina - 1 ? pagina - 1 : null,
                next_page: (total_pagina > pagina) ? pagina + 1 : null,
                total: resp.length,
                total_pagina: total_pagina,
                data: paginatedItems,
                message: rankMensagem
            };

            if (rankMensagem == undefined || rankMensagem == "") rankMensagem = '**Nenhum usuário está no top 5!**';

            const topembed = new Discord.MessageEmbed()
                .setColor(client.cor)
                .setAuthor({ name: message.guild.name + " | Rank Call", iconURL: message.guild.iconURL({ dynamic: true }) })
                .addField('Top 5 | Tempo em Call', rankMensagem)
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
            return message.reply({ embeds: [topembed] })
        }
        rankTempocall(1, 5)
    },
};