const Discord = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
module.exports = {
    name: "ban",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "ban <MENTION> <TIME> <RESON>",
    description: "Resends your Text",
    run: async (client, message, args, user, text, prefix) => {
    try{

//CHECK PERMISSION
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            const error1 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('Nie posiadasz uprawnień! Potrzebne permisje Banowania członków!')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error1).then(msg=>msg.delete({timeout: config.longdeletetime*1000}))
        }
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            const error2 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('BOT nie ma uprawnień! BOT potrzebuje permisji Banowanie członków!')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error2).then(msg=>msg.delete({timeout: config.longdeletetime*1000}))
        }
//CHECK ERROR
        if(!args[0]) {
            const error3 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('Nie oznaczono użytkownika')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error3).then(msg=>msg.delete({timeout: config.longdeletetime*1000}))
        }
        let BanUser = message.guild.member(message.mentions.users.first());
 
        if(!BanUser) {
            const error4 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('Nie znaleziono Użytkownika')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error4).then(msg=>msg.delete({timeout: config.longdeletetime*1000}))
        }
 
        if(BanUser.hasPermission("ADMINISTRATOR")) { 
            const error5 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('Podana osoba nie może zostać zbanowana!')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error5).then(msg=>msg.delete({timeout: config.longdeletetime*1000}))
        }
 
        if(args[1] == null) {
            const error6 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Błąd')
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription('Nie podano powodu!')
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
            return message.channel.send(error6).then(msg=>msg.delete({timeout: config.longdeletetime*1000}))
        }
 
        const powod = args.slice(1).join(" ");

//BAN MESSAGE
        let banneduser = message.mentions.users.first()
        const banmessage = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`BAN!`)
        .addFields(
            { name: 'Admin', value: `<@${message.author.id}>`, inline: true },
            { name: 'Zbanowany', value: `${banneduser.tag}`, inline: true },
        )
        .setDescription(`🔒 **Powód** \` ${args.slice(1).join(" ")} \`\n`)
        .setTimestamp('timestamp')
        .setFooter(`${banneduser.id}`, banneduser.displayAvatarURL({ format: 'png', dynamic: true }))
        BanUser.ban({ reason: powod })
        message.channel.send(banmessage).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}))

//MODLOG
        let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
        let usere = message.mentions.users.first()
        const modlog = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`Komenda: ${module.exports.name} ${args[0]}`)
        .addFields(
            { name: 'Admin', value: `<@${message.author.id}>`, inline: true },
            { name: 'Zbanowany', value: `${usere.tag}`, inline: true },
        )
        .setDescription(`🔒 **Powód** \` ${args.slice(1).join(" ")} \`\n`)
        .setTimestamp('timestamp')
        .setFooter(`${message.author.id}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        modlogchannel.send(modlog);
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