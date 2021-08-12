const channelModel = require('../models/channelSchema');

module.exports = {
	name: 'private',
	aliases: ['p', 'vc'],
	cooldown: 0,
	permissions: [],
	description: "Creates private voice channels",

	async run(client, message, cmd, args, Discord, channelData) {

		if (args[0] === 'create' || args[0] === 'c') {
			// check if user is in a voice channel -----------------------------
			if (!message.member.voice.channel) {
				return message.channel.send('You need to be in a voice channel to use this command!');
			}
			// -----------------------------------------------------------------

			// Check if private channels category exists -----------------------
			const privateCategory = message.guild.channels.cache.find(channel => (channel.name === 'Private Channels') && (channel.type === 'category'));

			if (!privateCategory) {
				message.channel.send(`This server doesn't have a 'Private Channels' channel category. Please create one.`);
			}
			// -----------------------------------------------------------------

			// Create VC -------------------------------------------------------

			try {
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
				}).then((channel) => {
					message.member.voice.setChannel(channel).then(async (guildmember) => {
						let channelDB = await channelModel.create({
							channelID: channel.id,
							ownerID: message.author.id,
						});
						channelDB.save();

						// await profileModel.findOneAndUpdate({
						// 	userID: guildmember.id,
						// }, {
						// 	serverID: guildmember.guild.id, channelID: guildmember.voice.channelID,
						// });
						console.log(' ');
						console.log(guildmember.voice.channelID);
					});
				});
			} catch (err) {
				console.log(err);
			}
			// -----------------------------------------------------------------

			// Update Database -------------------------------------------------

			// -----------------------------------------------------------------
		}

		return;
	},
};