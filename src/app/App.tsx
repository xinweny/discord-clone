import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { store } from './store';

import Router from './router';

import './app.scss';

const App = () => (
  <IntlProvider locale={navigator.language}>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </IntlProvider>
);

export default App;
