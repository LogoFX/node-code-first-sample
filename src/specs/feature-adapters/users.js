const { sendGetUsersRequest } = require('../steps/users.steps');
const { defineFeature } = require('../../common/test-utils');
const { createScenarioDataStore } = require('./infra/ScenarioDataStore');
const { ProcessManagementService } = require('./infra/ProcessManagementService');

const chai = require('chai');
const expect = chai.expect;

defineFeature(__dirname, __filename, test => {

  let processManagementService = new ProcessManagementService();

  beforeAll(async () => {    
    await processManagementService.start();
  });

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

  afterAll(async () => {
    await processManagementService.stop();
  });
});
