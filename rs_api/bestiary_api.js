const ApiHandler = require('./api_handler');
const Logger = require('./../utils/logger.js')

class Area {
  constructor(areaName) {
    this.areaName = areaName;
  }
}
class BeastData {
  constructor(jsonObject) {
    this.name = jsonObject.name;
    this.id = jsonObject.id;
    this.members = jsonObject.members;
    this.weakness = jsonObject.weakness;
    this.level = jsonObject.level;
    this.lifepoints = jsonObject.lifepoints;
    this.defence = jsonObject.defence;
    this.attack = jsonObject.attack;
    this.magic = jsonObject.magic;
    this.ranged = jsonObject.ranged;
    this.xp = jsonObject.xp;
    this.slayerLevel = jsonObject.slayerLevel;
    this.slayerCategory = jsonObject.slayerCategory;
    this.size = jsonObject.size;
    this.attackable = jsonObject.attackable;
    this.aggressive = jsonObject.aggressive;
    this.poisonous = jsonObject.poisonous;
    this.description = jsonObject.description;
    this.areas = jsonObject.area;
  }
}
class Beast {
  constructor(jsonObject) {
    this.id = jsonObject.value;
    this.name = jsonObject.label;
  }
}
class SlayerCategory {
  constructor(jsonObject) {
    Object.getOwnPropertyNames(jsonObject).forEach((name) => {
      this.name = name;
      this.id = jsonObject[name];
    });
  }
}
class Weakness {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

const bestiary_api = {
  callBestiaryNames: async (letter) => {
    const url = `https://secure.runescape.com/m=itemdb_rs/bestiary/bestiaryNames.json?letter=${letter}`;
    return await ApiHandler.callAPI(url);
  },
  callBeastData: async (beastId) => {
    const url = `https://secure.runescape.com/m=itemdb_rs/bestiary/beastData.json?beastid=${beastId}`;
    return await ApiHandler.callAPI(url)
  },
  callAreaNames: async () => {
    return await ApiHandler.callAPI('http://services.runescape.com/m=itemdb_rs/bestiary/areaNames.json')
  },
  callWeaknessNames: async () => {
    return await ApiHandler.callAPI('http://services.runescape.com/m=itemdb_rs/bestiary/weaknessNames.json')
  },
  Area: jsonObject => {return new Area(jsonObject)},
  BeastData: jsonObject => {return new BeastData(jsonObject)},
  Beast: jsonObject => {return new Beast(jsonObject)},
  SlayerCategory: jsonObject => {return new SlayerCategory(jsonObject)},
  Weakness: (name, id) => {return new Weakness(name, id)}
};

module.exports = bestiary_api;
