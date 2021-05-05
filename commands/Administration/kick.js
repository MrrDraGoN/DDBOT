const Discord = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const { formatDate, getMember } = require("../../functions.js");
module.exports = {
    name: "kick",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "kick <MENTION> <POWÓD>",
    description: "Resends your Text",
    run: async (client, message, args, user, text, prefix) => {
    try {
//FUNCTION
//CHECK PERMISSION
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            const error1 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('Nie posiadasz uprawnień! Potrzebne permisje Wyrzucanie członków')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error1).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}))
        }
 
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            const error2 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('BOT nie ma uprawnień! BOT potrzebuje permisji Wyrzucanie członków!')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error2).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}))
        }
//CATCH ERROR
        if(!args[0]) {
            const error3 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('Nie oznaczono użytkownika')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error3).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}))
        }
 
        let usertokick = message.guild.member(message.mentions.users.first());
 
        if(!usertokick) {
            const error4 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('Nie znaleziono Użytkownika')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error4).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}))
        }
 
        if(usertokick.hasPermission("ADMINISTRATOR")) {
            const error5 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('Podana osoba nie może zostać wyrzucona!')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error5).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}))
        }
 
        if(!args[1]) {
            const error6 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('Nie podano powodu!')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error6).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}))
        }
 
        const powod = args.slice(1).join(" ");
//KICK MESSAGE
        let kickuser = message.mentions.users.first()
        const kickmessage = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`KICK!`)
        .addFields(
            { name: 'Admin', value: `<@${message.author.id}>`, inline: true },
            { name: 'Wyrzucony', value: `${kickuser.tag}`, inline: true },
        )
        .setDescription(`❌ **Powód** \` ${args.slice(1).join(" ")} \`\n`)
        .setTimestamp('timestamp')
        .setFooter(`${kickuser.id}`, kickuser.displayAvatarURL({ format: 'png', dynamic: true }))
        usertokick.kick({ reason: powod })
        message.channel.send(kickmessage).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}))

//MODLOG
        let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
        let errorlogchannel = client.channels.cache.get(config.ErrorLogChannelID);
        let usere = message.mentions.users.first()
        const embed1 = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`Komenda: ${module.exports.name} ${args[0]}`)
        .addFields(
            { name: 'Wyrzucający', value: `<@${message.author.id}>`, inline: true },
            { name: 'Wyrzucony', value: `${usere.tag}`, inline: true },
        )
        .setDescription(`👀**Powód** \` ${args.slice(1).join(" ")} \`
        `)
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
