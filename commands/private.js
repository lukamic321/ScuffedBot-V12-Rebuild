const profileModel = require('../models/profileSchema');

module.exports = {
	name: 'private',
	aliases: ['p', 'vc'],
	cooldown: 0,
	permissions: [],
	description: "Creates private voice channels",

	async run(client, message, cmd, args, Discord, profileData) {

		if (args[0] === 'create' || args[0] === 'c') {
			// check if user is in a voice channel -----------------------------
			if (!message.member.voice.channel) {
				return message.channel.send('You need to be in a voice channel to use this command!');
			}
			// -----------------------------------------------------------------

			// Check if private channels category exists -----------------------
			const privateCategory = message.guild.channels.cache.find(channel => (channel.name === 'Private Channels') && (channel.type === 'category'));

			console.log(privateCategory);

			if (!privateCategory) {
				message.channel.send(`This server doesn't have a 'Private Channels' channel category. Please create one.`);
			}
			// -----------------------------------------------------------------

			// Create VC -------------------------------------------------------
			message.member.voice.setChannel(
				await message.guild.channels.create(`${message.author.username}'s voice channel`, {
					type: 'voice',
					parent: privateCategory,
					permissionOverwrites: [
						{
							id: message.guild.id,
							deny: 'VIEW_CHANNEL',
						},
						{
							id: message.author.id,
							allow: 'VIEW_CHANNEL',
						},
					],
				}), 'created private channel',
			).catch(err => {
				console.log(err);
			});
			// -----------------------------------------------------------------

			// Update Database -------------------------------------------------
			await profileModel.findOneAndUpdate({
				userID: message.author.id,
			}, {
				serverID: message.guild.id, channelID: message.member.voice.channelID,
			});
			// -----------------------------------------------------------------
		}

		return;
	},
};