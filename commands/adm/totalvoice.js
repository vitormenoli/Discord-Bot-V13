const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "totalvoice", // Coloque o nome do comando do arquivo
    aliases: ["membercountvoice", 'tv'], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("MANAGE_GUILD")) {

            message.reply(`Voçê não possui permissão para utilizar este comando.`)

        } else {

            message.guild.members.cache.forEach(member => {

                let m = member.voice.channel;

                if (m != null) {
                    m = 1
                    db.add(`membros_call_${message.guild.id}`, m)
                } else  { }
                
            });

            setTimeout( () => {

                let n = db.get(`membros_call_${message.guild.id}`);
                if (n === null) n = 0

                message.reply(`No momento há \`${n}\` membro(s) em call no servidor.`).then( () => {
                        db.set(`membros_call_${message.guild.id}`, 0)
                })

            }, 1000)

        }
        
    }
}