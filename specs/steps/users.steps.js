const { sendRequest } = require('../utils/test-utils');

async function sendGetUsersRequest() {
  const section = 'Users';  
  return sendRequest(section, 'GET');
}
exports.sendGetUsersRequest = sendGetUsersRequest;
