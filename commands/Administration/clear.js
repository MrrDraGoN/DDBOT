const Discord = require("discord.js");
const config = require('../../config/config.js');
const ee = require('../../config/embed.js');
module.exports = {
    name: "clear",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "clear <AMOUNT>",
    description: "remove last message",
    run: async (client, message, args, user, text, prefix) => {
    try{
//FUNCTION
        //if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        //    return message.reply(`nie masz uprawnień! Potrzebujesz **Zarządzanie wiadomościami**!`).then(msg=>msg.delete({timeout: config.mediumdeletetime*1000}))
       // }

        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply(`BOT nie ma uprawnień! BOT potrzebuje permisji **Zarządzanie wiadomościami**!`).then(msg=>msg.delete({timeout: config.mediumdeletetime*1000}))
        }

        if(!args[0])  {
            return message.reply(`podaj ilość wiadomości do usunięcia!`).then(msg=>msg.delete({timeout: config.mediumdeletetime*1000}))
        }

        message.channel.bulkDelete(args[0]);

//SEND EMBED
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
        .setDescription(`Chat został wyczyszczony przez użytkownika: <@${message.author.id}>`)
        message.channel.send(embed).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}))


        let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
        const embed1 = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`Komenda: ${module.exports.name}`)
        .setDescription(`:wastebasket: <@${message.author.id}> Wyczyścił **${args[0]}** Wiadomosci | <#${message.channel.id}>`)
        .addField(`Całe Komenda`, `\`\`\`${config.prefix}${module.exports.name} ${args.slice(0).join(" ")} \`\`\``)
        .setTimestamp('timestamp')
        .setFooter(`${message.author.id}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        modlogchannel.send(embed1);
//ERROR
    } catch (e) {
        console.log(String(e.stack).bgRed)
        if (config.ErrorLogChannelID == null){
            return message.channel.send(`Bot Napotkał Problem`).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}));
        }else{
            return errorlogchannel.send(`Bot Napotkał Problem | ${module.exports.name}`);
        }
    }
  }
}