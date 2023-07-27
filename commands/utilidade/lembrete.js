const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "lembrete", // Coloque o nome do comando do arquivo
    aliases: [""], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        let tempo = args[0];
        let lembrete = args.slice(1).join(" ");

        if (!tempo || !lembrete) {
            let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`\`!lembrete [tempo] [lembrete]\``);

            message.reply({ embeds: [embed] })
        } else {
            try {
                let time = ms(tempo);

                let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Lembrete adicionado!`)
                .setDescription(`> Tempo do lembrete: \`${tempo}\`.\n\n> Mensagem: ${lembrete}.`);

                message.reply({ embeds: [embed] }).then(msg => {
                    setTimeout( () => {
                        message.author.send(`> **Seu lembrete de ${tempo} atrás:**\n\n${lembrete}`).catch(e => { message.channel.send(`> ${message.author} **Seu lembrete de ${tempo} atrás:**\n\n${lembrete}`) });
                    }, time)
                })
            } catch (e) {

                let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`\`!lembrete [tempo] [lembrete]\``);
    
                message.reply({ embeds: [embed] })

            }
        }
        
    }
}