const Discord = require('discord.js');

const embed = new Discord.MessageEmbed()
    .setColor('#ffffff')
    .setTitle('Test')

module.exports = {
    name: 'test',
    description: "This displays all of my commands!",
    async execute(message, args){
      return message.channel.send(embed);
    }
}