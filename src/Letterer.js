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
      <View style={style.container}>
        <Board />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export default Letterer
