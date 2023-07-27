const Discord = require('discord.js');
const db = require('quick.db');
//const util = require("util");

 module.exports = {
	name: 'vip',
	aliases: ['configvip'],

	run: async(client, message, args) => {
	  
		let vip = db.get(`Vip_${message.guild.id}_${message.author.id}`) 
        let categoria = db.get(`CategoriaVip_${message.guild.id}`)

        let Categoria0 = await message.guild.channels.cache.get(db.get(`CategoriaVip_${message.guild.id}`))
        let Call0 = await message.guild.channels.cache.get(db.get(`CallVip_${message.guild.id}_${message.author.id}`))
        let Cargo0 = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))

        
        let cargoativo = Cargo0 || "Nenhum cargo criado!"
        let callativa = Call0 || "Nenhuma call criada!"

        let CallEmbed = db.get(`CallVip_${message.guild.id}_${message.author.id}`)
        if(CallEmbed == null) CallEmbed = "Criar Call";
        if(CallEmbed >= 1) CallEmbed = "Editar Call";

        let CargoEmbed = db.get(`CargoVip_${message.guild.id}_${message.author.id}`)
        if(CargoEmbed == null) CargoEmbed = "Criar Cargo";
        if(CargoEmbed >= 1) CargoEmbed = "Editar Cargo";

        if (!categoria) return message.reply(`**Me desculpe mas o sistema de vip está desativado nesse servidor, peça para que algum administrador ative-o!**`)

        let avisonvip = new Discord.MessageEmbed()
        .setColor([255, 182, 193])
        .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Olá ${message.author}, Você não é um usuario vip!`);

        if (!vip) return message.reply({ embeds: [avisonvip] }).then(msg => 
            setTimeout( () => {
                msg.delete()
            }, 10000)
        )
            

        let CallEmbedEdit = db.get(`CallVip_${message.guild.id}_${message.author.id}`)
        if(CallEmbedEdit == null) CallEmbedEdit = "Criar Call";
        if(CallEmbedEdit >= 1) CallEmbedEdit = "Editar Call";

        let CargoEmbedEdit = db.get(`CargoVip_${message.guild.id}_${message.author.id}`)
        if(CargoEmbedEdit == null) CargoEmbedEdit = "Criar Cargo";
        if(CargoEmbedEdit >= 1) CargoEmbedEdit = "Editar Cargo";

        const painel = new Discord.MessageEmbed()
        .setColor([255, 182, 193])
        .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Olá ${message.author}, este é seu painel de configuração vip!\n`)
        .addFields(
            {
                name: "Informações",

                value: `Cargo: ${cargoativo}
Call: ${callativa}`,
            },
            {
                name: "Importante",
                value: `**1** ${CargoEmbedEdit}
**2** ${CallEmbedEdit}
**3** Adicionar um usuário
**4** Remove um usuário
**5** Mudar a cor do Cargo
➡ Reseta o vip`
            }
        )
        message.reply({ embeds: [painel] }).then(msg => {
            msg.react('1⃣').then(r => {
              msg.react('2⃣').then(r => {
                msg.react('3⃣').then(r => {
                  msg.react('4⃣').then(r => {
                    msg.react('5⃣').then(r => {
                      msg.react('➡').then(r => {
                          })
                        })
                      })
                    })
                  })
                })
                const CriarCargoFilter = (reaction, user) => reaction.emoji.name === '1⃣' && user.id === message.author.id;//ok
                const CriarCallFilter = (reaction, user) => reaction.emoji.name === '2⃣' && user.id === message.author.id;//ok
                const AddUserFilter = (reaction, user) => reaction.emoji.name === '3⃣' && user.id === message.author.id;//ok
                const RemoveUserFilter = (reaction, user) => reaction.emoji.name === '4⃣' && user.id === message.author.id;//ok
                const MudarCorFilter = (reaction, user) => reaction.emoji.name === '5⃣' && user.id === message.author.id;//ok
            	const ResetarFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;//ok

                const CriarCargo = msg.createReactionCollector({ filter: CriarCargoFilter});//ok
                const CriarCall = msg.createReactionCollector({ filter: CriarCallFilter});//ok
                const AddUser = msg.createReactionCollector({ filter: AddUserFilter});//ok
                const MudarCor = msg.createReactionCollector({ filter: MudarCorFilter});//ok
            	const Resetar = msg.createReactionCollector({ filter: ResetarFilter});//ok
                const RemoveUser = msg.createReactionCollector({ filter: RemoveUserFilter});//ok
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
                //Criar Cargo
                CriarCargo.on("collect", async (reaction, user) => {
                switch (reaction.emoji.name) {
                case "1⃣":

                let Cargo = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                if (Cargo){
                    
                    //message.channel.send("Você já possui um cargo de vip criado, por isso eu não irei criar outro!")
                    message.channel.send({ embeds: [
                        new Discord.MessageEmbed()
                        .setDescription('**Qual sera o novo nome do seu cargo?**')
                        .setColor("#FFB6C1")
                    ] }).then(m => {

                    message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, max: 1})
                    .on("collect", async message => {
                    let CargoEdit = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                    let editarnome = message.content

                    m.delete().catch(e=>{})

                    CargoEdit.setName(editarnome);

                    let CallEditada = new Discord.MessageEmbed()
                    .setColor([255, 182, 193])
                    .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Seu cargo vip foi editado com sucesso!**`)
                    .setFooter(`Painel Vip de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

                    message.channel.send({ embeds: [CallEditada] }).then(msg => 
                        setTimeout( () => {
                            msg.delete()
                        }, 10000)
                    )
                        

                    let CallEdit2 = await message.guild.channels.cache.get(db.get(`CallVip_${message.guild.id}_${message.author.id}`))
                    let CargoEdit2 = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                    let editarmsg3 = CargoEdit2 || "Nenhum cargo criado!"
                    let editarmsg4 = CallEdit2 || "Nenhuma call criada!"

                    let CallEmbedEdit = db.get(`CallVip_${message.guild.id}_${message.author.id}`)
                    if(CallEmbedEdit == null) CallEmbedEdit = "Criar Call";
                    if(CallEmbedEdit >= 1) CallEmbedEdit = "Editar Call";

                    let CargoEmbedEdit = db.get(`CargoVip_${message.guild.id}_${message.author.id}`)
                    if(CargoEmbedEdit == null) CargoEmbedEdit = "Criar Cargo";
                    if(CargoEmbedEdit >= 1) CargoEmbedEdit = "Editar Cargo";
                    const paineledit = new Discord.MessageEmbed()
                    .setColor([255, 182, 193])
                    .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Olá ${message.author}, este é seu painel de configuração vip!\n`)
                    .addFields(
                        {
                            name: "Informações",

                            value: `Cargo Vip: ${editarmsg3}
            Call Vip: ${editarmsg4}`,
                        },
                        {
                            name: "Importante",
                            value: `**1** ${CargoEmbedEdit}
**2** ${CallEmbedEdit}
**3** Adicionar um usuário
**4** Remove um usuário
**5** Mudar a cor do Cargo
➡ Resetar o  vip
                            `
                        }
                    )
                    msg.edit({ embeds: [paineledit] })
                    return;
                    })
                    })
                }
                else
                {

                message.channel.send({ embeds: [
                    new Discord.MessageEmbed()
                    .setDescription('Qual sera o nome do seu cargo?')
                    .setColor("#FFB6C1")
                ]
            }).then(m => {

                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, max: 1 })
                .on("collect", async (message, user) => {
                    
                const util = require('util');
                    
                const setTimeoutPromise = util.promisify(setTimeout);
                
                const uservip = message.author
                let nomecargo = message.content

                const role = await message.guild.roles.create({
                      name: `${nomecargo}`,
                  })

                if (message.guild.members.cache.get(uservip.id).roles.cache.has(role.id)) return message.reply("Você já possui esse cargo!")
                message.guild.members.cache.get(uservip.id).roles.add(role.id).catch(e => console.log(e) )
                //uservip.roles.add([role.id])
                db.set(`CargoVip_${message.guild.id}_${message.author.id}`, role.id)
                //message.channel.send(`Cargo: ${role}`)
                    
                let CargoCriado = new Discord.MessageEmbed()
                .setColor([255, 182, 193])
                .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`**Cargo de vip criado com sucesso!**`)
                .setFooter(`Painel Vip de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

                message.channel.send({ embeds: [CargoCriado] }).then(msg => 
                    setTimeout( () => {
                        msg.delete()
                    }, 10000)
                )
                    
                
                let CallEdit = await message.guild.channels.cache.get(db.get(`CallVip_${message.guild.id}_${message.author.id}`))
                let CargoEdit = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                let editarmsg = CargoEdit || "Nenhum cargo criado!"
                let editarmsg2 = CallEdit || "Nenhuma call criada!"

                let CallEmbedEdit = db.get(`CallVip_${message.guild.id}_${message.author.id}`)
                if(CallEmbedEdit == null) CallEmbedEdit = "Criar Call";
                if(CallEmbedEdit >= 1) CallEmbedEdit = "Editar Call";

                let CargoEmbedEdit = db.get(`CargoVip_${message.guild.id}_${message.author.id}`)
                if(CargoEmbedEdit == null) CargoEmbedEdit = "Criar Cargo";
                if(CargoEmbedEdit >= 1) CargoEmbedEdit = "Editar Cargo";
                const paineledit = new Discord.MessageEmbed()
                .setColor([255, 182, 193])
                .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Olá ${message.author}, este é seu painel de configuração vip!\n`)
                .addFields(
                    {
                        name: "Informações",

                        value: `Cargo Vip: ${editarmsg}
        Call Vip: ${editarmsg2}`,
                    },
                    {
                        name: "Importante",
                        value: `**1** ${CargoEmbedEdit}
**2** ${CallEmbedEdit}
**3** Adicionar um usuário
**4** Remove um usuário
**5** Mudar a cor do Cargo
➡ Reseta o vip 
                        `
                    }
                )
                msg.edit({ embeds: [paineledit] })
                })
                //break;
            
                })
                }
                }
                })
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
                //Criar Call
                CriarCall.on("collect", async (reaction, user) => {
                switch (reaction.emoji.name) {
                case "2⃣":

                let Call = await message.guild.channels.cache.get(db.get(`CallVip_${message.guild.id}_${message.author.id}`))
                if (Call){
                    //message.channel.send("Você já possui uma call de vip criada, por isso eu não irei criar outra!")
                    message.channel.send({ embeds: [
                        new Discord.MessageEmbed()
                        .setDescription('Qual sera o novo nome da sua Call?')
                        .setColor("#FFB6C1")
                    ] }).then(m => {
                    message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, max: 1 })
                    .on("collect", async message => {
                    let CallEdit = await message.guild.channels.cache.get(db.get(`CallVip_${message.guild.id}_${message.author.id}`))
                    let editarnome = message.content

                    CallEdit.setName(editarnome);
                    let CallEditada = new Discord.MessageEmbed()
                    .setColor([255, 182, 193])
                    .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Sua call vip foi editada com sucesso!**`)
                    .setFooter(`Painel Vip de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

                    message.channel.send({ embeds: [CallEditada] }).then(msg => 
                        setTimeout( () => {
                            msg.delete()
                        }, 10000)
                    )
                        

                    let CallEditt = await message.guild.channels.cache.get(db.get(`CallVip_${message.guild.id}_${message.author.id}`))
                    let CargoEdit = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                    let editarmsg = CargoEdit || "Nenhum cargo criado!"
                    let editarmsg2 = CallEditt || "Nenhuma call criada!"
                    let CallEmbedEdit = db.get(`CallVip_${message.guild.id}_${message.author.id}`)
                    if(CallEmbedEdit == null) CallEmbedEdit = "Criar Call";
                    if(CallEmbedEdit >= 1) CallEmbedEdit = "Editar Call";

                    let CargoEmbedEdit = db.get(`CargoVip_${message.guild.id}_${message.author.id}`)
                    if(CargoEmbedEdit == null) CargoEmbedEdit = "Criar Cargo";
                    if(CargoEmbedEdit >= 1) CargoEmbedEdit = "Editar Cargo";
                    const paineledit = new Discord.MessageEmbed()
                    .setColor([255, 182, 193])
                    .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Olá ${message.author}, este é seu painel de configuração vip!\n`)
                    .addFields(
                        {
                            name: "Informações",

                            value: `Cargo Vip: ${editarmsg}
            Call Vip: ${editarmsg2}`,
                        },
                        {
                            name: "Importante",
                            value: `**1** ${CargoEmbedEdit}
**2** ${CallEmbedEdit}
**3** Adicionar um usuário
**4** Remove um usuário
**5** Mudar a cor do Cargo
 ➡ Reseta o vip
                            `
                        }
                    )
                    msg.edit({ embeds: [paineledit] })
                    return;
                    })
                    })
                }
                else
                {
                    
                if (!Categoria0){
                    message.reply(`**Não foi setada uma categoria vip nesse servidor!**        \`Use 'g!scv ID DA CATEGORIA'\``)
				}

                let cargo = db.get(`CargoVip_${message.guild.id}_${message.author.id}`)

                if(!cargo){
                    message.reply("Desculpe, mas você não possui um cargo Vip, crie um primeiro!");
                }
                if(cargo){
                message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setDescription('Qual sera o nome da sua Call?')
                    .setColor("#FFB6C1")
                ]
            }).then(m => {

                message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, max: 1 })
                .on("collect", async message => {
                let nomecall = message.content

                const channel = await message.guild.channels.create(nomecall, {
                    type: 'GUILD_VOICE',
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: ["MOVE_MEMBERS", "CONNECT", "MUTE_MEMBERS"]
                        },
                        {
                            id: message.guild.roles.cache.find(role => role.id == cargo),
                            allow: ["CONNECT"],
                        },
                        {
                            id: message.guild.id,
                            deny: ["CONNECT"]
                        }
                    ],
                    reason: `O Vip ${message.author.username} solicitou a criação!`,
                });
                channel.setParent(Categoria0, { lockPermissions: false })

                let CallCriada = new Discord.MessageEmbed()
                .setColor([255, 182, 193])
                .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`<a:app_verify:798743375774744596> **Sua call de vip foi criada com sucesso!**`)
                .setFooter(`Painel Vip de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

                message.channel.send({ embeds: [CallCriada] }).then(msg => 
                    setTimeout( () => {
                        msg.delete()
                    }, 10000)
                )
                    

                db.set(`CallVip_${message.guild.id}_${message.author.id}`, channel.id)   
                
                let CallEdittt = await message.guild.channels.cache.get(db.get(`CallVip_${message.guild.id}_${message.author.id}`))
                let CargoEdit = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                let editarmsg = CargoEdit || "Nenhum cargo criado!"
                let editarmsg2 = CallEdittt || "Nenhuma call criada!"

                let CallEmbedEdit = db.get(`CallVip_${message.guild.id}_${message.author.id}`)
                if(CallEmbedEdit == null) CallEmbedEdit = "Criar Call";
                if(CallEmbedEdit >= 1) CallEmbedEdit = "Editar Call";

                let CargoEmbedEdit = db.get(`CargoVip_${message.guild.id}_${message.author.id}`)
                if(CargoEmbedEdit == null) CargoEmbedEdit = "Criar Cargo";
                if(CargoEmbedEdit >= 1) CargoEmbedEdit = "Editar Cargo";

                const paineledit = new Discord.MessageEmbed()
                .setColor([255, 182, 193])
                .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Olá ${message.author}, este é seu painel de configuração vip!\n`)
                .addFields(
                    {
                        name: "Informações",

                        value: `Cargo Vip: ${editarmsg}
        Call Vip: ${editarmsg2}`,
                    },
                    {
                        name: "Importante",
                        value: `**1** ${CargoEmbedEdit}
**2** ${CallEmbedEdit}
**3** Adicionar um usuário
**4** Remove um usuário
**5** Mudar a cor do Cargo
➡ Reseta o vip
                        `
                    }
                )
                msg.edit({ embeds: [paineledit] })
                })
                })
                break;
                }
                }
                }
                })
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
                //Adicionar Usuario
                AddUser.on("collect", async (reaction, user) => {
                switch (reaction.emoji.name) {
                case "3⃣":

                let Cargo = await message.guild.channels.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                    message.channel.send({ embeds: [
                        new Discord.MessageEmbed()
                        .setDescription('Quem você deseja adicionar seu cargo?')
                        .setColor("#FFB6C1")
                    ] }).then(msg => {

                    message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, max: 1 })
                    .on("collect", async message => {

                    const Usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                    if (!Usuario) return message.channel.send('**Você não mencionou um usuario!**');
                    
                    if (Usuario.user.bot) return message.channel.send('**Você não pode adicionar um Bot!**');

                    const setarcargo = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                    
                    if (message.guild.members.cache.get(Usuario.id).roles.cache.has(setarcargo.id)) return message.channel.send(`${Usuario} já possui esse cargo!`)
                	message.guild.members.cache.get(Usuario.id).roles.add(setarcargo.id)
                      
                    db.set(`UsuarioVip_${message.guild.id}_${message.author.id}`, Usuario.id)
					
                    
                    let UserAdicionado = new Discord.MessageEmbed()
                    .setColor([255, 182, 193])
                    .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**O usuario ${Usuario} foi adicionado com sucesso!**`)
                    .setFooter(`Painel Vip de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

                    message.channel.send({ embeds: [UserAdicionado] }).then(msg => 
                        setTimeout( () => {
                            msg.delete()
                        }, 10000)
                    )
                        
                })
                })
                break;
                }
                })

                //Remover Usuario
                RemoveUser.on("collect", async (reaction, user) => {
                switch (reaction.emoji.name) {
                case "4⃣":

                let Cargo = await message.guild.channels.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                    message.channel.send({ embeds: [
                        new Discord.MessageEmbed()
                        .setDescription('Quem você deseja remover seu cargo?')
                        .setColor("#FFB6C1")
                    ]
                }).then(msg => {

                    message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, max: 1 })
                    .on("collect", async message => {

                    const Usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                    if (!Usuario) return message.channel.send('**Você não mencionou um usuario!**');

                    const setarcargo = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                    if (!message.guild.members.cache.get(Usuario.id).roles.cache.has(setarcargo.id)) return message.channel.send(`${Usuario} não possui seu cargo!`)
                	message.guild.members.cache.get(Usuario.id).roles.remove(setarcargo.id)
                      
                    db.delete(`UsuarioVip_${message.guild.id}_${message.author.id}`, Usuario.id)
					
                    
                    let UserAdicionado = new Discord.MessageEmbed()
                    .setColor([255, 182, 193])
                    .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**O usuario ${Usuario} foi removido com sucesso!**`)
                    .setFooter(`Painel Vip de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send({ embeds: [UserAdicionado] })
                })
                })
                break;
                }
                })

                //Resetar
                Resetar.on("collect", async (reaction, user) => {
                switch (reaction.emoji.name) {
                case "➡":
                    const apagarcargo = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`)) 
                    if(apagarcargo){
                    db.delete(`CargoVip_${message.guild.id}_${message.author.id}`)
                    apagarcargo.delete(`O Vip ${message.author.tag} solicitou a exclusão do seu cargo!`)
                    }

                    const apagarcall = await message.guild.channels.cache.get(db.get(`CallVip_${message.guild.id}_${message.author.id}`))
                    if(apagarcall){
                    db.delete(`CallVip_${message.guild.id}_${message.author.id}`)
                    apagarcall.delete(`O Vip ${message.author.tag} solicitou a exclusão da sua call!`)
                    }

                    const usuariosapagar = db.get(`UsuarioVip_${message.guild.id}_${message.author.id}`)
                    if(usuariosapagar){
                    db.delete(`UsuarioVip_${message.guild.id}_${message.author.id}`)
                    }

                    let resetado = new Discord.MessageEmbed()
                    .setColor([255, 182, 193])
                    .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Seu painel foi resetado com sucesso e sua call e cargo foram apagados com sucesso!**`)
                    .setFooter(`Painel Vip de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send({ embeds: [resetado] })

                    let CallEditttt = await message.guild.channels.cache.get(db.get(`CallVip_${message.guild.id}_${message.author.id}`))
                    let CargoEdit = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`))
                    let editarmsg = CargoEdit || "Nenhum cargo criado!"
                    let editarmsg2 = CallEditttt || "Nenhuma call criada!"

                    let CallEmbedEdit = db.get(`CallVip_${message.guild.id}_${message.author.id}`)
                    if(CallEmbedEdit == null) CallEmbedEdit = "Criar Call";
                    if(CallEmbedEdit >= 1) CallEmbedEdit = "Editar Call";

                    let CargoEmbedEdit = db.get(`CargoVip_${message.guild.id}_${message.author.id}`)
                    if(CargoEmbedEdit == null) CargoEmbedEdit = "Criar Cargo";
                    if(CargoEmbedEdit >= 1) CargoEmbedEdit = "Editar Cargo";
                    const paineledit = new Discord.MessageEmbed()
                    .setColor([255, 182, 193])
                    .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Olá ${message.author}, este é seu painel de configuração vip!\n`)
                    .addFields(
                        {
                            name: "Informações",

                            value: `Cargo Vip: ${editarmsg}
            Call Vip: ${editarmsg2}`,
                        },
                        {
                            name: "Importante",
                            value: `**1** ${CargoEmbedEdit}
**2** ${CallEmbedEdit}
**3** Adicionar um usuário
**4** Remove um usuário
**5** Mudar a cor do Cargo
➡ Resetar o vip
                            `
                        }
                    )
                    msg.edit({ embeds: [paineledit] })
                break;
                }
                });
                
                //Mudar Cor
                MudarCor.on("collect", async (reaction, user) => {
                switch (reaction.emoji.name) {
                case "5⃣":
                    const cargocor = await message.guild.roles.cache.get(db.get(`CargoVip_${message.guild.id}_${message.author.id}`)) 
                    if (!cargocor) return message.channel.send(`**Você precisa criar um cargo primeiro!**`)

                    message.channel.send({ embeds: [
                        new Discord.MessageEmbed()
                        .setDescription('**Qual sera a cor do seu cargo?**')
                        .setColor("#FFB6C1")
                    ] }).then(m => {
                    message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, max: 1 })
                    .on("collect", async (message, user) => {

                    const regex = /(#)/gi;  
                    const cor = message.content

                    if(!regex.exec(message.content)){
                        message.channel.send("Você precisa me enviar uma **Hex Color** para poder selecionar a cor!")
                    }

                    cargocor.setColor(cor)

                    let cormudada = new Discord.MessageEmbed()
                    .setColor(cor)
                    .setAuthor(`Painel Vip`, 'https://cdn.discordapp.com/attachments/834585308971794433/839692503937974332/settings.png')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Cor alterada com sucesso!**`)
                    .setFooter(`Painel Vip de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send({ embeds: [cormudada] })
                //break;
                })
                })
                }
                });
    });
        
  },
}; 