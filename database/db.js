const MySQL = require('mysql')
const Logger = require("../utils/logger");

const DB = MySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "OneLastCodex"
});

Database = {
    QueryDB: async (SQL) => {
        return await DB.query(SQL, (err, result) => {
            if (err) Logger.error(err.stack);
            Logger.database(`{"Request": "${SQL}", "Results": ${JSON.stringify(result)}}`);
            return result;
        });
    }
}

module.exports = Database;