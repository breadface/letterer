import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Board from './components/game/Board'

class Letterer extends Component {
  render() {
    return (
      <Board />
    );
  }
}

export default Letterer
