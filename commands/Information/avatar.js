const Discord = require("discord.js");
const config = require('../../config/config.js');
const ee = require('../../config/embed.js');
module.exports = {
    name: "avatar",
    category: "Information",
    aliases: [""],
    cooldown: 2,
    usage: "avatar",
    description: "Get a user's avatar.",
    run: async (client, message, args, user, text, prefix) => {
    try {
//FUNCTION
        const user = message.mentions.users.first() || message.author;
        const avatarcommand = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(user.tag, user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`Avatar`)
        .setURL(user.avatarURL)
        .setImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setFooter(`Na życzenie ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, }));
        message.channel.send(avatarcommand)
        
//MODLOG
        let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
        let errorlogchannel = client.channels.cache.get(config.ErrorLogChannelID);
        const modlog = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`Komenda: ${module.exports.name}`)
        .setDescription(`🧑 <@${message.author.id}> Zobaczył avatar <@${user.id}> | <#${message.channel.id}>`)
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
