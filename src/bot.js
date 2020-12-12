const Discord = require('discord.js');
const config = require('./data/config.json');

const client = new Discord.Client();
let ready = false;

client.login(config.discordToken);
client.on('ready', () => {
    ready = true;
    
    client.user.setPresence({ activity: { name: `tracking Hypixel moderators.` }, status: 'dnd' })
    
});

let prev = {first: true, online: []};
exports.update = (members) => {
    
    if(!ready) return;

    let online = Object.keys(members).map(m => members[m]).filter(m => m.state == true);

    if(prev.online.length != online.length) {
        client.guilds.cache.get(config.discordGuild).channels.cache.get(config.discordChannel).setTopic(`**${online.length} staff online;** ${online.map(m => m.player).join(', ')}.`);
    }
    
    const embed = new Discord.MessageEmbed()
        .setTitle(`player joined or left idk`)
        .setColor('#aeff7b')
        .setFooter("Tracker :D")
        .setTimestamp();
    
    prev.online = online;
    prev.first  = false;
    
}