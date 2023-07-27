const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        //if (message.member.permissions.has("ADMINISTRATOR")) 
        let canal = db.get(`canal_de_comandos_${message.guild.id}`);

        if (canal === null || canal === false || !client.channels.cache.get(canal)) {

            // SEU SCRIPT

        }

        else

        if (message.channel.id !== canal) { message.reply(`Você não pode utilizar comandos aqui, apenas em ${canal}.`) }

        
    }
}