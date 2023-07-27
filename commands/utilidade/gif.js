const Discord = require("discord.js")
const gifSearch = require("gif-search");

module.exports = {
    name: "gif", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        if (!args[0]) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`\`!gif [palavra]\``)
            ]
        });
        gifSearch.query(args.slice(0).join(" ")).then((gifUrl) => {

            let embed = new Discord.MessageEmbed()
            .setImage(gifUrl)
            .setTitle(args.slice(0).join(" "))
            .setColor("RANDOM");

            message.reply({ embeds: [embed] })

        });

    }
}