/**
 * Hyperledger Fabric REST API
 * @rbole 
 */

'use strict';
module.exports = async function (req, contract) {

  // Get the key from the GET request and set it to lowercase, because of the chaincode.
  let queryKey = req.params.key;
  queryKey = queryKey.toLowerCase();

  try {
    // Evaluate the specified transaction.
    let result = await contract.evaluateTransaction('query',queryKey);
    
    // Construct the finale return object.
    let r = {
      key: queryKey,
      value: result.toString()
    };
    return r;
  } catch(err){
    //console.log('Failed to evaluate transaction:', err)
    let r = {result:'Failed to evaluate transaction: '+err};
    return r; 
  }
}