const jestCucumber = require('jest-cucumber');

module.exports = {  
  defineFeature: (root, fileName, definition) => {
    const feature = jestCucumber.loadFeature(
      `${root}/../features/${require('path').parse(fileName).name}.feature`
    );
    jestCucumber.defineFeature(feature, test => definition(test));
  },
};
