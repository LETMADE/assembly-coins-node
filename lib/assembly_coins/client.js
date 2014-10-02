/**
 * Main client for the module
 */
var Client = function(baseUrl, auth, options) {
  this.httpClient = new (require('./http_client').HttpClient)(baseUrl, auth, options);

  return this;
};

/**
 * A colored coin represented on the bitcoin blockchain
 */
Client.prototype.colors = function () {
    return new (require('./api/colors'))(this.httpClient);
};

/**
 * <no value>
 */
Client.prototype.addresses = function () {
    return new (require('./api/addresses'))(this.httpClient);
};

/**
 * <no value>
 */
Client.prototype.transactions = function () {
    return new (require('./api/transactions'))(this.httpClient);
};

/**
 * <no value>
 */
Client.prototype.messages = function () {
    return new (require('./api/messages'))(this.httpClient);
};

// Export module
module.exports = Client;
