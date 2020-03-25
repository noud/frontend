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
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        connecting to API from Software as a service (SaaS) back-end, made with Laravel
        </p>
      </header>
    </div>
    );
  }
}

export default Index;
