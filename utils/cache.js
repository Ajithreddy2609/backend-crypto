const NodeCache = require('node-cache');
const config = require('./config');

const cache = new NodeCache({ stdTTL: config.CACHE_TTL });

module.exports = cache;

