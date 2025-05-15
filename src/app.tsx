import React from 'react';

import Routes from './navigator/root-navigator';
import {Provider} from 'react-redux';
import {persistor, store} from './stores';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Routes />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
