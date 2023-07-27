const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "sugerir", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async(client, message, args) => {

            let canal = message.guild.channels.cache.get(db.get(`ss_${message.guild.id}`));
            if (!canal) {
                message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`O canal de sugetões ainda não está configurado!`)
                ] })
            } else if (canal) {
                let sugestao = args.slice(0).join(" ");
                if (!args[0]) {
                    message.reply({ embeds: [
                        new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`\`!sugerir [sua sugestão]\``)
                    ] })
                } else if (args[0]) {
                    canal.send({ embeds: [
                        new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`${sugestao}`)
                    ] });
                    message.reply(`Sua sugestão foi enviada com sucesso para ${canal}!`)
                }
            }
  
        
    }
}