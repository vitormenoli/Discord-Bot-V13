module.exports = {
    name: "8ball", // Coloque o nome do comando do arquivo
    aliases: ["vieirinha"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!args[0]) return message.reply(`Escreva uma pergunta.`);
        let respostas = ["sim", "provavelmente sim", "provavelmente não", "não", "óbvio que não", "Não faço ideia", "Não pergunte para mim", "Pergunta isso pro dono da padaria", "Nunca nem vi"];
        let resposta = respostas[Math.floor(Math.random()*respostas.length)];

        try {

        message.channel.createWebhook('Vieirinha', {
            avatar: 'https://i.imgur.com/KnXiuvs.png',

        }).then(web => {
            web.send(`${message.author} ${resposta}`)
            .then(()=> {web.delete() })
        })


    } catch (e) { console.log(e); message.reply(`Eu estou sem a permissão de criar webhooks.`) }
        

       
        
    }
}