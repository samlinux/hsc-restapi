/**
 * Hyperledger Fabric REST API
 * @rbole 
 */

'use strict';
module.exports = async function (req, contract) {
  
  // Get the keys and value from the POST request.
  let p1 = req.body.p1;
  let p2 = req.body.p2;
  let value = req.body.value;

  //  Set the keys to lowercase, because of the chaincode.
  p1 = p1.toLowerCase();
  p2 = p2.toLowerCase();

  try {
     /* 
     Submit the specified transaction.
     Submit a transaction to the ledger. The transaction function name will be evaluated on the endorsing peers and then submitted to the ordering service for committing to the ledger. 
     */
    await contract.submitTransaction('invoke', p1, p2, value);
    
    // Prepare the return value.
    let r = 'Transaction has been successfully submitted: '+p1+' > '+p2+' '+value;
    return r;
  }
  catch(error){
    let r = {r:'Failed to submit transaction: '+error};
    return r;
  }
}