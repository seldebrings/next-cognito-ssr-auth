function AuthenticationDetails(data ) {
    
    const { Username, Password } = data;
  
    this.getUsername = jest.fn().mockReturnValue(Username);
    this.getPassword = jest.fn().mockReturnValue(Password);
    this.getValidationData = jest.fn().mockReturnValue({});
  }
  
  module.exports = AuthenticationDetails;


  