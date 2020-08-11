const Logger = require('./../utils/logger.js');
const HTTPS = require('https');
const Config = require('./../config/GlobalConfig.js');

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
    this.areas = [];
    jsonObject.area.forEach((areaName) => this.areas.push(new Area(areaName)));
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
  constructor(jsonObject) {
    Object.getOwnPropertyNames(jsonObject).forEach((name) => {
      this.name = name;
      this.id = jsonObject[name];
    });
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getBeastData(beastId) {
  const options = {
    host: 'secure.runescape.com',
    path: `/m=itemdb_rs/bestiary/beastData.json?beastid=${beastId}`,
  };

  Logger.debug(`Attempting to call https:\\\\${options.host + options.path}`);

  HTTPS
    .request(options, (res) => {
      let data = [];

      res.on('data', (chunkOfData) => {
        data.push(chunkOfData);
      });

      res.on('end', () => {
        if (data === []) {
          return null;
        }
        const parsedData = JSON.parse(data.join(''));
        return new BeastData(parsedData);
      });
    })
    .end();
}

function getBeastsByLetter(letter) {
  let beasts = [];

  const options = {
    host: 'secure.runescape.com',
    path: `/m=itemdb_rs/bestiary/bestiaryNames.json?letter=${letter}`,
  };

  Logger.debug(`Attempting to call https:\\\\${options.host + options.path}`);
  HTTPS
    .request(options, (res) => {
      let data = [];

      res.on('data', (chunkOfData) => {
        data.push(chunkOfData);
      });

      res.on('end', () => {
        beasts = JSON.parse(data.join(''));
        Logger.debug(`Gathered beasts: ${JSON.stringify(beasts)}`);
      });
    })
    .end();

  return beasts;
}

const bestiary = {
  refreshAllBeastData: async () => {
    let beasts = [];
    const possibleStartingLetters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'X',
      'Y',
      'Z',
    ];

    for (let i = 0; i < possibleStartingLetters.length; i++) {
      const results = getBeastsByLetter(possibleStartingLetters[i]);
      for (let j = 0; j < results.length; j++) {
        if ( Object.getOwnPropertyDescriptors(results)[j] === 'npcs' ) {
          for (let k = 0; k < results[j].length; k++) {
            console.log(`Adding data to "beasts": ${results[j][k]}`)
            beasts.push(results[j][k]);
          }
        } else {
          console.log(`Adding data to "beasts": ${results[j]}`)
          beasts.push(results[j]);
        }
      }
      await sleep(Config.APIWaitTime);
    }

    console.log(JSON.stringify(beasts));

    // for (const beast of beasts) {
    //   console.log(JSON.stringify(beast));
    //   if (beast.id != undefined) {
    //     var beastData = getBeastData(beast.id);
    //     Logger.debug(`Gathered beast data: ${beastData}`);
    //     await sleep(Config.APIWaitTime;
    //   }
    // }
  },
};

module.exports = bestiary;
