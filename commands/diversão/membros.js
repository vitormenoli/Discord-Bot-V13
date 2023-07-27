const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'memebers',
    aliases: ["mem", "membercount", "membros"],

    run: async (client, message, args) => {

        let quantidade_de_membros = message.guild.memberCount;
        let quantidade_de_membros_online = message.guild.members.cache.filter((x) => x.presence?.status == 'online').size;
        let quantidade_de_membros_ausentes = message.guild.members.cache.filter((x) => x.presence?.status == 'idle').size;
        let quantidade_de_membros_ocupados = message.guild.members.cache.filter((x) => x.presence?.status == 'dnd').size;
        let quantidade_de_membros_offline = message.guild.members.cache.filter((x) => x.presence?.status == null).size;

        let embed = new MessageEmbed()
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`>  **Total de membros:** \`${quantidade_de_membros}\`.\n
> \\🟢 **Membros Online:** \`${quantidade_de_membros_online}\`.
> \\🟡 **Membros Ausentes:** \`${quantidade_de_membros_ausentes}\`.
> \\🔴 **Membros Ocupados:** \`${quantidade_de_membros_ocupados}\`.
> \\⚫ **Membros Offline:** \`${quantidade_de_membros_offline}\`.
`)
            .setColor(`RANDOM`)
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) });

        message.reply({ embeds: [embed] });
    }
}    