const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const config = require("./config.json");
const db = require("quick.db");

client.login(config.token);

client.once('ready', async () => {

    console.log("✅ - Estou online!")

})
/*
client.on('messageCreate', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});
*/
client.on('messageCreate', async (message) => {

    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;

    let verificando = db.get(`antilink_${message.guild.id}`);
    if (!verificando || verificando === "off" || verificando === null || verificando === false) return;

    if (verificando === "on") {

        if (message.member.permissions.has("MANAGE_GUILD")) return;
        if (message.member.permissions.has("ADMINISTRATOR")) return;

        if (message.content.includes("https".toLowerCase() || "http".toLowerCase() || "www".toLowerCase() || ".com".toLowerCase() || ".br".toLowerCase())) {

            message.delete();
            message.channel.send(`${message.author} Você não pode enviar links aqui!`)

        }


    }

})

const fs = require("fs");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./commands/`);

fs.readdirSync('./commands/').forEach(local => {
    const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

    for (let file of comandos) {
        let puxar = require(`./commands/${local}/${file}`)

        if (puxar.name) {
            client.commands.set(puxar.name, puxar)
        }
        if (puxar.aliases && Array.isArray(puxar.aliases))
            puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    }
});

client.on("messageCreate", async (message) => {

    let prefix = config.prefix;

    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;

    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase()
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))

    try {

        let black = db.get(`blacklist_${message.author.id}`);

        if (black === "sim") {

            message.reply(`:x: ${message.author} Você está em minha blacklist!`).then(msg => {

                setTimeout(() => {
                    msg.delete().catch(err => { })
                }, 5000);

            })

        }
        else

            if (black === "nao" || !black || black === null || black === false) {

                let canal = db.get(`canal_de_comandos_${message.guild.id}`);

                if (canal === null || canal === false || !client.channels.cache.get(canal) || canal === message.channel.id

                    || message.member.permissions.has("ADMINISTRATOR")

                ) {

                    command.run(client, message, args)

                }

                else

                    if (message.channel.id !== canal) {

                        message.reply(`Você não pode utilizar comandos aqui, apenas em <#${canal}>.`)

                    }

            }

    } catch (err) {

        console.error('Erro:' + err);
    }
});













const Canvas = require('canvas')

client.on('guildMemberAdd', async (member) => {

    let foto = "https://cdn.discordapp.com/attachments/905612640729071727/905621893250424892/tela-vazia-branca_1194-7555.png"; // Coloque o link da foto que será utilizada na entrada do servidor.

    let chave = {};

    chave.create = Canvas.createCanvas(1024, 500);
    chave.context = chave.create.getContext('2d');
    chave.context.font = '72px sans-serif';
    chave.context.fillStyle = '#00001';

    Canvas.loadImage(foto).then(async (i) => {

        chave.context.drawImage(i, 0, 0, 1024, 500);
        chave.context.beginPath();
        chave.context.stroke();
        chave.context.fill();

        let chat = client.guilds.cache.get(member.guild.id).channels.cache.get('905612640729071727'); // Coloque o ID do canal de entrada.

        chave.context.font = '42px sans-serif',
            chave.context.textAlign = 'center';

        chave.context.fillText(`${member.user.tag}`, 480, 437);
        chave.context.beginPath();
        chave.context.arc(521, 200, 119, 0, Math.PI * 2, true);
        chave.context.closePath();
        chave.context.clip();

        await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png', size: 1024 })).then(async (i) => {

            chave.context.drawImage(i, 393, 80, 238, 238);

        })

        let mensagem = new Discord.MessageAttachment(chave.create.toBuffer(), `${member.user.tag}.png`)

        chat.send({ content: `${member}`, files: [mensagem] }).catch(e => {

            console.log(e)

        })

    })
});


