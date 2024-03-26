/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  silent: true, // Adding to avoid showing logs from code or errors generated by testing!!
  // They are not "suppressing" any error!! Just to have a clean console :)
  
};