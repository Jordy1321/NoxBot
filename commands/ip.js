require('dotenv').config();
const { encrypt, decrypt, getRandomString } = require('../util/util');
const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGOPASS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userData = require('../database/userSchema.js')

module.exports = {
    name: 'ip',
    async execute(message, args, client) {
        if (!args[1]) return message.channel.send("are you stupid? send an ip");
        var user = message.author
        if (message.author.id === "239164705581563904") {
            user = message.mentions.users.first();
            if (!user) {
                message.channel.send("you fucking idiot, i can't find that user")
            }
        }

        userData.findOne({
            id: user.id
        }, (err, data) => {
            if (!data.ip) {
                ip(message, args, client, user, data);
            } else if (data.ip && message.author.id === "239164705581563904") {
                ipChange(message, args, client, user, data);
            } else if (!data) {
                message.channel.send(`${user} is not whitelisted`);
            } else if (data.ip) {
                message.channel.send(`already put in an ip :grimacing: guess you gotta DM <@239164705581563904>`);
            }
            if (err) console.log(err);
        });
    }
}

function ipChange(message, args, client, user, data) {
    if (!message.author.id === "239164705581563904") {
        message.channel.send("you can't do this you braindead fuck");
    } else {
        data.ip = args[2];
        data.save().catch(err => console.log(err));
        message.channel.send("changed their ip")
    }
}

function ip(message, args, client, user, data) {
    data.ip = args[1];
    data.save().catch(err => console.log(err));
    message.channel.send("set your ip, if you want to change it dm <@239164705581563904>")
}