client.on('interactionCreate', interaction => {

    let criar = new Discord.MessageButton().setCustomId("c").setLabel("Crie seu ticket").setStyle("PRIMARY")
    let fechar = new Discord.MessageButton().setCustomId("f").setLabel("Feche seu ticket").setStyle("PRIMARY")

    if (interaction.isButton()) {
        if (interaction.customId.startsWith('c')) {

            let achando = interaction.guild.channels.cache.find(a => a.name === `ticket-${interaction.user.id}`);

            if (achando) return interaction.reply({ content: `**\❌ ${interaction.user} Você já possui um ticket aberto: ${achando}**`, ephemeral: true })

            interaction.guild.channels.create(`ticket-${interaction.user}`, {
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", 'READ_MESSAGE_HISTORY']
                    }
                ],

            }).then(async channel => {

                interaction.reply({ content: `Seu ticket foi criado em: ${channel}`, ephemeral: true })

                const row = new Discord.MessageActionRow().addComponents(fechar)

                let embed = new Discord.MessageEmbed()
                    .setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
                    .setDescription(`**> ${interaction.user}.\n> Seu ticket está aberto. \n> Feche seu ticket com o botão abaixo.**`)
                    .setColor("RANDOM")
                    .setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))

                channel.send({ content: `${interaction.user}`, embeds: [embed], components: [row] }).then(msg => {
                    msg.pin()
                })
            })
        }
        if (interaction.customId.startsWith('f')) {

            interaction.reply(`**\🔒 ${interaction.user} Seu ticket será fechado em 5 segundos.**`)

            setTimeout(() => {

                try {

                    interaction.channel.delete()

                }
                catch (er) {
                    console.log(er)
                }

            }, 5000)

        }
    }
})



client.on("messageCreate", (message) => {

    try {

        let canal_membros = client.channels.cache.get("910363005559128155");
        let canal_bots = client.channels.cache.get("910363065940336721");
        let canal_canais = client.channels.cache.get("910363154628882503");
        let canal_cargos = client.channels.cache.get("910364296154849310");

        let nome_1 = `👤 Membros: ${message.guild.memberCount}`;
        let nome_2 = `🤖 Bots: ${message.guild.members.cache.filter(user => user.user.bot).size}`;
        let nome_3 = `💬 Canais: ${message.guild.channels.cache.size}`;
        let nome_4 = `💼 Cargos: ${message.guild.roles.cache.size}`;

        canal_membros.setName(nome_1)
        canal_bots.setName(nome_2)
        canal_canais.setName(nome_3)
        canal_cargos.setName(nome_4)

    } catch (e) { }

});





client.on("ready", () => {

    let canal = client.channels.cache.get("1085573251197055151") // Coloque o ID do canal de texto.
    //canal.send(`O sistema de mensagens temporárias está ativado!`).catch(e=>{console.log(e)});

    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`*:movie_camera::rocket:  BOM DIA   :rocket::movie_camera:*

:fire: Sentindo aquela vibe incrível? Transmita ao vivo agora  e compartilhe conosco! :fire: 

 :sparkles: Deixe o mundo conhecer sua criatividade e paixão! :dizzy:  

:loudspeaker: Envie o link da sua live para a gente no seu chat para que temos um bom sucesso! :speech_balloon::boom:|| @here ||`)
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }));

    setInterval(function () {

        //canal.send({ content: `@everyone`, embeds: [embed] }).catch(e=>{console.log(e)});             

    }, 3600000) // Coloque o tempo em milisegundos. Exemplo: 10000 = 10 segs;

})




client.on("messageCreate", (message) => {

    if (message.author.bot) return;

    let pessoa = db.get(`verificando_afk_${message.author.id}`);

    if (message.author.id === pessoa) {
        message.reply(`Olá ${message.author}, o modo afk foi desativado \;)`).then(msg => {
            db.delete(`afk_${message.author.id}`);
            db.delete(`motivo_afk_${message.author.id}`)
            db.delete(`verificando_afk_${message.author.id}`)
        })
    } else {

        let user_afk = message.mentions.members.first();

        if (!user_afk) return;

        let motivo = db.get(`motivo_afk_${user_afk.id}`);
        let afk = db.get(`afk_${user_afk.id}`);

        if (afk === true) return message.reply(`${message.author}, o usuário \`${user_afk.user.username}\` está com o modo afk ativado: ${motivo}`);

    }

})


client.on('interactionCreate', interaction => {

    let cargo = interaction.guild.roles.cache.get("929926444241547265"); // Coloque o ID do cargo de verificação.

    if (interaction.isButton()) {
        if (interaction.customId.startsWith("botao_cargo")) {
            try {

                if (interaction.member.roles.cache.get(cargo.id)) {

                    interaction.reply({ content: `\\❌ Você já está verificado no servidor.`, ephemeral: true })

                } else {

                    interaction.member.roles.add(cargo)
                    interaction.reply({ content: `\\✅ Você foi verificado com sucesso.`, ephemeral: true })

                }
            } catch (er) { console.log(er) }
        } else { }

    }

})



