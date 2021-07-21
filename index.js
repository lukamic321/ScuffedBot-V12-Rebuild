// Required
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
require('dotenv').config();
const mongoose = require('mongoose');

// Const
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
	require(`./handlers/${handler}`)(client, Discord);
});

mongoose.connect(process.env.MONGODB_SRV, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
}).then(() => {
	console.log('Connected to the database.');
}).catch((err) => {
	console.log(err);
});

// client.on('ready', () => {
// 	console.log('ScuffedBot is online!');
// 	client.user.setActivity('Prefix is: $', { type: "WATCHING" }).catch(console.error);
// });

client.login(process.env.DISCORD_TOKEN);