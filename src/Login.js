import { Component } from 'react';

class Login extends Component {

  constructor (props) {
    super(props);

    props.auth.on('authenticated', () => {
      console.log('Redirecting using history object...');
      props.history.replace(props.authenticatedRedirect);
    });

  }

  componentDidMount () {
    this.props.auth.login();
  }

  render() {
    return null;
  }
}

export default Login;
