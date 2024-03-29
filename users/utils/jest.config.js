/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: [
    ["lcov", {"projectRoot": "../"}],
    "text-summary"
  ]
};