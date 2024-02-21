import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { HelmetProvider } from 'react-helmet-async';

import { store } from './store';
import { SEO } from './seo';

import Router from './router';

import { SvgMasks } from '@components/svg';
import { Portals } from '@components/ui/displays';

import './app.scss';
import '@assets/styles/typography.scss';
import 'react-resizable/css/styles.css';

import styles from './app.module.scss';

const App = () => (
  <HelmetProvider context={{}}>
    <SEO />
    <div id="app-root" className={styles.app}>
      <SvgMasks />
      <IntlProvider locale={navigator.language}>
        <Provider store={store}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Provider>
      </IntlProvider>
      <Portals numLayers={5} />
    </div>
  </HelmetProvider>
);

export default App;
