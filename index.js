/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

if (__DEV__) {
  require('./src/services/reactotron');
}

AppRegistry.registerComponent(appName, () => App);
