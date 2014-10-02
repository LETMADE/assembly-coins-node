/**
 * <no value>
 */
var Transactions = function(client) {
  this.client = client;

  return this;
};

/**
 * 
 *
 * '/transactions/transfer' POST
 *
 * @param "from_public_address"  The public address sending colored coins. It must have enough colored coins and bitcoins for the transfer transactions to succeed.
 * @param "from_private_key" The private key of the sending public address.
 * @param "transfer_amount" The number of colored coins to transfer. This is in units of the minimum increment for the color type.
 * @param "issuing_address" The source address of the color being transferred. This is the founder and controlling address of the color type and the only address that can issue further coins. It identifies the desired color to send, in case of color mixing.
 * @param "fee_each" The amount in Bitcoin transaction fees to spent per transaction. Suggested 0.00005.
 * @param "to_public_address" The destination for the transferred colored coins.
 */
Transactions.prototype.create = function (from_public_address, from_private_key, transfer_amount, issuing_address, fee_each, to_public_address, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['from_public_address'] = from_public_address;
  body['from_private_key'] = from_private_key;
  body['transfer_amount'] = transfer_amount;
  body['issuing_address'] = issuing_address;
  body['fee_each'] = fee_each;
  body['to_public_address'] = to_public_address;

  this.client.post('/transactions/transfer', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * 
 *
 * '/transactions' POST
 *
 * @param "transaction_hex" The raw transaction, in hex form, to be pushed directly to the Bitcoin Network.
 */
Transactions.prototype.createRaw = function (transaction_hex, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['transaction_hex'] = transaction_hex;

  this.client.post('/transactions', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * 
 *
 * '/transactions/parsed/:block_height' GET
 *
 * @param "block_height" The height of the Bitcoin Block to inspect. Parsed Colored Coin Metadata will be presented for that Block. Metadata is not checked for legitimacy, merely interpreted from OPRETURNS.
 */
Transactions.prototype.getBlock = function (block_height, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/transactions/parsed/' + block_height + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * 
 *
 * '/transactions/raw/:transaction_hash' GET
 *
 * @param "transaction_hash" The Bitcoin transaction hash to lookup. Bitcoin transaction information is returned.
 */
Transactions.prototype.getRaw = function (transaction_hash, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/transactions/raw/' + transaction_hash + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * 
 *
 * '/transactions/:transaction_hash' GET
 *
 * @param "transaction_hash" The Bitcoin transaction hash to lookup. Verified Colored Coin Data is returned.
 */
Transactions.prototype.get = function (transaction_hash, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/transactions/' + transaction_hash + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Transactions
