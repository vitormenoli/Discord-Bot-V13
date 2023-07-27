const Discord = require("discord.js")

module.exports = {
    name: "emojiinfo", // Coloque o nome do comando do arquivo
    aliases: ["emoji"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let emoji = client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === args[0]) || client.emojis.cache.find(emoji => emoji.name === args[0]) || client.emojis.cache.get(args[0]);

        if (!emoji) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`\`!emojiinfo [emoji | nome | id]\``)
                ]
            });
        } else if (emoji) {

            try {

            if (!emoji.animated) {

                let img = `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=2048`;
                let botao = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setStyle("LINK")
                            .setLabel("Faça o download")
                            .setEmoji("📎")
                            .setURL(img)
                    );

                    let embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Informações do Emoji:")
                    .setThumbnail(`${img}`)
                    .addFields(
                        {
                            name: `> \📝 Nome do emoji:`,
                            value: `\`${emoji.name}\``,
                            inline: false
                        },
                        {
                            name: `> \🆔 ID do emoji:`,
                            value: `\`${emoji.id}\``,
                            inline: false
                        },
                        {
                            name: `> \🧿 Menção do emoji:`,
                            value: `\`${emoji}\``,
                            inline: false
                        },
                        {
                            name: `> \🖼 O emoji é:`,
                            value: `\`Imagem (png/jpg)\``,
                            inline: false
                        }
                    );

                    message.reply({ embeds: [embed], components: [botao] })
            } 

            else if (emoji.animated) {

                    let img = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=2048`;
                    let botao = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setStyle("LINK")
                                .setLabel("Faça o download")
                                .setEmoji("📎")
                                .setURL(`${img}`)
                        );
    
                        let embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Informações do Emoji:")
                        .setThumbnail(img)
                        .addFields(
                            {
                                name: `> \📝 Nome do emoji:`,
                                value: `\`${emoji.name}\``,
                                inline: false
                            },
                            {
                                name: `> \🆔 ID do emoji:`,
                                value: `\`${emoji.id}\``,
                                inline: false
                            },
                            {
                                name: `> \🧿 Menção do emoji:`,
                                value: `\`${emoji}\``,
                                inline: false
                            },
                            {
                                name: `> \🖼 O emoji é:`,
                                value: `\`Gif\``,
                                inline: false
                            }
                        );

                        message.reply({ embeds: [embed], components: [botao] })

            }

        } catch (e) { 
            message.reply(`${message.author} Ops! Não consegui identificar o emoji.`)
        }

        }

    }
}