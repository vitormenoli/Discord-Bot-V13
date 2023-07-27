const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "teste", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        //message.reply(`a`)

        //if (message.member.permissions.has("ADMINISTRATOR")) 
        let canal = db.get(`canal_de_comandos_${message.guild.id}`);

        if (canal === null || canal === false || !client.channels.cache.get(canal) || canal === message.channel.id) {

            message.reply(`deu certo`)

        }

        else

        if (message.channel.id !== canal) {
            
            message.reply(`Você não pode utilizar comandos aqui, apenas em <#${canal}>.`)
        
        }

        
    }
}