client.on("guildCreate", async (guild) => {
    let canal = client.guilds.cache.get(`802980478063083532`).channels.cache.get(`843208643540942848`) // ID do servidor suporte e ID do chat respectivamente.

    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Me adicionaram em um novo servidor!**`)

    let button = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
                .setCustomId("1")
                .setEmoji("🔥")
                .setLabel(`Detalhes`)
                .setStyle("SECONDARY")
        )

    canal.send({ embeds: [embed], components: [button] }).then(msg => {
        const filter = (i) => {
            return i.isButton() && i.message.id === msg.id
        }

        const collector = msg.createMessageComponentCollector({
            filter: filter,
            time: 60000,
        }).on("collect", async (interaction) => {

            switch (interaction.customId) {

                case "1": {
                    const embed2 = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(client.user.username, client.user.displayAvatarURL())
                        .setDescription(`**Detalhes do servidor:**`)
                        .addFields(
                            {
                                name: "⠀",
                                value: `
> __Nome:__ \`${guild.name}\`

> __ID:__ \`${guild.id}\`
                            
> __Membros:__ \`${guild.members.cache.size}\`
                            
> __Dono:__ ${await guild.fetchOwner()}
                            
> __Dono ID:__ \`${guild.ownerId}\``
                            },
                        );

                    let button_off = new Discord.MessageActionRow()
                        .addComponents(new Discord.MessageButton()
                            .setCustomId("1")
                            .setEmoji("🔥")
                            .setLabel(`Detalhes`)
                            .setStyle("SECONDARY")
                            .setDisabled(true)
                        )

                    interaction.update({ embeds: [embed2], components: [button_off] })
                }
            }
        })
    })
});





client.on("guildDelete", async (guild) => {
    let canal = client.guilds.cache.get(`802980478063083532`).channels.cache.get(`843208643540942848`) // ID do servidor suporte e ID do chat respectivamente.

    let embed = new Discord.MessageEmbed()
        .setColor("FF0000")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`**Me removeram de um novo servidor!**`)

    let button = new Discord.MessageActionRow()
        .addComponents(

            new Discord.MessageButton()
                .setCustomId("1")
                .setEmoji("🔥")
                .setLabel(`Detalhes`)
                .setStyle("DANGER")
        )

    canal.send({ embeds: [embed], components: [button] }).then(msg => {
        const filter = (i) => {
            return i.isButton() && i.message.id == msg.id
        }

        const collector = msg.createMessageComponentCollector({
            filter: filter,
            time: 60000,
        }).on("collect", async (interaction) => {

            switch (interaction.customId) {

                case "1": {
                    const embed2 = new Discord.MessageEmbed()
                        .setColor("FF0000")
                        .setAuthor(client.user.username, client.user.displayAvatarURL())
                        .setDescription(`**Detalhes do servidor:**`)
                        .addFields(
                            {
                                name: "⠀",
                                value: `
> __Nome:__ \`${guild.name}\`

> __ID:__ \`${guild.id}\`
                            
> __Membros:__ \`${guild.members.cache.size}\`
                            
> __Dono:__ ${await guild.fetchOwner()}
                            
> __Dono ID:__ \`${guild.ownerId}\``
                            },
                        );

                    let button_off = new Discord.MessageActionRow()
                        .addComponents(new Discord.MessageButton()
                            .setCustomId("1")
                            .setEmoji("🔥")
                            .setLabel(`Detalhes`)
                            .setStyle("DANGER")
                            .setDisabled(true)
                        )

                    interaction.update({ embeds: [embed2], components: [button_off] })

                    break
                }
            }
        })
    })
})





