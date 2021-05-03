const private = require('../models/private');

module.exports = {
	name: 'private',
	aliases: ['p', 'pr'],
	permissions: ['SPEAK'],
	cooldown: 5,
	description: 'Creates a private voice channel for the user',
	async execute(message, args, cmd, client, Discord) {
		const author = message.author;
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) return message.channel.send(`${author} Please join a voice channel before using this command.`);

		if (cmd === 'private') {

			if (args[0].toLowerCase() === 'create') {

				const category = message.guild.channels.cache.find(channel => channel.name === 'Temp Channels' && channel.type === 'category');

				if (!category) {
					console.log('There is no temp channels category');
					message.reply('There is no "Temp Channels" category');
					return;
				}

				if (args[1]) {
					const invites = args.slice(1);
					message.reply(`args: ${args}\ninvites: ${invites}`);
				}

				message.guild.channels.create(message.author.username, {
					type: 'voice',
					permissionOverwrites: [
						{
							id: message.guild.roles.everyone,
							deny: ['VIEW_CHANNEL'],
						},
					],
					parent: 'Temp Channels',
				});
			}
		}
	},
};