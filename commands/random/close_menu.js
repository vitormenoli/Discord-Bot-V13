const Discord = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = {

    name: "ticket_menu",
    author: "ferinha",

    run: async(client, message, args) => {

        if (message.member.permissions.has("ADMINISTRATOR")) {

            message.channel.delete()
            .catch(error => {})

        }
        else
        if (message.channel.name !== message.author.id) {
            
            message.reply(`Você não pode utilizar este comando aqui.`)

        }
        else
        if (message.channel.name === message.author.id) {

        message.channel.delete()
        .catch(error => {})

        }
        else
        { return; }

        

    }
}