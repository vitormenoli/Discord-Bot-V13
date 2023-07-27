const Discord = require("discord.js")

module.exports = {
    name: "say", // Coloque o nome do comando do arquivo
    aliases: ["s"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            message.reply(`Você não possui permissão para utilizar este comando.`)
        } else {
            let fala = args.slice(0).join(" ");
            if (!args[0]) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`\`!say [frase]\``)
                .setColor("RANDOM");

                message.reply({ embeds: [embed] })
            } else {
                let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Olá ${message.author}, você deseja enviar sua mensagem em qual formato?`);

                let botoes = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setStyle("SECONDARY")
                    .setLabel("Embed")
                    .setCustomId("embed"),
                    new Discord.MessageButton()
                    .setStyle("SECONDARY")
                    .setLabel("Chat")
                    .setCustomId("hh")
                );

                message.channel.send({ content: `${message.author}`, embeds: [embed], components: [botoes] }).then(msg => {
                    let filtro_1 = (m) => m.user.id === message.author.id && m.customId === "embed";
                    let coletor_1 = msg.createMessageComponentCollector({ filter: filtro_1, max: 1 });

                    let filtro_2 = (m) => m.user.id === message.author.id && m.customId === "hh";
                    let coletor_2 = msg.createMessageComponentCollector({ filter: filtro_2, max: 1 });

                    coletor_1.on("collect", () => {
                        message.delete()

                        let embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(fala);

                        msg.edit({ content: null, embeds: [embed], components: [] })
                    });

                    coletor_2.on("collect", () => {
                        message.delete()

                        msg.edit({ embeds: [], components: [], content: `${fala}` })
                    });
                })
                
            }
        }
 
    }
}