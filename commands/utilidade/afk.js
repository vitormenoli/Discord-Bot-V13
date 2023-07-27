const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "afk", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        let motivo = args.slice(0).join(" ");
        if (!motivo) motivo = "Não especificado.";
        message.reply(`O modo afk foi ativado com sucesso: ${motivo}`).then(msg => {
            db.set(`afk_${message.author.id}`, true);
            db.set(`motivo_afk_${message.author.id}`, motivo)
            db.set(`verificando_afk_${message.author.id}`, message.author.id)
        })          
    }
}