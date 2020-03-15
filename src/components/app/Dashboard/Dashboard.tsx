import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../../public/images/logo.svg';

interface IndexState {
  dynamic: React.SFC | null;
}

// Say hello from GraphQL
class Index extends React.PureComponent<{}, IndexState> {
  public state = {
    dynamic: null,
  };

  public componentDidMount = async () => {
  };

  public render() {
    console.log('Index');
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Software as a service (SaaS)
        </p>
        <a
          className="App-link"
          href="/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Login
        </a>
      </header>
    </div>
    );
  }
}

export default Index;
