require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();
const mongoose = require('mongoose');
const mongolink = process.env.MONGOPASS
const keepAlive = require('./server.js')

mongoose.connect(`${mongolink}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ayo its workin!');
    client.user.setActivity('With a ball')
        .catch(console.error);
});

client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    if (message.content.startsWith("!ip")) return client.commands.get("ip").execute(message, args, client)
    if (message.channel.type === "dm") return;

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    try {
        command.execute(message, args, client)
    } catch (error) {
        console.error(error);
        message.reply('error message here')
    }
});

keepAlive()
client.login(process.env.BOT_TOKEN);