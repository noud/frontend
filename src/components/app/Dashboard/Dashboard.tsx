import React from 'react';
// import { useTranslation } from 'react-i18next';
import logo from '../../../public/images/logo.svg';

interface IndexState {
  dynamic: React.SFC | null;
}

// @todo
// function getSubTitle() {
//   const { t: tApp } = useTranslation('app');
//   return tApp('subTitle');
// }

// Say hello from GraphQL
class Index extends React.PureComponent<{}, IndexState> {
  public state = {
    dynamic: null,
  };

  // const { t: tApp } = useTranslation('app');

  public componentDidMount = async () => {
  };

  public render() {
    // const browserTabTitle = getSubTitle();
    const browserTabTitle = 'connecting to API from Software as a service (SaaS) back end, made with Laravel';

    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {browserTabTitle}
        </p>
      </header>
    </div>
    );
  }
}

export default Index;
