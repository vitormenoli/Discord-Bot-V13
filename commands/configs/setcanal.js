const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "setcanal", // Coloque o nome do comando do arquivo
    aliases: ["sc"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`\:x: ${message.author} Você precisa ter a permissão de \`Administrador\` para utilizar este comando.`);

        let canal = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]);

        if (!canal) return message.reply(`\:x: ${message.author} Você precisa mencionar um canal de texto.`);

        db.set(`canal_de_comandos_${message.guild.id}`, canal.id);
        message.reply(`\✅ ${message.author} O canal de texto ${canal} foi configurado com sucesso.`)

        
    }
}