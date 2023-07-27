const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "removepremium", // Coloque o nome do comando do arquivo
    aliases: ["rp"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        let seu_id = "329614299557396483"

        if (message.member.id !== seu_id) {
            message.reply(`Apenas meu dono pode utilizar este comando.`)
        } else {

            let user = message.mentions.users.first() || client.users.cache.get(args[0]);

            if (!user) {

                let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`\`!removepremium [usuário]\``);

                message.reply({ embeds: [embed] })

            } if (db.get(`premium_${user.id}`) === null || db.get(`premium_${user.id}`) === false) {
                
                message.reply(`O usuário \`${user.tag}\` não está na mina lista de premiums.`);

            } else {

                message.reply(`O usuário ${user} (\`${user.tag}\`) foi removido da minha lista de premiums.`);
                db.set(`premium_${user.id}`, false)

            }
        }

       
        
    }
}