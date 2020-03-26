function CognitoUserPool(data) {
    const { UserPoolId, ClientId } = data;
    this.userPoolId = UserPoolId;
    this.clientId = ClientId;
    this.getCurrentUser = jest.fn().mockReturnValue('cognitouserpool');
  }
  module.exports = CognitoUserPool;