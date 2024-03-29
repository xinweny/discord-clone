import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { store } from './store';

import Router from './router';

import { SvgMasks } from '@components/svg';
import { Portals } from '@components/ui/displays';

import './app.scss';
import '@assets/styles/typography.scss';
import 'react-resizable/css/styles.css';

import styles from './app.module.scss';

const App = () => (
  <div id="app-root" className={styles.app}>
    <IntlProvider locale={navigator.language}>
      <Provider store={store}>
        <SvgMasks />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Portals numLayers={5} />
      </Provider>
    </IntlProvider>
  </div>
);

export default App;
