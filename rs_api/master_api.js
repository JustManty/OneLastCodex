const Bestiary = require('./bestiary_api')

const MasterAPI = {
    getBestiaryNames: async (startingLetter) => {return await Bestiary.callBestiaryNames((startingLetter))},
    getBeastData: async (beastID) => {return await Bestiary.callBeastData(beastID)},
    getWeaknesses: async () => {return await Bestiary.callWeaknessNames()},
    getAreaNames: async () => {return await Bestiary.callAreaNames()}
}

module.exports = MasterAPI;