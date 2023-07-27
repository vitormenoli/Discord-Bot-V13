const Discord = require("discord.js")

module.exports = {
    name: "pesquisar", // Coloque o nome do comando do arquivo
    aliases: ["search", "p"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        let pesquisa = args.join("+");
        let pesquisa_p = args.join(" ");

        if (!pesquisa) {

            let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`\`!pesquisar [sua pesquisa]\``);

            message.reply({ embeds: [embed] });

        } else {

            let link = `https://www.google.com/search?q=${pesquisa}`;

            let embed = new Discord.MessageEmbed()
            .setAuthor({ name: "Google Search", iconURL: "https://i.imgur.com/8Cdp6nD.png" })
            .setColor("FF0000")
            .setDescription(`**A pesquisa sobre \`${pesquisa_p}\`, de ${message.author}, teve o seguinte resultado:**`)
            .addFields(
                {
                    name: "📎 Link:",
                    value: `__[Clique aqui](${link}).__`,
                    inline: false
                }
            );

            message.reply({ embeds: [embed] })

        }

       
        
    }
}