const Discord = require("discord.js");
const config = require('../../config/config.js');
const ee = require('../../config/embed.js');
module.exports = {
    name: "role",
    category: "Information",
    aliases: [""],
    cooldown: 2,
    usage: "role",
    description: "Show all users in specified role",
    run: async (client, message, args, user, text, prefix) => {
    try {
//FUNCTION
        let role = message.mentions.roles.first();
        if(!role) role = message.guild.roles.cache.find(r => r.id == args[0]);
        if(args[0] == null) {            
            const error1 = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setColor(config.infocolor)
            .setDescription(`Brak argumentu`)
            .setFooter(ee.footertext, ee.footericon)
            return message.channel.send(error1).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}));
        }
        if(!role) {            
            const error2 = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setColor(config.infocolor)
            .setDescription(`Rola ${args[0]} nie istnieje`)
            .setFooter(ee.footertext, ee.footericon)
            return message.channel.send(error2).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}));
        }
        let arr = new Array();
        role.members.forEach(user => {
            arr.push(`--> <@${user.user.id}>`);
        });
            const inrole = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setColor(config.infocolor)
            .setDescription(`**Rola**  ${args[0]}`)
            .addField(`Lista osób`, arr.join('\n'))
            .setFooter(ee.footertext, ee.footericon)
            message.channel.send(inrole);

//MODLOG
        let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
        let errorlogchannel = client.channels.cache.get(config.ErrorLogChannelID);
        const modlog = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`Komenda: ${module.exports.name}`)
        .setDescription(`👻 <@${message.author.id}> zobaczył użytkowników  role | <#${message.channel.id}>`)
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
