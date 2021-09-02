module.exports = {
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.js', 'config/authsome.js'],
  // setupTestFrameworkScriptFile: '<rootDir>/test/helpers/jest-setup.js',
  // testEnvironment: 'node',
  // testRegex: '/test/authsome/.*.test.js$',
  projects: [
    {
      displayName: 'models',
      testEnvironment: 'node',
      testRegex: 'server/.*/__tests__/.*.test.js$',
    },
  ],
}
