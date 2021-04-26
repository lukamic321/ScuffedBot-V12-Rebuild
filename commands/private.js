module.exports = {
	name: 'private',
	aliases: ['p', 'pr'],
	description: 'Creates a private voice channel for the user',
	async execute(client, message, cmd, args) {
		const author = message.author;
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) return message.channel.send(`${author} PLease join a voice channel before using this command.`);

		voiceChannel.join()
			.then(console.log(`Connected to ${voiceChannel}`))
			.catch(console.error);
	},
};