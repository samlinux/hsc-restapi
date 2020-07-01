/**
 * Hyperledger Fabric Node.js SDK REST API 
 * Interaction with the byfn.sh example chaincode example_02 mycc
 * @rbole 
 */

// ----------------------------------------
// requirements
// ----------------------------------------

  // We include some requirement.
  const express = require('express');
  const bodyParser = require('body-parser');

  // we include our API endpoint code.
  let getKeyData = require('./index-query');
  let setData = require('./index-set');

  // We include our connection modul.
  let connectToContract = require('./connect');

  // We include our config file.
  let config = require('./config.json');

  // We define a global variable/pointer to catch an interrupt signal
  // and do a disconnect from the gateway.
  let gateway;

// ----------------------------------------
// express.js 
// ----------------------------------------

  // We create the express base instance.
  const app = express();

  // We include the bodyParser because of the post requests.
  app.use(bodyParser.json());      
  app.use(bodyParser.urlencoded({ 
    extended: true
  }));  

  // On start we connect to the gateway.
  connectToContract(config).then(function(connection){
    // Connection is established we are ready to start the API server.
    // We set the global gateway pointer to disconnect the connect on interruption.
    gateway = connection.gateway;

    console.log('- connection to fabric network ready')
    // -------------------------------------------
    // We implement the api endpoints.
    // All results are formatted as json strings.
    // -------------------------------------------
    
    // We check if API is running.
    app.get('/', function (req, res) {
      res.json({msg:'hello fabric api'});
    })

    // We do a query by key (a || b).
    // @apiParam {string} [a,b] 
    app.get('/getData/:key', async function (req, res) {
      let result = await getKeyData(req, connection.contract)
      res.json(result);
    })

    // We transfer a value from A to B or from B to A.
    // @apiParam {string} p1 [A, B]
    // @apiParam {string} p2 [A, B]
    // @apiParam {string} value value to transfer
    app.post('/setData', async function (req, res) {
      let result = await setData(req, connection.contract)
      res.json(result);
    })

    // finally we start the api server
    app.listen(3000, function(){	
      console.log('- api server started listening on port 3000!');
    });	
  })

// ----------------------------------------
// we disconnect from the gateway CTRL + c
// ----------------------------------------
process.on('SIGINT', async function  () {
  console.log("Caught interrupt signal -  start disconnect from the gateway");
    // Disconnect from the gateway.
    await gateway.disconnect();
    process.exit();
});
