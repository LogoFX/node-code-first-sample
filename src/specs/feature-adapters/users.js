const { sendGetUsersRequest } = require('../steps/users.steps');
const { defineFeature } = require('../../common/test-utils');
const { createScenarioDataStore } = require('./infra/scenario-data-store');
const chai = require('chai');
const expect = chai.expect;

defineFeature(__dirname, __filename, test => {
  test('Getting users list should be successful', ({  
    given, 
    when,
    then,
  }) => {
    
    let scenarioDataStore = createScenarioDataStore();

    given(
      'I am an authorized user',
      async () => {

      });

    when(
      'I ask to see system users',
      async () => {
        let response = await sendGetUsersRequest();
        scenarioDataStore.getUsersResponse = response;        
      }
    );

    then('The system users are retrieved successfully', () => {
      let response = scenarioDataStore.getUsersResponse;
      let data = response.data;      
      expect(data).to.be.an('array');
      let firstUser = data[0];
      expect(firstUser.name).to.equal('Vasya');
      let secondUser = data[1];
      expect(secondUser.name).to.equal('Petya');
    });
  });
});
