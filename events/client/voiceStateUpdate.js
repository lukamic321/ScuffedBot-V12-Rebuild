const profileModel = require('../../models/profileSchema');

module.exports = async (Discord, client, user, oldState, newState) => {

	if (oldState) {
		const UID = oldState.member.user.id;
		const SID = oldState.guild.id;

		let profileData;
		try {
			profileData = await profileModel.findOne({ userID: user.id });
			if (!profileData) {
				// eslint-disable-next-line prefer-const
				let profile = await profileModel.create({
					userID: UID,
					serverID: SID,
					channelID: '0',
				});
				profile.save();
			}
		} catch (err) {
			console.log(err);
		}

		if(!profileData) {
			return;
		}

		if (!profileData.channelID) {
			console.log('No channelID in database');
		}

		if (profileData.channelID) {
			if (oldState.channelID === profileData.channelID) {
				console.log(`Old State: ${oldState.channelID}`);
				console.log(`Database: ${profileData.channelID}`);
				// oldState.channel.delete();
			} else {
				return;
			}
		}

		console.log(profileData.channelID);

	}
};