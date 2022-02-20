process.env['NODE_CONFIG_DIR'] = __dirname + '/../config';

const config = require('config');
const axios = require('axios').default;

function patchHeaders(section, token, headers) {
  let sectionHeaders = getCopy(section, 'Request.headers');
  let allHeaders = headers ? { ...headers, ...sectionHeaders } : sectionHeaders;
  if (allHeaders['Authorization'] !== undefined && token !== undefined) {
    allHeaders['Authorization'] = allHeaders['Authorization'].replace(
      '${token}',
      token
    );
  }
  return allHeaders;
}
exports.patchHeaders = patchHeaders;

async function sendRequest(
  section,
  headers,
  method,
  patchData,
  data
) {
  let href = getValue(section, 'Request.href');
  if (patchData !== undefined) {
    href = patchHref(href, patchData);
  }
  var URL = require('url').URL;
  const url = new URL(href);  
  let response = await axios({
    method: method,
    url: url.href,
    data: data
  });
  return response;
}
exports.sendRequest = sendRequest;

function patchResourceId(href, resourceId) {
  return patchHref(href, { resourceId: resourceId });
}
exports.patchResourceId = patchResourceId;

function patchCredentials(href, credentials) {
  if (
    credentials !== undefined &&
    credentials.user !== undefined &&
    credentials.secret !== undefined
  ) {
    return patchHref(href, credentials);
  }
  return href;
}
exports.patchCredentials = patchCredentials;

function patchHref(href, values) {
  Object.keys(values).forEach(key => {
    href = href.replace('${' + key + '}', values[key]);
  });
  return href;
}
exports.patchHref = patchHref;

function getValue(section, key) {
  const value = `${section === undefined ? '' : `${section}.`}${key}`;
  return config.has(value) ? config.get(value) : undefined;
}
exports.getValue = getValue;

function getCopy(section, key) {
  let source = getValue(section, key);
  return clone(source);
}
exports.getCopy = getCopy;

function clone(source) {
  return Object.assign({}, source);
}