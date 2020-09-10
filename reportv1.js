const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  const receivedmsg = await message.channel.send('Instruções sendo enviadas para a sua **DM**! <a:loading:746068939410374667>')
  setTimeout(() => {
      receivedmsg.edit('Instruções enviadas para sua **DM** <a:yes:740879022636138567>')
  }, 4000) // VOCÊ PODE MUDAR O TEMPO AQUI

  setTimeout(() => {
      receivedmsg.delete()
  }, 10000) // VOCÊ PODE MUDAR O TEMPO AQUI
 
    let instruction = new Discord.MessageEmbed()
    .setAuthor('Instruções - Report')
    .setColor('#e11212')
    .setDescription('Estou carregando as instruções, aguarde!')
    .setFooter('2020 © Bidetti')
    // MESSAGE EMBED
    let reportdmmessage = new Discord.MessageEmbed()
    .setAuthor('Report - Etapa (1/2)')
    .setColor('#e11212')
    .setDescription('Digite denúncia que será enviada para nossa equipe da administração!')
    .setFooter('2020 © Bidetti')
    const canal = await message.author.createDM()
    const dminstruction = await message.author.send(instruction)
    setTimeout(() => {
    dminstruction.edit(reportdmmessage).then(msg => {
    let mc = canal.createMessageCollector(z => z.author.id == message.author.id, {max: 1})
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
                let mc2 = canal.createMessageCollector(z => z.author.id == message.author.id, {max: 1})
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
                    .setAuthor('Report - '+message.author.username)
                    .setColor('#e11212')
                    .setDescription(`_${denuncia}_`)
                    .setFooter('2020 © Bidetti')

                    let reportlogchannel = bot.channels.get('CHANNEL_ID')
                    reportlogchannel.send(images, reportLog)
            })
          })
    })
  })
}, 10000) // VOCÊ PODE MUDAR O TEMPO AQUI
}
module.exports.help = {
  name:"report"
}