client.on("messageUpdate", async (message, oldMessage) => {

    let setlogsmsgenv = db.get(`channelLogseditmsg_${message.guild.id}`);
    if (setlogsmsgenv === null) return;

    if (message.author.bot) return;

    let msgchannel = message.channel;
    let msgantiga = message.content;
    let msgeditada = oldMessage.content;

    let embed = new Discord.MessageEmbed()
        .setTitle(`📝 Mensagem editada`)
        .setColor("RANDOM")
        .addFields(
            {
                name: `Autor da mensagem`,
                value: `${message.author}`,
                inline: false,
            },
        )

        .addFields(
            {
                name: `Canal`,
                value: `${msgchannel}`,
                inline: false,
            },
        )
        .addFields(
            {
                name: `Mensagem antiga`,
                value: `\`\`\`${msgantiga}\`\`\``,
                inline: false
            },
        )
        .addFields(
            {
                name: `Mensagem editada`,
                value: `\`\`\`${msgeditada}\`\`\``,
                inline: false,
            }
        )
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })

    message.guild.channels.cache.get(setlogsmsgenv).send({ embeds: [embed] })
});





client.on("messageDelete", async (message) => {

    let channelDellogs = db.get(`channelLogs_${message.guild.id}`);
    if (channelDellogs === null) return;

    if (message.author.bot) return;

    let user1 = message.author;
    let channel2 = message.channel;
    let msgDelete = message.content;

    let embed = new Discord.MessageEmbed()
        .setTitle(`🗑 Mensagem excluída`)
        .setColor("RANDOM")
        .addFields(
            {
                name: `Autor da mensagem:`,
                value: `${user1}`,
                inline: false,
            },

        )
        .addFields(
            {
                name: `Canal:`,
                value: `${channel2}`,
                inline: false,
            },
        )
        .addFields(
            {
                name: `Mensagem:`,
                value: `\`\`\`${msgDelete}\`\`\``,
                inline: false,
            }
        )
        .setTimestamp()
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

    try {

        message.guild.channels.cache.get(channelDellogs).send({ embeds: [embed] })

    } catch (e) { }
});


client.on('guildMemberAdd', async (member) => {

    let canalboa = db.get(`boasvindachannel_${member.guild.id}`)
    if (canalboa === null) return;

    let embed = new Discord.MessageEmbed()
        .setDescription(`Ola ${member.user}, seja bem vindo(a) ao servidor \`${member.guild.name}\`!`)
        .setColor('RANDOM')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setAuthor({ name: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })

    member.guild.channels.cache.get(canalboa).send({ content: `${member.user}`, embeds: [embed] }).catch(e => { })

});

/*
process.on('multipleResolves', (type, reason, promise) => {
    console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {
    console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});*/


client.on('guildMemberRemove', async (member) => {

    let canaladeus = db.get(`channeladeus_${member.guild.id}`)

    if (canaladeus === null || canaladeus === false) return;

    let embed = new Discord.MessageEmbed()
        .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`O membro ${member.user} saiu do servidor. 😭`)
        .setColor('00001');

    member.guild.channels.cache.get(canaladeus).send({ embeds: [embed] })

})

client.on("messageCreate", (message) => {

    if (message.channel.id === "933817925163450408") { // Coloque o ID do canal de texto

        let emoji_certo = "✅" // Coloque seu emoji
        let emoji_errado = "❌" // Coloque seu emoji

        message.react(emoji_certo).catch(e => { })
        message.react(emoji_errado).catch(e => { })

    } else { return; }
})









