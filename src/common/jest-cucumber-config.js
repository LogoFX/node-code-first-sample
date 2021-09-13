const setJestCucumberConfiguration = require('jest-cucumber')
  .setJestCucumberConfiguration;

setJestCucumberConfiguration({
  tagFilter: '@include and not @exclude',
  scenarioNameTemplate: vars => {
    return `${vars.featureTitle} - ${vars.scenarioTitle}`;
  },
});
