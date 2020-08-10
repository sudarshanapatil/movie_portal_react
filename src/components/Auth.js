import React from "react";
import UserContext from '../context/user';

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      token: ""
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          token: this.state.token,
          updateToken: token => this.setState({ token })
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default Auth;
