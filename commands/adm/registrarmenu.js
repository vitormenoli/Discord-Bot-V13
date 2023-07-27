const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
module.exports = {
    name: 'registrarmenu',
    aliases: ['rm'],
    run: async (client, message, args) => {

        let homem = "843208678189695026" // coloque o id do cargo homem
        let mulher = "843208777770991628" // coloque o id do cargo mulher
        let naobinario = "843208860231532624" // id do nao binario
        let menos18 = "843208970255990804" // id do cargo  -18
        let mais18 = "843208934138445844" // id do cargo +'8
        let hetero = "843209028486168607" // id do cargo hetero
        let lgbt = "843209075113590785"  // id do cargo lgbt
        let solteiro = "843209120651673620"  // id do cargo solteiro
        let namorando = "843209227723997205" // id do cargo namorando 
        let casado = "843209289119956992" // id do cargo casado
        let enrolado = "843209173066973185" // id do cargp enrolado 
        let equiperegistro = "843208119387291648" //Id do cargo da equipe de registro
        let registrado = "843208507280982036"// id do cargo registrado
        let naoregistrado = "843208420358357023"// id do cargo nao registrado
       
       if (!message.member.roles.cache.get(`${equiperegistro}`)) return message.reply(`Você precisa ser da equipe de registro para utilizar este comando.`);
       
        const membro = message.mentions.members.first()
        if (!membro) return message.reply({ embeds: [
                new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`\`!registrar [usuário]\``)
            ] });
        

        const genero = new Discord.MessageEmbed()
            .setTitle('Gênero')
            .setDescription('Escolha o genero do membro utilizando o menu abaixo')
            .setColor('RANDOM')
            .setFooter(`Registrador: ${message.author.username}`)

        const idade = new Discord.MessageEmbed()
            .setTitle('Idade')
            .setDescription('Escolha a idade do membro utilizando o menu abaixo')
            .setColor('RANDOM')
            .setFooter(`Registrador: ${message.author.username}`)

        const sexualidade = new Discord.MessageEmbed()
            .setTitle('Sexualidade')
            .setDescription('Escolha a Sexualidade  do membro utilizando o menu abaixo')
            .setColor('RANDOM')
            .setFooter(`Registrador: ${message.author.username}`)

        const estado = new Discord.MessageEmbed()
            .setTitle('Estado civil')
            .setDescription('Escolha o Estado civil do membro utilizando o menu abaixo')
            .setColor('RANDOM')
            .setFooter(`Registrador: ${message.author.username}`)

            const completo = new Discord.MessageEmbed()
            .setTitle('Registro completo!')
            .setDescription(`
> Registrador: ${message.author}
> Registrado: ${membro}`)
            .setColor('RANDOM')

        const generodrop = new Discord.MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('generomenu')
                    .setPlaceholder('Genero!')
                    .addOptions([
                        {
                            label: 'Homem',
                            emoji: '♂️',
                            description: 'Genero masculino',
                            value: 'homem1'
                        },
                        {
                            label: 'Mulher',
                            emoji: '♀️',
                            description: 'Genero feminino',
                            value: 'mulher1'
                        },
                        {
                            label: 'Não binario',
                            emoji: '🌈',
                            description: 'Não binario',
                            value: 'outros1'
                        }
                    ])
            )

        const idadedrop = new Discord.MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('idademenu')
                    .setPlaceholder('Idade!')
                    .addOptions([
                        {
                            label: '-18',
                            emoji: '🔞',
                            description: 'Menos de 18 anos',
                            value: '-181'
                        },
                        {
                            label: '+18',
                            emoji: '🍺',
                            description: 'Maior de 18 anos',
                            value: '+181'
                        }
                    ])

            )
        const sexualidadedrop = new Discord.MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('sexualidademenu')
                    .setPlaceholder('Sexualidade!')
                    .addOptions([
                        {
                            label: 'Hetero',
                            emoji: '🏁',
                            description: 'Sexualidade hetero',
                            value: 'hetero1'
                        },
                        {
                            label: 'Lgbt',
                            emoji: '🏳️‍🌈',
                            description: 'Sexualidade Lgbt',
                            value: 'lgbt1'
                        }
                    ])
            )
        const Estadodrop = new Discord.MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('estadomenu')
                    .setPlaceholder('Estado civil!')
                    .addOptions([
                        {
                            label: 'Solteiro',
                            emoji: '🍻',
                            description: 'Estado solteiro',
                            value: 'solteiro1'
                        },
                        {
                            label: 'Namorando',
                            emoji: '💋',
                            description: 'Estado namorando',
                            value: 'namorando1'
                        },
                        {
                            label: 'Casado',
                            emoji: '❤️',
                            description: 'Estado Casado',
                            value: 'Casado1'
                        },
                        {
                            label: 'Enrolado',
                            emoji: '💫',
                            description: 'Estado Enrolado',
                            value: 'Enrolado1'
                        }
                    ])
            )

        const generocoletor = await message.channel.send({ embeds: [genero], components: [generodrop] })

        const filtro = (interaction) =>
            interaction.isSelectMenu()

        const coletor = generocoletor.createMessageComponentCollector({
            filtro
        });
        coletor.on('collect', async (collected) => {
            let ticket = collected.values[0]
            collected.deferUpdate()

            if (ticket === 'homem1') {



                membro.roles.add(homem)
            }

            if (ticket === 'mulher1') {



                membro.roles.add(mulher)

            }

            if (ticket === 'outros1') {



                membro.roles.add(naobinario)

            }

            const proxidadeh = await generocoletor.channel.send({ embeds: [idade], components: [idadedrop] })

            generocoletor.delete()

            const filtro = (interaction) =>
                interaction.isSelectMenu()

            const coletor = proxidadeh.createMessageComponentCollector({
                filtro
            });
            coletor.on('collect', async (collected) => {
                let ticket = collected.values[0]
                collected.deferUpdate()

                if (ticket === '-181') {

                    membro.roles.add(menos18)
                }

                if (ticket === '+181') {
                    membro.roles.add(mais18)
                }

                const proximasexu = await proxidadeh.channel.send({ embeds: [sexualidade], components: [sexualidadedrop] })
                proxidadeh.delete()
                

                const filtro = (interaction) =>
                    interaction.isSelectMenu()

                const coletor = proximasexu.createMessageComponentCollector({
                    filtro
                });
                coletor.on('collect', async (collected) => {
                    let ticket = collected.values[0]
                    collected.deferUpdate()

                    if (ticket === 'hetero1') {
                        membro.roles.add(hetero)
                    }

                    if (ticket === 'lgbt1') {
                        membro.roles.add(lgbt)
                    }

                    const proximaestadu = await proximasexu.channel.send({embeds: [estado], components: [Estadodrop]})
                    proximasexu.delete()

                    const filtro = (interaction) =>
                    interaction.isSelectMenu()
    
                const coletor = proximaestadu.createMessageComponentCollector({
                    filtro
                });
                coletor.on('collect', async (collected) => {
                    let ticket = collected.values[0]
                    collected.deferUpdate()
    
                    if (ticket === 'solteiro1') {
    
    
                       membro.roles.add(solteiro)
                        membro.roles.add(registrado)
                        membro.roles.remove(naoregistrado)
                       
                       message.channel.send({embeds: [completo]})

                       proximaestadu.delete()
                    }

                    if (ticket === 'namorando1') {
    
    
                        membro.roles.add(namorando)
                         membro.roles.add(registrado)
                         membro.roles.remove(naoregistrado)
                        
                        message.channel.send({embeds: [completo]})
 
                        proximaestadu.delete()
                     }

                     if (ticket === 'Casado1') {
    
    
                        membro.roles.add(casado)
                         membro.roles.add(registrado)
                         membro.roles.remove(naoregistrado)
                        
                        message.channel.send({embeds: [completo]})
 
                        proximaestadu.delete()
                     }

                     if (ticket === 'Enrolado1') {
    
    
                        membro.roles.add(enrolado)
                        membro.roles.add(registrado)
                        membro.roles.remove(naoregistrado)
                        
                        message.channel.send({embeds: [completo]})
 
                        proximaestadu.delete()
                     }

                })
                })
            })
        })

    }
}