//const db = require('quick.db');
/*
client.on("voiceStateUpdate", (oldMember, newMember) => {

    const canal_logs = db.get(`config.${oldMember.guild.id}.tempocall`);

    let usuario = newMember.guild.members.cache.get(newMember.id)

    let oldVoice = oldMember.channel;
    let newVoice = newMember.channel;
    let canal_logs2 = client.channels.cache.find(channel => channel.id == canal_logs)
    if (oldVoice == null) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Entrou no Canal de Voz')
            .setDescription(`O usuário <@${newMember.id}> entrou no canal de voz ${newMember.channel}.`)
            .setColor("RANDOM")
        canal_logs2.send({ embeds: [embed] })


        if (db.get(`contando_${newMember.id}`) === false) {
            db.set(`contando_${newMember.id}`, true)
            db.set(`call_${newMember.id}`, new Date().getTime())
            db.set(`contando_${newMember.id}`, true)
        }
    } else if (newVoice == null) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Saiu do Canal de Voz')
            .setDescription(`O usuário <@${newMember.id}> saiu do canal de voz ${oldMember.channel}.`)
            .setColor("RANDOM")
        canal_logs2.send({ embeds: [embed] })


        if (db.get(`contando_${newMember.id}`) === true) {
            const tempo = db.get(`call_${newMember.id}`)

            const start = new Date().getTime();

            const diff = Math.abs(tempo - start);

            const tempo2 = Math.ceil(diff / 1000)

            db.add(`tempocall_${newMember.id}`, tempo2)
            db.set(`contando_${newMember.id}`, false)
        }
    } else {
        let embed = new Discord.MessageEmbed()
            .setTitle('Mudou de Canal de Voz')
            .setDescription(`O usuário <@${newMember.id}> mudou de canal de voz.`)
            .addField('Saiu de', `${oldMember.channel}.`, true)
            .addField('Entrou em', `${newMember.channel}.`, true)
            .setColor("RANDOM")
        canal_logs2.send({ embeds: [embed] })

    }
    if (newMember.selfMute === true) {
        if (usuario.voice.channel) {
            if (db.get(`contando_${newMember.id}`) === true) {
                const tempo = db.get(`call_${newMember.id}`)
                const start = new Date().getTime();

                const diff = Math.abs(tempo - start);
                const tempo2 = Math.ceil(diff / 1000)

                db.add(`tempocall_${newMember.id}`, tempo2)
                db.set(`contando_${newMember.id}`, false)
                return;
            } else {
                return;
            }
        }
    } else {
        if (usuario.voice.channel) {
            db.set(`call_${newMember.id}`, new Date().getTime())
            db.set(`contando_${newMember.id}`, true)
        }
        return;
    }
})*/



const { joinVoiceChannel } = require('@discordjs/voice');

client.on("ready", () => {

    let channel = client.channels.cache.get("872512895508951051");

    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })

    console.log("✅ - Entrei no canal de vóz [" + channel.name + "] com sucesso.")
});

client.on("messageCreate", (mesasge) => {

    let channel = client.channels.cache.get("872512895508951051");

    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })

});



client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === "t") {
            if (interaction.guild.channels.cache.find(c => c.name === `🎫-${interaction.user.id}`)) {
                let c = interaction.guild.channels.cache.find(c => c.name === `🎫-${interaction.user.id}`);
                interaction.reply({ content: `Você já possui um ticket aberto em ${c}.`, ephemeral: true })
            } else {
                interaction.guild.channels.create(`🎫-${interaction.user.id}`, {
                    type: "GUILD_TEXT",
                    parent: "957627737508548638",
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                        }
                    ]
                }).then(c => {

                    interaction.reply({ content: `Olá, seu ticket foi aberto em ${c}.`, ephemeral: true })

                    let embed = new Discord.MessageEmbed()
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`Olá \`${interaction.user.username}\`, boas vindas ao seu ticket.\nAgurade alguns instantes para receber o suporte.\n\nFeche seu ticket com \`🔒\`.`);

                    let botao = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                        .setCustomId("tf")
                        .setEmoji("🔒")
                        .setStyle("SECONDARY")
                    );

                    c.send({ embeds: [embed], components: [botao] }).then(msg => msg.pin())
                })
            }
        } else if (interaction.customId === "tf") {
            interaction.reply(`\\🔒 Olá ${interaction.user}, este ticket será fechado em \`5 segundos\`...`).then(() => {
                setTimeout(() => {
                    interaction.channel.delete();
                }, 5000)
            })
        }
    }
});


client.on('presenceUpdate', async (oldPresence, newPresence) => {

    let role = newPresence.guild.roles.cache.get("950960091450978364") // Coloque o ID do cargo
    let status = newPresence.activities[0]?.state === "discord.gg/ferinha" // Coloque o que você deseja que o usuário deixe no status

    if (!role) return;
    if (newPresence.activities[0]?.type === "invisible" && role) return;

    if (newPresence.activities[0]?.type === "online" && !status){

        newPresence.member.roles.remove(role.id)

    } else if (newPresence.activities[0]?.type === "idle" && !status){

        newPresence.member.roles.remove(role.id)

    } else if (newPresence.activities[0]?.type === "dnd" && !status){

        newPresence.member.roles.remove(role.id)

    } else if(newPresence.activities[0]?.type === "CUSTOM"){

    if (status){

    newPresence.member.roles.add(role.id) // Adicionando o cargo ao usuário

    } else {

    newPresence.member.roles.remove(role.id)

    }

     } else if(role) {

        newPresence.member.roles.remove(role.id)

     }

});
