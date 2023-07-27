const Discord = require("discord.js")
const rga = require("random-gif-api")

module.exports = {
    name: "gif", // Coloque o nome do comando do arquivo
    aliases: ["random"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        let funcao = [rga.bite(), rga.bread(), rga.chocolate(), rga.cuddle(), rga.dance(), rga.kill(), rga.laugh(), rga.lick(), rga.lonely(), rga.pat(), rga.poke(), rga.pregnant(), rga.punch(), rga.run(), rga.sleep(), rga.spank(), rga.spit(), rga.steal(), rga.tickle(), rga.bored(), rga.angry(), rga.happy()];
        let random = funcao[Math.floor(Math.random()*funcao.length)];

        random.then((data) => {

            let embed = new Discord.MessageEmbed()
            .setImage(data)
            .setColor("RANDOM");

            message.reply({ content: `${message.author}`, embeds: [embed] });

          })
        
    }
}