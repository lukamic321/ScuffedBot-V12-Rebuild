module.exports = {
	name: 'ping',
	aliases: ['pp'],
	cooldown: 5,
	permissions: ["ADMINISTRATOR"],
	description: "Replies with 'Pong!'",

	async run(client, message, cmd, args, Discord, profileData) {
		message.reply('Pong!');
	},
};