require('dotenv').config();
const { encrypt, decrypt, getRandomString } = require('../util/util');
const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGOPASS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userData = require('../database/userSchema.js')

module.exports = {
    name: 'whitelist',
    async execute(message, args, client) {
        if (message.author.id !== "239164705581563904") return message.channel.send("thanks for trying fucking retard")
        var user = message.mentions.users.first();

        if (user.id === message.author.id) return message.channel.send("don't whitelist yourself retard");
        if (!user) return message.reply("no user no whitelist stupid");
        if (user.bot) return message.reply("bots don't need a whitelist fucking idiot");

        userData.findOne({
            id: user.id
        }, (err, data) => {
            if (data) {
                message.channel.send("This user has already been whitelisted");
            } else {
                whiteList(message, args, client, user);
            };
            if (err) console.log(err);
        });

    }
}

function whiteList(message, args, client, user) {
    var key = `${getRandomString(25)}.${getRandomString(10)}.${getRandomString(50)}`;
    const newUserSettings = new userData({
        id: user.id,
        key
    });
    newUserSettings.save().catch(err => console.log(err));
    user.send(`Hello, you have been whitelisted\nThis is your key, KEEP SECURED!!!\n\`\`\`${key}\`\`\``);
    message.channel.send(`Whitelisted <@${user.id}>`);
}