const Discord = require("discord.js")
const generator = require('generate-password');

module.exports = {
    name: "senha", // Coloque o nome do comando do arquivo
    aliases: ["password"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let password = generator.generate({
            length: 15, // Número de caracteres da senha
            numbers: true // Pode conter números? [true | false]
        });

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`> Sua senha gerada foi:\n\n\`\`\`\n${password}\n\`\`\``);

        message.reply({ embeds: [embed] })
    }
}