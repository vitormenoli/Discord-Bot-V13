const Discord = require("discord.js")

module.exports = {
    name: "clone", // Coloque o nome do comando do arquivo
    aliases: ["clonar"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui permisão para utilizar este comando.`)
        } else {

            let clonagem = `https://discord.new/${(await message.guild.fetchTemplates()).map(v => v.code)}`;

            let embed = new Discord.MessageEmbed()
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setColor("RANDOM")
            .setDescription(`Clique no botão abaixo para utilizar o clone do servidor.`);

            let botao = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setEmoji("🔗")
                .setLabel("Clone aqui")
                .setStyle("LINK")
                .setURL(`${clonagem}`)
                );

            message.reply({ embeds: [embed], content: clonagem, components: [botao] })

        }
        
    }
}