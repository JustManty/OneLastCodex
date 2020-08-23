const MasterAPI = require('./../rs_api/master_api.js');
const Bestiary = require('./../rs_api/bestiary_api.js');
const Logger = require("../utils/logger");
const Database = require("../database/db.js");

async function getBeastData() {
    let beastArray = []
    let beastDataArray = []
    for (const letter of 'Q') {
        for (const beast of JSON.parse(await MasterAPI.getBestiaryNames(letter))) {
            if (Object.keys(beast)[0] === 'label') {
                beastArray.push(Bestiary.Beast(beast));
            }
        }
    }
    for (const beast of beastArray) {
        beastData = Bestiary.BeastData(JSON.parse(await MasterAPI.getBeastData(beast.id)))
        beastDataArray.push(beastData);
    }
    Database.QueryDB(
        'INSERT INTO Monster'
    )
}

async function getAreas() {

}

async function getWeaknesses() {
    let weaknesses = []
    results = JSON.parse(await MasterAPI.getWeaknesses());
    for (let i = 0; i < Object.keys(results).length; i++) {
        weaknesses.push(Bestiary.Weakness(Object.keys(results)[i], Object.values(results)[i]));
    }
    for (const weakness of weaknesses) {
        if ((await Database.QueryDB(`Select * From weakness Where SpecificWeakness = '${weakness.name}'`) == null)) {
            let insertStatement = "INSERT INTO weakness(SpecificWeakness, StyleWeakness, StyleNeutral, StyleResistant) VALUES ("
            insertStatement += "'" + weakness.name + "'";
            switch (weakness.name) {
                case "Air":
                case "Earth":
                case "Fire":
                case "Water":
                    insertStatement += ",'Magic','Melee','Ranged'";
                    break;
                case "Arrow":
                case "Bolt":
                case "Thrown":
                    insertStatement += ",'Ranged','Magic','Melee'";
                    break;
                case "Crushing":
                case "Slashing":
                case "Stabbing":
                    insertStatement += ",'Melee','Ranged','Magic'";
                    break;
                case "None":
                    insertStatement += ",'None','None','None'";
                    break;
            }
            insertStatement += ");";
            await Database.QueryDB(insertStatement);
        } else {
            Logger.debug(`Style '${weakness.name}' already exists.  Skipping insertion.`)
        }
    }
}

Seeder = {
    refreshDatabase:async () => {
        await getWeaknesses();
    }
}

module.exports = Seeder;