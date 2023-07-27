const Discord = require("discord.js")

module.exports = {
    name: "addrole", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("MANAGE_ROLES")) {
            message.reply(`Você não possui a permissão de \`Gerenciar Cargos\`.`)
        } else {

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

            if (!user || !role) {
                message.reply({ embeds: [new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`\`!addrole [usuário] [cargo]\``)] });
            } else if (user && role) {
                message.reply(`✅ O usuário ${user} recebeu o cargo \`${role.name}\`.`).then(msg=> {
                user.roles.add(role.id).catch(e => { msg.edit(`:x: Não foi possível adicionar o cargo \`${role.name}\` no usuário ${user}!`) })
                })
            }

        }        
    }
}