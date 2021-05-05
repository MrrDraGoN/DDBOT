const Discord = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
module.exports = {
    name: "unban",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "unban <MENTION> <RESON>",
    description: "Resends your Text",
    run: async (client, message, args, user, text, prefix) => {
    try{
    //FUNCTION
    //CATCH ERROR
            if(!message.member.hasPermission("BAN_MEMBERS")) {
              return message.channel.send(`**${message.author.username}**, You do not have perms to unban someone`)
            }
            
            if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
              return message.channel.send(`**${message.author.username}**, I do not have perms to unban someone`)
            }
            
            let userID = args[0]
            message.guild.fetchBans().then(bans=> {
                if(bans.size == 0) return 
                let bUser = bans.find(b => b.user.id == userID)
                if(!bUser) return
                message.guild.members.unban(userID)
            })
    //SEND BAN MESSAGE
        const user = await client.users.fetch(userID, { cache: true });
        const userTag = `${user.username}#${user.discriminator}`;
        const embed = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`UNBAN!`)
        .setDescription(`:airplane: **Powód** \` ${args.slice(1).join(" ")} \``)
        .addFields(
            { name: 'Admin', value: `<@${message.author.id}>`, inline: true },
            { name: 'Odbanowany', value: userTag , inline: true },
        )
        .setTimestamp('timestamp')
        .setFooter(`${message.author.id}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        message.channel.send(embed).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}))

    //MODLOG
        let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
        let usere = message.mentions.users.first()
        const embed1 = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`Komenda: ${module.exports.name}`)
        .setDescription(`:airplane: **Powód** \` ${args.slice(1).join(" ")} \``)
        .addFields(
            { name: 'Admin', value: `<@${message.author.id}>`, inline: true },
            { name: 'Odbanowany', value: userTag , inline: true },
        )
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