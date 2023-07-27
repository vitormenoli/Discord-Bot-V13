const jimp = require("jimp")
const Discord = require('discord.js')

module.exports = {
    name: "neymar",
    aliases: ["n"],

    run: async (client, message, args) => {

        let img = jimp.read("https://media.discordapp.net/attachments/927803600707682394/945131756200275968/31442443.png?width=710&height=473");

        let texto = args.slice(0).join(" ");

        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`\`!neymar [sua frase]\``);

        if (!args[0]) {
            message.reply({ embeds: [embed] })
        } else {

            img.then(image => {
                jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                    image.resize(885, 494)
                    image.print(font, 145, 330, texto, 7000)
                    image.getBuffer(jimp.MIME_PNG, (err, i) => {

                        message.reply({ content: `${message.author}`, files: [{ attachment: i, name: "neymar.png" }] });

                    })
                })
            })

        }

    }
}