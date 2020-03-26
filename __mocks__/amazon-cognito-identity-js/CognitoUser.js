
function AuthError(message){
  this.message = message;
  this.code = "NotAuthorizedException";
  this.name = "NotAuthorizedException";

}

AuthError.prototype = new Error();

function CognitoUser(data) {
  const { Username, Pool } = data;
  const CognitoAccessToken = {
    payload: { exp: 123, auth_time: 123 },
    getJwtToken: jest.fn().mockReturnValue("123"),
    getExpiration: jest.fn().mockReturnValue("123"),
    getIssuedAt: jest.fn().mockReturnValue("123")
  };

  const CognitoRefreshToken = {
    getToken: jest.fn().mockReturnValue("123")
  };

  const CognitoUserSession = {
    getIdToken: jest.fn().mockReturnValue(CognitoAccessToken),
    getRefreshToken: jest.fn().mockReturnValue(CognitoRefreshToken),
    getAccessToken: jest.fn().mockReturnValue(CognitoAccessToken),
    isValid: jest.fn().mockReturnValue(true)
  };
  this.Username = Username;
  this.Pool = Pool;
  //this.authenticateUser = jest.fn( authDetails, callbacks ).mockResolvedValue(CognitoUserSession);
  this.authenticateUser = ( authDetails, callbacks ) => {
    if (
      authDetails.getUsername() === "correct@email.com" &&
      authDetails.getPassword() === "correct_password"
    ) {
      callbacks.onSuccess(CognitoUserSession);
    } else {
      console.log('incorrect');
      callbacks.onFailure(new AuthError('Incorrect username or password.'));
    }
  };
}



module.exports = CognitoUser;
