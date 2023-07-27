const ms = require("ms")
const Discord = require("discord.js")

module.exports =  {
    name: "timeout", // Coloque o nome do comando do arquivo
    aliases: ["castigo"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("MODERATE_MEMBERS")) {
            message.reply({ content: `Você não possui permissão para utilizar este comando.` })
        } else {

        let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let tempo = args[1];
        let motivo = args.slice(2).join(" ");

        if (!usuario || !tempo) {
            message.reply({ embeds: [
                new Discord.MessageEmbed()
                .setDescription(`\`!castigo [usuário] [tempo] [motivo]\``)
                .setColor("RANDOM")
            ] });
        } else {
            let membro = message.guild.members.cache.get(usuario.id);
            let duracao = ms(tempo);
            membro.timeout(duracao, motivo).then( () => {
                message.reply({ content: `O membro \`${membro.user.tag}\` foi punido por \`${tempo}\`, pelo motivo \`${motivo}\`.` })
            })
        }

    }

    }
}