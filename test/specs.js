/**
 * test for our super fabric REST API
 */
const supertest = require('supertest');
const api = supertest('localhost:3000');

describe("Hyperledger Fabric API tests", function() {
  it("checks if api is running", async function() {
    //this.skip();
    let result = await api.get('/')
    console.log(result.body)
  }) 
  
  it("send a value from a to b", async function() {
    //this.skip();
    let payload = {
      p1: 'b',
      p2: 'a',
      value: '10'
    };
    let result = await api.post('/setData').send(payload)
    console.log(result.body)
  })

  it("query a key", async function() {
    //this.skip();
    let key = 'B';
    let result = await api.get('/getData/'+key)
    console.log(result.body)
  })

})