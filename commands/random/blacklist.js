const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "blacklist", // Coloque o nome do comando do arquivo
    aliases: ["black"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        let dono_id = "329614299557396483"; // Coloque seu ID aqui

        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        if (message.author.id !== dono_id) return;

        let embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(`\`\`\`!blacklist [user] [on | off]\`\`\``);

        if (!user || args[1] !== "on" && args[1] !== "off") return message.reply({ embeds: [embed] });

        if (args[1] == "on") {

        message.reply(`Você deseja adicionar <@${user.id}> (\`${user.id}\` - \`${user.tag}\`) à minha blacklist?`).then(msg => {

            msg.react("✅")
            msg.react("❌")

            let filtro_1 = (r, u) => r.emoji.name === '✅' && u.id === message.author.id; let coletor_1 = msg.createReactionCollector({ filter: filtro_1});
            let filtro_2 = (r, u) => r.emoji.name === '❌' && u.id === message.author.id; let coletor_2 = msg.createReactionCollector({ filter: filtro_2});

            coletor_1.on('collect', () => {

                msg.delete().catch(e => {})

                message.reply(`O usuário <@${user.id}> (\`${user.id}\` - \`${user.tag}\`) foi adicionado à minha blacklist com sucesso!`).then(msg => {

                    db.set(`blacklist_${user.id}`, "sim");

                })
            });

            coletor_2.on('collect', () => {

                msg.delete().catch(e => {})

                message.delete().catch(e => {})
            });
        

        })


    }

    else

    if (args[1] === "off") {

        message.reply(`Você deseja remover <@${user.id}> (\`${user.id}\` - \`${user.tag}\`) da minha blacklist?`).then(msg => {

            msg.react("✅")
            msg.react("❌")

            let filtro_1 = (r, u) => r.emoji.name === '✅' && u.id === message.author.id; let coletor_1 = msg.createReactionCollector({ filter: filtro_1});
            let filtro_2 = (r, u) => r.emoji.name === '❌' && u.id === message.author.id; let coletor_2 = msg.createReactionCollector({ filter: filtro_2});

            coletor_1.on('collect', () => {

                msg.delete().catch(e => {})

                message.reply(`O usuário <@${user.id}> (\`${user.id}\` - \`${user.tag}\`) foi removido da minha blacklist com sucesso!`).then(msg => {

                    db.set(`blacklist_${user.id}`, "nao");

                })
            });

            coletor_2.on('collect', () => {

                msg.delete().catch(e => {})

                message.delete().catch(e => {})
            });
        

        })


    }

        
    }
}