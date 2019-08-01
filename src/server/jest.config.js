module.exports = {
  "verbose": true,
  "collectCoverage": true,
  "testURL": "http://localhost/",
  "testEnvironment": 'node',
  "collectCoverageFrom": [
    "handlers/*.{js,jsx}",
    "routes.js",
  ],

  "testPathIgnorePatterns": [
    "/node_modules/",
    "/__tests__/config-unit-tests/",
    "/__tests__/__mocks__"
  ]
};
