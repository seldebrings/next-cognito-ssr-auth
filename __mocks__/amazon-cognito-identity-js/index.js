module.exports = {
  CognitoUserPool: jest.fn().mockImplementation(require("./CognitoUserPool")),
  CognitoUser: jest.fn().mockImplementation(require("./CognitoUser")),
  AuthenticationDetails: jest
    .fn()
    .mockImplementation(require("./AuthenticationDetails"))
};
