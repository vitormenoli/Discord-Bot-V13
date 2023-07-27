const Discord = require("discord.js")

module.exports = {
    name: "reagir", // Coloque o nome do comando do arquivo
    aliases: ["r"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        let emoji = args[0];
        let mensagem = args[1];
        let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

        if (!emoji || !mensagem || !canal) {
            message.reply({ embeds: [
                new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`\`!reagir [emoji] [ID DA MSG] [CANAL]\``)
            ]})
        } else {
            
           canal.messages.react(mensagem, emoji).then(() => {
               message.reply(`Reaji a mensagem com o emoji ${emoji}, no canal de texto ${canal} com sucesso. `);
           }).catch( () => {
               message.reply(`Ops, algo deu errado.`)
           })

        }

    }
}