const Discord = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const { formatDate, getMember } = require("../../functions.js");

module.exports = {
    name: "todo",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "todo",
    description: "Resends your Text",
    run: async (client, message, args, user, text, prefix) => {
    try {
//FUNCTION
        const ServerLogo = message.guild.iconURL();
        const TODO = new Discord.MessageEmbed()
        .setDescription(`**TO DO LIST**`)
        .setColor('ORANGE')
        .setThumbnail(ServerLogo)
        .addField('Ogarnać', [
            `**1 -** ~~ogarnać serverinfo (zmniejszyć ilośc informacji)~~`,
            `**2 -** zrobić advanced serwerinfo dla admina`,
            `**3 -** BETTER ban/kick (dodać możliwośc kickowania i banowania przez ID)`,
            `**4 -** `,
            `**5 -** `
        ])
        .addField('Zrobić', [
            `**1 -** VoiceKICK`,
            `**2 -** `,
            `**3 -** `,
            `**4 -** `,
            `**5 -** `,
        ])
        .setTimestamp();
        message.channel.send(TODO)
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
