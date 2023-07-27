const Discord = require("discord.js")

module.exports = {
    name: "userinfo", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        let data = user.createdAt.toLocaleDateString("pt-br");
        let avatar = user.displayAvatarURL({ dynamic: true });

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(avatar)
        .addFields(
            {
                name: `\\#️⃣ Tag`,
                value: `\`${user.tag}\``,
                inline: true
            },
            {
                name: `\\🆔 ID`,
                value: `\`${user.id}\``,
                inline: true
            },
            {
                name: `\\📅 Data de criação da conta:`,
                value: `\`${data}\``,
                inline: false
            },
        );

        message.reply({ embeds: [embed] })


       
        
    }
}