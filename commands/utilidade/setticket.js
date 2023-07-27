const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "setticket", // Coloque o nome do comando do arquivo
    aliases: ["st"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

       if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`\❌ ${message.author} Você não tem permissão para isso!`);

       if (!message.guild.me.permissions.has("ADMINISTRADOR")) return message.reply(`\❌ ${message.author} Eu não tenho permissão para isso!`);

       let channel =  message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]);

       if (!channel) return message.reply(`\❌ ${message.author} \`!setticket [canal]\`.`);

       let criar = new Discord.MessageButton().setCustomId("c").setLabel("Crie seu ticket").setStyle("PRIMARY")

       message.reply(`\✅ ${message.author} O sistema de ticket foi configurado com sucesso.`);
    
       let row = new Discord.MessageActionRow().addComponents(criar)

       let embed = new Discord.MessageEmbed()
       .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
       .setDescription(`**> Sistema de Ticket.\n> Abra um ticket clicando no botão.**`)
       .setColor("RANDOM")
       .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))

       channel.send({embeds: [embed], components: [row]})


        
    }
}