/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Root from './src/components/Root'

class mySports extends Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('mySports', () => mySports);