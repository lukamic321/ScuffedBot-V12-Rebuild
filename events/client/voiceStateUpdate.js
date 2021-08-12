const channelModel = require('../../models/channelSchema');

module.exports = async (Discord, client, user, oldState, newState) => {

	try {
		const OSID = oldState.id;
		const NSID = newState.id;

		if (NSID == null) {
			console.log('user left a voice channel');
			channelRemove(oldState, channelModel);
		} else if (OSID == null) {
			console.log('user joined a voice channel');
		} else if (OSID != NSID) {
			console.log('user changed voice channels');
			channelRemove(oldState, channelModel);
		}
	} catch (err) {
		console.log(err);
	}

	async function channelRemove(oldState, channelModel) {

		let channelData;
		try {
			channelData = await channelModel.findOne({ channelID: oldState.id });
			if (!channelData) return;
		} catch (err) {
			console.log(err);
		}

		const CID = channelData.channelID;
		const PID = oldState.channelID;
		const UID = oldState.member.user.id;
		const POID = channelData.ownerID;

		if (POID === UID) {
			oldState.channel.delete('User left temp channel');
		} else return;
	}

	// try {
	// 	if (oldState.channelID != null && newState.channelID != null && newState.channelID != oldState.channelID) {

	// 		const CID = channelData.channelID;
	// 		const PID = oldState.channelID;
	// 		const UID = oldState.member.user.id;
	// 		const POID = channelData.ownerID;

	// 		if (channelData.channelID) {
	// 			if (CID === PID && UID == POID) {
	// 				oldState.channel.delete();
	// 			} else {
	// 				return;
	// 			}
	// 		}

	// 	} else if (newState.channelID === null) {

	// 		const CID = channelData.channelID;
	// 		const PID = oldState.channelID;
	// 		const UID = oldState.member.user.id;
	// 		const POID = channelData.ownerID;

	// 		if (channelData.channelID) {
	// 			if (CID === PID && UID == POID) {
	// 				oldState.channel.delete();
	// 			} else {
	// 				return;
	// 			}
	// 		}
	// 	}
	// } catch (err) {
	// 	console.log(err);
	// }


	// let profileData;
	// try {
	// 	profileData = await profileModel.findOne({ userID: user.id });
	// 	if (!profileData) {
	// 		// eslint-disable-next-line prefer-const
	// 		let profile = await profileModel.create({
	// 			userID: UID,
	// 			serverID: SID,
	// 			channelID: '0',
	// 		});
	// 		profile.save();
	// 	}
	// } catch (err) {
	// 	console.log(err);
	// }

	// if(!profileData) {
	// 	return;
	// }

	// if (!profileData.channelID) {
	// 	console.log('No channelID in database');
	// }

	// if (profileData.channelID) {
	// 	if (oldState.channelID === profileData.channelID) {
	// 		console.log(`Old State: ${oldState.channelID}`);
	// 		console.log(`Database: ${profileData.channelID}`);
	// 		// oldState.channel.delete();
	// 	} else {
	// 		return;
	// 	}
	// }

	// console.log(profileData.channelID);

};