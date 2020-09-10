const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    message.delete().catch(O_o => { });
    const canal = await message.author.createDM()

    let helpembed = new Discord.MessageEmbed()
        .setAuthor('Report - Choose')
        .setColor('#e11212')
        .setDescription('Selecione entre DM -> 🎫, Sala privada ->🎟️')
        .setFooter('2020 © Bidetti')

        
    message.channel.send(helpembed).then(msg => {
        msg.react('🎫')
        msg.react('🎟️')

        let filtrodm = (reaction, user) => reaction.emoji.name === "🎫" && user.id === message.author.id;
        let filtroprivate = (reaction, user) => reaction.emoji.name === "🎟️" && user.id === message.author.id;

        const colectordm = msg.createReactionCollector(filtrodm, { max: 1, time: 60000 }); //MÁXIMO DE REACTIONS PRA POR | TEMPO EM MILESEGUNDOS QUE O BOT RESPONDERÁ AO CLICAR
        const colectorprivate = msg.createReactionCollector(filtroprivate, { max: 1, time: 60000 });

        colectordm.on("collect", () => {
            msg.delete()
            let reportdmmessage = new Discord.MessageEmbed()
                .setAuthor('Report - Etapa (1/2)')
                .setColor('#e11212')
                .setDescription('Digite denúncia que será enviada para nossa equipe da administração!')
                .setFooter('2020 © Bidetti')
                message.author.send(reportdmmessage).then(msg => {
                    let mc = canal.createMessageCollector(z => z.author.id == message.author.id, { max: 1 })
                        .on('collect', c => {
                            msg.delete()
                            denuncia = c.content
                            //c.delete()
                            let imagereportembed = new Discord.MessageEmbed()
                                .setAuthor('Report - Etapa (2/2)')
                                .setColor('#e11212')
                                .setDescription('Caso você queira adicionar alguma imagem, vídeo ou clipe que comprove a sua denúncia!\n_(Lembrando que é necessário o envio das imagens/vídeos por link e não por anexo, ex: imgur.com/exemplo)_')
                                .setFooter('2020 © Bidetti')


                            // Image get
                            message.author.send(imagereportembed).then(msg2 => {
                                let mc2 = canal.createMessageCollector(z => z.author.id == message.author.id, { max: 1 })
                                    .on('collect', c => {
                                        images = c.content
                                        //c.delete
                                        msg2.delete()
                                        let reportCompleted = new Discord.MessageEmbed()
                                            .setAuthor('Report - Concluído')
                                            .setColor('#e11212')
                                            .setDescription('O player foi reportado, vamos analisar e tomar providências, Obrigado!')
                                            .setFooter('2020 © Bidetti')
                                        message.author.send(reportCompleted)

                                        let reportLog = new Discord.MessageEmbed()
                                            .setAuthor('Report - ' + message.author.username)
                                            .setColor('#e11212')
                                            .setDescription(`_${denuncia}_`)
                                            .setFooter('2020 © Bidetti')

                                        let reportlogchannel = bot.channels.cache.get('CHANNEL_ID')
                                        reportlogchannel.send(images, reportLog)
                                        
                                    })
                            })
                        })
                })
            })
        colectorprivate.on("collect", () => {
            msg.delete()
            /*const receivedmsg = await message.channel.send('Estou criando o seu canal para registrar a sua denúncia! <a:loading:746068939410374667>')
            setTimeout(() => {
                receivedmsg.edit('Canal criado e configurado com sucesso! <a:yes:740879022636138567>')*/

                if (message.guild.channels.cache.find(c => c.name === "report-" + message.author.id)) return message.author.send(`Você ja possui um reporte aberto.`);
                let category = message.guild.channels.cache.get('CATEGORY_ID')
                if (!category) return console.log('Error! Categoria de Report não encontrada!');
                let role = message.guild.roles.cache.find(role => role.name === "ROLE_NAME");
                let role2 = message.guild.roles.cache.find(role2 => role2.name === "@everyone");
                message.guild.channels.create(`report-${message.author.id}`, "text").then(ch => {
                    ch.setParent(category)
                    ch.updateOverwrite(role, {
                        'SEND_MESSAGES': true,
                        'VIEW_CHANNEL': true,
                        'READ_MESSAGES': true
                    });
                    ch.updateOverwrite(role2, {
                        'SEND_MESSAGES': false,
                        'VIEW_CHANNEL': false,
                        'READ_MESSAGES': false
                    });
                    ch.updateOverwrite(message.author, {
                        'SEND_MESSAGES': true,
                        'VIEW_CHANNEL': true,
                        'READ_MESSAGES': true
                    })
                    let reportdmmessage = new Discord.MessageEmbed()
                        .setAuthor('Report - Etapa (1/2)')
                        .setColor('#e11212')
                        .setDescription('Digite denúncia que será enviada para nossa equipe da administração!')
                        .setFooter('2020 © Bidetti')
                    ch.send(reportdmmessage).then(msg => {
                        let mc = ch.createMessageCollector(z => z.author.id == message.author.id, { max: 1 })
                            .on('collect', c => {
                                msg.delete()
                                denuncia = c.content
                                c.delete()
                                let imagereportembed = new Discord.MessageEmbed()
                                    .setAuthor('Report - Etapa (2/2)')
                                    .setColor('#e11212')
                                    .setDescription('Caso você queira adicionar alguma imagem, vídeo ou clipe que comprove a sua denúncia!\n_(Lembrando que é necessário o envio das imagens/vídeos por link e não por anexo, ex: imgur.com/exemplo)_')
                                    .setFooter('2020 © Bidetti')


                                // Image get
                                ch.send(imagereportembed).then(msg2 => {
                                    let mc2 = ch.createMessageCollector(z => z.author.id == message.author.id, { max: 1 })
                                        .on('collect', c => {
                                            images = c.content
                                            c.delete()
                                            msg2.delete()
                                            let reportCompleted = new Discord.MessageEmbed()
                                                .setAuthor('Report - Concluído')
                                                .setColor('#e11212')
                                                .setDescription('O player foi reportado, vamos analisar e tomar providências, Obrigado!')
                                                .setFooter('2020 © Bidetti')
                                            ch.send(reportCompleted)

                                            let reportLog = new Discord.MessageEmbed()
                                                .setAuthor('Report - ' + message.author.username)
                                                .setColor('#e11212')
                                                .setDescription(`_${denuncia}_`)
                                                .setFooter('2020 © Bidetti')

                                            let reportlogchannel = bot.channels.cache.get('CHANNEL_ID')
                                            reportlogchannel.send(images, reportLog)
                                            setTimeout(() => {
                                                ch.delete()
                                            }, 15000) // VOCÊ PODE MUDAR O TEMPO AQUI
                                        })
                                })
                            })
                    })
                })
            })
    });

}
module.exports.help = {
    name: "reportv3"
}
