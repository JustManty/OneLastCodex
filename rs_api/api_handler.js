const Axios = require('axios');
const Logger = require('./../utils/logger.js')

ApiHandler = {
    callAPI: async (url) => {
        Logger.debug(`Attempting to call ${url}`);

        try {
            const response = await Axios.get(url);
            Logger.debug(`Call to ${url} was successful`)
            return JSON.stringify(response.data);
        } catch (err) {
            Logger.error(`Call to ${url} failed.\n${err.stack}`)
        }
    }
}

module.exports = ApiHandler;