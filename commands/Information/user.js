const Discord = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const { formatDate, getMember } = require("../../functions.js");
module.exports = {
    name: "user",
    category: "Information",
    aliases: [""],
    cooldown: 2,
    usage: "user <USER>",
    description: "Shows information, such as ID and join date, about yourself or a user.",
    run: async (client, message, args, user, text, prefix) => {
    try {
//FUNCTION
        let usere = message.mentions.users.first() || message.author;
        const membere = getMember(message, args.slice(1).join(" "));
        const hrole = membere.roles.cache.filter(r => r.id !== message.guild.id).array().length !== 0? `(<@&${membere.roles.highest.id}>)` : "(Brak Roli Serwerowej)"
        const arole = membere.roles.cache.filter(r => r.id !== message.guild.id).array().length !== 0? `${membere.roles.cache.filter(r => r.id !== message.guild.id).array().length}` : `Brak Roli Serwerowej`
        const created = formatDate(usere.createdAt);
        const joined = formatDate(membere.joinedAt);
        let rolemap = membere.roles.cache
        .filter(r => r.id !== message.guild.id)
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(",");
        if (rolemap.length > 1024) rolemap = "Za Dużo Ról";
//SEND INFO
        const userinfo = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(`${usere.displayAvatarURL()}`)
        .setFooter(`${usere.tag}`, `${usere.displayAvatarURL()}`)
        .setTitle("Informacje o " + `${usere.username}`)
        .addFields(
        { name: `👤  | Uzytkownik`, value: `
        **🎴 | Nick -> ** ${usere.tag}
        **📋 | ID -> ** ${usere.id}
        **📅 | Data Stworzenia Konta ->** ${created} `, inline: false },
        { name: '🦴 | Serwerowe', value: 
        `**✨ | Role ->** (${arole})
        ${rolemap} \n **👑 | Najwyższa Rola ->**  ${hrole}  
        **📆 | Dołączyłeś na Serwer ->**  ${joined} `, inline: false },
        )
        message.channel.send(userinfo)  

//MODLOG
        let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
        let errorlogchannel = client.channels.cache.get(config.ErrorLogChannelID);
        const modlog = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`Komenda: ${module.exports.name}`)
        .setDescription(`👦 <@${message.author.id}> napisał **${args[0]}** Używając bota | <#${message.channel.id}>`)
        .addField(`Całe Komenda`, `\`\`\`${config.prefix}${module.exports.name} ${args.slice(0).join(" ")} \`\`\``)
        .setTimestamp('timestamp')
        .setFooter(ee.footertext, ee.footericon)
        modlogchannel.send(modlog);
//ERROR
        } catch (e) {
            console.log(String(e.stack).bgRed)
            if (config.ErrorLogChannelID == null){
            return message.channel.send(`Bot Napotkał Problem`);
            }else{
                errorlogchannel.send(`Bot Napotkał Problem | ${module.exports.name}`);
            }
        }
    }
}
