module.exports = {
	name: 'test',
	aliases: ['t', 't1'],
	cooldown: 5,
	// permissions: ["", ""],
	description: "For testing aliased commands",

	async run(client, message, cmd, args, Discord, profileData) {
		if (cmd === 'test' || cmd === 't') {
			return message.reply('test');
		}

		if (cmd === 't1') {
			return message.reply('test1');
		}

		return;
	},
};