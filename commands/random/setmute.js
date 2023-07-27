const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setmute",
    author: "ferinha",

    run: async(client, message, args) => {

        let servidor = message.guild.id;
        let cargo_mute = message.mentions.roles.first() || client.guilds.cache.get(servidor).roles.cache.get(args[0]);

        let embed_1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`!setmute [\`cargo\`]`);

        if (!cargo_mute) return message.reply({ content: `${message.author}`, embeds: [embed_1] });

        let embed_2 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**O cargo ${cargo_mute} foi configurado com sucesso.**`);

        db.set(`cargo_mute_${message.guild.id}`, cargo_mute.id);

        message.reply({ content: `${message.author}`, embeds: [embed_2] });

    }
}