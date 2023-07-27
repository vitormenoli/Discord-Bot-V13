const Discord = require("discord.js")

module.exports = {
    name: "coinflip", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        let lados = ["cara", "coroa"];
        let resposta = lados[Math.floor(Math.random() * lados.length)];

        if (!args[0] || args[0] !== "cara" && args[0] !== "coroa") {
            message.reply({ embeds: [
                new Discord.MessageEmbed()
                .setColor("00001")
                .setDescription(`\`!coinflip [cara/coroa]\``)
            ]})
        } else {
            message.reply(`💱 **Jogando a moeda para o alto...**`).then(msg => {

                setTimeout( () => {

            if (resposta === "cara") {

                if (args[0] === "cara") {      
                msg.edit(`💱 **Cara**! Parabéns ${message.author}, você ganhou!`)
                } else if (args[0] === "coroa") {
                    msg.edit(`💱 **Cara**! ${message.author} Eu ganhei dessa vez!`)
                }

            } else if (resposta === "coroa") {

                if (args[0] === "coroa") {      
                    msg.edit(`💱 **Coroa**! Parabéns ${message.author}, você ganhou!`)
                    } else if (args[0] === "cara") {
                        msg.edit(`💱 **Coroa**! ${message.author} Eu ganhei dessa vez!`)
                    }

            }

        }, 2000)

        })

        }

       
        
    }
}