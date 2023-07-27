const Discord = require("discord.js")

module.exports = {
    name: "unlock", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            message.reply(`Você não possui a permissão \`Genrenciar Canais\` para poder uttilizar este comando.`)
        } else {
            
            message.reply(`✅ Este chat foi destrancado com sucesso.`).then(msg => { 
            message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true }).catch(e => {
                console.log(e)
                msg.edit(`❌ Ops, algo deu errado ao tentar destrancar este chat.`)
            })
        })

            }
        }        
}
