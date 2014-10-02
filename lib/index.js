var Client = require('./assembly_coins/client');

// Export module
var assemblyCoins = module.exports;

/**
 * This file contains the global namespace for the module
 */
assemblyCoins.client = function(baseUrl, auth, options) {
  return new Client(baseUrl, auth, options);
};
