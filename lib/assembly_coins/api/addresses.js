/**
 * <no value>
 */
var Addresses = function(client) {
  this.client = client;

  return this;
};

/**
 * 
 *
 * '/addresses/:public_address' GET
 *
 * @param "public_address" The public Bitcoin address whose colored assets balance you wish to check.
 */
Addresses.prototype.balances = function (public_address, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/addresses/' + public_address + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * 
 *
 * '/addresses' GET
 */
Addresses.prototype.generate = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/addresses', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * 
 *
 * '/addresses/brainwallet/:your_phrase' GET
 *
 * @param "your_phrase" A passphrase that deterministically maps to a Bitcoin public/private keypair.
 */
Addresses.prototype.generateBrainwallet = function (your_phrase, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/addresses/brainwallet/' + your_phrase + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Addresses
