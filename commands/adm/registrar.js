const Discord = require('discord.js')
module.exports = {
    name: 'registrar',
    aliases: [''],
    run: async (client, message, args) => {

        let homen = "843208678189695026"// coloque o id do cargo homen
        let mulher1 = "843208777770991628"// id do cargo mulher
        let hetero = "843209028486168607"// id do cargo hetero
        let lgbt = "843209075113590785"// id do cargo lgbt
        let solteiro = "843209120651673620"// id do cargo solteiro
        let casado = "843209289119956992"// id do cargo casado
        let namorando = "843209227723997205"// id do cargo namorando
        let enrolado = "843209173066973185"// id do cargo enrolado
        let registrado = "843208507280982036"// id do cargo registrado
        //let equiperegistro = "843208119387291648"// id do cargo da equipe de registro

        //if (!message.member.roles.cache.get(`${equiperegistro}`)) return message.reply(`Você não é da equipe de registro`)

        //let membro = args[0];

        //if (!membro) return message.reply('Mencione alguém para registrar')

        if (message.member.roles.cache.get(`${registrado}`)) return message.reply(`Você já está registrado.`)


        let genero = new Discord.MessageEmbed()
            .setTitle('Genero')
            .setDescription('Escolha seu gênero utilizando os botões abaixo!')
            .setColor('RANDOM')

        let completo = new Discord.MessageEmbed()
            .setTitle('Registro completo')
            .setDescription('Registro efetuado!')
            .setColor('RANDOM')

        let sexualidade = new Discord.MessageEmbed()
            .setTitle('Sexualidade')
            .setDescription('Escolha sua sexualidade utilizando os botões abaixo!')
            .setColor('RANDOM')

        let civil = new Discord.MessageEmbed()
            .setTitle('Estado civil')
            .setDescription('Escolha seu estado civil  utilizando os botões abaixo!')
            .setColor('RANDOM')



        let buttons = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('1')
                    .setStyle('SECONDARY')
                    .setLabel('homem')
                    .setDisabled(false),

                new Discord.MessageButton()
                    .setCustomId('2')
                    .setStyle('SECONDARY')
                    .setLabel('mulher')
                    .setDisabled(false),

            )

        let sexualidadeb = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('3')
                    .setStyle('SECONDARY')
                    .setLabel('hetero')
                    .setDisabled(false),

                new Discord.MessageButton()
                    .setCustomId('4')
                    .setStyle('SECONDARY')
                    .setLabel('lgbt')
                    .setDisabled(false)
            )

        let civilb = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('5')
                    .setStyle('SECONDARY')
                    .setLabel('solteiro')
                    .setDisabled(false),

                new Discord.MessageButton()
                    .setCustomId('6')
                    .setStyle('SECONDARY')
                    .setLabel('namorando')
                    .setDisabled(false),

                new Discord.MessageButton()
                    .setCustomId('7')
                    .setStyle('SECONDARY')
                    .setLabel('casado')
                    .setDisabled(false),

                new Discord.MessageButton()
                    .setCustomId('8')
                    .setStyle('SECONDARY')
                    .setLabel('enrolado')
                    .setDisabled(false)
            )

        message.reply({ embeds: [genero], components: [buttons] }).then(msg => {

            const filter = i => i.isButton();
            const collector = msg.createMessageComponentCollector({ filter: filter, time: 6e4 });

            collector.on("collect", async (interaction) => {
                if (interaction.user.id !== message.author.id) return;

                switch (interaction.customId) {
                    case '1': {
                        interaction.member.roles.add(homen)


                        message.reply({ embeds: [sexualidade], components: [sexualidadeb] }).then(msg => {

                            msg.delete()

                            const filter = i => i.isButton();
                            const collector = msg.createMessageComponentCollector({ filter: filter, time: 6e4 });

                            collector.on("collect", async (interaction) => {
                                if (interaction.user.id !== message.author.id) return;

                                switch (interaction.customId) {
                                    case '3': {

                                        interaction.member.roles.add(hetero)


                                        message.reply({ embeds: [civil], components: [civilb] }).then(msg => {

                                            const filter = i => i.isButton();
                                            const collector = msg.createMessageComponentCollector({ filter: filter, time: 6e4 });

                                            collector.on("collect", async (interaction) => {
                                                if (interaction.user.id !== message.author.id) return;

                                                switch (interaction.customId) {
                                                    case '5': {

                                                        interaction.member.roles.add(solteiro)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })


                                                        interaction.member.roles.add(registrado)


                                                        await interaction.deferUpdate();
                                                        break;

                                                    }
                                                    case '6': {

                                                        interaction.member.roles.add(namorando)
                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })




                                                        interaction.member.roles.add(registrado)




                                                        await interaction.deferUpdate();
                                                        break;

                                                    }
                                                    case '7': {


                                                        interaction.member.roles.add(casado)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })

                                                        interaction.member.roles.add(registrado)

                                                        await interaction.deferUpdate();
                                                        break;

                                                    }

                                                    case '8': {

                                                        interaction.member.roles.add(enrolado)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })

                                                        interaction.member.roles.add(registrado)

                                                        await interaction.deferUpdate();
                                                        break;


                                                    }

                                                }
                                            })
                                        })

                                        msg.delete()

                                        await interaction.deferUpdate();
                                        break;

                                    }
                                    case '4': {

                                        interaction.member.roles.add(lgbt)


                                        message.reply({ embeds: [civil], components: [civilb] }).then(msg => {

                                            const filter = i => i.isButton();
                                            const collector = msg.createMessageComponentCollector({ filter: filter, time: 6e4 });

                                            collector.on("collect", async (interaction) => {
                                                if (interaction.user.id !== message.author.id) return;

                                                switch (interaction.customId) {
                                                    case '5': {

                                                        interaction.member.roles.add(solteiro)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })

                                                        interaction.member.roles.add(registrado)



                                                        await interaction.deferUpdate();
                                                        break;

                                                    }
                                                    case '6': {

                                                        interaction.member.roles.add(namorando)
                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })

                                                        interaction.member.roles.add(registrado)







                                                        await interaction.deferUpdate();
                                                        break;

                                                    }
                                                    case '7': {


                                                        interaction.member.roles.add(casado)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })

                                                        interaction.member.roles.add(registrado)

                                                        await interaction.deferUpdate();
                                                        break;

                                                    }

                                                    case '8': {

                                                        interaction.member.roles.add(enrolado)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })

                                                        interaction.member.roles.add(registrado)

                                                        await interaction.deferUpdate();
                                                        break;


                                                    }

                                                }
                                            })
                                        })

                                        msg.delete()

                                        await interaction.deferUpdate();
                                        break;

                                    }

                                }
                            })
                        })


                    }
                    case '2': {

                        interaction.member.roles.add(mulher1)
                        msg.delete()

                        message.reply({ embeds: [sexualidade], components: [sexualidadeb] }).then(msg => {

                            const filter = i => i.isButton();
                            const collector = msg.createMessageComponentCollector({ filter: filter, time: 6e4 });

                            collector.on("collect", async (interaction) => {
                                if (interaction.user.id !== message.author.id) return;

                                switch (interaction.customId) {
                                    case '3': {

                                        interaction.member.roles.add(hetero)

                                        msg.delete()

                                        message.reply({ embeds: [civil], components: [civilb] }).then(msg => {

                                            const filter = i => i.isButton();
                                            const collector = msg.createMessageComponentCollector({ filter: filter, time: 6e4 });

                                            collector.on("collect", async (interaction) => {
                                                if (interaction.user.id !== message.author.id) return;

                                                switch (interaction.customId) {
                                                    case '5': {

                                                        interaction.member.roles.add(solteiro)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })

                                                        interaction.member.roles.add(registrado)





                                                        await interaction.deferUpdate();
                                                        break;

                                                    }
                                                    case '6': {

                                                        interaction.member.roles.add(namorando)
                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })



                                                        interaction.member.roles.add(registrado)





                                                        await interaction.deferUpdate();
                                                        break;

                                                    }
                                                    case '7': {


                                                        interaction.member.roles.add(casado)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })

                                                        interaction.member.roles.add(registrado)

                                                        await interaction.deferUpdate();
                                                        break;

                                                    }

                                                    case '8': {

                                                        interaction.member.roles.add(enrolado)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })

                                                        interaction.member.roles.add(registrado)

                                                        await interaction.deferUpdate();
                                                        break;


                                                    }

                                                }
                                            })
                                        })



                                        await interaction.deferUpdate();
                                        break;

                                    }
                                    case '4': {

                                        interaction.member.roles.add(lgbt)

                                        msg.delete()

                                        message.reply({ embeds: [civil], components: [civilb] }).then(msg => {

                                            const filter = i => i.isButton();
                                            const collector = msg.createMessageComponentCollector({ filter: filter, time: 6e4 });

                                            collector.on("collect", async (interaction) => {
                                                if (interaction.user.id !== message.author.id) return;

                                                switch (interaction.customId) {
                                                    case '5': {

                                                        interaction.member.roles.add(solteiro)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })





                                                        await interaction.deferUpdate();
                                                        break;

                                                    }
                                                    case '6': {

                                                        interaction.member.roles.add(namorando)
                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })









                                                        await interaction.deferUpdate();
                                                        break;

                                                    }
                                                    case '7': {


                                                        interaction.member.roles.add(casado)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })



                                                        await interaction.deferUpdate();
                                                        break;

                                                    }

                                                    case '8': {

                                                        interaction.member.roles.add(enrolado)

                                                        msg.delete()

                                                        message.reply({ embeds: [completo] })



                                                        await interaction.deferUpdate();
                                                        break;


                                                    }

                                                }
                                            })
                                        })



                                        await interaction.deferUpdate();
                                        break;

                                    }

                                }
                            })
                        })

                    }


                }
            })
        })
    }
}