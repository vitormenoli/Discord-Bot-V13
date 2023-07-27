const Discord = require("discord.js")
const botao = new Discord.MessageButton().setCustomId("botao_cargo").setLabel("").setStyle("SUCCESS").setEmoji("✅")

module.exports = {
    name: "setbotao", // Coloque o nome do comando do arquivo
    aliases: ["setverificar"], // Coloque sinônimos aqui

    run: async(client, message, args) => {
        

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui a permissão \`Administrador\` para utilizar este comando.`)
        } else {
            let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!canal) { 
                message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`\`!setbotao [canal]\``)
                ] })
            } else {
                message.reply(`O canal de texto ${canal} foi configurado.`);
                canal.send({ embeds: [
                    new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`Clique no botão para se verificar!`)
                ], components: [
                    new Discord.MessageActionRow().addComponents(botao)
                ] })
            }
        }

       
        
    }
}