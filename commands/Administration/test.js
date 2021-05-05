const Discord = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const moment = require('moment');
const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};
const verificationLevels = {
    NONE: 'Brak',
    LOW: '1',
    MEDIUM: '2',
    HIGH: '3',
    VERY_HIGH: '4'
};
const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};
module.exports = {
    name: "test",
    category: "Information",
    aliases: [""],
    cooldown: 2,
    usage: "test",
    description: "Resends your Text",
    run: async (client, message, args, user, text, prefix) => {
    try {
//FUNCTION
       const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;
        const ServerLogo = message.guild.iconURL();
/*       const ServerInfoEmbed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setDescription(`**Server Info**`)
        .setColor('BLACK')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField('General', [
            `**Name:** ${message.guild.name}`,
            `**ID:** ${message.guild.id}`,
            `**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
            `**Region:** ${regions[message.guild.region]}`,
            `**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
            `**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
            `**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
            `**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]`,
            '\u200b'
        ])
        .addField('Statistics', [
            `**Role Count:** ${roles.length}`,
            `**Emoji Count:** ${emojis.size}`,
            `**Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
            `**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
            `**Member Count:** ${message.guild.memberCount}`,
            `**Humans:** ${members.filter(member => !member.user.bot).size}`,
            `**Bots:** ${members.filter(member => member.user.bot).size}`,
            `**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
            `**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
            `**Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
            '\u200b'
        ])
        .addField('Status', [
            `**Online:** ${members.filter(member => member.presence.status === 'online').size}`,
            `**Bezczynny:** ${members.filter(member => member.presence.status === 'idle').size}`,
            `**Nie przeszkadzać:** ${members.filter(member => member.presence.status === 'dnd').size}`,
            `**Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
            '\u200b'
        ])
        .addField(`Roles [${roles.length - 1}]`, roles.join(', '))

        .setTimestamp();
        message.channel.send(ServerInfoEmbed)*/

        const Serverinfo = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setColor('RANDOM')
        .addField('Informacje', [
            `:crown: **Właściciel:** <@${message.guild.owner.id}>`,
            `:id: **Sever ID:** ${message.guild.id}`,
            `:calendar: **Data Stworzenia:** ${moment(message.guild.createdTimestamp).format('L')} ${moment(message.guild.createdTimestamp).locale("pl").format('LT')} [${moment(message.guild.createdTimestamp).locale("pl").fromNow()}]`,
            '\u200b',
            `**Statystyki**`
        ])
        .addField(`:busts_in_silhouette: Ilośc osób (${message.guild.memberCount})`, `**${members.filter(member => member.presence.status === 'online').size}** Online\n**${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : '0'}** Boostów`, true)
        .addField(`:speech_balloon: Kanały (${channels.filter(channel => channel.type !== 'category').size})`, `**Głosowe: **${channels.filter(channel => channel.type === 'voice').size}\n**Textowe:** ${channels.filter(channel => channel.type === 'text').size}`, true)
        .addField(`:earth_africa: Inne`, `**Region: **${regions[message.guild.region]}\n**Poziom Weryfikacji:** ${verificationLevels[message.guild.verificationLevel]}`, true)
        .setTimestamp()
        .setFooter(ee.footertext, ee.footericon)
    
        message.channel.send(Serverinfo);

    
//MODLOG
        let modlogchannel = client.channels.cache.get(config.ModLogChannelID);
        let errorlogchannel = client.channels.cache.get(config.ErrorLogChannelID);
        const modlog = new Discord.MessageEmbed()
        .setColor(ee.infocolor)
        .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTitle(`komenda: ${module.exports.name}`)
        .setDescription(`<@${message.author.id}> użył komendy\n`)
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
