const Discord = require("discord.js")

module.exports = {
    name: "unban", // Coloque o nome do comando do arquivo
    aliases: ["desbanir"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            message.reply(`Você não possui permissão para utilizar este comando.`)
        } else {

            let user = client.users.cache.get(args[0])

            if (!user) {

                let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`\`!unban [membro]\``);

                message.reply({ embeds: [embed] })

            } else {

                    message.guild.members.unban(user.id).then(() => message.reply(`O usuário \`${user.tag}\` foi desbanido com sucesso.`)).catch(e => {
                        message.reply(`Não foi possível desbanir o usuário \`${user.tag}\`.`)
                    })
                    
            }
        }
        
    }
}