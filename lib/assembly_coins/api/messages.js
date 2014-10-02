/**
 * <no value>
 */
var Messages = function(client) {
  this.client = client;

  return this;
};

/**
 * 
 *
 * '/messages' POST
 *
 * @param "public_address" Public Bitcoin address sending message.
 * @param "fee_each" Bitcoin transaction fee to spend per transaction. Depending on the length of the message, there may be multiple transactions.
 * @param "private_key" The private key of the Bitcoin address writing the message.
 * @param "message" The message itself to be written in the Blockchain. This message is divide into 40 byte blocks, written as separate OPRETURN transaction on the Blockchain. Numbers preceding each block allows for proper concatenation later.
 */
Messages.prototype.create = function (public_address, fee_each, private_key, message, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['body'] ? options['body'] : {});
  body['public_address'] = public_address;
  body['fee_each'] = fee_each;
  body['private_key'] = private_key;
  body['message'] = message;

  this.client.post('/messages', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

/**
 * 
 *
 * '/messages/:public_address' GET
 *
 * @param "public_address" The public Bitcoin address whose multi-part message are to be read. The stitched, concatenated version is presented.
 */
Messages.prototype.get = function (public_address, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var body = (options['query'] ? options['query'] : {});

  this.client.get('/messages/' + public_address + '', body, options, function(err, response) {
    if (err) {
      return callback(err);
    }

    callback(null, response);
  });
};

// Export module
module.exports = Messages
