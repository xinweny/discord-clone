import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { store } from './store';

import Router from './router';
import { SvgMasks } from '@components/svg';

import './app.scss';
import styles from './app.module.scss';

const App = () => (
  <div id="app-root" className={styles.app}>
    <SvgMasks />
    <IntlProvider locale={navigator.language}>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </IntlProvider>
    <div id="modal-root" className={styles.container}></div>
    <div id="popup-root" className={styles.container}></div>
  </div>
);

export default App;
