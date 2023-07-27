const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "close",
    author: "ferinha",

    run: async(client, message, args) => {

        let confirmando_sistema = db.get(`sistema_de_tickets_por_ferinha_${message.guild.id}`);

        if (confirmando_sistema === null || false) return message.reply(`O sistema  de tickets está \`desativado\`!`);

        let confirmando_ticket = message.author.id;

        if (message.channel.name != confirmando_ticket) return message.reply(`Este canal não é seu ticket.`);

        let embed_1 = new Discord.MessageEmbed()
        .setColor("AQUA")
        .setDescription(`Você deseja fechar o seu ticket?`);

        message.reply({ embeds: [embed_1] }).then(msg => {

            let emoji_sim = "✅"; // Coloque o emoji
            let nome_emoji_sim = "✅"; // Coloque o nome do emoji

            let emoji_nao = "❌"; // Coloque o emoji
            let nome_emoji_nao = "❌"; // Coloque o nome do emoji

            msg.react(emoji_sim)
            msg.react(emoji_nao)

            let filtro_1 = (emoji_ferinha, user_ferinha) => emoji_ferinha.emoji.name === nome_emoji_sim && user_ferinha.id === message.author.id; // Confirma
            let coletor_1 = msg.createReactionCollector({filter: filtro_1}); // Confirma

            let filtro_2 = (emoji_ferinha, user_ferinha) => emoji_ferinha.emoji.name === nome_emoji_nao && user_ferinha.id === message.author.id; // Desconfirma
            let coletor_2 = msg.createReactionCollector({filter: filtro_2}); // Desconfirma

            coletor_1.on("collect", () => {

                message.reply(`Fechando o seu ticket...`).then(msg => {

                    setTimeout( () => {
                        msg.edit(`Fechando o seu ticket.....`)
                    }, 2000);

                    setTimeout( () => {
                        message.channel.delete()
                    }, 5000)

                });

            });

            coletor_2.on("collect", async () => {

                msg.delete();

                let ferinha = await message.reply(`O comando foi cancelado.`);

                setTimeout( () => {
                    ferinha.delete();
                    message.delete();
                }, 6000); 
            });
            
        })

    }
}