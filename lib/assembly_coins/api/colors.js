/**
 * A colored coin represented on the bitcoin blockchain
 */
var Colors = function(client) {
  this.client = client;

  return this;
};

/**
 * 
 *
 * '/colors/prepare' POST
 *
 * @param "issued_amount" Starting number of coins to be issued, declared in the Blockchain
 * @param "description"  Description of the Coin Color, to be written permanently in the Blockchain
 * @param "coin_name" Name of the Coin Color, declared in the Blockchain
 * @param "email" For use with Assembly only.  Not written in the blockchain
 */
Colors.prototype.prepare = function (issued_amount, description, coin_name, email, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['issued_amount'] = issued_amount;
  body['description'] = description;
  body['coin_name'] = coin_name;
  body['email'] = email;

  this.client.post('/colors/prepare', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * 
 *
 * '/colors/:color_address' GET
 *
 * @param "color_address" The unique color address string identifying the color type
 */
Colors.prototype.get = function (color_address, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/colors/' + color_address + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * 
 *
 * '/colors' POST
 *
 * @param "public_address" The public Bitcoin address creating new coins. This will be the source address for this color type.
 * @param "private_key" The private key controlling the source address.
 * @param "name" The name of the new color type, to be written on the Blockchain.
 * @param "initial_coins" The number of coins to issue. More can be issued later. To be written on the Blockchain. Coins are sent back to this public address, from which they can later be transferred.
 * @param "description" The description of this coin color. This is to be written on the Blockchain. It is a permanent declaration of intent.
 * @param "email" The email of the coin creator. Stored by Assembly only. Not written on the Blockchain or shared with anyone.
 * @param "fee_each" The Bitcoin transaction fee to pay per transaction. Note that multiple transactions are necessary to create a new coin, thus the total fee will be some multiple of this number. We suggest 0.00005 BTC.
 */
Colors.prototype.create = function (public_address, private_key, name, initial_coins, description, email, fee_each, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['public_address'] = public_address;
  body['private_key'] = private_key;
  body['name'] = name;
  body['initial_coins'] = initial_coins;
  body['description'] = description;
  body['email'] = email;
  body['fee_each'] = fee_each;

  this.client.post('/colors', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Colors
