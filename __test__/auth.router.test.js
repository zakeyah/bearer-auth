'use strict';
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server').app;
const mockServer = supergoose(server);
const base64 = require('base-64');


describe('router test ', () => {
    it('should create a new User on POST /signup', async () => {
      const response = await mockServer.post('/signup').send({
            "username":"zakeyah",
            "password":"12345"
      });
      console.log(response.body)
      expect(response.status).toEqual(201);
      expect(response.body.username).toEqual('zakeyah');
    });

    // it('should singin on POST /signin', async () => {
    //     const encoding= `Basic ${base64.encode("zakeyah:12345")}`
    //     const response2 = await mockServer.post('/signin').set('Authorization', encoding );
    //     console.log('bbbbbbbbbbbb',response2.body)
    //     expect(response2.body.username).toEqual('zakeyah');
    //   });
})
