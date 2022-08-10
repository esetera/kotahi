module.exports = {
  testEnvironment: 'node',
  // verbose: true,
  testURL: 'http://localhost/',
  testMatch: ['**/__tests__/**.test.js'],
  setupFilesAfterEnv: [require.resolve('regenerator-runtime/runtime')],
}
