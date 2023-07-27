const Discord = require("discord.js")

module.exports = {
    name: "t", // Coloque o nome do comando do arquivo
    aliases: ["ticket"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui permissão para utilizar este comando.`)
        } else {
            let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setTimestamp(new Date())
            .setDescription(`Abra um ticket selecionando o botão abaixo: \`🎫\`\nCaso não tenhha um motivo específico, não abra um ticket.`);

            let botao = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId("t")
                .setEmoji("🎫")
                .setStyle("SECONDARY")
            );

            message.channel.send({ embeds: [embed], components: [botao] }).then( () => {
                message.delete()
            });
        }

       
        
    }
}