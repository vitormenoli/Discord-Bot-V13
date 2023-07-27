const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "mute",
    author: "ferinha",

    run: async(client, message, args) => {

        let servidor = message.guild.id;

        let cargo_mute = db.get(`cargo_mute_${message.guild.id}`);
        let cargo_mute_no_servidor = client.guilds.cache.get(servidor).roles.cache.get(cargo_mute);

        if (!cargo_mute_no_servidor || !cargo_mute || cargo_mute === null || cargo_mute === false) return message.reply(`**${message.author} O cargo mute não está configurado no servidor.**`);

        let membro = message.mentions.users.first() || client.guilds.cache.get(servidor).members.cache.get(args[0]);

        let embed_1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`!mute [\`membro\`]`);

        if (!membro) return message.reply({ content: `${message.author}`, embeds: [embed_1] });

        let embed_2 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**O usuário ${membro} foi mutado com sucesso.**`);

        message.reply({ content: `${message.author}`, embeds: [embed_2] }).then(msg => {

            client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.add(cargo_mute_no_servidor.id).catch(err => {

                msg.edit({ content: `**Ops! Algo deu errado.**`, embeds: [] });

            })

        })

    }
}