# assembly-coins-node

AssemblyCoins API library client for node.js

__This library is generated by [alpaca](https://github.com/pksunkara/alpaca)__

## Installation

Make sure you have [npm](https://npmjs.org) installed.

```bash
$ npm install assembly-coins-api
```

#### Versions

Works with [ 0.8 / 0.9 / 0.10 / 0.11 ]

## Usage

```js
var assemblyCoins = require('assembly-coins-api');

// Then we instantiate a client (as shown below)
```

### Build a client

##### Without any authentication

```js
var client = assemblyCoins.client('https://coins.assembly.com');

// If you need to send options
var client = assemblyCoins.client('https://coins.assembly.com', {}, clientOptions);
```

### Client Options

The following options are available while instantiating a client:

 * __base__: Base url for the api
 * __api_version__: Default version of the api (to be used in url)
 * __user_agent__: Default user-agent for all requests
 * __headers__: Default headers for all requests
 * __request_type__: Default format of the request body
 * __response_type__: Default format of the response (to be used in url suffix)

### Response information

__All the callbacks provided to an api call will recieve the response as shown below__

```js
// You can also omit the 'methodOptions' param below
client.klass('args').method('args', methodOptions, function (err, response) {
    if (err) console.log(err);

    response.code;
    // >>> 200

    response.headers;
    // >>> {'x-server': 'apache'}
}
```

##### JSON response

When the response sent by server is __json__, it is decoded into a hash

```js
response.body;
// >>> {'user': 'pksunkara'}
```

### Method Options

The following options are available while calling a method of an api:

 * __api_version__: Version of the api (to be used in url)
 * __headers__: Headers for the request
 * __query__: Query parameters for the url
 * __body__: Body of the request
 * __request_type__: Format of the request body
 * __response_type__: Format of the response (to be used in url suffix)

### Request body information

Set __request_type__ in options to modify the body accordingly

##### RAW request

When the value is set to __raw__, don't modify the body at all.

```js
body = 'username=pksunkara';
// >>> 'username=pksunkara'
```

##### FORM request

When the value is set to __form__, urlencode the body.

```js
body = {'user': 'pksunkara'};
// >>> 'user=pksunkara'
```

##### JSON request

When the value is set to __json__, JSON encode the body.

```js
body = {'user': 'pksunkara'};
// >>> '{"user": "pksunkara"}'
```

### Colors api

A colored coin represented on the bitcoin blockchain

```js
var colors = client.colors();
```

##### Prompt API Server for New Coin Issuing Address (POST /colors/prepare)



The following arguments are required:

 * __issued_amount__: Starting number of coins to be issued, declared in the Blockchain
 * __description__:  Description of the Coin Color, to be written permanently in the Blockchain
 * __coin_name__: Name of the Coin Color, declared in the Blockchain
 * __email__: For use with Assembly only.  Not written in the blockchain

```js
colors.prepare("integer", "string", "string", "string", options, callback);
```

##### Check Holders of particular Coin Type (GET /colors/:color_address)



The following arguments are required:

 * __color_address__: The unique color address string identifying the color type

```js
colors.get("string", options, callback);
```

##### Make New Coin Directly with Server Side Transaction Signing (POST /colors)



The following arguments are required:

 * __public_address__: The public Bitcoin address creating new coins. This will be the source address for this color type.
 * __private_key__: The private key controlling the source address.
 * __name__: The name of the new color type, to be written on the Blockchain.
 * __initial_coins__: The number of coins to issue. More can be issued later. To be written on the Blockchain. Coins are sent back to this public address, from which they can later be transferred.
 * __description__: The description of this coin color. This is to be written on the Blockchain. It is a permanent declaration of intent.
 * __email__: The email of the coin creator. Stored by Assembly only. Not written on the Blockchain or shared with anyone.
 * __fee_each__: The Bitcoin transaction fee to pay per transaction. Note that multiple transactions are necessary to create a new coin, thus the total fee will be some multiple of this number. We suggest 0.00005 BTC.

```js
colors.create("string", "string", "string", "integer", "string", "string", "float", options, callback);
```

### <no value> api

<no value>

```js
var addresses = client.addresses();
```

##### Check Address Balances (GET /addresses/:public_address)



The following arguments are required:

 * __public_address__: The public Bitcoin address whose colored assets balance you wish to check.

```js
addresses.balances("string", options, callback);
```

##### Generate Public/Private Address Pair (GET /addresses)



```js
addresses.generate(options, callback);
```

##### Generate Public/Private Address Pair from Phrase (GET /addresses/brainwallet/:your_phrase)



The following arguments are required:

 * __your_phrase__: A passphrase that deterministically maps to a Bitcoin public/private keypair.

```js
addresses.generateBrainwallet("string", options, callback);
```

### <no value> api

<no value>

```js
var transactions = client.transactions();
```

##### Transfer Colored Coins with Server Side signing (POST /transactions/transfer)



The following arguments are required:

 * __from_public_address__:  The public address sending colored coins. It must have enough colored coins and bitcoins for the transfer transactions to succeed.
 * __from_private_key__: The private key of the sending public address.
 * __transfer_amount__: The number of colored coins to transfer. This is in units of the minimum increment for the color type.
 * __issuing_address__: The source address of the color being transferred. This is the founder and controlling address of the color type and the only address that can issue further coins. It identifies the desired color to send, in case of color mixing.
 * __fee_each__: The amount in Bitcoin transaction fees to spent per transaction. Suggested 0.00005.
 * __to_public_address__: The destination for the transferred colored coins.

```js
transactions.create("string", "string", "integer", "string", "float", "string", "string", options, callback);
```

##### Push Raw Transaction to Bitcoin Network (POST /transactions)



The following arguments are required:

 * __transaction_hex__: The raw transaction, in hex form, to be pushed directly to the Bitcoin Network.

```js
transactions.createRaw("string", options, callback);
```

##### Parsed Open Assets Transactions in Block (GET /transactions/parsed/:block_height)



The following arguments are required:

 * __block_height__: The height of the Bitcoin Block to inspect. Parsed Colored Coin Metadata will be presented for that Block. Metadata is not checked for legitimacy, merely interpreted from OPRETURNS.

```js
transactions.getBlock("integer", options, callback);
```

##### Get Raw Transaction Information (GET /transactions/raw/:transaction_hash)



The following arguments are required:

 * __transaction_hash__: The Bitcoin transaction hash to lookup. Bitcoin transaction information is returned.

```js
transactions.getRaw("string", options, callback);
```

##### Search for Verified Colored Coin Data on Transaction (GET /transactions/:transaction_hash)



The following arguments are required:

 * __transaction_hash__: The Bitcoin transaction hash to lookup. Verified Colored Coin Data is returned.

```js
transactions.get("string", options, callback);
```

### <no value> api

<no value>

```js
var messages = client.messages();
```

##### Write Multipart Statement on the Blockchain (POST /messages)



The following arguments are required:

 * __public_address__: Public Bitcoin address sending message.
 * __fee_each__: Bitcoin transaction fee to spend per transaction. Depending on the length of the message, there may be multiple transactions.
 * __private_key__: The private key of the Bitcoin address writing the message.
 * __message__: The message itself to be written in the Blockchain. This message is divide into 40 byte blocks, written as separate OPRETURN transaction on the Blockchain. Numbers preceding each block allows for proper concatenation later.

```js
messages.create("string", "float", "string", "string", options, callback);
```

##### Read stitched-together multi-part OP_RETURN statements issued by an address (GET /messages/:public_address)



The following arguments are required:

 * __public_address__: The public Bitcoin address whose multi-part message are to be read. The stitched, concatenated version is presented.

```js
messages.get("string", options, callback);
```

## Contributors
Here is a list of [Contributors](https://github.com/jamespeerless/assembly-coins-api-node/contributors)

### TODO

## License
MIT

## Bug Reports
Report [here](https://github.com/jamespeerless/assembly-coins-api-node/issues).

## Contact
James Peerless (jamespeerless@gmail.com)
