const Discord = require('discord.js'); 
const {Client, Intents} = require('discord.js');
const config = require('./config.json'); 

const client = new Client({
    partials: ["CHANNEL", "MESSAGE"],
    intents: [Intents.FLAGS.GUILDS]
});

client.once("ready", () => {
    console.log(
        `Connected : ${client.user.id}\n` + 
        `Servers : ${client.guilds.cache.size}\n` + 
        `Members : ${client.users.cache.size}`
    ); 
    client.user.setActivity({name: "Tohsaka | +help"}); 
});

client.on("messageCreate", function(message) {
    const args = message.content.slice(config.prefix.length).trim().split(/ + /g); 
    
    if(message.content.startsWith(config.prefix + "button")){
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("this is the custom id of this button")
            .setLabel("this is the message will be in the button")
            .setEmoji("an optional emoji next to the label of the button")
            .setStyle("this is the style of the button")
            .setURL("here put the url of the button if the style of the button is LINK"), 
            new Discord.MessageButton()
            // and give the customid, the label... this is an example for have two buttons
        ); 

        let embed = new Discord.MessageEmbed()
        .setDescription("Click on the button please")
        .setColor("BLURPLE"); 

        message.channel.send({embeds : [embed], components: [row]}).then((msgembed) => {

        const collector = message.channel.createMessageComponentCollector({componentType: "BUTTON"}); 
        collector.on("collect", async(c) => {
            const value = c.customId; 

            if(value === "give the custom id of your button"){
                embed.setDescription(`Thanks for click on the button`); 
                msgembed.edit({embeds : [embed]}); 
            }
        })
        })
    }

    if(message.content.startsWith(config.prefix + "select")){
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId("give the custom id")
            .setPlaceholder("this is the text on the bar of the select menu")
            .addOptions([
                {
                    label: "here the label", 
                    description: "here the description", 
                    emoji: "here the optional emoji", 
                    value: "here the value"
                },
                {
                    label: "give another label", 
                    // And give the description, the emoji, the value....
                }
            ])
        ); 

        let embed = new Discord.MessageEmbed()
        .setDescription("Click on the select menu please")
        .setColor("BLURPLE"); 

        message.channel.send({embeds : [embed], components: [row]}).then((msgembed) => {

        const collector = message.channel.createMessageComponentCollector({componentType: "SELECT_MENU"}); 
        collector.on("collect", async(c) => {
            const value = c.values[0]; 

            if(value === "give the custom id of your button"){
                embed.setDescription(`Thanks for click on the button`); 
                msgembed.edit({embeds : [embed]}); 
            }
        })
        })
    }
})

client.login(config.token); 