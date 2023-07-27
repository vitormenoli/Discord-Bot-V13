const Discord = require("discord.js")

module.exports = {
    name: "setnick", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("MANAGE_NICKNAMES")) {
            message.reply(`Você não possui a permissão de \`Gerenciar Apelidos\`.`)
        } else {
            let embed = new Discord.MessageEmbed()
            .setColor("00001")
            .setDescription(`\`!setnick [membro] [novo nome]\``);

            let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let nick = args.slice(1).join(" ");

            if (!membro || !nick) {
                message.reply({ embeds: [embed] })
            } else {
                membro.setNickname(nick)
                message.reply(`O usuário ${membro} teve seu apelido alterado.`)
            }
        }

       
        
    }
}