module.exports = {
    name: 'test',
    description: "This displays all of my commands!",
    async execute(message, args){
      return message.channel.send("Test command works!");
    }
}