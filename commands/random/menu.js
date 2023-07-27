const Discord = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = {

    name: "Help com menu",
    author: "ferinha",

    run: async(client, message, args) => {

        let embed_1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Olá ${message.author}, veja meus comandos com o menu abaixo:**`);

        let painel = new MessageActionRow().addComponents( new MessageSelectMenu()
        .setCustomId('menu')
        .setPlaceholder('Veja meus comandos.') // Mensagem estampada
        .addOptions([
               {
                    label: 'Painel inicial',
                    description: 'Apenas o painel inicial da mensagem',
                    emoji: '📓',
                    value: 'painel_inicial',
               },
                {
                    label: 'Utilidade',
                    description: 'Veja meus comandos de utilidade',
                    emoji: '1️⃣',
                    value: 'utilidade',
                },
                {
                    label: 'Moderação',
                    description: 'Veja meus comandos de moderação',
                    emoji: '2️⃣',
                    value: 'moderacao',
                },
                {
                    label: 'Diversão',
                    description: 'Veja meus comandos de diversão',
                    emoji: '3️⃣',
                    value: 'diversao',
                },
                {
                    label: 'Outros',
                    description: 'Veja meus comandos de outros',
                    emoji: '4️⃣',
                    value: 'outros',
                },
            ])

        );


        message.reply({ content: `${message.author}`, embeds: [embed_1], components: [painel] }).then(msg => {

            const filtro = (interaction) => 
              interaction.isSelectMenu()
        
            const coletor = msg.createMessageComponentCollector({
              filtro
            });
        
            coletor.on('collect', async (collected) => {

              let valor = collected.values[0]
              collected.deferUpdate()

        if (valor === 'painel_inicial') {

             msg.edit({ content: `${message.author}`, embeds: [embed_1], components: [painel] });
    
        };
        
        if (valor === 'utilidade') {

            let embed_2 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Olá ${message.author}, veja meus comandos de \`utilidade\` abaixo:\n\`\`\`Escreva seus comandos aqui\`\`\`**`);

            msg.edit({ content: `${message.author}`, embeds: [embed_2], components: [painel] });

        };

        if (valor === 'moderacao') {

            let embed_3 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Olá ${message.author}, veja meus comandos de \`moderação\` abaixo:\n\`\`\`Escreva seus comandos aqui\`\`\`**`);

            msg.edit({ content: `${message.author}`, embeds: [embed_3], components: [painel] });

        };

        if (valor === 'diversao') {

            let embed_4 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Olá ${message.author}, veja meus comandos de \`diversão\` abaixo:\n\`\`\`Escreva seus comandos aqui\`\`\`**`);

            msg.edit({ content: `${message.author}`, embeds: [embed_4], components: [painel] });

        };

        if (valor === 'outros') {

            let embed_5 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Olá ${message.author}, veja meus \`outros\` comandos abaixo:\n\`\`\`Escreva seus comandos aqui\`\`\`**`);

            msg.edit({ content: `${message.author}`, embeds: [embed_5], components: [painel] });

        };
        
        
        })

    })

}
}