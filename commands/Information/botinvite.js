const Discord = require("discord.js");
const config = require('../../config/config.js');
const ee = require('../../config/embed.js');
const { formatDate, getMember } = require("../../functions.js");
module.exports = {
    name: "botinvite",
    category: "Information",
    aliases: [""],
    cooldown: 2,
    usage: "botinvite",
    description: "invite bot to server",
    run: async (client, message, args, user, text, prefix) => {
    try {
//FUNCTION
        const embed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setTitle('Zaproszenie bota')
            .setDescription('https://discord.com/api/oauth2/authorize?client_id=836562736057548802&permissions=8&scope=bot')
            message.channel.send(embed);
//MODLOG
        let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
        let errorlogchannel = client.channels.cache.get(config.ErrorLogChannelID);
        const modlog = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`Komenda: ${module.exports.name}`)
        .setDescription(`🤖 <@${message.author.id}> Chce zaprosić bota | <#${message.channel.id}>`)
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
