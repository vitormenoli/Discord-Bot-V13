const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "setsugestao", // Coloque o nome do comando do arquivo
    aliases: ["ss"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            message.reply(`Você não possui a permissão de \`Gerenciar Canais\`.`)
        } else {
            let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!canal) {
                message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`\`!ss [canal]\``)
                ] })
            } else if (canal) {
                if (canal.type !== "GUILD_TEXT") {
                    message.reply(`Mencione apenas canais de texto!`)
                } else {
                    message.reply(`\\✅ O canal de texto ${canal} foi configurado com sucesso!`).then(m => {
                        db.set(`ss_${message.guild.id}`, canal.id)
                        canal.send(`Este chat foi configurado para sugestões!\n\n> Envie uma sugestão com \`!sugerir\`.`).then(msg => {
                            msg.pin()
                        })
                    })
                }
            }
        }

       
        
    }
}