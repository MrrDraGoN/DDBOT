const Discord = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
module.exports = {
    name: "say",
    category: "Administration",
    aliases: [""],
    cooldown: 2,
    usage: "say <TEXT>",
    description: "Resends your Text",
    run: async (client, message, args, user, text, prefix) => {
    try{

//FUNCTION
   /*   if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply(`nie masz uprawnień! Potrzebujesz permisji Administratora!`)
    }*/

//SAY TEXT
    if(args[0]== `text`){
    if(!args[1]){
        const embed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setTitle('Błąd! Nie podano Argumentu2!')
            message.channel.send(embed).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}));
            return;
    }
    message.channel.send(args.slice(1).join(" "))
    }
//SAY EMBED
    if(args[0]== `embed`){
        if(!args[1]){
            const embed = new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTitle('Błąd! Nie podano Argumentów!')
                message.channel.send(embed).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}));
                return;
        }
//SAY EMBED BOT
        if(args[1]== `bot`){
        const embed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
            .setDescription(`${args.slice(2).join(" ")}`)
            message.channel.send(embed); 
        }
//SAY EMBED USER
        if(args[1]== `user`){
            const embed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setAuthor(`${message.author.username}`,message.author.displayAvatarURL({size: 4096, format: "png", dynamic: true}))
            .setDescription(`${args.slice(0).join(" ")}`)
            message.channel.send(embed);  
        }
      }
//SAY ERROR
      if(args[0]== null){
        const embed = new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle('Błąd! Nie podano Argumentów!')
            .setDescription(`**Przykład** \n${config.prefix}say embed (bot/user) dragon to kozak\n${config.prefix}say text dragon to kozak`)
            message.channel.send(embed).then(msg=>msg.delete({timeout: config.deletemessagetime*1000}));
    }
    
//MODLOG
    let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
    const modlog = new Discord.MessageEmbed()
    .setColor(ee.infocolor)
    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    .setTitle(`Komenda: ${module.exports.name}`)
    .setDescription(`🖋️ <@${message.author.id}> napisał **${args[0]}** Używając bota | <#${message.channel.id}>`)
    .addField(`Całe Komenda`, `\`\`\`${config.prefix}${module.exports.name} ${args.slice(0).join(" ")} \`\`\``)
    .setTimestamp('timestamp')
    .setFooter(ee.footertext, ee.footericon)
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
