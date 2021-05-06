const Discord = require("discord.js");
const config = require('../../config/config.js');
const ee = require('../../config/embed.js');
module.exports = {
    name: "roles",
    category: "Information",
    aliases: [""],
    cooldown: 2,
    usage: "roles",
    description: "Show all roles",
    run: async (client, message, args, user, text, prefix) => {
    try {
//FUNCTION

const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

        const inrole = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
        .setColor(config.infocolor)
        .setTitle(`Role (${roles.length - 1})`)
        .setDescription(roles.join('\n'))
        .setFooter(ee.footertext, ee.footericon)
        message.channel.send(inrole);


    
//MODLOG
        let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
        let errorlogchannel = client.channels.cache.get(config.ErrorLogChannelID);
        const modlog = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`Komenda: ${module.exports.name}`)
        .setDescription(`👻 <@${message.author.id}> zobaczył role | <#${message.channel.id}>`)
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
